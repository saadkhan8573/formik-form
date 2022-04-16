import React from 'react';
import { Formik, Form, Field, FieldArray, FieldArrayI } from 'formik';

const DynamicInputs = () => {
    const initialValues = {
        users: [
            {
                name: '',
                fatherName: '',
                cnic: '',
                designation: '',
                abc: [
                    {
                        a: '',
                        b: ''
                    }
                ]
            }
        ]
    }
    const onSubmit = (values) => {
        console.log("Submit", values);
    }
    return (
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form>
                    <FieldArray name="users">
                        {
                            (props) => {
                                const { push, remove, form: { values: { users } } } = props;
                                console.log(props)
                                return <div>
                                    {
                                        users.map((user, index) => {
                                            return (
                                                <div key={index}>
                                                    <button type="button" onClick={() => remove()}> - </button>
                                                    <button type="button" onClick={() => push({
                                                        name: '',
                                                        fatherName: '',
                                                        cnic: '',
                                                        designation: '',
                                                        abc: [
                                                            {
                                                                a: '',
                                                                b: ''
                                                            }
                                                        ]
                                                    })}> + </button>
                                                    <Field type="text" name={`users[${index}].name`} />
                                                    <Field type="text" name={`users[${index}].fatherName`} />
                                                    <Field type="text" name={`users[${index}].cnic`} />
                                                    <Field type="text" name={`users[${index}].designation`} />
                                                    <FieldArray name={`users[${index}.name]`}>
                                                        {
                                                            (props) => {
                                                                const { push, remove, form: { values: { users } } } = props;
                                                                const user = users[index].abc;
                                                                console.log("Inner props", props, "User", user)
                                                                return <div>
                                                                    {
                                                                        user && user.map((usr, innerIndex) => {
                                                                            return (
                                                                                <div key={innerIndex}>
                                                                                    <Field type="text" name={`users[${index}].abc[${innerIndex}].a`} />
                                                                                    <Field type="text" name={`users[${index}].abc[${innerIndex}].b`} />
                                                                                    <button type="button" onClick={() => remove()}> - </button>
                                                                                    <button type="button" onClick={() => push({
                                                                                        a: '',
                                                                                        b: ''
                                                                                    })}> + </button>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            }
                                                        }
                                                    </FieldArray>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        }
                    </FieldArray>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    )
}

export default DynamicInputs;