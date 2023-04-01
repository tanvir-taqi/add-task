import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { FaBars } from "react-icons/fa";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Spinner from '../Spinner/Spinner';

const ListToDos = () => {

    const [loading, setLoading] = useState(false)



    const { data: todos = [], isLoading, refetch } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const res = await fetch(`https://y-hazel-five.vercel.app/todos`)
            const data = await res.json();

            return data
        }

    })

    const handleComplete = (id, status) => {
        let toggleComplete
        if (status) {
            toggleComplete = false
        } else {
            toggleComplete = true

        }

        fetch(`https://y-hazel-five.vercel.app/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ toggleComplete })
        })
            .then(response => response.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch()

                }
            })
            .catch(error => console.error(error));
    }



    const handleDragEnd = (result) => {

        if (!result.destination) {
            return;
        }

        const { source, destination } = result;

        if (source.index === destination.index) {
            return;
        }

        const newTodos = Array.from(todos);
        const [removed] = newTodos.splice(source.index, 1);
        newTodos.splice(destination.index, 0, removed);


        fetch(`https://y-hazel-five.vercel.app/todosorder`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ todos: newTodos })
        })
            .then(response => response.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch()

                }
            })
            .catch(error => console.error(error));
    };

    if (loading || isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className='w-full flex flex-col  justify-center items-center'>
                <h1 className='font-bold text-3xl my-4'>To Do List</h1>
                {
                    todos.length <= 0 && <h1 className='font-bold text-xl'>Add TO DO</h1>
                }
                <Droppable droppableId={JSON.stringify(todos)}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className='flex flex-col bg-white p-6 md:p-10 md:3/4 w-full'>

                            {
                                todos.map((todo, i) => (
                                    <Draggable key={todo?._id} draggableId={todo?._id} index={i}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='grid grid-cols-4 bg-[#ddd] my-1 p-2'>
                                                <span className='cursor-grab'><FaBars></FaBars></span>

                                                <h1 className={`${todo?.completed ? 'line-through' : ""}`}>{todo?.title}</h1>
                                                <a href={todo?.link} className='underline'>Link</a>
                                                <div className='relative h-6 w-6 z-50 cursor-pointer' onClick={() => handleComplete(todo?._id, todo?.completed)}>

                                                    <input type="checkbox" name="completedCheck" id="" checked={todo?.completed ? true : false} readOnly className={`z-[999] appearance-none cursor-pointer ${todo?.completed ? "bg-gray-900  border-none rounded-full " : "bg-white text-black border-black  rounded-md"}  h-6 w-6 border flex items-center justify-center`} />
                                                    {
                                                        todo?.completed && <span className='absolute z-0 inset-x-1 inset-y-1'>
                                                            <svg
                                                                className="h-4 w-4  text-white fill-current"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M17.293 4.293a1 1 0 0 1 1.414 1.414l-10 10a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L7 12.586l9.293-9.293a1 1 0 0 1 1.414 0z"
                                                                />
                                                            </svg>
                                                        </span>
                                                    }

                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )

                                )
                            }
                            {
                                provided.placeholder

                            }
                        </div>
                    )}

                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default ListToDos;