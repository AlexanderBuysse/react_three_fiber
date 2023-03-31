import React, {useState} from 'react'
import { editable, SheetProvider as e, SheetProvider} from '@theatre/r3f'
import { CardLifestyle } from './cards/CardLifestyle'
import { CardMe } from './cards/CardMe'
import { CardContact } from './cards/CardContact'


const CardScene = ({project}) => {
    const cardSheetLifeStyle = project.sheet('Card Sheet life style');
    const cardSheetMe = project.sheet('Card Sheet life style');
    const cardSheetContact = project.sheet('Card Sheet life style');

    const [ theatreObject, setTheatreObject, ] = useState(null)

    let playingAnimation = false;
  
  
    cardSheetLifeStyle.project.ready.then(() => cardSheetLifeStyle.sequence.play({iterationCount: Infinity, range: [5, 7]}));
    // const playFirstAnimation = () => {
    //   if(!playingAnimation) {
    //     playingAnimation = true;
    //     cardSheetLifeStyle.sequence.play({iterationCount: 1, range: [0, 3]}).then(()=> {
    //         cardSheetLifeStyle.sequence.play({iterationCount: Infinity, range: [5, 7]})
    //       playingAnimation = false;
    //     });
    //   }
    // }

    return (
      <>
        <SheetProvider sheet={cardSheetLifeStyle}>
            <CardLifestyle 
              objRef={setTheatreObject}
              name="Kaart life style" 
              onClick={(event) => {
                playFirstAnimation();
              }}
              scale={1}
              rotation-y={-Math.PI/2}
              position={[-.3, 0, 0]}
            />
        </SheetProvider>
        <SheetProvider sheet={cardSheetMe}>
            <CardMe
              objRef={setTheatreObject}
              name="Kaart me"
              scale={1}
              rotation-y={-Math.PI/2}
              position={[0, 0, 0]}
            />
        </SheetProvider>
        <SheetProvider sheet={cardSheetContact}>
            <CardContact
              objRef={setTheatreObject}
              name="Kaart contact" 
              onClick={(event) => {}}
              scale={1}
              rotation-y={-Math.PI/2}
              position={[.3, 0, 0]}
            />
        </SheetProvider>
      </>
    )
}

export default CardScene;