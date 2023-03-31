import React, {useState, useEffect} from 'react'
import { editable, SheetProvider as e, SheetProvider} from '@theatre/r3f'
import { CardLifestyle } from './cards/CardLifestyle'
import { CardMe } from './cards/CardMe'
import { CardContact } from './cards/CardContact'

const CardScene = ({project , setclickOnLife, clickOnLife}) => {
    const cardSheetMe = project.sheet('Card Sheet me');
    const cardSheetLifeStyle = project.sheet('Card Sheet life style');
    const cardSheetContact = project.sheet('Card Sheet contact');

    const [ theatreObject, setTheatreObject, ] = useState(null)

    const [position, setPosition] = useState(null);

    const [ hoverCardLifeStyle, sethoverCardLifeStyle, ] = useState(false)
    const [ hoverCardMe, sethoverCardMe, ] = useState(false)
    const [ hoverCardContact, sethoverCardContact, ] = useState(false)

    const [ playingAnimationLife, setplayingAnimationLife, ] = useState(false)
    const [ playingAnimationMe, setplayingAnimationMe, ] = useState(false)
    const [ playingAnimationContact, setplayingAnimationContact, ] = useState(false)

    const cardSheets = [cardSheetLifeStyle, cardSheetMe, cardSheetContact];
    const animationTrackers = [playingAnimationLife, playingAnimationMe, playingAnimationContact];
    const animationSetTrackers = [setplayingAnimationLife, setplayingAnimationMe, setplayingAnimationContact];
    const hoverTrackers = [hoverCardLifeStyle, hoverCardMe, hoverCardContact];
    const hoverSetTrackers = [sethoverCardLifeStyle, sethoverCardMe, sethoverCardContact];

    useEffect(() => {
        console.log('refresh');
        cardSheets.forEach(cardSheet => {
            cardSheet.project.ready.then(() => {
                setTimeout(function(){
                    cardSheet.sequence.play({iterationCount: Infinity, range: [5, 7] })
               }, Math.floor(Math.random() * 500));
            })
        })
    }, [])

    const animationController = (cardId, kindEvent) => {
        if(!animationTrackers[cardId]) {
            if(kindEvent === 'hoverOver') {
                hoverSetTrackers[cardId](true);
                //cardSheets[cardId].sequence.play({iterationCount: 1, range: [8, 9]})
            }

            if(kindEvent === 'hoverOut') {
                hoverSetTrackers[cardId](false);
                // cardSheets[cardId].sequence.play({iterationCount: 1, range: [8,8.1]}).then(() => {
                //     cardSheets[cardId].sequence.play({iterationCount: Infinity, range: [5, 7]});
                // })
            }

            if(kindEvent === 'click') {
                animationSetTrackers[cardId](true);
                cardSheets[cardId].sequence.play({iterationCount: 1, range: [0, 2]}).then(()=> {
                    //animationSetTrackers[cardId](false);
                    setclickOnLife(true);
                    cardSheetLifeStyle.sequence.play({iterationCount: 1, range: [8, 10] })
                });
            }
        } else {
            console.log('er is een animatie aan het spelen')
        }
    }

    return (
      <>
        <SheetProvider sheet={cardSheetLifeStyle}>
            <CardLifestyle
              name="Kaart life style" 
              onClick={() => {
                animationController(0, 'click'); 
              }}
              onPointerOver= {()=>  {
                animationController(0, 'hoverOver'); 
              }}              
              onPointerOut = {()=>  {
                animationController(0, 'hoverOut'); 
              }}
              scale={1}
              rotation-y={-Math.PI/2}
              position={[-.3, 0, 0]}
            />
        </SheetProvider>
        
        <SheetProvider sheet={cardSheetMe}>
            <CardMe
              name="Kaart me"
              onClick={() => {
                animationController(1, 'click'); 
              }}
              onPointerOver= {()=>  {
                animationController(1, 'hoverOver'); 
              }}              
              onPointerOut = {()=>  {
                animationController(1, 'hoverOut'); 
              }}
              scale={1}
              rotation-y={-Math.PI/2}
              position={[0, 0, 0]}
            />
        </SheetProvider>
        <SheetProvider sheet={cardSheetContact}>
            <CardContact
              name="Kaart contact" 
              onClick={() => {
                animationController(2, 'click'); 
              }}
              onPointerOver= {()=>  {
                animationController(2, 'hoverOver'); 
              }}              
              onPointerOut = {()=>  {
                animationController(2, 'hoverOut'); 
              }}
              scale={1}
              rotation-y={-Math.PI/2}
              position={[.3, 0, 0]}
            />
        </SheetProvider>
      </>
    )
}

export default CardScene;