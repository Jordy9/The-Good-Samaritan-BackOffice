import React, { useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react'
import { startUpdatePetition } from '../../../action/petition'

export const PetitionModal = () => {
    const {activePetitions} = useSelector(state => state.pt)

    const [HandledInputChange, Value] = useForm(activePetitions)

    const {title, date} = Value

    const dispatch = useDispatch()

    const [state, setstate] = useState('')

    const hanldedSubmit = (e) => {
        e.preventDefault()

        dispatch(startUpdatePetition(title, date, state))
    }


    return (
        <>
            <div className="modal fade" id="exampleModal5" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content shadow bg-dark">
                        <div className="modal-header" style = {{border: 'none'}}>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div className="modal-body">
                        <div className="col-12">
                            <div className="mb-3" style = {{border: 'none'}}>
                                <h5 className="text-white text-center mt-2">Editar Bosquejo</h5>
                                <div className="card-body">
                                    <form onSubmit = {hanldedSubmit} className = 'needs-validation'>
                                        <div className="row">
                                            <div className="col form-group">
                                                <label>Título</label>
                                                <input name = 'title' type="text" onChange = {HandledInputChange} value = {title || activePetitions.title} placeholder = 'El amor del Señor' className = 'form-control bg-transparent text-white' />
                                            </div>

                                            <div className="col form-group">
                                                <label>Fecha</label>
                                                <input name = 'date' type="date" onChange = {HandledInputChange} value = {date || activePetitions.date} className = 'form-control bg-transparent text-white' />
                                            </div>
                                        </div>

                                        <div className = 'row'>
                                            <div className="col-12">
                                                <div>
                                                    <Editor
                                                        onEditorChange = {(cont) => setstate(cont)}
                                                        value = {state || activePetitions.descripcion}
                                                        content="<p>This is the initial content of the editor</p>"
                                                        init={{
                                                        plugins: 'autolink link image lists print preview',
                                                        toolbar: 'undo redo | formatselect | fontselect | fontsizeselect ' +
                                                        'bold italic backcolor | alignleft aligncenter ' +
                                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                                        'removeformat',
                                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button className = 'btn btn-outline-primary form-control mt-4'>Guardar</button>
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
