import { useDispatch } from 'react-redux';
import { userTurn } from '../../Redux/actions';


function Card(props) {

    const dispatch = useDispatch();

    const userTurnHandler = () => {
        dispatch(userTurn(props.data.id, props.data.name));
    }; 

    return(
        <img 
            className={props.class} 
            src={props.data.face || props.data} 
            alt='' 
            onClick={props.user ? userTurnHandler : undefined}>
        </img>
    )
}

export default Card