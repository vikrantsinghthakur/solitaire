import {CARD_SUITE,CARD_VALUES,CARD_FACE,DIFFICULTY,STACKS} from './constants'
import _ from 'lodash';
import 'lodash.product';

const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const checkUndefined = (value) => {
  return value ? value : null;
}

export const generateState = () => {
    let state = {};
    state[STACKS.DRAW] = {activeStack:[], passiveStack:[]};
    state[STACKS.SUITE] = {};
    state[STACKS.PLAY] = {};

    let suiteArray = Object.keys(CARD_SUITE);
    let cardArray = Object.keys(CARD_VALUES);

    let fullDeck = _.product(suiteArray,cardArray);
    // fullDeck = shuffleArray(fullDeck.map((item) => {return {suite:item[0],
    //                                     value:item[1]}}));

    fullDeck = fullDeck.map((item) => {return {suite:item[0],
                                        value:item[1]}});

    for(let i of _.range(1,8)){
      state[STACKS.PLAY][i]=[];
        for(var j=1; j<=i; j++){
          let temp = fullDeck.pop();
          if(i!=j)
            temp.face=CARD_FACE.CLOSED;
          state[STACKS.PLAY][i].push(temp);
        }
    }

    while(fullDeck.length>0)
      state[STACKS.DRAW].passiveStack.push(fullDeck.pop());

    state[STACKS.SUITE] = {
      "HEARTS":[],
      "CLUBS":[],
      "DIAMONDS":[],
      "SPADES":[]
    }

    ////
    state.difficulty = DIFFICULTY.HARD;
    state.activeDrawCount = 3;
    ////

    state.closedCards = 21;
    return state;
}
