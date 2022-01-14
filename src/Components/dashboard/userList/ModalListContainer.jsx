import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainer } from './ModalContainer'

export const ModalListContainer = ({currentPage}) => {
    const {users} = useSelector(state => state.auth)

    const PaginateUsers = () => {
        return users?.slice(currentPage, currentPage + 5)
    }
    return (
        <>
            {
                (users)
                    ?
                    PaginateUsers().map(user => {
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
