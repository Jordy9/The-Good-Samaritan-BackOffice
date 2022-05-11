import { Editor } from '@tinymce/tinymce-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreateEvento } from '../../../action/event'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import tinymce from 'tinymce/tinymce';
import Swal from 'sweetalert2';


export const FormEvent = () => {

    const {activeUser} = useSelector(state => state.auth)

    const {Porcentage} = useSelector(state => state.ev)

    const dispatch = useDispatch()

    const [imag, setimag] = useState()

    const {handleSubmit, resetForm, getFieldProps, touched, errors, setFieldValue} = useFormik({
        initialValues: {
            title: '',
            image: '',
            descripcion: ''
        },
        enableReinitialize: true,
        onSubmit: ({title, image, descripcion}) => {
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
                dispatch(startCreateEvento(title, image, descripcion))
                }
            }else {
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
                    title: 'No tiene el privilegio de crear este evento'
                  })
            }
            resetForm({
                title: '',
                image: document.getElementsByName('image').value = '',
                descripcion: tinymce.activeEditor.setContent('')
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
        <form onSubmit = {handleSubmit}>
            <div className = 'row'>
                <h5 className='text-center'>Tamaño requerido para la imagen: 1280 x 1280</h5>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="form-group">
                        <label>Título</label>
                        <input type="text" className = 'form-control bg-transparent text-white' {...getFieldProps('title')} />
                        {touched.title && errors.title && <span style={{color: 'red'}}>{errors.title}</span>}
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
                <div className="col-12">

                    {
                        (Porcentage > 0)
                            &&
                        <div className="col-12 mb-2">
                            <label className='d-flex justify-content-center'>Subiendo imagen</label>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: `${Porcentage}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{Porcentage}%</div>
                            </div>
                        </div>
                    }
                    
                    <div className="form-group d-flex justify-content-center">
                        <img src = {imag || ''} className="img-fluid rounded" alt="" style = {{ cursor: 'pointer', maxHeight: '225px'}} />
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
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:18px }', 
                            language: 'es'
                            }}
                            // onChange={this.handleEditorChange}
                        />
                        {touched.descripcion && errors.descripcion && <span style={{color: 'red'}}>{errors.descripcion}</span>}
                    </div>
                </div>
            </div>
            <button type='submit' className = 'btn btn-outline-primary form-control my-3'>Guardar</button>
        </form>
    )
}
