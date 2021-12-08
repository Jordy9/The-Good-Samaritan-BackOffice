import React, { useState } from 'react'
import {useForm} from '../../../hooks/useForm'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch } from 'react-redux';
import { startCreateMiniSerie, startUpdateSerie } from '../../../action/miniSerie';
import { useSelector } from 'react-redux';

export const FormSeries = () => {

    const {activeSerie} = useSelector(state => state.mi)

    const [handledInputChange, Value] = useForm(activeSerie || {
        title: '',
        date: '',

    })

    const {title, date} = Value

    const [fileupload, setFileUpload] = useState()

    const dispatch = useDispatch()

    const [state, setstate] = useState('')

    const [imag, setimag] = useState()

    const handledFileXhange = (e) => {
        const reader = new FileReader()
        const file = e.target.files[0]


        reader.readAsDataURL(file)
        setimag(URL.createObjectURL(file) || '')

        if (file) {
            setFileUpload(file)
        }
        
    }

    const hanldedSubmit = (e) => {
        e.preventDefault()

        if (activeSerie) {
            dispatch(startUpdateSerie(title, date, state, fileupload))
        } else {
            dispatch(startCreateMiniSerie(title, date, state, fileupload))
        }
    }


    return (
        <>
        <form onSubmit = {hanldedSubmit}>
            <div className = 'row'>
                <div className="col-3">
                    <div className="form-group">
                        <label>Título</label>
                        <input onChange = {handledInputChange} value = {title} placeholder = 'El amor al Señor' name = 'title' type="text" className = 'form-control' />
                    </div> 
                </div>

                <div className="col-5">
                    <div className="form-group">
                        <label>Imagen</label>
                        <input onChange = {handledFileXhange} type="File" className = 'form-control' />
                    </div> 
                </div>

                <div className="col-2">
                    <div className="form-group">
                        <label>date</label>
                        <input onChange = {handledInputChange} value = {date} name = 'date' type="date" className = 'form-control' />
                    </div> 
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="form-group  d-flex justify-content-center">
                        {/* <img src = {imag} style = {{ cursor: 'pointer', height: '200px', maxWidth: '400px' }} className = 'img-fluid rounded' alt=''/> */}
                        <img src = {imag || activeSerie.image || ''} className="img-fluid rounded" alt="" style = {{ cursor: 'pointer', maxHeight: '225px'}} />
                    </div> 
                </div>
            </div>

            <div className = 'row'>
                <div className="col-12">
                    <div>
                        <Editor
                            initialValue = {activeSerie.descripcion || ''}
                            onEditorChange = {(cont) => setstate(cont)}
                            value = {state || activeSerie.descripcion}
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
                    </div>
                </div>
            </div>
            <button className = 'btn btn-outline-primary form-control my-3'>Guardar</button>
        </form>
        </>
    )
}
