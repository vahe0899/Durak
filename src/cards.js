import clubs6 from './Components/assets/club/cardClubs_6.png';
import clubs7 from './Components/assets/club/cardClubs_7.png';
import clubs8 from './Components/assets/club/cardClubs_8.png';
import clubs9 from './Components/assets/club/cardClubs_9.png';
import clubs10 from './Components/assets/club/cardClubs_10.png';
import clubsJ from './Components/assets/club/cardClubs_J.png';
import clubsQ from './Components/assets/club/cardClubs_Q.png';
import clubsK from './Components/assets/club/cardClubs_K.png';
import clubsA from './Components/assets/club/cardClubs_A.png';
import hearts6 from './Components/assets/heart/cardHearts_6.png';
import hearts7 from './Components/assets/heart/cardHearts_7.png';
import hearts8 from './Components/assets/heart/cardHearts_8.png';
import hearts9 from './Components/assets/heart/cardHearts_9.png';
import hearts10 from './Components/assets/heart/cardHearts_10.png';
import heartsJ from './Components/assets/heart/cardHearts_J.png';
import heartsQ from './Components/assets/heart/cardHearts_Q.png';
import heartsK from './Components/assets/heart/cardHearts_K.png';
import heartsA from './Components/assets/heart/cardHearts_A.png';
import diamonds6 from './Components/assets/diamond/cardDiamonds_6.png';
import diamonds7 from './Components/assets/diamond/cardDiamonds_7.png';
import diamonds8 from './Components/assets/diamond/cardDiamonds_8.png';
import diamonds9 from './Components/assets/diamond/cardDiamonds_9.png';
import diamonds10 from './Components/assets/diamond/cardDiamonds_10.png';
import diamondsJ from './Components/assets/diamond/cardDiamonds_J.png';
import diamondsQ from './Components/assets/diamond/cardDiamonds_Q.png';
import diamondsK from './Components/assets/diamond/cardDiamonds_K.png';
import diamondsA from './Components/assets/diamond/cardDiamonds_A.png';
import spades6 from './Components/assets/spade/cardSpades_6.png';
import spades7 from './Components/assets/spade/cardSpades_7.png';
import spades8 from './Components/assets/spade/cardSpades_8.png';
import spades9 from './Components/assets/spade/cardSpades_9.png';
import spades10 from './Components/assets/spade/cardSpades_10.png';
import spadesJ from './Components/assets/spade/cardSpades_J.png';
import spadesQ from './Components/assets/spade/cardSpades_Q.png';
import spadesK from './Components/assets/spade/cardSpades_K.png';
import spadesA from './Components/assets/spade/cardSpades_A.png';

let cards = [
    {id: 1, value: 6, face: clubs6, name: 'six', suit: 'clubs'},
    {id: 2, value: 7, face: clubs7, name: 'seven', suit: 'clubs'},
    {id: 3, value: 8, face: clubs8, name: 'eight', suit: 'clubs'},
    {id: 4, value: 9, face: clubs9, name: 'nine', suit: 'clubs'},
    {id: 5, value: 10, face: clubs10, name: 'ten', suit: 'clubs'},
    {id: 6, value: 11, face: clubsJ, name: 'jack', suit: 'clubs'},
    {id: 7, value: 12, face: clubsQ, name: 'queen', suit: 'clubs'},
    {id: 8, value: 14, face: clubsK, name: 'king', suit: 'clubs'},
    {id: 9, value: 15, face: clubsA, name: 'ace', suit: 'clubs'},
    {id: 10, value: 6, face: spades6, name: 'six', suit: 'spades'},
    {id: 11, value: 7, face: spades7, name: 'seven', suit: 'spades'},
    {id: 12, value: 8, face: spades8, name: 'eight', suit: 'spades'},
    {id: 13, value: 9, face: spades9, name: 'nine', suit: 'spades'},
    {id: 14, value: 10, face: spades10, name: 'ten', suit: 'spades'},
    {id: 15, value: 11, face: spadesJ, name: 'jack', suit: 'spades'},
    {id: 16, value: 12, face: spadesQ, name: 'queen', suit: 'spades'},
    {id: 17, value: 14, face: spadesK, name: 'king', suit: 'spades'},
    {id: 18, value: 15, face: spadesA, name: 'ace', suit: 'spades'},
    {id: 19, value: 6, face: hearts6, name: 'six', suit: 'hearts'},
    {id: 20, value: 7, face: hearts7, name: 'seven', suit: 'hearts'},
    {id: 21, value: 8, face: hearts8, name: 'eight', suit: 'hearts'},
    {id: 22, value: 9, face: hearts9, name: 'nine', suit: 'hearts'},
    {id: 23, value: 10, face: hearts10, name: 'ten', suit: 'hearts'},
    {id: 24, value: 11, face: heartsJ, name: 'jack', suit: 'hearts'},
    {id: 25, value: 12, face: heartsQ, name: 'queen', suit: 'hearts'},
    {id: 26, value: 14, face: heartsK, name: 'king', suit: 'hearts'},
    {id: 27, value: 15, face: heartsA, name: 'ace', suit: 'hearts'},
    {id: 28, value: 6, face: diamonds6, name: 'six', suit: 'diamonds'},
    {id: 29, value: 7, face: diamonds7, name: 'seven', suit: 'diamonds'},
    {id: 30, value: 8, face: diamonds8, name: 'eight', suit: 'diamonds'},
    {id: 31, value: 9, face: diamonds9, name: 'nine', suit: 'diamonds'},
    {id: 32, value: 10, face: diamonds10, name: 'ten', suit: 'diamonds'},
    {id: 33, value: 11, face: diamondsJ, name: 'jack', suit: 'diamonds'},
    {id: 34, value: 12, face: diamondsQ, name: 'queen', suit: 'diamonds'},
    {id: 35, value: 14, face: diamondsK, name: 'king', suit: 'diamonds'},
    {id: 36, value: 15, face: diamondsA, name: 'ace', suit: 'diamonds'},
]

export default cards