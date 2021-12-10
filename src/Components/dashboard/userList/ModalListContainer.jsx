import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainer } from './ModalContainer'

export const ModalListContainer = () => {
    const {users} = useSelector(state => state.auth)
    return (
        <>
            {
                (users)
                    ?
                    users.map(user => {
                        return (
                            <ModalContainer key = {user.id} {...user} />
                        )
                    })
                    :
                    <Spinner />
            }
        </>
    )
}
