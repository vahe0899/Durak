import './_Table.css'
import { useDispatch, useSelector } from 'react-redux';
import { beat, start, aiTurn } from '../../Redux/actions';
import Card from '../Card/Card';

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

    const beatHandler = () => {
        dispatch(beat());
    }; 

    const startGameHandler = () => {
        dispatch(start());
    };  

    const aiTurnHandler = () => {
        dispatch(aiTurn());
    };  

    return(
    <div className="container">
        <div className="deck">
            {trump && <Card data={trump}/>}
        </div>
        <div className="table">
            <button onClick={startGameHandler}>Начать игру</button>
            <div className="ai-area">
                <div className="ai-hand" onClick={isAiTurn ? aiTurnHandler() : undefined}>
                    {aiHand.map((item) => 
                    <Card data={item} key={item.id}/>)}
                </div>
            </div>
            <div className="playground">
                <div className="first-line">
                    {firstLine.map((item) => 
                <Card data={item} key={item.id}/>)}
                </div>
                <div className="second-line">
                    {secondLine.map((item) => 
                <Card data={item} key={item.id}/>)}
                </div>
            </div>
            <div className="user-area">
                <div className="user-hand">
                    {userHand.map((item) => 
                    <Card data={item} key={item.id} user={true}/>)}
                </div>
            </div>
        </div>
        <button className="beat" onClick={beatHandler}>Бито</button>
    </div>
    )
}

export default Table 