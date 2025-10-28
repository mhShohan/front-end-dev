import generateColor from '../utils/generateColor';

const Button = ({ handleClick, value }) => {
  const color = generateColor();

  return (
    <button onClick={() => handleClick(value)} className='btn' style={{ backgroundColor: color }}>
      {value}
    </button>
  );
};

export default Button;
