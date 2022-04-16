import React from 'react'
import { useFormik} from 'formik';
import * as yup from 'yup';
import './app.css';

const OldFom = () => {
  const formik = useFormik({
    initialValues:{
      name : "",
      email : "",
      password : "",
      fatherName : ""
    },
    onSubmit: values => {
      console.log("Data",values)
    },
    // validate : values => {
    //   let errors = {};

    //   if(!values.name){
    //     errors.name = "Name field is required";
    //   }
    //   if(!values.email){
    //     errors.email = "Email field is required";
    //   }else if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(!values.email)){
    //     errors.email = "Email is invalid";
    //   }
    //   if(!values.password){
    //     errors.password = "Password field is required";
    //   }
    //   return errors;
    // }
    validationSchema : yup.object({
      name : yup.string().required('Required').length(2,"ABCDE"),
      email : yup.string().required("Required").email("Invalid Email"),
      password : yup.string().required("Required").min(6,"Min Length is six").max(16,'max length is sixteen')
    })
  })

  const submitFormData  =()=>{
    console.log(formik.values);
  }
  console.log("Errors",formik.touched)
  return (
    <>
   <div className='main'>
     <form onSubmit={formik.handleSubmit} id="myform">
       <div className='form_control'>
       <label htmlFor="name">Name</label>
       <input onBlur={formik.handleBlur} type="text" name="name" id="name" onChange={formik.handleChange} value={formik.values.name} />
       {formik.touched.name && formik.errors.name ? formik.errors.name : null}
       </div>
       <div className='form_control'>
       <label htmlFor="name">Email</label>
       <input onBlur={formik.handleBlur} type="email" name="email" id="email" onChange={formik.handleChange} value={formik.values.email} />
       {formik.touched.email && formik.errors.email ? formik.errors.email : null}
       </div>
       <div className='form_control'>
       <label htmlFor="name">Password</label>
       <input onBlur={formik.handleBlur} type="password" name="password" id="password" onChange={formik.handleChange} value={formik.values.password} />
       {formik.touched.password && formik.errors.password ? formik.errors.password : null}
       </div>
      <button type="submit">Submit</button>
     </form>

     <button form="myform" disabled={!formik.isValid} onClick={submitFormData}>Submit Outside form</button>
   </div>
    </>
  )
}

export default OldFom