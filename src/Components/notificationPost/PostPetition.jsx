import React from 'react'
import moment from 'moment'

export const PostPetition = ({notificationPost}) => {
  return (
    <div className="modal-body">
        <div className="col-12">
            <div className="mb-3" style = {{border: 'none'}}>
                <h5 className="text-white text-center mt-2">Petición</h5>
                <div className="card-body">
                        <div className = 'row'>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Título</label>
                                    <input readOnly className = 'form-control bg-transparent text-white' value={notificationPost?.title} />
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-group">
                                    <label>Fecha</label>
                                    <input readOnly className = 'form-control bg-transparent text-white' value={moment(notificationPost?.date).format('MMMM Do YYYY, h:mm a')} />
                                </div>
                            </div>
                        </div>

                        <div className = 'row'>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input readOnly className = 'form-control bg-transparent text-white' value={notificationPost?.name} />
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-group">
                                    <label>Número de teléfono</label>
                                    <input readOnly className = 'form-control bg-transparent text-white' value={notificationPost?.number} />
                                </div>
                            </div>
                        </div>

                        <div className = 'row'>
                            <div className="col-12">
                                <div>
                                    <textarea style = {{resize: 'none'}} readOnly rows = '5' className = 'form-control bg-transparent text-white' value={notificationPost?.descripcion} />
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}
