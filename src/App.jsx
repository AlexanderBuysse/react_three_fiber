import './App.css'
import React from 'react'
import {Canvas} from '@react-three/fiber'
import {SheetProvider} from '@theatre/r3f'
import {getProject} from '@theatre/core'
import portfolioState from './state.json'

import MainScene from './components/MainScene';
import CardScene from './components/CardScene';


import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

studio.initialize()
studio.extend(extension)

const project = getProject('Portfolio Project', {state: portfolioState})
const sceneSheet = project.sheet('Main Scene');


const App = () => {
  
  return (
    <div>
      <Canvas>
        <SheetProvider sheet={sceneSheet}>
          <MainScene />
          <CardScene project={project}/>
        </SheetProvider>
      </Canvas>
    </div>
    
  )
}

export default App
