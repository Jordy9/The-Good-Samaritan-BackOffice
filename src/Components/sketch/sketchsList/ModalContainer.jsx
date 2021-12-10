import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { SetActiveBosquejo, startDeleteBosquejo } from '../../../action/sketch'

export const ModalContainer = (props) => {

  const {title, date, descripcion, image} = props

    const dispatch = useDispatch()

    const handledSet = () => {
      dispatch(SetActiveBosquejo(props))
    }

    const Handleddelete = () => {
      dispatch(SetActiveBosquejo(props))
        Swal.fire({
          title: '¿Esta seguro que desea eliminar este usuario?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(startDeleteBosquejo())
            Swal.fire(
              'Eliminado!',
              'Usuario eliminado exitosamente',
              'success'
            )
          }
        })
      }
    return (
        <>
          <tr>
              <th>{title}</th>
              <td>{date}</td>
              <td>{descripcion}</td>
              <td><img src = {image} alt="" style = {{height: '60px', width: '60px'}} /></td>
              <td>
                  <button onClick = {handledSet} className = 'btn btn-outline-primary mr-1 mt-2' data-bs-toggle="modal" data-bs-target="#exampleModal4" style = {{borderRadius: '100%'}}><i className="bi bi-eye" style = {{color: '#0D6EFD'}}></i></button>
                  <button onClick = {Handleddelete} className = 'btn btn-outline-danger ml-1 mt-2' style = {{borderRadius: '100%'}}><i className="bi bi-trash" style = {{color: 'red'}}></i></button>
              </td>
          </tr>
        </>
    )
}
