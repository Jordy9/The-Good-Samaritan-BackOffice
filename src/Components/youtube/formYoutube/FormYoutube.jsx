import React from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { startCreateYoutube } from '../../../action/youtubeImage';
import moment from 'moment';


export const FormYoutube = () => {

    const newDate = moment().format('yyyy-MM-DDTHH:mm')

    const dispatch = useDispatch()

    const {handleSubmit, resetForm, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            title: '',
            date: '',
            link: '',
        },
        enableReinitialize: true,
        onSubmit: ({title, date, link}) => {
            dispatch(startCreateYoutube(title, date, link))
            resetForm({
                title: '',
                date: '',
                link: ''
            })
        },
        validationSchema: Yup.object({
            title: Yup.string()
                    .max(50, 'Debe de tener menos de 50 caracteres')
                    .min(3, 'Debe de tener minimo 3 caracteres')
                    .required('Requerido'),
            date: Yup.date()
                    .min(newDate, 'Fecha u hora incorrecta')
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
                        <label>Fecha</label>
                        <input type="datetime-local" min={`${newDate}`} className = 'form-control bg-transparent text-white' {...getFieldProps('date')} />
                        {touched.date && errors.date && <span style={{color: 'red'}}>{errors.date}</span>}
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
