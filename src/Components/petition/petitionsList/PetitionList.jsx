import React from 'react'
import {PetitionModal} from '../modal/PetitionModal'
import { ModalListContainer } from './ModalListContainer';

export const PetitionList = () => {

    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de Peticiones</h1>
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

             <PetitionModal />
        </>
    )
}
