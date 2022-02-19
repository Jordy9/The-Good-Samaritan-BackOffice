import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../../spinner/Spinner'
import { ModalContainer } from './ModalContainer'

export const ModalListContainer = () => {
    const {videos} = useSelector(state => state.vwd)
    return (
        <>
            {
                (videos)
                    ?
                    videos.map(videos => {
                        return (
                            <ModalContainer key = {videos._id} {...videos} />
                        )
                    })
                    :
                    <Spinner />
            }
        </>
    )
}
