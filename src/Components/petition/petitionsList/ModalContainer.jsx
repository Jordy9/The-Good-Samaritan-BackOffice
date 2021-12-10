import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { SetActiveSerie, startDeleteSerie } from '../../../action/miniSerie'
import { SetActivePetition, startDeletePetition } from '../../../action/petition'

export const ModalContainer = (props) => {

  const {title, date, descripcion} = props

    const dispatch = useDispatch()

    const handledSet = () => {
      dispatch(SetActivePetition(props))
      console.log(props)
    }

    const Handleddelete = () => {
      dispatch(SetActivePetition(props))
        Swal.fire({
          title: '¿Esta seguro que desea eliminar este usuario?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(startDeletePetition())
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
              <td>
                  <button onClick = {handledSet} className = 'btn btn-outline-primary mr-1 mt-2' data-bs-toggle="modal" data-bs-target="#exampleModal5" style = {{borderRadius: '100%'}}><i className="bi bi-eye" style = {{color: '#0D6EFD'}}></i></button>
                  <button onClick = {Handleddelete} className = 'btn btn-outline-danger ml-1 mt-2' style = {{borderRadius: '100%'}}><i className="bi bi-trash" style = {{color: 'red'}}></i></button>
              </td>
          </tr>
        </>
    )
}
