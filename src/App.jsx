import './App.css'
import React, {useEffect, useState, useRef} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import {SheetProvider, editable as e, PerspectiveCamera} from '@theatre/r3f'
import {getProject, onChange} from '@theatre/core'
import demoProjectState from './state.json'
import { CardLifestyle } from './components/cards/CardLifestyle'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { Environment } from '@react-three/drei'
import { useSpring } from '@react-spring/core'


import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
studio.initialize()
studio.extend(extension)

const project = getProject('Demo Project', {state: demoProjectState})
const demoSheet = project.sheet('Demo Sheet');
const sheet2 = project.sheet('two');
const sceneSheet = project.sheet('scene');


const App = () => {

  const [cameraOneActive, setcameraOneActive] = useState(true);
  const [cameraTwoActive, setcameraTwoActive] = useState(false);

  const [ theatreObject, setTheatreObject, ] = useState(null)
  let playingAnimation = false;


  demoSheet.project.ready.then(() => demoSheet.sequence.play({iterationCount: Infinity, range: [5, 7]}));
  const playFirstAnimation = () => {
    if(!playingAnimation) {
      playingAnimation = true;
      demoSheet.sequence.play({iterationCount: 1, range: [0, 3]}).then(()=> {
        demoSheet.sequence.play({iterationCount: Infinity, range: [5, 7]})
        playingAnimation = false;
      });
    }
  }
  
  return (
    <div>
      <Canvas>
        <Environment
          files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr"
          blur={0.5}
        />        
        <SheetProvider sheet={sceneSheet}>
          <PerspectiveCamera theatreKey="Main Camera" makeDefault={cameraOneActive} position={[2, 3, 9]} fov={75}/>
          <e.ambientLight theatreKey="ambient"/>
          <e.pointLight theatreKey="point" position={[10, 10, 10]}/>
          <SheetProvider sheet={demoSheet}>
            <CardLifestyle 
              objRef={setTheatreObject}
              name="Kaart" 
              onClick={(event) => {
                console.log('klik op de kaart', event);
                playFirstAnimation();
              }}
              scale={1} 
              position={[1, 1, 1]}
            />
          </SheetProvider>

          <SheetProvider sheet={sheet2}>
            <e.mesh name='testcube'
              position={[1, 1, 1]} theatreKey="Cube">
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color="orange"/>
            </e.mesh>
          </SheetProvider>
        </SheetProvider>
      </Canvas>
    </div>
    
  )
}

export default App
