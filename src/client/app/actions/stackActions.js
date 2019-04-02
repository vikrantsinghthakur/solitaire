import * as Constants from "../utils/constants";
import { checkUndefined } from "../utils/helper";

export const newGame = () => {
  return {
    type: Constants.NEW_GAME
  };
};

export const setDifficulty = difficulty => {
  return {
    type: Constants.SET_DIFFICULTY,
    difficulty
  };
};

export const drawCard = () => {
  return {
    type: Constants.DRAW_CARD
  };
};

export const moveCard = actionObject => {
  return {
    type: Constants.MOVE_CARD,
    ...actionObject
  };
};

export const reduceActiveDrawCount = () => {
  return {
    type: Constants.REDUCE_ACTIVE_DRAW_COUNT
  };
};

export const openCardFace = playStackIndex => {
  return {
    type: Constants.OPEN_CARD_FACE,
    playStackIndex
  };
};
