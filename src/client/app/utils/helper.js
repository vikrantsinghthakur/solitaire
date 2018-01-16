import {SUITE,CARD_VALUES,CARD_FACE} from './constants'
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
    state.drawStack = [];
    state.suiteStack = {};
    state.playStack = {};

    let suiteArray = Object.keys(SUITE);
    let cardArray = Object.keys(CARD_VALUES);

    let fullDeck = _.product(suiteArray,cardArray);
    fullDeck = shuffleArray(fullDeck.map((item) => {return {suite:item[0],
                                        value:item[1], face:CARD_FACE.CLOSED}}));

    for(var i=1;i<=7;i++){
      state.playStack[i]=[];
        for(var j=1; j<=i; j++){
          let temp = fullDeck.pop();
          if(i==j)
            temp.face=CARD_FACE.OPEN;
          state.playStack[i].push(temp);
        }
    }

    state.drawStack = [];
    while(fullDeck.length>0)
      state.drawStack.push(fullDeck.pop());

    state.suiteStack = {
      "HEARTS":[],
      "CLUBS":[],
      "DIAMONDS":[],
      "SPADES":[]
    }

    return state;

}
