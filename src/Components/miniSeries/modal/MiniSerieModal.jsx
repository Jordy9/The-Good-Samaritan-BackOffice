import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startUpdateSerie } from '../../../action/miniSerie'
import { Editor } from '@tinymce/tinymce-react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import { sendEmail } from '../../../action/sendEmail';

export const MiniSerieModal = () => {

    const {activeSerie} = useSelector(state => state.mi)

    const {activeUser, uid} = useSelector(state => state.auth)

    const {Porcentage} = useSelector(state => state.mi)

    const dispatch = useDispatch()

    const [imag, setimag] = useState()

    const [first, setfirst] = useState()

    const {handleSubmit, getFieldProps, touched, errors, setFieldValue} = useFormik({
        initialValues: {
            title: activeSerie?.title,
            descripcion: first,
            image: ''
        },
        enableReinitialize: true,
        onSubmit: ({title, descripcion, image}) => {
            if (activeUser?.role === 'Pastor' && activeSerie?.user === uid) {

                if (image.type?.includes('image') === false) {
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
                    dispatch(startUpdateSerie(title, descripcion, image))
                    dispatch(sendEmail(title, 'Nuevo contenido'))
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
                    title: 'No tiene el privilegio de editar esta miniserie'
                  })
            }

        },
        validationSchema: Yup.object({
            title: Yup.string()
                        .max(100, 'Debe de tener 100 caracteres o menos')
                        .min(3, 'Debe de tener 3 caracteres o m??s')
                        .required('Requerido'),
            descripcion: Yup.array()
                        // .min(3, 'Debe de tener 3 caracteres o m??s')
                        .required('Requerido')
        })
    })

    const handledImage = () => {
        document.querySelector('#fileSelector').click()
      }

      useEffect(() => {
        setfirst(activeSerie?.descripcion)
      }, [activeSerie?.descripcion])
      


      const agregar = () => {
        setfirst([...first, ''])
      }
  
      const eliminar = () => {
          let newFormValues = [...first];
          newFormValues.pop();
          setfirst(newFormValues)
      }

    return (
        <>
            <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content shadow bg-dark">
                        <div className="modal-header" style = {{border: 'none'}}>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <div className="col-12">
                            <div className="mb-3" style = {{border: 'none'}}>
                                <h5 className="text-white text-center mt-2">Editar Mini Serie</h5>
                                <div className="card-body">
                                    <form onSubmit = {handleSubmit}>
                                        <div className = 'row'>
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                <div className="form-group">
                                                    <label>T??tulo</label>
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

                                            <div className="col-12">
                                                <div className="form-group d-flex justify-content-center">
                                                    {/* <img src = {imag} style = {{ cursor: 'pointer', height: '200px', maxWidth: '400px' }} className = 'img-fluid rounded' alt=''/> */}
                                                    <img src = {imag || activeSerie?.image} className="img-fluid rounded" alt="" style = {{ cursor: 'pointer', maxHeight: '225px'}} />
                                                </div> 
                                            </div>
                                        </div>

                                        <div className = 'row'>
                                            <div className="col-12">
                                                {
                                                    first?.map((element, index) => {
                                                        return (
                                                            <div className='mb-2' key={element + index}>
                                                                <Editor
                                                                    initialValue = {element}
                                                                    name = 'descripcion'
                                                                    onEditorChange = {(e) => setFieldValue(`descripcion[${index}]`, e)}
                                                                    content="<p>This is the initial content of the editor</p>"
                                                                    init={{
                                                                    plugins: 'autolink link image lists print preview',
                                                                    contextmenu: false,
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
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                            <i className="bi bi-plus-circle mx-2 text-success" onClick={agregar} style = {{fontSize: '32px', cursor: 'pointer'}}></i>
                                                {
                                                    (first?.length > 1)
                                                        &&
                                                    <i className="bi bi-x-circle mx-2 text-danger" onClick={eliminar} style = {{fontSize: '32px', cursor: 'pointer'}}></i>
                                                }
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
