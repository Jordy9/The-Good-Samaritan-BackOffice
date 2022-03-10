import React, { useState } from 'react'
import { Pagination } from '../../pagination/Pagination';
import { ModalListContainer } from './ModalListContainer';

export const UserList = () => {

    const [currentPage, setCurrentPage] = useState(0)

    return (
        <div className='table-responsive'>
          <table className="table text-white bg-dark text-center">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo Electrónico</th>
                <th>País</th>
                <th>Rol</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <ModalListContainer currentPage = {currentPage} />
            </tbody>
          </table>

          <Pagination setCurrentPage = {setCurrentPage} />
        </div>
    )
}
