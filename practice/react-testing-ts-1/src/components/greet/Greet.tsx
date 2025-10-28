interface IGreet {
  name?: string;
}

const Greet = ({ name }: IGreet) => {
  return <div>Hello, {name}!</div>;
};

export default Greet;
