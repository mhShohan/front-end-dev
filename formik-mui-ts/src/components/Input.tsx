import { TextField } from '@mui/material';

interface IInput {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
  label?: string;
}

const Input = ({ name, formik, label }: IInput) => {
  return (
    <TextField
      margin='dense'
      fullWidth
      name={name}
      label={label}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  );
};

export default Input;
