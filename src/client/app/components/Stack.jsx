import React from 'react';
import CardWrapper from './CardWrapper';
import Separator from './Separator';
import { STACKS,DIFFICULTY,SUITE } from '../utils/constants';

 const Stack = (props) => {
   let auxRender = null, separator=null, stackClass="stack";
   let primaryRender = () => null
   if(props.stack == STACKS.DRAW){
     stackClass = `${stackClass} draw`
     auxRender = (<CardWrapper value="card" suite="down" suite={SUITE.NONE}
       cardDrawer={true} {...props}/>);
     separator = <Separator/>
     if(props.activeStack && props.activeStack.length > 0){
       let activeDrawCount = props.difficulty == DIFFICULTY.HARD ? 3: 1;
       let cardsToRender = props.activeStack.slice(-activeDrawCount,),
       length = cardsToRender.length, counter = 1;
       primaryRender = () => cardsToRender.map((card) => {
         let lastCard, isLastCard;
         lastCard = props.activeStack[props.activeStack.length -1];
         if(card.suite == lastCard.suite && card.value == lastCard.value)
          isLastCard = true;
         else
          isLastCard = false;
         return <CardWrapper
            cardsToRender={[card]} {...props} isLastCard={isLastCard} key={counter++} />})
     }
   } else if(props.stack == STACKS.SUITE && props.suiteStackProps){
     stackClass = `${stackClass} suite`
     let primaryRenderArray = [];
     let cardsToRender = null;
     let counter = 0;
     for(let key in props.suiteStackProps){
       if(props.suiteStackProps.hasOwnProperty(key)){
         cardsToRender = props.suiteStackProps[key];
         primaryRenderArray.push(<CardWrapper parentSuite={key}
           cardsToRender={cardsToRender} {...props} key={counter++}/>)
         primaryRenderArray.push(<Separator key={counter++}/>)
       }
     }
     primaryRender = () => primaryRenderArray.map(element => element)
   } else if(props.stack == STACKS.PLAY){
     stackClass = `${stackClass} play`
     let primaryRenderArray = [];
     let cardsToRender = null;
     let counter = 1;
     for(let playStackIndex in props.playStackProps){
       if(props.playStackProps.hasOwnProperty(playStackIndex)){
         cardsToRender = props.playStackProps[playStackIndex.toString()];
         let emptyStack;
         if(cardsToRender.length == 0)
          emptyStack = true;
         else
          emptyStack = false;
         primaryRenderArray.push(<CardWrapper stackKey={counter} key={counter++}
            emptyStack={emptyStack} cardsToRender={cardsToRender} {...props}/>)
       }
     }
     primaryRender = () => primaryRenderArray.map(element => element);
   }
   return <div className={stackClass}>
            {auxRender}
            {separator}
            {primaryRender()}
          </div>;
 }

 export default Stack;
