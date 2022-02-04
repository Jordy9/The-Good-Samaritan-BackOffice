import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetPaginatePetitions } from '../../../action/petition';
import {PetitionModal} from '../modal/PetitionModal'
import { PaginatePetition } from '../paginate/PaginatePetition';
import { ModalListContainer } from './ModalListContainer';

export const PetitionList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetPaginatePetitions())
  }, [dispatch])


    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de Peticiones</h1>
          <div className="table-responsive">
            <table className="table text-white bg-dark text-center">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <ModalListContainer />
              </tbody>
            </table>
          </div>

             <PetitionModal />

             <PaginatePetition />
        </>
    )
}
