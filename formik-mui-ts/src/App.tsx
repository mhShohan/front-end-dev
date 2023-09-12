import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Input from './components/Input';

interface IInitValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const INIT_VALUES: IInitValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .min(3, 'Must have 3 characters!')
    .required('FirstName is Required!'),
  lastName: yup
    .string()
    .min(3, 'Must have 3 characters!')
    .required('LastName is Required!'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const App = () => {
  const formik = useFormik({
    initialValues: INIT_VALUES,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Form Validation With MUI-Formik</h1>
      <form
        onSubmit={formik.handleSubmit}
        style={{ width: '500px', margin: '0 auto' }}
      >
        <Input name='firstName' label='FirstName' formik={formik} />
        <Input name='lastName' label='LastName' formik={formik} />
        <Input name='email' label='Email' formik={formik} />
        <Input name='password' label='Password' formik={formik} />
        <Button color='primary' variant='contained' fullWidth type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default App;
