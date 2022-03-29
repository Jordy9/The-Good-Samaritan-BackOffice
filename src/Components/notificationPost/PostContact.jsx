import React from 'react'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import moment from 'moment';
import tinymce from 'tinymce/tinymce';
import { Editor } from '@tinymce/tinymce-react'
import { startCreateContact } from '../../action/contact';

export const PostContact = ({notificationPost}) => {

    const dispatch = useDispatch()

    const {handleSubmit, resetForm, getFieldProps, touched, errors, setFieldValue} = useFormik({
        initialValues: {
            subject: '', 
            title: '', 
            descripcion: '',
        },
        enableReinitialize: true,
        onSubmit: ({subject, title, descripcion}) => {
            dispatch(startCreateContact(subject, title, descripcion))
            resetForm({
                subject: '', 
                title: '', 
                descripcion: tinymce.activeEditor.setContent(''),
            })
        },
        validationSchema: Yup.object({
            subject: Yup.string()
                        .max(100, 'Debe de tener 50 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            title: Yup.string()
                        .max(100, 'Debe de tener 50 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            descripcion: Yup.string()
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido')
        })
    })

  return (
    <div className="modal-body">
        <div className="col-12">
            <div className="mb-3" style = {{border: 'none'}}>
                <h5 className="text-white text-center mt-2">Responder Contacto</h5>
                <div className="card-body">
                    <form onSubmit = {handleSubmit}>
                        <div className = 'row'>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input value={notificationPost?.name} readOnly className = 'form-control bg-transparent text-white' />
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-group">
                                    <label>Fecha</label>
                                    <input value={moment(notificationPost?.date).format('MMMM Do YYYY, h:mm a')} readOnly className = 'form-control bg-transparent text-white' />
                                </div>
                            </div>
                        </div>

                        <div className = 'row'>
                            <div className="col-12">
                                <div className="form-group">
                                    <label>Correo electrónico</label>
                                    <input value={notificationPost?.email} readOnly className = 'form-control bg-transparent text-white' />
                                </div>
                            </div>
                        </div>

                        <div className = 'row'>
                            <div className="col-12">
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea readOnly style = {{resize: 'none'}} rows = '5' value={notificationPost?.descripcion} className = 'form-control bg-transparent text-white' />
                                </div>
                            </div>
                        </div>

                        <div className = 'row'>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Tema</label>
                                    <input {...getFieldProps('subject')} className = 'form-control bg-transparent text-white' />
                                    {touched.subject && errors.subject && <span style={{color: 'red'}}>{errors.subject}</span>}
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-group">
                                    <label>Título</label>
                                    <input {...getFieldProps('title')} className = 'form-control bg-transparent text-white' />
                                    {touched.title && errors.title && <span style={{color: 'red'}}>{errors.title}</span>}
                                </div>
                            </div>
                        </div>

                        <div className = 'row'>
                            <div className="col-12">
                                <div>
                                    <Editor
                                        name = 'descripcion'
                                        onEditorChange = {(e) => setFieldValue('descripcion', e)}
                                        content="<p>This is the initial content of the editor</p>"
                                        init={{
                                        plugins: 'autolink link image lists print preview',
                                        toolbar: 'undo redo | formatselect | fontselect | fontsizeselect ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                        }}
                                        // onChange={this.handleEditorChange}
                                    />
                                    {touched.descripcion && errors.descripcion && <span style={{color: 'red'}}>{errors.descripcion}</span>}
                                </div>
                            </div>
                        </div>
                        <button type='submit' className = 'btn btn-outline-primary form-control my-3'>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
