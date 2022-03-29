import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { startGetPaginateBosquejos } from '../../../action/sketch';
import { ModalBeleaver } from '../modal/ModalBeleaver';
import { ModalListContainer } from './ModalListContainer';

export const BeleaverList = () => {

  const dispatch = useDispatch()

    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de información para nuevos creyentes</h1>
          <div className="table-responsive">
            <table className="table text-white bg-dark text-center">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Imagen</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <ModalListContainer />
              </tbody>
            </table>
          </div>

             <ModalBeleaver />
        </>
    )
}
