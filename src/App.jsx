import './App.css'
import React, {useState} from 'react'
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
  const [clickOnLife, setclickOnLife] = useState(false)
  if(clickOnLife) {
    sceneSheet.sequence.play({iterationCount: 1, range: [0, 2]})
  }
  
  return (
    <div className='container'>
      <Canvas>
        <SheetProvider sheet={sceneSheet}>
          <MainScene />
          <CardScene project={project} setclickOnLife={setclickOnLife} clickOnLife={clickOnLife} />
        </SheetProvider>
      </Canvas>
      <div className='text_container'>
        <p className='p-tag'>dit is een p tag</p>
      </div>
    </div>
    
  )
}

export default App
