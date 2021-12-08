import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { Datatablee } from './Datatablee'

export const DatatableeMap = () => {

    const {users} = useSelector(state => state.auth)
    return (
        <>
          {!users
            ? <Spinner />
            : users.map(user => <Datatablee key={user.id} {...user} />)}
        </>
    )
}
