import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { startCreateZoom } from '../../action/zoom'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import moment from 'moment';
import tinymce from 'tinymce/tinymce';

export const LivesZoom = () => {

    moment.locale('es')

    const newDate = moment().format('yyyy-MM-DDTHH:mm')

    const dispatch = useDispatch()

    const [imag, setimag] = useState()

    const {Zoom} = useSelector(state => state.zm)

    const zoom = Zoom[0]

    const {handleSubmit, resetForm, getFieldProps, touched, errors, setFieldValue} = useFormik({
        initialValues: {
            title: '', 
            date: '', 
            image: ''
        },
        enableReinitialize: true,
        onSubmit: ({title, date, image}) => {
            dispatch(startCreateZoom(title, moment(date).format('MMMM Do YYYY, h:mm a'), image))
            resetForm({
                title: '', 
                date: '', 
                image: document.getElementById('image').value = ''
            })
            setimag()
        },
        validationSchema: Yup.object({
            title: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            date: Yup.date()
                        .min(newDate, 'Fecha u hora incorrecta')
                        .required('Requerido'),
            image: Yup.string()
                        .required('Requerido'),
        })
    })

    return (
        <div style = {{marginTop: '70px'}} className='row'>
            <div className="col-8">
            <h1>Anunciar reunión de zoom</h1>
                <form onSubmit = {handleSubmit}>
                <div className = 'row'>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Título</label>
                            <input type="text" className = 'form-control bg-transparent text-white' {...getFieldProps('title')} />
                            {touched.title && errors.title && <span style={{color: 'red'}}>{errors.title}</span>}
                        </div>
                    </div>

                    <div className="col-5">
                        <div className="form-group">
                            <label>Imagen</label>
                            <input type="file" id='image' className='form-control bg-transparent text-white' name='image' onChange={(e) => {
                                setFieldValue('image', e.currentTarget.files[0], setimag(URL.createObjectURL(e.currentTarget.files[0]) || ''))
                            }} />
                            {touched.image && errors.image && <span style={{color: 'red'}}>{errors.image}</span>}
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="form-group">
                            <label>Fecha</label>
                            <input type="datetime-local" min = {`${newDate}`} className = 'form-control bg-transparent text-white' {...getFieldProps('date')} />
                            {touched.date && errors.date && <span style={{color: 'red'}}>{errors.date}</span>}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="form-group d-flex justify-content-center">
                            {/* <img src = {imag} style = {{ cursor: 'pointer', height: '200px', maxWidth: '400px' }} className = 'img-fluid rounded' alt=''/> */}
                            <img src = {imag || ''} className="img-fluid rounded" alt="" style = {{ cursor: 'pointer', maxHeight: '225px'}} />
                        </div> 
                    </div>
                </div>

                <button type='submit' className = 'btn btn-outline-primary form-control my-3'>Guardar</button>
                </form>
            </div>

            <div className="col-4">
                <h1>Zoom actual</h1>
                <div className = 'shadow d-flex justify-content-center align-items-center p-4 my-2 bg-dark rounded-lg flex-column'>

                <div className="person-name my-3">
                    <h3 className = 'text-white'>{zoom?.title}</h3>
                </div>

                <div className="my-3">
                    <h6 className = 'text-white'>{zoom?.date}</h6>
                </div>

                <div className="info my-3">
                    <img className='img-fluid rounded'style={{height: '350px'}} src={zoom?.image} alt="" />
                </div>

                </div>  
            </div>
        </div>
    )
}
