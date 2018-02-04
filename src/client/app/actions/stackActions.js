import * as Constants from '../utils/constants';

export const actionThrower = () =>
{return {
  type: 'actionThrower',
  value: '99'
}}

export const newGame = () => {
  return{
    type: Constants.NEW_GAME
  }
}

export const drawCard = () => {
  return{
    type: Constants.DRAW_CARD
  }
}

export const moveToSuiteStack = (dropStack, dropIndex, parentSuite, card, sourceStack, sourceStackIndex) => {
  return{
    type: Constants.MOVE_TO_SUITE_STACK,
    dropStack,
    parentSuite,
    card,
    sourceStack
  }
}

export const moveToPlayStack = (dropStack, dropIndex, parentSuite, cardsArray, sourceStack, sourceStackIndex) => {
  return{
    type: Constants.MOVE_TO_PLAY_STACK,
    dropStack,
    dropIndex,
    cardsArray,
    sourceStack,
    sourceStackIndex
  }
}

export const openCardFace = (playStackIndex) => {
  return{
    type: Constants.OPEN_CARD_FACE,
    playStackIndex
  }
}
