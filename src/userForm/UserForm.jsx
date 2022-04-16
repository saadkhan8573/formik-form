import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import ImageUpload from './ImageUpload';
import './userform.css'
import { useDispatch, useSelector } from 'react-redux';

import { InputField, Button } from '../components';

const UserForm = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.loginReducer);

    useEffect(() => {
        console.log("User Data", user);
    }, [user])


    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNum: "",
        image: "",
    }

    // Min requirements
    // Number check on name
    // phone format 03231234567 > (+92) 323 1234567 and donot accept alphabets
    // image must accept images only, png, jpg, bmp, svg
    const validationSchema = yup.object({
        firstName: yup.string().min(2).required("Required!"),
        lastName: yup.string().required("Required!"),
        email: yup.string().required("Required!").email("Invalid Email"),
        password: yup.string().required("Required!").min(5, "Min Length is 5 chars").max(16, "Max length is 16 chars"),
        phoneNum: yup.string().required("Required!"),
        image: yup.string().required("Required!"),
    })

    const onSubmit = (values) => {
        const myForm = new FormData();

        for (var key in values) {
            myForm.append(key, values[key])
        }

        dispatch({
            type: "userData",
            payload: values
        })
    }

    return (
        <>
            <div className='main'>
                <h1>User Data</h1>
                <Button text={'Click It!'}/>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    validateOnMount
                >
                    {
                        (props) => {
                            const { setFieldValue, isValid } = props;
                            return <Form>
                                {/* <div className='form_control'>
                                    <label htmlFor="fname">First Name</label>
                                    <Field type="text" id="fname" name="firstName" />
                                    <ErrorMessage name="firstName" component="span" />
                                </div> */}
                                <InputField
                                    name={'firstName'}
                                    id={'fname'}
                                    label={'First Name'}
                                    type={'password'}
                                />
                                <div className='form_control'>
                                    <label htmlFor="lname">Last Name</label>
                                    <Field
                                        type="text"
                                        id="lname"
                                        name="lastName"
                                    />
                                    <ErrorMessage name="lastName" component="span" />
                                </div>
                                <div className='form_control'>
                                    <label htmlFor="email">Email</label>
                                    <Field type="email" id="email" name="email" />
                                    <ErrorMessage name="email" component="span" />
                                </div>
                                <div className='form_control'>
                                    <label htmlFor="password">Password</label>
                                    <Field type="password" id="password" name="password" autoComplete={'password'} />
                                    <ErrorMessage name="password" component="span" />
                                </div>
                                <div className='form_control'>
                                    <label htmlFor="phoneNum">Phone Number</label>
                                    <Field type="tel" id="phoneNum" name="phoneNum" />
                                    <ErrorMessage name="phoneNum" component="span" />
                                </div>
                                <div className='form_control'>
                                    <label htmlFor="image">Image</label>
                                    <Field name="image">
                                        {
                                            ({ meta }) => {
                                                return <div>
                                                    <ImageUpload fileupload={setFieldValue} />
                                                    {meta.touched && meta.error ? <span> {meta.error} </span> : null}
                                                </div>
                                            }
                                        }
                                    </Field>
                                </div>

                                <button type="submit" disabled={!isValid}>Submit</button>
                            </Form>
                        }
                    }
                </Formik>
            </div>
        </>
    )
}

export default UserForm;