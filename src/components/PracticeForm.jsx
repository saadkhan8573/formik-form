import React from 'react'
import { Formik,Form,Field,ErrorMessage,FieldArray } from 'formik';
import * as  yup from 'yup';
const PracticeForm = () => {
    const initialValues = {
        name : "",
        email : "",
        url : "",
        comment : "",
        social : {
            facebook : "",
            twitter : ""
        },
        phoneNumber : ['',''],
        phNumbers : [""],
        image : ""
    }

    const onSubmit = (values) => {
        console.log("Submit",values)
    }

    const validationSchema = yup.object({
        name : yup.string().required('Reqiored'),
        email : yup.string().required("Required!").email("Invalid Email"),
        url : yup.string().required("Required!"),
        comment : yup.string().max(600,'Max Length is 600'),
    })

    const commentValidate = (value) => {
        let err;
        if(!value){
            err = "Required!";
        }

        return err;
    }

    
  return (
    <>
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} validateOnMount>
{
    (formik) => {
        return <Form>
        <div>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email">
                {
                    (err) => <span>{err}</span>
                }
            </ErrorMessage>
        </div>
        <div>
            <label htmlFor="url">Website</label>
            <Field type="url" id="url" name="url" />
            <ErrorMessage name="url" />
        </div>
        <div>
            <label htmlFor="comment">Comment</label>
            <Field as="textarea" id="comment" name="comment" validate={commentValidate} />
            <ErrorMessage name="comment" />
        </div>
        <div>
            <label htmlFor="facebook">Facebook</label>
            <Field type="url" id="facebook" name="social.facebook" />
            <ErrorMessage name="facebook" />
        </div>
        <div>
            <label htmlFor="twitter">Twitter</label>
            <Field type="url" id="twitter" name="social.twitter" />
            <ErrorMessage name="twitter" />
        </div>
        <div>
            <label htmlFor="primaryPhone">Primary Phone</label>
            <Field type="tel" id="primaryPhone" name="phoneNumber[0]" />
            <ErrorMessage name="facebook" />
        </div>
        <div>
            <label htmlFor="secandaryPhone">Secandory Phone</label>
            <Field type="tel" id="secandaryPhone" name="phoneNumber[1]" />
            <ErrorMessage name="facebook" />
        </div>
    
        <div>
            <label htmlFor="imageUpload">Image Upload</label>
            <Field type="file" id="imageUpload" name="image" />
            <ErrorMessage name="facebook" />
        </div>
    
        <div>
            <label htmlFor="secandaryPhone">Dynamic Numbers</label>
            <FieldArray  name="phNumbers">
                {
                    (props) => {
                        const {push,remove,form:{values : {phNumbers}}} = props;
                        return <div>
                            {
                                phNumbers.map((phNumber,index) => {
                                    return(
                                        <div key={index}>
                                         <Field type="text" name={`phNumbers[${index}]`} />
                                         <button type="button" onClick={() => remove()}> - </button>
                                         <button type="button" onClick={() => push()}> + </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                }
            </FieldArray>
        </div>
        <button type="submit" disabled={!formik.isValid}>Submit</button>
    </Form>
    }
}
    </Formik>

    </>
  )
}

export default PracticeForm;