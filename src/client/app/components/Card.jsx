import React,{Component} from 'react';
import CardWrapper from './CardWrapper';
import {STACKS,DIFFICULTY,SUITE} from '../utils/constants';

const Card = (props) => {
    let separator = null,
    currentCard=null,
    cards = null,
    nextCards = null,
    value = null,
    suite = null;

    if(props.stack == STACKS.PLAY && props.suite != SUITE.NONE){
      if(props.cardsToRender && props.cardsToRender.length > 0){
        currentCard = props.cardsToRender[0];
        value = currentCard.value;
        suite = currentCard.suite;
        nextCards = props.cardsToRender.splice(1,);
      }
    } else if(props.stack == STACKS.DRAW && props.difficulty == DIFFICULTY.HARD) {
      if(props.cardsToRender && props.cardsToRender.length > 0){
        currentCard = props.cardsToRender[0];
        value = currentCard.value;
        suite = currentCard.suite;
        nextCards = props.cardsToRender.splice(1,);
      }
    } else if(props.stack == STACKS.SUITE){
      if(props.cardsToRender && props.cardsToRender.length > 0){
        currentCard = props.cardsToRender[0];
        value = currentCard.value;
        suite = currentCard.suite;
        nextCards = props.cardsToRender.splice(1,);
      }
    } else if(props.suite && props.value){
      suite = props.suite;
      value = props.value;
    }


    return (<div style={{"display":"inline-block", "maxWidth" : "100px"}}>
              <img style={{"maxWidth" : "100%"}}
                src={`../assets/${value}_of_${suite}.png`}/>
              {nextCards && nextCards.length> 0 ? <CardWrapper {...props}
                cardsToRender={nextCards} /> : null}
           </div>);

}

export default Card;
