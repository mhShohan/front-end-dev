import React from 'react';
import Modal from '../ui/Modal';
import { useForm } from 'react-hook-form';

const AddTaskModal = ({ isOpen, setIsOpen }) => {
  const { register, handleSubmit, reset } = useForm();

  const onClose = () => {
    reset();
    setIsOpen(false);
  };
  const onSubmit = (data) => {
    console.log(data);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Add your Task'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col mb-2'>
          <label className='text-xl font-bold' htmlFor='Title'>
            Title
          </label>
          <input
            type='text'
            id='Title'
            {...register('title')}
            className='w-full rounded-md'
          />
        </div>
        <div className='flex flex-col mb-2'>
          <label className='text-xl font-bold' htmlFor='Description'>
            Description
          </label>
          <textarea
            id='Description'
            {...register('description')}
            className='w-full rounded-md'
          ></textarea>
        </div>
        <div className='flex flex-col mb-2'>
          <label className='text-xl font-bold' htmlFor='Date'>
            Date
          </label>
          <input
            type='date'
            id='Date'
            {...register('date')}
            className='w-full rounded-md'
          />
        </div>
        <div className='flex flex-col mb-2'>
          <label className='text-xl font-bold' htmlFor='assignTo'>
            assignTo
          </label>
          <input
            type='text'
            id='assignTo'
            {...register('assignTo')}
            className='w-full rounded-md'
          />
        </div>
        <div className='flex flex-col mb-2'>
          <label className='text-xl font-bold' htmlFor='priority'>
            priority
          </label>
          <select
            id='priority'
            {...register('priority')}
            className='w-full rounded-md'
          >
            <option value='low'>low</option>
            <option value='medium'>medium</option>
            <option value='high'>high</option>
          </select>
        </div>
        <div>
          <button
            onClick={onClose}
            type='button'
            className='py-1 px-4 m-1 bg-red-600 rounded-md text-gray-100 font-bold'
          >
            Close
          </button>
          <button
            type='submit'
            className='py-1 px-4 m-1 bg-green-600 rounded-md text-gray-100 font-bold'
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
