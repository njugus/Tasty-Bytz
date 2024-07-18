import Login from '../Login/Login';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Sign.css'
import axios from 'axios'

const SignUp = () => {
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (first_name, last_name, email, password) => {
    setLoading(true);
    try {
        const response = await axios.post('http://localhost:3000/api/sign', { first_name, last_name, email, password }, { withCredentials: true });
        setLoading(false);
        if (response.status === 201) {
            alert("Registration Successful");
            navigate("/login")
        }
    } catch (error) {
        console.error('Registration error', error);
        setLoading(false);
    }
};

  const onSubmit = (values, { setSubmitting }) => {
    console.log('Form data', values);
    //send data to the backend here.
    register(values.first_name, values.last_name, values.email, values.password)
    setSubmitting(false);
  };

  return (
    <div className="signup-container">
      <h2>Welcome to Tasty Bytz</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form>
            <div className="form-control">
              <label htmlFor="first_name">First Name</label>
              <Field type="text" id="first_name" name="first_name" />
              <ErrorMessage name="first_name" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="last_name">Last Name</label>
              <Field type="text" id="last_name" name="last_name" />
              <ErrorMessage name="last_name" component="div" className="error" />
            </div>

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

            <button type="submit" disabled={!formik.isValid}>Sign Up</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
