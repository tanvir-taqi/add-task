import React from 'react';

const AddtoDo = ({handleAddToDo}) => {
    return (
        <div className='w-full md:p-10 p-2'>
            <div className='w-full '>
            <h1 className='font-bold text-3xl'>Add a Task</h1>
            <form onSubmit={handleAddToDo} className='w-full '>
                <div className="form-control flex flex-col w-full my-4">
                    <label htmlFor="title" className='font-medium'>Title</label>
                    <input type="text" name='title' id='title' className='my-1 outline-none border-4 duration-1000 border-black border-r-0 focus:border-r-4 focus:w-full w-1/3 py-1 px-3 focus:rounded-xl'/>
                </div>
                <div className="form-control flex flex-col w-full my-4">
                    <label htmlFor="link" className='font-medium'>Link</label>
                    <input type="url" name='link' id='link' className='my-1 outline-none border-4 duration-1000 border-black border-r-0 focus:border-r-4 focus:w-full w-1/3 py-1 px-3 focus:rounded-xl'/>
                </div>
                <div className="form-control flex flex-col w-full my-4">
                    
                    <input type="submit" className='my-1 outline-none border-4 duration-700 border-black w-1/3 hover:bg-black hover:text-white  py-1 px-3 hover:rounded-xl'/>
                </div>
            </form>
            </div>
        </div>
    );
};

export default AddtoDo;