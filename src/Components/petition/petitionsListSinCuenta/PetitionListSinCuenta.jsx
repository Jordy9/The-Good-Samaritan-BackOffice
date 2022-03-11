import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetPaginatePetitionSinCuenta } from '../../../action/petition';
import { PetitionModalSinCuenta } from '../modal/PetitionModalSinCuenta';
import { PaginatePetitionSinCuenta } from '../paginate/PaginatePetitionSinCuenta';
import { ModalListContainerSinCuenta } from './ModalListContainer';

export const PetitionListSinCuenta = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetPaginatePetitionSinCuenta())
  }, [dispatch])


    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de Peticiones de oración de usuarios sin cuenta</h1>
          <div className="table-responsive">
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
                <ModalListContainerSinCuenta />
              </tbody>
            </table>
          </div>
             <PetitionModalSinCuenta />

             <PaginatePetitionSinCuenta />
        </>
    )
}
