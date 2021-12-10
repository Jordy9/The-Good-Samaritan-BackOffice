import React from 'react'
import { ModalListContainer } from './ModalListContainer';

export const UserList = () => {

    return (
        <>
          <table className="table text-white bg-dark text-center">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo Electrónico</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <ModalListContainer />
            </tbody>
          </table>
        </>
    )
}
