import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetPaginateContact } from '../../../action/contact';
import { ContactModal } from '../modal/ContactModal';
import { PaginateContact } from '../paginate/PaginateContact';
import { ModalListContainer } from './ModalListContainer';

export const ContactList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetPaginateContact())
  }, [dispatch])


    return (
        <div className='table-responsive'>
          <table className="table text-white bg-dark text-center">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo electrónico</th>
                <th>Descripción</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <ModalListContainer />
            </tbody>
          </table>

             <ContactModal />

             <PaginateContact />
          </div>
    )
}
