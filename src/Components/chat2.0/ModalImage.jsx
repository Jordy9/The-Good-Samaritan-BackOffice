import React from 'react'

export const ModalImage = ({image, perfil, user}) => {

    const CountryOnly = user[0]?.country?.split(',')

  return (
    <div className="modal fade" id="exampleModalImageChatUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content shadow bg-dark">
                <div className="modal-header" style = {{border: 'none'}}>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
            <div className="modal-body d-flex justify-content-center">
                <div className="row">
                    <div className="col-12">
                        
                        <img className='image-round' src = {image || perfil} style = {{objectFit: 'cover', width: '100%', height: '350px'}} alt="" />

                        <div className="row mt-5">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 form-group">
                                <label>Nombre</label>
                                <input readOnly type="text" value={user[0].name} className = 'form-control bg-transparent text-white' />
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 form-group">
                                <label>Apellido</label>
                                <input readOnly type="text" value={user[0].lastName} className = 'form-control bg-transparent text-white' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 form-group">
                                <label>Edad</label>
                                <input readOnly type="text" value={user[0].age} className = 'form-control bg-transparent text-white' />
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 form-group">
                                <label>Fecha de nacimiento</label>
                                <input readOnly type="text" value={user[0].date} className = 'form-control bg-transparent text-white' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 form-group">
                                <label>Dirección</label>
                                <input readOnly type="text" value={user[0].address} className = 'form-control bg-transparent text-white' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 form-group">
                                <label>Correo electrónico</label>
                                <input readOnly type="text" value={user[0].email} className = 'form-control bg-transparent text-white' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 form-group">
                                <label>País</label>
                                <input readOnly type="text" value={CountryOnly[1]} className = 'form-control bg-transparent text-white' />
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 form-group">
                                <label>Ciudad</label>
                                <input readOnly type="text" value={user[0].city} className = 'form-control bg-transparent text-white' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 form-group">
                                <label>Número de teléfono</label>
                                <input readOnly type="text" value={user[0].number} className = 'form-control bg-transparent text-white' />
                            </div>
                        </div>

                        {
                            (user[0].biliever)
                                &&
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 form-group">
                                    <input readOnly type="text" value = 'Es nuevo creyente' className = 'form-control bg-transparent text-white' />
                                </div>

                            {
                                (user[0].discipleship)
                                    &&
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 form-group">
                                    <input readOnly type="text" value = 'Desea hacer discipulado' className = 'form-control bg-transparent text-white' />
                                </div>
                            }

                            </div>
                        }

                        {
                            (user[0].tracking)
                                &&
                            <div className="row">
                                <div className="col-12 form-group">
                                    <input readOnly type="text" value = 'Desea seguimiento' className = 'form-control bg-transparent text-white' />
                                </div>
                            </div>
                        }

                        {
                            (user[0].noBeleaver)
                                &&
                            <div className="row">
                                <div className="col-12 form-group">
                                    <input readOnly type="text" value = 'Aún no le da dado su vida al Señor' className = 'form-control bg-transparent text-white' />
                                </div>
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}
