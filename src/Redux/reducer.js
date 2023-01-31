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
    let deck = array.sort(() => Math.random() - 0.5);
    let trump = array.pop(); //козырь
    let suit = trump.suit

    return {deck, trump, suit}
};

//раздача
function distribution(aiArray, userArray, deckOfCards) {
    let newUserArray = [];
    let newAiArray = [];

  for(let i = aiArray.length; i < 6; i++) {
    newAiArray.push(deckOfCards.pop())
  };

  for(let i = userArray.length; i < 6; i++) {
    newUserArray.push(deckOfCards.pop())
  }

  return {newAiArray, newUserArray, deckOfCards}
};

//проверка кто первый ходит
function turnCheck(userHand, aiHand, suit) {
    //для начала находим все козыри на руках у ИИ и Игрока и их значения
    let aiTrumps = aiHand.filter(item => item.suit === suit).map(item => item.value);

    let userTrumps = userHand.filter(item => item.suit === suit).map(item => item.value);
    console.log(aiTrumps, userTrumps)
    //берём наименьшие карты у обоих игроков и сравниваем их
    let aiMinimalTrump = Math.min(...aiTrumps)
    let userMinimalTrump = Math.min(...userTrumps)
    let turn
    console.log(aiMinimalTrump, userMinimalTrump)
    return (aiMinimalTrump > userMinimalTrump) ? turn = false : turn = true
}

//атака
function attack(line1, line2, hand, action) {
    let index = hand.findIndex((item) => item.id === action.id);
    let selectedCard = hand.splice(index, 1);
    line1.push(selectedCard[0])

    return {hand, line1, line2}
};

//защита ИИ
function aiDefense(line1, line2, hand, trump) {
    let activeCard = line1[line1.length - 1];
    let index = hand.findIndex((item) => (item.suit === activeCard.suit && item.value > activeCard.value) ||
    (item.suit === trump && item.value > activeCard.value));
    if(index < 0) {
        hand = [...hand, ...line2, ...line1]
        line1 = [];
        line2 = [];
        distribution(state.aiHand, state.userHand, state.deck)
    } else {
        let selectedCard = hand.splice(index, 1);
        line2.push(selectedCard[0])
    }

    return {line1, line2, hand}
}

//защита игрока
function userDefense(line1, line2, hand, action, trump) {
    let index = hand.findIndex((item) => item.id === action.id);
    let activeCard = line1[line1.length - 1];
    if((hand[index].suit !== activeCard.suit && hand[index].value < activeCard.value) || (hand[index].suit !== trump)) {
        alert("Неверный ход!");
        return
    }

    let selectedCard = hand.splice(index, 1);
    line2.push(selectedCard[0]);

    return {line1, line2, hand}
}

export const reducer = (state = initialState, action) => {
    console.log('STATE>>>>>', state)
    switch (action.type) {
        case BEAT:
            


            return {...state}
            
        case START:
            let shuffleResult = shuffle(state.deck)
            let shuffledDeck = shuffleResult.deck;
             //увеличиваем значения козырных карт
            shuffledDeck.forEach(element => {
                if(element.suit === shuffleResult.suit) {
                    element.value = element.value * 3
                }
            });
            let distributionResult = distribution(state.aiHand, state.userHand, state.deck)
            let turnCheckResult = turnCheck(distributionResult.newUserArray, distributionResult.newAiArray, shuffleResult.suit)

            return {
                ...state,
                deck: shuffledDeck,
                userHand: distributionResult.newUserArray,
                aiHand: distributionResult.newAiArray,
                trumpCard: shuffleResult.trump,
                trumpSuit: shuffleResult.suit,
                aiTurn: turnCheckResult
            }

        case USER_TURN:
            let userResult
        // проверка на наличие карт на столе и выбор: атаковать или отбиваться
            if (state.playgroundFirstLine.length === state.playgroundSecondLine.length) {
                userResult = attack(state.playgroundFirstLine, state.playgroundSecondLine, state.userHand, action)
            } else {
                userResult = userDefense(state.playgroundFirstLine, state.playgroundSecondLine, state.userHand, action, state.trumpSuit)
            }

            if (state.playgroundFirstLine.length === 0) {
                distribution(state.aiHand, state.userHand, state.deck)
            }

            return {
                ...state,
                playgroundFirstLine: userResult.line1,
                playgroundSecondLine: userResult.line2,
                userHand: userResult.hand,
                aiTurn: true
            }

        case AI_TURN:
            let aiResult
        // проверка на наличие карт на столе и выбор: атаковать или отбиваться
            if (state.playgroundFirstLine.length === state.playgroundSecondLine.length) {
                aiResult = attack(state.playgroundFirstLine, state.playgroundSecondLine, state.aiHand, action)
            } else {
                aiResult = aiDefense(state.playgroundFirstLine, state.playgroundSecondLine , state.aiHand, state.trumpSuit)
            }

            if (state.playgroundFirstLine.length === 0) {
                let newHands = distribution(state.aiHand, state.userHand, state.deck)
            }
          
            return {
                ...state,
                playgroundFirstLine: aiResult.line1,
                playgroundSecondLine: aiResult.line2,
                aiHand: aiResult.hand,
                aiTurn: false
            }

        default:
            return state
    }
}