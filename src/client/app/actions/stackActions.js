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
