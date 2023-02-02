import './_Table.css'
import { useDispatch, useSelector } from 'react-redux';
import { beat, aiTurn, take } from '../../Redux/actions';
import Card from '../Card/Card';
import { useEffect } from 'react';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import Confetti from 'react-confetti'

function Table() {
    const dispatch = useDispatch();

    const back = useSelector(state => {
        return state.back
    });

    const deck = useSelector(state => {
        return state.deck
    });

    const firstLine = useSelector(state => {
        return state.playgroundFirstLine
    });

    const secondLine = useSelector(state => {
        return state.playgroundSecondLine
    });

    const userHand = useSelector(state => {
        return state.userHand
    });

    const aiHand = useSelector(state => {
        return state.aiHand
    });

    const trump = useSelector(state => {
        return state.trumpCard
    });

    const isAiTurn = useSelector(state => {
        return state.aiTurn
    });

    const modalWindow = useSelector(state => {
        return state.modalWindow
    });

    const userWin = useSelector(state => {
        return state.isUserWin
    });

    const beatHandler = () => {
        dispatch(beat());
    }; 

    const aiTurnHandler = () => {
        dispatch(aiTurn());
    };  

    const takeHandler = () => {
        dispatch(take());
    };  

    useEffect(() => {
        if(isAiTurn) {
            return aiTurnHandler()
        }
    })

    return(
    <div className="container">
        {userWin && <Confetti/>}
        {modalWindow && <ModalWindow />}
        <div className="deck">
            <div className="cards">
                {deck.length !== 0 && trump && <Card data={trump} class={'card'}/>}
                {deck.length > 1 && trump && <Card data={back} class={'horizontal-card'}/>}
            </div>
        </div>
        <div className="table">
            <div className="ai-area">
                <div className="ai-hand">
                    {aiHand.map((item) => 
                    <Card data={back} key={item.id} class={'card'}/>)}
                </div>
            </div>
            <div className="playground">
                <div className="first-line">
                    {firstLine.map((item) => 
                <Card data={item} key={item.id} class={'card'}/>)}
                </div>
                <div className="second-line">
                    {secondLine.map((item) => 
                <Card data={item} key={item.id} class={'card'}/>)}
                </div>
            </div>
            <div className="user-area">
                <div className="user-hand">
                    {userHand.map((item) => 
                    <Card data={item} key={item.id} user={true} class={'card'}/>)}
                </div>
            </div>
        </div>
        <div className="buttons">
            {trump && <button className="btn" onClick={beatHandler}>Бито</button>}
            {trump && <button className="btn" onClick={takeHandler}>Взять</button>}
        </div>
    </div>
    )
}

export default Table 