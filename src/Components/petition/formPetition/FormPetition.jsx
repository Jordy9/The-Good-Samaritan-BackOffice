import React, { useState } from 'react'
import {useForm} from '../../../hooks/useForm'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch } from 'react-redux';
import { startCreatePetition } from '../../../action/petition';

export const FormPetition = () => {

    const [handledInputChange, Value] = useForm({
        title: '',
        date: '',

    })

    const {title, date} = Value

    const dispatch = useDispatch()

    const [state, setstate] = useState('')

    const hanldedSubmit = (e) => {
        e.preventDefault()

        dispatch(startCreatePetition(title, date, state))
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

                <div className="col-2">
                    <div className="form-group">
                        <label>Fecha</label>
                        <input onChange = {handledInputChange} value = {date} name = 'date' type="date" className = 'form-control' />
                    </div> 
                </div>
            </div>

            <div className = 'row'>
                <div className="col-12">
                    <div>
                        <Editor
                            onEditorChange = {(cont) => setstate(cont)}
                            value = {state}
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
