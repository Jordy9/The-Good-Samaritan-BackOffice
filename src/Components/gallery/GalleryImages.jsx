import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startCreateGallery } from '../../action/gallery'
import { useFormik } from 'formik';
import * as Yup from 'yup'

export const GalleryImages = () => {

    const dispatch = useDispatch()

    const [imag, setimag] = useState()

    const {handleSubmit, resetForm, getFieldProps, touched, errors, setFieldValue} = useFormik({
        initialValues: {
            title: '',
            image: '',
            height: 1,
            width: 1
        },
        enableReinitialize: true,
        onSubmit: ({title, image, height, width}) => {
            dispatch(startCreateGallery(title, image, height, width))
            resetForm({
                title: '', 
                image: document.getElementById('image').value = '',
                height: 0,
                width: 0
            })
            setimag()
        },
        validationSchema: Yup.object({
            title: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            image: Yup.string()
                        .required('Requerido'),
            height: Yup.number()
                        .min(1, 'La altura no puede ser menor a 1')
                        .required('Requerido'),
            width: Yup.number()
                        .min(1, 'El ancho no puede ser menor a 1')
                        .required('Requerido'),
        })
    })

    return (
        <form onSubmit = {handleSubmit}>
            <h1 style={{marginTop: '70px'}}>Galería</h1>
            <div className="row my-5">
                <div className="col d-flex justify-content-center">
                    <span>Si desea una imagen para toda una fila, por favor digite 4927 de ancho y 1000 de alto</span>
                </div>

                <div className="col d-flex justify-content-center">
                    <span>Para una imagen que ocupe solo la columna de una fila puede usar los valores del 1 al 4</span>                </div>
            </div>
            <div className = 'row'>
                <div className="col-3">
                    <div className="form-group">
                        <label>Título</label>
                        <input {...getFieldProps('title')} placeholder = 'El amor al Señor' type="text" className = 'form-control bg-transparent text-white' />
                        {touched.title && errors.title && <span style={{color: 'red'}}>{errors.title}</span>}
                    </div> 
                </div>

                <div className="col-3">
                    <div className="form-group">
                        <label>Imagen</label>
                        <input type="file" id='image' className='form-control bg-transparent text-white' name='image' onChange={(e) => {
                            setFieldValue('image', e.currentTarget.files[0], setimag(URL.createObjectURL(e.currentTarget.files[0]) || ''))
                        }} />
                        {touched.image && errors.image && <span style={{color: 'red'}}>{errors.image}</span>}
                    </div> 
                </div>

                <div className="col-3">
                    <div className="form-group">
                        <label>Altura</label>
                        <input {...getFieldProps('height')} type="number" className = 'form-control bg-transparent text-white' />
                        {touched.height && errors.height && <span style={{color: 'red'}}>{errors.height}</span>}
                    </div> 
                </div>

                <div className="col-3">
                    <div className="form-group">
                        <label>Ancho</label>
                        <input {...getFieldProps('width')} type="number" className = 'form-control bg-transparent text-white' />
                        {touched.width && errors.width && <span style={{color: 'red'}}>{errors.width}</span>}
                    </div> 
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="form-group  d-flex justify-content-center">
                        {/* <img src = {imag} style = {{ cursor: 'pointer', height: '200px', maxWidth: '400px' }} className = 'img-fluid rounded' alt=''/> */}
                        <img src = {imag || ''} className="img-fluid rounded" alt="" style = {{ cursor: 'pointer', maxHeight: '225px'}} />
                    </div> 
                </div>
            </div>
            <button type='submit' className = 'btn btn-outline-primary form-control my-3'>Guardar</button>
        </form>
    )
}
