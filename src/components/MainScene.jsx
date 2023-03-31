import React from 'react'
import { editable as e, PerspectiveCamera} from '@theatre/r3f'
import { Environment } from '@react-three/drei'

const MainScene = () => {
    return (
      <>
        <Environment
            files="https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr"
            blur={0.5}
        />
        <PerspectiveCamera theatreKey="Main Camera" makeDefault={true} position={[0, 0, .6]} fov={75}/>
        <e.ambientLight theatreKey="ambient"/>
        <e.pointLight theatreKey="point" position={[1, 1, .5]}/>
      </>
    )
}

export default MainScene;