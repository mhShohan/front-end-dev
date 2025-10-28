const Application = () => {
  return (
    <div>
      <h1>Application From</h1>
      <h3>Register an application for get update</h3>
      <form>
        <div>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' placeholder='Your Name' />
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <input type='text' id='description' />
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
            <input type='checkbox' id='terms' />
            Accept terms and conditions!
          </label>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Application;
