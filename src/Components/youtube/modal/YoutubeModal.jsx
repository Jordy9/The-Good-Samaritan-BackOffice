import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { startUpdateYoutube } from '../../../action/youtubeImage';

export const YoutubeModal = () => {

    const {activeYoutube} = useSelector(state => state.yt)

    const dispatch = useDispatch()

    const {handleSubmit, resetForm, getFieldProps, touched, errors} = useFormik({
        initialValues: {
            title: activeYoutube?.title, 
            date: activeYoutube?.date,
            link: activeYoutube?.urlImage
        },
        enableReinitialize: true,
        onSubmit: ({title, date, link}) => {
            dispatch(startUpdateYoutube(title, date, link))
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
            // date: Yup.date()
            //         .required('Requerido'),
            link: Yup.string()
                    .min(3, 'Debe de tener minimo 3 caracteres')
                    .required('Requerido')
        })
    })

    return (
        <>
            <div className="modal fade" id="exampleModal12" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content shadow bg-dark">
                        <div className="modal-header" style = {{border: 'none'}}>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <div className="col-12">
                            <div className="mb-3" style = {{border: 'none'}}>
                                <h5 className="text-white text-center mt-2">Editar Video</h5>
                                <div className="card-body">
                                <form onSubmit = {handleSubmit}>
                                        <div className = 'row'>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label>Título</label>
                                                    <input type="text" className = 'form-control bg-transparent text-white' {...getFieldProps('title')} />
                                                    {touched.title && errors.title && <span style={{color: 'red'}}>{errors.title}</span>}
                                                </div>
                                            </div>

                                            <div className="col-3">
                                                <div className="form-group">
                                                    <label>Fecha</label>
                                                    <input type="datetime-local" className = 'form-control bg-transparent text-white' {...getFieldProps('date')} />
                                                    {touched.date && errors.date && <span style={{color: 'red'}}>{errors.date}</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label>Link</label>
                                                    <input type="text" className = 'form-control bg-transparent text-white' {...getFieldProps('link')} />
                                                    {touched.link && errors.link && <span style={{color: 'red'}}>{errors.link}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <button type='submit' className = 'btn btn-outline-primary form-control my-3'>Guardar</button>
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
