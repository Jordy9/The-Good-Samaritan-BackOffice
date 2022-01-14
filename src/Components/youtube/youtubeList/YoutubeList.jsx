import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { startGetPaginateYoutube } from '../../../action/youtubeImage';
import { YoutubeModal } from '../modal/YoutubeModal';
import { PaginateYoutube } from '../paginate/PaginateYoutube';
import { ModalListContainer } from './ModalListContainer';

export const YoutubeList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startGetPaginateYoutube())

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

             <PaginateYoutube />
        </>
    )
}
