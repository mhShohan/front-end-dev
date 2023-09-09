const Application = () => {
  return (
    <form>
      <div>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' />
      </div>
      <div>
        <label htmlFor='location'>Location</label>
        <select id='location'>
          <option value=''>Select a country</option>
          <option value='bangladesh'>bangladesh</option>
          <option value='india'>india</option>
          <option value='pakistan'>pakistan</option>
          <option value='nepal'>nepal</option>
          <option value='bhutan'>bhutan</option>
        </select>
      </div>
      <div>
        <label>
          <input type='checkbox' id='terms' /> Accept terms and conditions!
        </label>
      </div>
      <button>Submit</button>
    </form>
  );
};

export default Application;
