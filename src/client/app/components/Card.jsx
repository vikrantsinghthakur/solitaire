import React,{Component} from 'react';
import CardWrapper from './CardWrapper';
import {STACKS,DIFFICULTY,SUITE,CARD_FACE} from '../utils/constants';

const Card = (props) => {
    let separator = null,
    currentCard=null,
    cards = null,
    nextCards = null,
    value = null,
    suite = null,
    onClickFunction= () => {}

    if(props.stack == STACKS.PLAY && props.suite != SUITE.NONE){
      if(props.cardsToRender && props.cardsToRender.length > 0){
        currentCard = props.cardsToRender[0];
        nextCards = props.cardsToRender.slice(1,);
        if(currentCard.face == CARD_FACE.CLOSED){
          value = "card";
          suite = "down";
        } else {
          value = currentCard.value;
          suite = currentCard.suite;
        }
      } else {
        value = "empty";
        suite = "none";
      }
    } else if(props.stack == STACKS.DRAW) {
      console.log(props.cardDrawer);
      if(props.cardsToRender && props.cardsToRender.length > 0){
        currentCard = props.cardsToRender[0];
        value = currentCard.value;
        suite = currentCard.suite;
        nextCards = props.cardsToRender.slice(1,);
      } else if(props.cardDrawer){
        value = props.renderValue;
        suite = props.renderSuite;
        onClickFunction = props.actions.drawCard;
      }
    } else if(props.stack == STACKS.SUITE){
      if(props.cardsToRender && props.cardsToRender.length > 0){
        currentCard = props.cardsToRender[0];
        value = currentCard.value;
        suite = currentCard.suite;
        nextCards = props.cardsToRender.slice(1,);
      } else {
        value = "suite";
        suite = props.parentSuite;
      }
    } else if(props.suite && props.value){
      suite = props.suite;
      value = props.value;
    }


    return (<div onClick={onClickFunction} className="cardClass">
              <img className="cardImage"
                src={`../assets/${value}_of_${suite}.png`}/>
              {nextCards && nextCards.length> 0 ? <CardWrapper {...props}
                cardsToRender={nextCards} /> : null}
           </div>);

}

export default Card;
