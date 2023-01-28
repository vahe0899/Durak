import cards from "../cards";
import {BEAT, START, USER_TURN, AI_TURN} from "./types";
import back from '../Components/assets/cardBackRed.png';

const initialState = {
    userHand: [],
    aiHand: [],
    playgroundFirstLine: [],
    playgroundSecondLine: [],
    deck: cards,
    beat: [],
    back: back,
    aiTurn: false,
    trumpCard: '',
    trumpSuit: ''
};

//тасовка
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
};

//раздача
function distribution(aiArray, userArray, deckOfCards) {
    let newUserArray = [];
    let newAiArray = [];
    let trump = deckOfCards.pop(); //козырь
    let suit = trump.suit

  for(let i = aiArray.length; i < 6; i++) {
    newAiArray.push(deckOfCards.pop())
  };

  for(let i = userArray.length; i < 6; i++) {
    newUserArray.push(deckOfCards.pop())
  }

  return {newAiArray, newUserArray, deckOfCards, trump, suit}
};

//атака
function attack(line, hand, action) {
    let index = hand.findIndex((item) => item.id === action.id);
    let selectedCard = hand.splice(index, 1);
    line.push(selectedCard[0])

    return {hand, line}
};

export const reducer = (state = initialState, action) => {
    console.log('STATE>>>>>', state)
    switch (action.type) {
        case BEAT:
            console.log(state.trumpSuit)
            return {...state}
            
        case START:
            shuffle(state.deck);
            let distributionResult = distribution(state.aiHand, state.userHand, state.deck)
            
            return {
                ...state,
                userHand: distributionResult.newUserArray,
                aiHand: distributionResult.newAiArray,
                trumpCard: distributionResult.trump,
                trumpSuit: distributionResult.suit
            }

        case USER_TURN:

            // let line = [...state.playgroundFirstLine]
            // let hand = [...state.userHand]
            // let index = hand.findIndex((item) => item.id === action.id);
            // let selectedCard = hand.splice(index, 1);
            // line.push(selectedCard[0])
            let attackResult = attack(state.playgroundFirstLine, state.userHand, action)

            return {
                ...state,
                userHand: attackResult.hand,
                playgroundFirstLine: attackResult.line,
                aiTurn: true
            }

        case AI_TURN:
            
            let newFirstLine = [...state.playgroundFirstLine];
            let newSecondLine = [...state.playgroundSecondLine];
            let newhand = [...state.aiHand];
            let activeCard = state.playgroundFirstLine[state.playgroundFirstLine.length - 1];
            let newindex = newhand.findIndex((item) => item.suit === activeCard.suit && item.value > activeCard.value);
            if(newindex < 0) {
                newhand = [...state.aiHand, ...state.playgroundSecondLine, ...state.playgroundFirstLine]
                newFirstLine = [];
                newSecondLine = [];
            } else {
                let newselectedCard = newhand.splice(newindex, 1);
                newSecondLine.push(newselectedCard[0])
            }

            return {
                ...state,
                playgroundFirstLine: newFirstLine,
                playgroundSecondLine: newSecondLine,
                aiHand: newhand,
                aiTurn: false
            }

        default:
            return state
    }
}