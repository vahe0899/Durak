import { useDispatch } from 'react-redux';
import { userTurn } from '../../Redux/actions';


function Card(props) {

    const dispatch = useDispatch();

    const userTurnHandler = () => {
        dispatch(userTurn(props.data.id));
    }; 

    return(
        <img 
            className="card" 
            src={props.data.face} 
            alt='' 
            onClick={props.user ? userTurnHandler : undefined}>
        </img>
    )
}

export default Card