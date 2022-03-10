import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreateGallery } from '../../action/gallery'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Swal from 'sweetalert2';

export const GalleryImages = () => {

    const {activeUser} = useSelector(state => state.auth)

    const {Porcentage} = useSelector(state => state.ga)

    const dispatch = useDispatch()

    const [imag, setimag] = useState()

    const {handleSubmit, resetForm, getFieldProps, touched, errors, setFieldValue} = useFormik({
        initialValues: {
            title: '',
            image: ''
        },
        enableReinitialize: true,
        onSubmit: ({title, image}) => {
            if (activeUser?.role === 'Gestorcontenido' || activeUser?.role === 'Administrador') {

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
                dispatch(startCreateGallery(title, image))
                }
            } else {
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
                    title: 'No tiene el privilegio de subir esta imagen'
                  })
            }
            resetForm({
                title: '', 
                image: document.getElementsByName('image').value = ''
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
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                        <label>Título</label>
                        <input {...getFieldProps('title')} placeholder = 'El amor al Señor' type="text" className = 'form-control bg-transparent text-white' />
                    </div> 
                </div>

                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                        <label>Imagen</label>
                        <button type='button' className='btn btn-outline-primary form-control' onClick={handledImage}>Seleccionar imagen</button>
                        <input accept="image/*" id='fileSelector' hidden = {true} type="file" className='form-control bg-transparent text-white' name='image' onChange={(e) => {
                            setFieldValue('image', e.currentTarget.files[0], (e.currentTarget.files[0]) ? setimag(URL.createObjectURL(e.currentTarget.files[0]) || '') : setimag())
                        }} />
                        {touched.image && errors.image && <span style={{color: 'red'}}>{errors.image}</span>}
                    </div> 
                </div>
            </div>

            <div className="row">

                {
                    (Porcentage > 0)
                        &&
                    <div className="col-12 mb-2">
                        <label className='d-flex justify-content-center'>Subiendo imagen</label>
                        <div class="progress">
                            <div className="progress-bar" role="progressbar" style={{width: `${Porcentage}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{Porcentage}%</div>
                        </div>
                    </div>
                }
                
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
