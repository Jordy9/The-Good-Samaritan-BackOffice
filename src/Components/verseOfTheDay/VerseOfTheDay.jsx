import React from 'react'
import { Antiguotestamento } from '../../Antiguotestamento'
import { Nuevotestamento } from '../../Nuevotestamento'

export const VerseOfTheDay = () => {

    const libros = [...Antiguotestamento(), ...Nuevotestamento()]

    const librosFiltrados = libros[Math.floor(Math.random() * libros.length)]

    const versiculos = librosFiltrados[Math.floor(Math.random() * librosFiltrados.length)]

    console.log(versiculos[Math.floor(Math.random() * versiculos.length)])

  return (
    <>
    
    </>
  )
}
