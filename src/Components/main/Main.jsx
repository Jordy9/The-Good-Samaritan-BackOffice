import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startCreateMain } from '../../action/main'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Swal from 'sweetalert2';

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
            if (image.type.includes('image') === false) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  return Toast.fire({
                    icon: 'error',
                    title: 'Imagen con formato incorrecto'
                  })
            } else {
            dispatch(startCreateMain(title, descripcion, image))
            }
            resetForm({
                title: '', 
                image: document.getElementsByName('image').value = '',
                descripcion: ''
            })
            setimag()
        },
        validationSchema: Yup.object({
            image: Yup.string()
                        .required('Requerido'),
        })
    })

    const handledImage = () => {
        document.querySelector('#fileSelector').click()
      }

    return (
        <>
        <h1 style={{marginTop: '70px'}}>Carrusel Principal</h1>
        <form onSubmit = {handleSubmit}>
            <div className = 'row'>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                    <div className="form-group">
                        <label>Título</label>
                        <input type="text" className = 'form-control bg-transparent text-white' {...getFieldProps('title')} />
                    </div>
                </div>

                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-5 col-xl-5">
                    <div className="form-group">
                        <label>Imagen</label>
                        <button type='button' className='btn btn-outline-primary form-control' onClick={handledImage}>Seleccionar imagen</button>
                        <input accept="image/*" id='fileSelector' hidden = {true} type="file" className='form-control bg-transparent text-white' name='image' onChange={(e) => {
                            setFieldValue('image', e.currentTarget.files[0], (e.currentTarget.files[0]) ? setimag(URL.createObjectURL(e.currentTarget.files[0]) || '') : setimag())
                        }} />
                        {touched.image && errors.image && <span style={{color: 'red'}}>{errors.image}</span>}
                    </div>
                </div>

                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-3">
                    <div className="form-group">
                        <label>Descripción</label>
                        <input type="text" className = 'form-control bg-transparent text-white' {...getFieldProps('descripcion')} />
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
