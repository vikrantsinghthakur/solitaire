import {CARD_SUITE,CARD_VALUES,CARD_FACE,DIFFICULTY} from './constants'
import _ from 'lodash';
import 'lodash.product';

const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const generateState = () => {
    let state = {};
    state.drawStack = {activeStack:[], passiveStack:[]};
    state.suiteStack = {};
    state.playStack = {};

    let suiteArray = Object.keys(CARD_SUITE);
    let cardArray = Object.keys(CARD_VALUES);

    let fullDeck = _.product(suiteArray,cardArray);
    fullDeck = shuffleArray(fullDeck.map((item) => {return {suite:item[0],
                                        value:item[1], face:CARD_FACE.CLOSED}}));

    for(let i of _.range(1,8)){
      state.playStack[i]=[];
        for(var j=1; j<=i; j++){
          let temp = fullDeck.pop();
          if(i==j)
            temp.face=CARD_FACE.OPEN;
          state.playStack[i].push(temp);
        }
    }

    while(fullDeck.length>0)
      state.drawStack.passiveStack.push(fullDeck.pop());

    state.suiteStack = {
      "HEARTS":[{value:"card", suite:"down"}],
      "CLUBS":[{value:"card", suite:"down"}],
      "DIAMONDS":[{value:"card", suite:"down"}],
      "SPADES":[{value:"card", suite:"down"}]
    }

    ////
    state.difficulty = DIFFICULTY.HARD;
    ////

    return state;

}
