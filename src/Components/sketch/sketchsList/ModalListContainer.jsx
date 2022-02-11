import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainer } from './ModalContainer'

export const ModalListContainer = ({title}) => {
    const {Bosquejos} = useSelector(state => state.skt)
    return (
        <>
            {
                (Bosquejos)
                    ?
                    Bosquejos.filter(Bosquejos => (title === '') ? Bosquejos : (Bosquejos.title.toLowerCase().includes(title.toLowerCase())) && Bosquejos).map(Bosquejo => {
                        return (
                            <ModalContainer key = {Bosquejo._id} {...Bosquejo} />
                        )
                    })
                    :
                    <Spinner />
            }
        </>
    )
}
