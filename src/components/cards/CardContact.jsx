/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 card_contact.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function CardContact(props) {
  const { nodes, materials } = useGLTF('/card-contact/card_contact-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.card_contact.geometry} material={materials['card lifestyle.002']} />
    </group>
  )
}

useGLTF.preload('/card-contact/card_contact-transformed.glb')
