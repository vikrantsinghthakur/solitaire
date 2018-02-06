import * as Constants from '../utils/constants';
import {fromJS, set} from 'immutable';
import {generateState} from '../utils/helper';
import {STACKS, CARD_FACE} from '../utils/constants';
import {isArray} from 'lodash';

const valueUpdater = (state, value) => {
  let newState = state
  newState = newState.setIn(['value'],value);
  return newState;
}

const reduceDrawStack = (state,value) => {
  let newState = state, stack=STACKS.DRAW, activeArray;
  activeArray = state.get(stack).get('activeStack').toJS();
  activeArray.pop();
  return newState.setIn([stack, 'activeStack'],fromJS(activeArray));
}

const drawCard = (state,value) => {
  let newState = state, activeArray, passiveArray, extractedCards;
  const stack = STACKS.DRAW;
  const drawCount = state.get('difficulty') == Constants.DIFFICULTY.HARD ? 3 : 1;
  passiveArray = state.get(stack).get('passiveStack').toJS();
  activeArray = state.get(stack).get('activeStack').toJS();
  if(!passiveArray || passiveArray.length == 0) {
    passiveArray = activeArray;
    activeArray = [];
  } else {
    extractedCards = passiveArray.splice(0,drawCount);
    activeArray = activeArray.concat(extractedCards);
  }
  newState = newState.setIn([stack,'passiveStack'], fromJS(passiveArray));
  return newState.setIn([stack,'activeStack'], fromJS(activeArray));
}

const openCardFace = (state, action) => {
  let initialState = state, stackElements, card;
  let stack = STACKS.PLAY;
  stackElements = initialState.get(stack).get(action.playStackIndex.toString()).toJS();
  card = stackElements.pop();
  if(!card)
    return initialState;
  card.face = CARD_FACE.OPEN;
  stackElements.push(card);
  return initialState.setIn([stack, action.playStackIndex.toString()], fromJS(stackElements));
}

const moveCard = (state,action) => {
  let newState, initialState = state;
  let primaryPathSource, secondaryPathSource, primaryPathTarget, secondaryPathTarget;

  primaryPathSource = action.sourceStack;
  if(primaryPathSource == STACKS.DRAW)
    secondaryPathSource = 'activeStack';
  else if(primaryPathSource == STACKS.PLAY)
    secondaryPathSource = action.sourceStackIndex.toString();
  else
    secondaryPathSource = action.sourceParentSuite;

  primaryPathTarget = action.dropStack;
  if(primaryPathTarget == STACKS.PLAY)
    secondaryPathTarget = action.dropIndex.toString();
  else
    secondaryPathTarget = action.dropParentSuite;

  let sourceArray = state.get(primaryPathSource).get(secondaryPathSource).toJS();
  if(primaryPathTarget == STACKS.SUITE && action.cardsArray.length > 1)
    return initialState;
  sourceArray.splice(-1 * action.cardsArray.length);

  let destinationArray = state.get(primaryPathTarget).get(secondaryPathTarget).toJS();
  destinationArray = destinationArray.concat(action.cardsArray);

  newState = initialState.setIn([primaryPathSource, secondaryPathSource],
                                  fromJS(sourceArray));
  newState = newState.setIn([primaryPathTarget, secondaryPathTarget],
                                    fromJS(destinationArray));

  return newState;
}

const moveToPlayStack = (state, action) => {
  let newState, initialState = state, secondaryPath;

  if(action.sourceStack == STACKS.DRAW)
    secondaryPath = 'activeStack';
  else if(action.sourceStack == STACKS.PLAY)
    secondaryPath = action.sourceStackIndex.toString();
  else
    secondaryPath = action.parentSuite

  let sourceArray = state.get(action.sourceStack).get(secondaryPath).toJS();
  sourceArray.splice(-1 * action.cardsArray.length);

  let destinationArray = state.get(action.dropStack).get(action.dropIndex.toString()).toJS();
  destinationArray = destinationArray.concat(action.cardsArray);

  newState = initialState.setIn([action.sourceStack, secondaryPath],fromJS(sourceArray));

  let finalState = newState.setIn([action.dropStack, action.dropIndex.toString()], fromJS(destinationArray));

  return finalState;
}

const stackReducer = (state, action) => {
  switch (action.type) {
    case Constants.NEW_GAME:
      return fromJS(generateState());
      break;
    case Constants.OPEN_CARD_FACE:
      return openCardFace(state,action);
      break;
    case Constants.MOVE_TO_PLAY_STACK:
      return moveToPlayStack(state, action);
      break;
    case Constants.DRAW_CARD:
      return drawCard(state,action);
      break;
    case Constants.MOVE_CARD:
      return moveCard(state,action);
      break;
    default:
      return state;
  }
}

export default stackReducer;
