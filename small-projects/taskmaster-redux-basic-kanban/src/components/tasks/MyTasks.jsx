import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserTaskStatus } from '../../store/features/userSlice';
import { updateStatus } from '../../store/features/taskSlice';
import { useState } from 'react';
import ViewMyTaskModal from './ViewMyTaskModal';

const MyTasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTask, setModalTask] = useState({});
  const { name, userTasks } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const handleModalTask = (item) => {
    setModalTask(item);
    setIsOpen(true);
  };

  const completeTask = (id) => {
    dispatch(updateUserTaskStatus(id));
    dispatch(updateStatus({ id, status: 'COMPLETED' }));
  };

  return (
    <div>
      <h1 className='text-xl my-3 uppercase font-bold'>{`${name}'s tasks`}</h1>
      <ViewMyTaskModal isOpen={isOpen} setIsOpen={setIsOpen} task={modalTask} />
      <div className=' h-[750px] overflow-auto space-y-3'>
        {userTasks.map((item) => (
          <div
            key={item.id}
            className={`${
              item.status !== 'COMPLETED' ? 'bg-red-300' : 'bg-green-300'
            } rounded-md p-3 flex justify-between`}
          >
            <h1>{item.title}</h1>
            <div className='flex gap-3'>
              <button
                className='grid place-content-center'
                title='Details'
                onClick={() => handleModalTask(item)}
              >
                <DocumentMagnifyingGlassIcon className='w-5 h-5 text-primary' />
              </button>
              <button
                className='grid place-content-center'
                title='Done'
                onClick={() => completeTask(item.id)}
              >
                <CheckIcon className='w-5 h-5 text-primary' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
