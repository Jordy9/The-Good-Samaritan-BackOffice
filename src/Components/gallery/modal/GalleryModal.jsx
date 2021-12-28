import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startUpdateGallery } from '../../../action/gallery'
import { useFormik } from 'formik';
import * as Yup from 'yup'

export const GalleryModal = () => {
    const {activeGallery} = useSelector(state => state.ga)

    const dispatch = useDispatch()

    const [imag, setimag] = useState()

    const {handleSubmit, getFieldProps, touched, errors, setFieldValue} = useFormik({
        initialValues: {
            title: activeGallery?.title,
            image: '',
            height: activeGallery?.height,
            width: activeGallery?.width
        },
        enableReinitialize: true,
        onSubmit: ({title, image, height, width}) => {
            dispatch(startUpdateGallery(title, image, height, width))
        },
        validationSchema: Yup.object({
            title: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o más')
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
        <>
            <div className="modal fade" id="exampleModal8" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content shadow bg-dark">
                        <div className="modal-header" style = {{border: 'none'}}>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <div className="col-12">
                            <div className="mb-3" style = {{border: 'none'}}>
                                <h5 className="text-white text-center mt-2">Editar imagen de la galería</h5>
                                <div className="card-body">
                                    <form onSubmit = {handleSubmit} className = 'needs-validation'>
                                        <div className="row">
                                            <div className="col form-group">
                                                <label>Título</label>
                                                <input {...getFieldProps('title')} placeholder = 'El amor al Señor' type="text" className = 'form-control bg-transparent text-white' />
                                                {touched.title && errors.title && <span style={{color: 'red'}}>{errors.title}</span>}
                                            </div>

                                            <div className="col-5">
                                                <div className="form-group">
                                                    <label>Imagen</label>
                                                    <input type="file" className='form-control bg-transparent text-white' name='image' onChange={(e) => {
                                                        setFieldValue('image', e.currentTarget.files[0], setimag(URL.createObjectURL(e.currentTarget.files[0]) || ''))
                                                    }} />
                                                    {touched.image && errors.image && <span style={{color: 'red'}}>{errors.image}</span>}
                                                </div> 
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label>Altura</label>
                                                    <input {...getFieldProps('height')} type="number" className = 'form-control bg-transparent text-white' />
                                                    {touched.height && errors.height && <span style={{color: 'red'}}>{errors.height}</span>}
                                                </div> 
                                            </div>

                                            <div className="col-6">
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
                                                    <img src = {imag || activeGallery.image || ''} className="img-fluid rounded" alt="" style = {{ cursor: 'pointer', maxHeight: '225px'}} />
                                                </div> 
                                            </div>
                                        </div>

                                        <button type='submit' className = 'btn btn-outline-primary form-control mt-4'>Guardar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
