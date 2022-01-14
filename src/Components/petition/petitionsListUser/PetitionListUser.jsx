import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetPaginatePetitionUser } from '../../../action/petition';
import {PetitionModal} from '../modal/PetitionModal'
import { PetitionModalUser } from '../modal/PetitionModalUser';
import { PaginatePetitionUser } from '../paginate/PaginatePetitionUser';
import { ModalListContainerUser } from './ModalListContainer';

export const PetitionListUser = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetPaginatePetitionUser())
  }, [dispatch])


    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de Peticiones de Usuarios</h1>
          <table className="table text-white bg-dark text-center">
            <thead>
              <tr>
                <th>Título</th>
                <th>Nombre</th>
                <th>Número de teléfono</th>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <ModalListContainerUser />
            </tbody>
          </table>
             <PetitionModalUser />

             <PaginatePetitionUser />
        </>
    )
}
