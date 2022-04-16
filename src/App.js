import React, { useEffect } from 'react'
import { Formik,Form,Field,ErrorMessage} from 'formik';
import * as yup from 'yup';
import './app.css';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import {UserForm} from './pages/User/index'

const App = () => {
  const dispatch = useDispatch();
  const {message,error} = useSelector(state => state.loginReducer);

  useEffect(() => {
    message && toast.success(message);
    error && toast.error(error);

    // Clearing errors from Reducers;
    dispatch({
      type : "clearErrors"
    })
  }, [message,error])


  const initialValues={
    email : "",
    password : ""
  }
  
  const onSubmit= values => {
    setTimeout(() => {
      dispatch({
        type : "login",
        payload : values
      })
    }, 1000);
  };


  const validationSchema = yup.object({
    email : yup.string().required("Required!").email("Invalid Email!"),
    password : yup.string().required("Required!").min(6,"Min Length is six").max(16,'max length is sixteen')
  })
 
  return (
    <>
    {/* <div className="main">
    <h1>Login</h1>
   
     <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} className='main'>
      <Form>
        <div className='form_control'>
        <label htmlFor="name">Email</label>
        <Field type="email" name="email" id="email"  />
        <ErrorMessage name="email" component="span" /> 
        </div>

        <div className='form_control'>
        <label htmlFor="name">Password</label>
        <Field type="password" name="password" id="password"  />
        <ErrorMessage name="password" component="span"/>
        <ErrorMessage name="password">
          {
            err => <span>{err}</span>
          }
        </ErrorMessage>
        </div>

        <button type="submit">Submit</button>
     </Form>
   </Formik>

   <ToastContainer
   position="bottom-center"
   />
   </div> */}
   <UserForm/>
    </>
  )
}

export default App