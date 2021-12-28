import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetPetitions } from '../../../action/petition';
import { ContactModal } from '../modal/ContactModal';
import { ModalListContainer } from './ModalListContainer';

export const ContactList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetPetitions())
  }, [dispatch])


    return (
        <>
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
          </>
    )
}
