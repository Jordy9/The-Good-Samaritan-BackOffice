import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { NotificationPublicAdmin } from '../action/auth';
import { UsuariosCargados } from '../action/chat';
import { cargarContactos } from '../action/contact';
import { BorrarNotificaciones, NotificacionesCargadas } from '../action/notifications';
import { cargarPeticiones, cargarPeticionesPastores, cargarPeticionesSinCuenta, startGetPaginatePetitions, startGetPaginatePetitionUser } from '../action/petition';


export const useSocket = ( serverPath ) => {

    const token = localStorage.getItem('token')

    const dispatch = useDispatch()
    
    const [ socket, setSocket ] = useState(null);
    const [ online, setOnline ] = useState(false);

    const conectarSocket = useCallback(
        () => {
           const socketTemp = io.connect( serverPath, {
                transports: ['websocket'],
                autoConnect: true,
                forceNew: true,
                query: {
                    'x-token': token
                }
            } )

           setSocket(socketTemp)
        }, [serverPath, token])

    const desconectarSocket = useCallback(
        () => {
            socket?.disconnect()
        }, [socket])

    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('lista-usuariosUser', (usuarios) => {
            dispatch(UsuariosCargados(usuarios))
        })
    }, [ socket, dispatch ])

    useEffect(() => {
        socket?.on('lista-notificaciones', (notificaciones) => {
            dispatch(NotificacionesCargadas(notificaciones))

            dispatch(BorrarNotificaciones())
        })
    }, [ socket, dispatch])

    useEffect(() => {
        socket?.on('checked-marked', (petition) => {
            dispatch(cargarPeticiones(petition))
        })
    }, [ socket, dispatch])

    useEffect(() => {
        socket?.on('checked-marked-sin-cuenta', (petition) => {
            dispatch(cargarPeticionesSinCuenta(petition))
        })
    }, [ socket, dispatch])

    useEffect(() => {
        socket?.on('checked-marked-pastores', (petition) => {
            dispatch(cargarPeticionesPastores(petition))
        })
    }, [ socket, dispatch])

    useEffect(() => {
        socket?.on('checked-marked-contact', (contact) => {
            dispatch(cargarContactos(contact))
        })
    }, [ socket, dispatch])

    useEffect(() => {
        socket?.on('notifications-Show-admin', (notification) => {

            if (notification?.subtitle === 'Nueva petición de oración de usuario agregada') {
                dispatch(startGetPaginatePetitionUser())
            } else if (notification?.subtitle === 'Nueva petición de oración de pastores agregada de: ') {
                dispatch(startGetPaginatePetitions())
            }

            dispatch(NotificationPublicAdmin(notification))
        })
    }, [ socket, dispatch])
    
    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}