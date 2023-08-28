import React from 'react';
import Modal from '../ui/Modal';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/features/taskSlice';
import { addUserTask } from '../../store/features/userSlice';

const AddTaskModal = ({ isOpen, setIsOpen }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onClose = () => {
    reset();
    setIsOpen(false);
  };
  const onSubmit = (data) => {
    const payload = { id: Date.now(), status: 'PENDING', ...data };
    dispatch(addTask(payload));
    dispatch(addUserTask(payload));
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
          <label className='text-xl font-bold' htmlFor='assignedTo'>
            assignedTo
          </label>
          <select
            id='assignedTo'
            {...register('assignedTo')}
            className='w-full rounded-md'
          >
            <option value='shohan'>shohan</option>
            <option value='nayeem'>nayeem</option>
            <option value='nasim'>nasim</option>
            <option value='rahat'>rahat</option>
          </select>
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
