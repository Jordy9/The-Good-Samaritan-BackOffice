import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetPetitions } from '../../../action/petition';
import {PetitionModal} from '../modal/PetitionModal'
import { PetitionModalUser } from '../modal/PetitionModalUser';
import { ModalListContainerUser } from './ModalListContainer';

export const PetitionListUser = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetPetitions())
  }, [dispatch])


    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de Peticiones</h1>
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
        </>
    )
}
