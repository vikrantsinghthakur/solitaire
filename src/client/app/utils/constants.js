/*Asset Constants*/
export const SUITE = {
    NONE: "NONE",
    HEARTS: "HEARTS",
    CLUBS: "CLUBS",
    DIAMONDS: "DIAMONDS",
    SPADES: "SPADES"
}

export const CARD_SUITE = {
  HEARTS: "HEARTS",
  CLUBS: "CLUBS",
  DIAMONDS: "DIAMONDS",
  SPADES: "SPADES"
}

export const SUITE_COLOR = {
  HEARTS: "RED",
  CLUBS: "BLACK",
  DIAMONDS: "RED",
  SPADES: "BLACK"
}

export const CARD_VALUES = {
  ACE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13
}

export const CARD_FACE = {
  OPEN:'OPEN',
  CLOSED: 'CLOSED'
}

export const STACKS = {
  PLAY: 'PLAY',
  SUITE: 'SUITE',
  DRAW: 'DRAW'
}

export const DIFFICULTY = {
  EASY:'EASY',
  HARD: 'HARD'
}

export const GAME_STATE = {
  NEW: 'NEW',
  OPEN: 'OPEN',
  COMPLETE: 'COMPLETE'
}

/*Action Constants*/
export const NEW_GAME = "newGame";
export const MOVE_TO_PLAY_STACK = "moveToPlayStack";
export const MOVE_TO_SUITE_STACK = "moveToSuiteStack";
export const OPEN_CARD_FACE = "openCardFace";
export const DRAW_CARD = "drawCard";
export const MOVE_CARD = "moveCard";
export const REDUCE_ACTIVE_DRAW_COUNT = "reduceActiveDrawCount";
export const SET_DIFFICULTY = "setDifficulty";

/*CSS Constants*/
export const SUITE_SEPARATOR_WIDTH = "1vw";
export const STACK_SEPARATOR_WIDTH = "6.5vw";
export const PLAY_AREA_SEPARATOR = "5vw";

/*Bucket Url*/
export const URL = "https://s3-ap-southeast-1.amazonaws.com/webappikrant/reactsolitaire";
