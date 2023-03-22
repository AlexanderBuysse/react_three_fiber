import './App.css'
import React, {useEffect, useState, useRef} from 'react'
import {Canvas} from '@react-three/fiber'
import {SheetProvider, editable as e, PerspectiveCamera} from '@theatre/r3f'
import {getProject} from '@theatre/core'
import demoProjectState from './state.json'
import { PlayingCard } from './components/PlayingCard'

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
  
  // const effectRan = useRef(false);
  // const effectRanSecond = useRef(false);
  // const [startAnimation, setStartAnimation] = useState(false);
  // const [startSecondAnimation, setStartSecondAnimation] = useState(false);
  // useEffect(() => {
  //   if(effectRan.current) {
  //     if (effectRanSecond.current) {
  //       if(startAnimation === "first") {
  //         demoSheet.project.ready.then(() => demoSheet.sequence.play({iterationCount: 1, range: [0, 5]}));
  //       }

  //       if(startAnimation === "second") {
  //         demoSheet.project.ready.then(() => demoSheet.sequence.play({iterationCount: 1, range: [0, 5]}));
  //         console.log('play second animation');
  //       }
  //     }
  //     effectRanSecond.current= true;
  //   }

  //   return () => {
  //     effectRan.current= true;
  //   }
  // }, [startAnimation]);

  const playFirstAnimation = () => {
    demoSheet.sequence.play({iterationCount: 1, range: [0, 5]});
  } 

  const playSecondAnimation = () => {
    sheet2.sequence.play({iterationCount: 1, range: [0, 5]}).then(()=> {
      setcameraOneActive(true);
      setcameraTwoActive(false);    
    });
  } 
  
  return (
    <div>
      <Canvas>
        <SheetProvider sheet={sceneSheet}>
          <PerspectiveCamera theatreKey="Main Camera" makeDefault={cameraOneActive} position={[2, 3, 9]} fov={75}/>
          <ambientLight/>
          <pointLight position={[10, 10, 10]}/>
          <SheetProvider sheet={demoSheet}>
            <PlayingCard onClick={() => {
              console.log('klik op de kaart');
              playFirstAnimation();
            }} scale={(.01)} position={[1, 1, 1]}/>
          </SheetProvider>

          <SheetProvider sheet={sheet2}>
          {/* <PerspectiveCamera theatreKey="Camera follow cube" makeDefault={cameraTwoActive} position={[2, 3, 9]} fov={75}/> */}
            <e.mesh onClick={() => {
              console.log('klik op de cube');
              setcameraOneActive(false);
              setcameraTwoActive(true);
              playSecondAnimation();
            }} position={[1, 1, 1]} theatreKey="Cube">
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
