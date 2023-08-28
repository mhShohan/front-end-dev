import Modal from '../ui/Modal';

const ViewMyTaskModal = ({ isOpen, setIsOpen, task }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <h1 className='text-3xl font-bold'>{task.title}</h1>
        <p className='my-1'>{task.description}</p>
        <p className='text-xl font-medium my-2'>Assigned Date: {task.date}</p>
        <span className='border border-gray-500 px-5 py-1 rounded-full font-bold'>
          {task.status}
        </span>
      </div>
    </Modal>
  );
};

export default ViewMyTaskModal;
