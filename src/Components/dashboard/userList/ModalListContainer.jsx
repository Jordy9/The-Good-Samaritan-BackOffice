import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainer } from './ModalContainer'

export const ModalListContainer = ({currentPage}) => {
    const {users, uid} = useSelector(state => state.auth)
    const {usuarios} = useSelector(state => state.cht)

    const PaginateUsers = () => {
        const allUsers = [...users, ...usuarios]
        return allUsers?.slice(currentPage, currentPage + 5)
    }
    return (
        <>
            {
                (users && usuarios)
                    ?
                    PaginateUsers().filter(user => user.id !== uid).map(user => {
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
