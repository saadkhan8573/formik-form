import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import './userform.css'
import { useDispatch, useSelector } from 'react-redux';

import { InputField, Button, ImageUpload } from '../../components';

export const UserForm = () => {
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
        firstName: yup.string().min(2)
            .required("Required!")
            .matches(/^[aA-zZ\s]+$/, "Only alphabets allowed"),
        lastName: yup.string().required("Required!"),
        email: yup.string().required("Required!").email("Invalid Email"),
        password: yup.string().required("Required!")
            .min(5, "Min Length is 5 chars")
            .max(16, "Max length is 16 chars"),
        phoneNum: yup.string()
            .required("Required!")
            .matches(/^[0-9\+\(\)\-\s]+$/, "Only Numeric allowed"),
        image: yup.string().required("Required!")
            .test("type", "Only the following formats are accepted: png, jpg, bmp, svg,jpeg", (val) => {
                const type = val && val.split(":")[1].split(";")[0];
                const supportedFiles = ['image/png', 'image/jpg', 'image/bmp', 'image/svg', 'image/jpeg'];
                return val && supportedFiles.includes(type)
            })
    })

    const onSubmit = (values) => {
        dispatch({
            type: "userData",
            payload: values
        })
    }

    let phone = "03439444098"
    phone = phone.replace(/[^\d^]/g, "");
    const rzero = phone.replace(/[0]/g, '')
    const aaaa = rzero.replace(/(\d{4})(\d{6})/, "(+92) $1 $2")
    console.log(aaaa);

    return (
        <>
            <div className='main'>
                <h1>User Data</h1>

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
                                <InputField
                                    name={'firstName'}
                                    id={'fname'}
                                    label={'First Name'}
                                />
                                <InputField
                                    name={'lastName'}
                                    id={'lname'}
                                    label={'Last Name'}
                                />
                                <InputField
                                    name={'email'}
                                    id={'email'}
                                    label={'Email'}
                                    type={'email'}
                                />
                                <InputField
                                    name={'password'}
                                    id={'password'}
                                    label={'Password'}
                                    type={'password'}
                                />
                                <InputField
                                    name={'phoneNum'}
                                    id={'phoneNum'}
                                    label={'Phone Number'}
                                    type={'tel'}
                                />
                                <div className='form_control'>
                                    <label htmlFor="image">Image</label>
                                    <Field name="image">
                                        {
                                            ({ meta }) => {
                                                console.log("meta", meta)
                                                return <div>
                                                    <ImageUpload
                                                        fileupload={setFieldValue}
                                                    />
                                                    {
                                                        meta.value &&
                                                            meta.error ?
                                                            <span> {meta.error} </span>
                                                            : null
                                                    }
                                                </div>
                                            }
                                        }
                                    </Field>
                                    <ErrorMessage name='image' component="span" />
                                </div>

                                <Button
                                    type={"submit"}
                                    disabled={!isValid}
                                    text={"Submit"}
                                />
                            </Form>
                        }
                    }
                </Formik>
            </div>
        </>
    )
}