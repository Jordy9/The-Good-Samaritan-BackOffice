import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainer } from './ModalContainer'

export const ModalListContainer = ({title, currentPage}) => {
    const {users, uid} = useSelector(state => state.auth)
    const {usuarios} = useSelector(state => state.cht)

    const PaginateUsers = () => {
        const allUsers = [...usuarios, ...users]
        return allUsers?.slice(currentPage, currentPage + 5)
    }

    return (
        <>
            {
                (users && usuarios)
                    ?
                    PaginateUsers().filter(usersFilter => (title === '') ? usersFilter : (usersFilter.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,""))) && usersFilter
                    ).filter(user => user.id !== uid).map((user, index) => {
                        return (
                            <ModalContainer key = {user.id + index} {...user} />
                        )
                    })
                    :
                    <Spinner />
            }
        </>
    )
}
