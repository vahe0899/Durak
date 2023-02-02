import { useDispatch, useSelector } from 'react-redux';
import './_ModalWindow.css'
import { start } from '../../Redux/actions';

export function ModalWindow() {

    const dispatch = useDispatch();

    const modalText = useSelector(state => {
        return state.modalText
    });

    const startGameHandler = () => {
        dispatch(start());
    };  

    return (
        <div className="modal">
            <div className="dialogue">
                <div className="txt">{modalText}</div>
                <button className="btn" onClick={startGameHandler}>Начать игру</button>
            </div>
        </div>
    )
}