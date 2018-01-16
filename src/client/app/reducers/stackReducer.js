import * as Constants from '../utils/constants';
import {fromJS, set} from 'immutable';
import {generateState} from '../utils/helper';

const valueUpdater = (state, value) => {
  let newState = state
  newState = newState.setIn(['value'],value);
  return newState;
}

const stackReducer = (state, action) => {
  switch (action.type) {
    case Constants.NEW_GAME:
      let newState = fromJS(generateState());
      return newState;
      break;
    case 'actionThrower':
      return valueUpdater(state,99);
    default:
      return state;
  }



  // if(action.type == 'actionThrower'){
  //   newState.value = action.value;
  //   return newState;
  // }
  // return newState;
}

export default stackReducer;
