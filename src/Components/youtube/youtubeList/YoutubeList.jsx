import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetYoutube } from '../../../action/youtubeImage';
import { YoutubeModal } from '../modal/YoutubeModal';
import { ModalListContainer } from './ModalListContainer';

export const YoutubeList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetYoutube())

  }, [dispatch])

    return (
        <>
          <h1 style = {{marginTop: '70px'}}>Listado de links de videos</h1>
          <table className="table text-white bg-dark text-center">
            <thead>
              <tr>
                <th>Título</th>
                <th>Link</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <ModalListContainer />
            </tbody>
          </table>

             <YoutubeModal />
        </>
    )
}
