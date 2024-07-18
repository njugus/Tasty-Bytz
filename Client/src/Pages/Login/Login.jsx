import { useUser } from '../../Context/Context';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css'
const Login = () => {
  const { setUserInformation } = useUser();
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', values, { withCredentials: true });
      if (response.data.success) {
        setUserInformation(response.data.token);
        // navigate('/profile');
      }
    } catch (error) {
      console.error('Login error', error);
    } finally {
      setSubmitting(false);
    }
  };
  // const onSubmit = (values) => {
  //   console.log('Form data', values);
  //   // You can send form data to your backend here
        
  // };

  return (
    <div className="login-container">
      <h2>Welcome Back to Tasty Bytz</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" disabled={!formik.isValid}>Log In</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
