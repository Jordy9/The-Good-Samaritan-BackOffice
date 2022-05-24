import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { PostPetition } from './PostPetition'
import { PostContact } from './PostContact'

export const NotificationPost = () => {
    const history = useHistory()

    const {notificationPost} = useSelector(state => state.auth)

    useEffect(() => {
      if (notificationPost === '') {
        history.push('/Dashboard')
      }
    }, [notificationPost])
    
  return (
    <div className="modal-body" style={{marginTop: '30px'}}>
        <div className="shadow bg-dark p-3 rounded">
            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              {
                (notificationPost.subtitle === 'Nueva petición de oración agregada de un: ' || notificationPost.subtitle === 'Nueva petición de oración de usuario agregada')
                  &&
                <PostPetition notificationPost = {notificationPost?.content} />
              }

              {
                (notificationPost.subtitle === 'Nuevo contacto agregado de: ')
                  &&
                <PostContact notificationPost = {notificationPost?.content} />
              }
            </div> 
        </div>
    </div>
  )
}
