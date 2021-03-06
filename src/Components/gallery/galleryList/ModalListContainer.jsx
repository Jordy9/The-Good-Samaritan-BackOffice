import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainer } from './ModalContainer'

export const ModalListContainer = () => {
    const {Gallery} = useSelector(state => state.ga)
    return (
        <>
            {
                (Gallery)
                    ?
                    Gallery.map(gallery => {
                        return (
                            <ModalContainer key = {gallery._id} {...gallery} />
                        )
                    })
                    :
                    <Spinner />
            }
        </>
    )
}
