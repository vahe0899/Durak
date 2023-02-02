import cards from "../cards";
import {BEAT, START, USER_TURN, AI_TURN, TAKE} from "./types";
import back from '../Components/assets/cardBackRed.png';
import { aiTurn } from "./actions";

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
    deck.unshift(trump)

    return {deck, trump, suit}
};

//раздача
function distribution(aiArray, userArray, deckOfCards) {
    let newUserArray = [];
    let newAiArray = [];

  for(let i = aiArray.length; i < 6; i++) {
    if(deckOfCards.length === 0) break
    newAiArray.push(deckOfCards.pop())
  };

  for(let i = userArray.length; i < 6; i++) {
    if(deckOfCards.length === 0) break
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

//атака ИИ
function aiAttack(line1, line2, hand, deck, hand2) {
    let index;
    let selectedCard;
    if(line1.length === 0) {
        index = Math.round(Math.random()*hand.length);
        selectedCard = hand.splice(index, 1);
        line1.push(selectedCard[0]);
    } else {
        let names = [...line1.map(item => item.name), ...line2.map(item => item.name)]
        index = hand.findIndex((item) => (names.includes(item.name)));
        if(index === -1) {
            alert('Бито')
            let newHands = distribution(hand, hand2, deck)
            hand = [...hand, ...newHands.newAiArray];
            hand2 = [...hand2, ...newHands.newUserArray];
            let line1 = [];
            let line2 = [];
            return {hand, line1, line2, hand2}
        } else {
            selectedCard = hand.splice(index, 1);
            line1.push(selectedCard[0]);
        }
    }

    return {hand, line1, line2, hand2}
};

//атака Игрока
function userAttack(line1, line2, hand, action, hand2) {
    let index
    let selectedCard
    if(line1.length === 0) {
        index = hand.findIndex((item) => item.id === action.id);
        selectedCard = hand.splice(index, 1);
        line1.push(selectedCard[0])
        return {hand, line1, line2, hand2}
    } else {
        let names = [...line1.map(item => item.name), ...line2.map(item => item.name)]
        index = hand.findIndex((item) => (item.id === action.id) && (names.includes(action.name)));
        if(index === -1) {
            alert('Неверный ход! На столе нет таких карт')
        } else {
            selectedCard = hand.splice(index, 1);
            line1.push(selectedCard[0])
            return {hand, line1, line2, hand2}
        }
    }
};

//Взять
function take(hand, hand2, line1, line2) {
    hand = [...hand, ...line2, ...line1]
    line1 = [];
    line2 = [];

    return {hand, hand2, line1, line2}
}


//защита ИИ
function aiDefense(line1, line2, hand, trump, hand2, deck) {
    let activeCard = line1[line1.length - 1];
    let index = hand.findIndex((item) => (item.suit === activeCard.suit && item.value > activeCard.value) ||
    (item.suit === trump && item.value > activeCard.value));
    if(index < 0) {
        let result = distribution(hand, hand2, deck)
        hand2 = [...result.newUserArray, ...hand2]
        return take(hand, hand2, line1, line2)
    } else {
        let selectedCard = hand.splice(index, 1);
        line2.push(selectedCard[0])
    }

    return {line1, line2, hand, hand2, deck}
}

//защита игрока
function userDefense(line1, line2, hand, action, trump) {
    let index = hand.findIndex((item) => item.id === action.id);
    let activeCard = line1[line1.length - 1];
    if((hand[index].suit !== activeCard.suit && hand[index].suit !== trump) || (hand[index].value < activeCard.value)) {
        alert("Неверный ход!");
        return
    }

    let selectedCard = hand.splice(index, 1);
    line2.push(selectedCard[0]);

    return {line1, line2, hand}
}

export const reducer = (state = initialState, action) => {
    // console.log('STATE>>>>>', state)
    // console.log('ACTION>>>>>', action)
    switch (action.type) {
        case BEAT:
            if (state.playgroundFirstLine.length === 0) {
                alert("Поздравляю! Вы скинули пустоту в бито!")
                return {...state}
            } else if(state.playgroundFirstLine.length > state.playgroundSecondLine.length) {
                alert("Противник всё видит и осуждает")
                return {...state}
            } else {
                let newHands = distribution(state.aiHand, state.userHand, state.deck)
                let line1 = [];
                let line2 = [];
                return {
                    ...state,
                    aiHand: [...state.aiHand, ...newHands.newAiArray],
                    userHand: [...state.userHand, ...newHands.newUserArray],
                    deck: newHands.deckOfCards,
                    playgroundFirstLine: line1,
                    playgroundSecondLine: line2,
                    aiTurn: true
                }
            }
            
        case TAKE:
            if (state.playgroundFirstLine.length === 0) {
                alert("Поздравляю! Вы взяли ничего!")
                return {...state}
            } else {
                let takeResult = take(state.userHand, state.aiHand, state.playgroundFirstLine, state.playgroundSecondLine)
                var distributionResult = distribution(state.aiHand, state.userHand, state.deck)
                return {
                    ...state,
                    userHand: takeResult.hand,
                    aiHand: [...distributionResult.newAiArray, ...state.aiHand],
                    playgroundFirstLine: takeResult.line1,
                    playgroundSecondLine: takeResult.line2,
                    deck: distributionResult.deckOfCards,
                    aiTurn: true
                }
            }

        case START:
            let shuffleResult = shuffle(state.deck)
            let shuffledDeck = shuffleResult.deck;
             //увеличиваем значения козырных карт
            shuffledDeck.forEach(element => {
                if(element.suit === shuffleResult.suit) {
                    element.value = element.value * 3
                }
            });
            var distributionResult = distribution(state.aiHand, state.userHand, state.deck)
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
        // Проверка выиграл ли кто-нибудь    
            if(state.deck.length === 0 && state.aiHand.length === 0) {
                alert('Конец игры ежже. Вы проиграли :(')
                return {...state}
            } else if(state.deck.length === 0 && state.userHand.length === 0) {
                alert('Конец игры ежже. Вы выиграли :)')
                return {...state}
            } else {
                let userResult
            // проверка на наличие карт на столе и выбор: атаковать или отбиваться
                if (state.playgroundFirstLine.length === state.playgroundSecondLine.length) {
                    userResult = userAttack(state.playgroundFirstLine, state.playgroundSecondLine, state.userHand, action, state.aiHand)
                } else {
                    userResult = userDefense(state.playgroundFirstLine, state.playgroundSecondLine, state.userHand, action, state.trumpSuit)
                }

                if (userResult === undefined) {
                    return {...state}
                } else {
                    return {
                        ...state,
                        playgroundFirstLine: userResult.line1,
                        playgroundSecondLine: userResult.line2,
                        userHand: userResult.hand,
                        aiTurn: true
                    }
                }
            }

        case AI_TURN:
        // Проверка выиграл ли кто-нибудь    
            if(state.deck.length === 0 && state.aiHand.length === 0) {
                alert('Конец игры ежже. Вы проиграли :(')
                return {
                    ...state,
                    aiTurn: false
                }
            } else if(state.deck.length === 0 && state.userHand.length === 0) {
                alert('Конец игры ежже. Вы выиграли :)')
                return {
                    ...state,
                    aiTurn: false
                }
            } else {
                let aiResult
            // проверка на наличие карт на столе и выбор: атаковать или отбиваться
                if (state.playgroundFirstLine.length === state.playgroundSecondLine.length) {
                    aiResult = aiAttack(state.playgroundFirstLine, state.playgroundSecondLine, state.aiHand, state.deck, state.userHand)
                } else {
                    aiResult = aiDefense(state.playgroundFirstLine, state.playgroundSecondLine , state.aiHand, state.trumpSuit, state.userHand, state.deck)
                }
            
                return {
                    ...state,
                    playgroundFirstLine: aiResult.line1,
                    playgroundSecondLine: aiResult.line2,
                    aiHand: aiResult.hand,
                    userHand: aiResult.hand2,
                    aiTurn: false
                }
            }

        default:
            return state
    }
}