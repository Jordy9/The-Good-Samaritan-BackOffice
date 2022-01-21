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
            image: ''
        },
        enableReinitialize: true,
        onSubmit: ({title, image}) => {
            dispatch(startCreateGallery(title, image))
            resetForm({
                title: '', 
                image: document.getElementById('image').value = ''
            })
            setimag()
        },
        validationSchema: Yup.object({
            image: Yup.string()
                        .required('Requerido')
        })
    })

    const handledImage = () => {
        document.querySelector('#fileSelector').click()
      }

    return (
        <form onSubmit = {handleSubmit}>
            <h1 style={{marginTop: '70px'}}>Galería</h1>
            <div className = 'row my-5'>
                <div className="col-6">
                    <div className="form-group">
                        <label>Título</label>
                        <input {...getFieldProps('title')} placeholder = 'El amor al Señor' type="text" className = 'form-control bg-transparent text-white' />
                    </div> 
                </div>

                <div className="col-6">
                    <div className="form-group">
                        <label>Imagen</label>
                        <button type='button' className='btn btn-outline-primary form-control' onClick={handledImage}>Seleccionar imagen</button>
                        <input id='fileSelector' hidden = {true} type="file" className='form-control bg-transparent text-white' name='image' onChange={(e) => {
                            setFieldValue('image', e.currentTarget.files[0], (e.currentTarget.files[0]) ? setimag(URL.createObjectURL(e.currentTarget.files[0]) || '') : setimag())
                        }} />
                        {touched.image && errors.image && <span style={{color: 'red'}}>{errors.image}</span>}
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
