import { Editor } from '@tinymce/tinymce-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { startCreateYoutube } from '../../../action/youtubeImage';


export const FormYoutube = () => {

    const dispatch = useDispatch()

    const {handleSubmit, resetForm, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            title: '',
            link: '',
        },
        enableReinitialize: true,
        onSubmit: ({title, link}) => {
            dispatch(startCreateYoutube(title, link))
            resetForm({
                title: '',
                link: ''
            })
        },
        validationSchema: Yup.object({
            title: Yup.string()
                    .max(50, 'Debe de tener menos de 50 caracteres')
                    .min(3, 'Debe de tener minimo 3 caracteres')
                    .required('Requerido'),
            link: Yup.string()
                    .min(3, 'Debe de tener minimo 3 caracteres')
                    .required('Requerido')
        })
    })

    return (
        <form onSubmit = {handleSubmit}>
            <div className = 'row'>
                <div className="col">
                    <div className="form-group">
                        <label>Título</label>
                        <input type="text" className = 'form-control bg-transparent text-white' {...getFieldProps('title')} />
                        {touched.title && errors.title && <span style={{color: 'red'}}>{errors.title}</span>}
                    </div>
                </div>

                <div className="col">
                    <div className="form-group">
                        <label>Link</label>
                        <input type="text" className = 'form-control bg-transparent text-white' {...getFieldProps('link')} />
                        {touched.link && errors.link && <span style={{color: 'red'}}>{errors.link}</span>}
                    </div>
                </div>
            </div>
            <button type='submit' className = 'btn btn-outline-primary form-control my-3'>Guardar</button>
        </form>
    )
}
