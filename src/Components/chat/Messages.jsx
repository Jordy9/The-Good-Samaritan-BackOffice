import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { activeMessage } from '../../action/chat';
import { scrollToBottomAnimated } from '../../helper/PrepareEvents';
import { IncomingMessage } from './IncomingMessage';
import { OutgoingMessage } from './OutgoingMessage';
import { SendMessage } from './SendMessage';

export const Messages = () => {

    const dispatch = useDispatch()

    const scroll = useRef()

    const {mensajes} = useSelector(state => state.cht)
    const {uid} = useSelector(state => state.auth)
    const {socket} = useSelector(state => state.sk)

    useEffect(() => {
        socket?.on('mensaje-personal', (mensaje) => {
            dispatch(activeMessage(mensaje))
            
            if (scroll) {
                scroll.current?.addEventListener('DOMNodeInserted', scrollToBottomAnimated('messages'))
            }
        })
    }, [socket, dispatch, scroll])

    return (
        <div className="mesgs">

            {/* <!-- Historia inicio --> */}
            <div ref={scroll} id='messages' className="msg_history">

                {
                    mensajes.map( msg => (
                        ( msg.to === uid )
                            ? <IncomingMessage key={ msg._id } msg = {msg} />
                            : <OutgoingMessage key={ msg._id } msg = {msg} />
                    ))
                }

            </div>
            {/* <!-- Historia Fin --> */}

           <SendMessage />

        </div>
    )
}
