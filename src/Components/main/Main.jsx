import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startCreateMain } from '../../action/main'
import { useFormik } from 'formik';
import * as Yup from 'yup'

export const Main = () => {

    const dispatch = useDispatch()

    const [imag, setimag] = useState()


    const {handleSubmit, resetForm, getFieldProps, touched, errors, setFieldValue} = useFormik({
        initialValues: {
            title: '', 
            image: '',
            descripcion: ''
        },
        enableReinitialize: true,
        onSubmit: ({title, descripcion, image}) => {
            dispatch(startCreateMain(title, descripcion, image))
            resetForm({
                title: '', 
                image: document.getElementById('image').value = '',
                descripcion: ''
            })
            setimag()
        },
        validationSchema: Yup.object({
            title: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            descripcion: Yup.string()
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            image: Yup.string()
                        .required('Requerido'),
        })
    })

    return (
        <>
        <h1 style={{marginTop: '70px'}}>Carrusel Principal</h1>
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

                <div className="col-2">
                    <div className="form-group">
                        <label>Descripción</label>
                        <input type="text" className = 'form-control bg-transparent text-white' {...getFieldProps('descripcion')} />
                        {touched.descripcion && errors.descripcion && <span style={{color: 'red'}}>{errors.descripcion}</span>}
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
        </>
    )
}
