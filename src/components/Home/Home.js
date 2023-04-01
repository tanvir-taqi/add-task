import React, { useState } from 'react';
import AddtoDo from '../AddToDo/AddtoDo';
import ListToDos from '../ListToDos/ListToDos';
import Spinner from '../Spinner/Spinner';

const Home = () => {
    const [isLoading, setIsLoading] = useState(false)

    const handleAddToDo = (event) =>{
        event.preventDefault();
        setIsLoading(true);
        const form = event.target 
        const title = form.title.value 
        const link = form.link.value
        const todo = {
            title,
            link,
            completed : false
        }
       
        fetch('https://y-hazel-five.vercel.app/addtodos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
          })
          .then(response => response.json())
          .then(data => {
            if(data.acknowledged){
                setIsLoading(false)
                form.reset()
            }
        })
        .catch(error => {
              setIsLoading(false)
              form.reset()
              console.log('====================================');
              console.error(error);
              console.log('====================================');

          });
    }
    
    return (
        <div>
           <div className='grid grid-cols-1 md:grid-cols-[1fr,2fr]'>
            <div className='flex justify-center items-center md:h-screen  '>
                <AddtoDo
                handleAddToDo ={handleAddToDo}
                ></AddtoDo>
            </div>
            <div className='flex justify-center items-center w-full '>
                {
                    isLoading ? <Spinner></Spinner> : <ListToDos></ListToDos>
                }
            </div>
           </div>
        </div>
    );
};

export default Home;