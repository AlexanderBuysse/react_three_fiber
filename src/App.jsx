import './App.css'
import React, {useEffect, useState} from 'react'
import {Canvas} from '@react-three/fiber'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import {SheetProvider, editable as e, PerspectiveCamera} from '@theatre/r3f'
import {getProject} from '@theatre/core'
import demoProjectState from './state.json'
import { PlayingCard } from './components/PlayingCard'
import { OrbitControls } from '@react-three/drei'

studio.initialize()
studio.extend(extension)

const demoSheet = getProject('Demo Project', {state: demoProjectState}).sheet('Demo Sheet')


const App = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    demoSheet.project.ready.then(() => demoSheet.sequence.play({iterationCount: 1, range: [0, 5]}))
  }, [startAnimation])
  
  return (
    <Canvas>
      <OrbitControls/>
      <SheetProvider sheet={demoSheet}>
        <PerspectiveCamera theatreKey="Camera" makeDefault position={[5, 5, -5]} fov={75}/>
        <ambientLight/>
        <e.pointLight theatreKey="Light" position={[10, 10, 10]}/>
        <PlayingCard onClick={() => {
          console.log('klik op de kaart');
          setStartAnimation(!startAnimation);
        }} scale={(.01)} position={[1, 1, 1]}/>
        <e.mesh theatreKey="Cube">
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color="orange"/>
        </e.mesh>
      </SheetProvider>
    </Canvas>
  )
}

export default App
