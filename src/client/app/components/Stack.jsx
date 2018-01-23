import React from 'react';
import CardWrapper from './CardWrapper';
import Separator from './Separator';
import { STACKS } from '../utils/constants';

 // const Stack = (props) => <CardWrapper {...props} zIndex={0} />
 const Stack = (props) => {
   let auxRender = null, separator=null, stackClass="stack";
   let primaryRender = () => null
   if(props.stack == STACKS.DRAW && (props.passiveStack || props.activeStack)){
     stackClass = `${stackClass} draw`
     auxRender = (<CardWrapper value="card" suite="down"/>);
     separator = <Separator/>
     if(props.activeStack && props.activeStack.length > 0){
       let cardsToRender = props.activeStack.reverse();
       primaryRender = () => <CardWrapper cardsToRender={cardsToRender} {...props}
                                key={counter++} zIndex={0}/>
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
           cardsToRender={cardsToRender} {...props} zIndex={0} key={counter++}/>)
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
         primaryRenderArray.push(<CardWrapper key={counter++}
                                  cardsToRender={cardsToRender} {...props}/>)
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
