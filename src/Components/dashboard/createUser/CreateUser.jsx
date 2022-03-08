import React from 'react'
import { useDispatch } from 'react-redux'
import { ModalOpen } from '../../../action/auth'
import './CreateUser.css'

export const CreateUser = () => {

    const dispatch = useDispatch()

    const handledSet = () => {
        dispatch(ModalOpen(true))
      }
    return (
        <>
            <i className="bi bi-plus-circle fab color-success" onClick = {handledSet}></i>
        </>
    )
}
