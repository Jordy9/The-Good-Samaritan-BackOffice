import React, { useEffect } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationsPost } from '../../action/auth'
import { useHistory } from 'react-router-dom'
import { UpdateNotifications } from '../../action/notificationsAdmin'

export const NotificationResponsive = () => {

    const {uid} = useSelector(state => state.auth)
    const {socket} = useSelector(state => state.sk)

    const dispatch = useDispatch()

    const history = useHistory()

    const {notificaciones} = useSelector(state => state.nu)

    useEffect(() => {

        let isMountede = true
        socket?.on('notifications-user', (users) => {

            if (isMountede) {
                dispatch(UpdateNotifications(true))
            }
        })

        return () => {
            isMountede = false
        }
    }, [socket, dispatch, uid])

    const setNotify = (noti) => {
        dispatch(setNotificationsPost(noti))
        history.push(`/NotificationPost/${noti._id}`)
    }

  return (
    <div style={{marginTop: '30px'}} className='container'>
        <h1>Notificaciones</h1>
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div style={{overflowY: 'auto'}}>
                    {
                        notificaciones?.map((notifications, index) => {
                            return (
                                <div style={{cursor: 'pointer'}} onClick={() => setNotify(notifications)} className='shadow my-2 bg-dark p-3 flex-column' key={notifications+ index}>
                                    <h6 className='text-white text-center'>{notifications.subtitle}</h6>
                                    <div className="row">
                                        {
                                            (notifications.image)
                                                ?
                                            <>
                                                <div className="col-8">
                                                    <h5 className='text-white'>
                                                        {
                                                        (notifications.title.length > 15)
                                                            ?
                                                            notifications.title.slice(0, 20) + '...'
                                                            :
                                                        notifications.title
                                                        }
                                                    </h5>
                                                </div>
                                            
                                                <div className="col-4 d-flex justify-content-end">
                                                    <img className='img-fluid' style={{width: '50px', height: '50px'}} src={notifications.image} alt="" />    
                                                </div>
                                            </>
                                            :
                                            <div className="col-12">
                                                <h4 className='text-white'>
                                                    {
                                                        notifications.title
                                                    }
                                                </h4>
                                            </div>
                                        }
                                    </div>
                                    <span style={{fontSize: '14px'}} className='text-white'>{moment(notifications.createdAt).fromNow()}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
