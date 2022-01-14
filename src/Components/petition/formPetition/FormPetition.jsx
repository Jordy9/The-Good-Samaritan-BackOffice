import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch } from 'react-redux';
import { startCreatePetition } from '../../../action/petition';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import moment from 'moment';
import tinymce from 'tinymce/tinymce';


export const FormPetition = () => {

    const newDate = moment().format('yyyy-MM-DDTHH:mm')

    const dispatch = useDispatch()

    const {handleSubmit, resetForm, getFieldProps, touched, errors, setFieldValue} = useFormik({
        initialValues: {
            title: '', 
            date: '', 
            descripcion: ''
        },
        enableReinitialize: true,
        onSubmit: ({title, date, descripcion}) => {
            dispatch(startCreatePetition(title, date, descripcion))
            resetForm({
                title: '', 
                date: '', 
                descripcion: tinymce.activeEditor.setContent(''),
            })
        },
        validationSchema: Yup.object({
            title: Yup.string()
                        .max(50, 'Debe de tener 50 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido'),
            date: Yup.date()
                        .min(newDate, 'Fecha u hora incorrecta')
                        .required('Requerido'),
            descripcion: Yup.string()
                        .min(3, 'Debe de tener 3 caracteres o más')
                        .required('Requerido')
        })
    })

    return (
        <>
            <form onSubmit = {handleSubmit}>
                <div className = 'row'>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Título</label>
                            <input type="text" className = 'form-control bg-transparent text-white' {...getFieldProps('title')} />
                            {touched.title && errors.title && <span style={{color: 'red'}}>{errors.title}</span>}
                        </div>
                    </div>

                    <div className="col-3">
                        <div className="form-group">
                            <label>Fecha</label>
                            <input type="datetime-local" min={`${newDate}`} className = 'form-control bg-transparent text-white' {...getFieldProps('date')} />
                            {touched.date && errors.date && <span style={{color: 'red'}}>{errors.date}</span>}
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
                <button type='submit' className = 'btn btn-outline-primary form-control my-3'>Guardar</button>
            </form>
        </>
    )
}