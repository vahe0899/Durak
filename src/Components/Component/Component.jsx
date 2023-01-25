import '../Component/_Component.css'
import { useDispatch, useSelector } from 'react-redux';
import { action } from '../../Redux/actions';
import { useEffect } from 'react';

function Component() {

    const dispatch = useDispatch();

    const valueFromState = useSelector(state => {
        return state // Путь до переменной в state
    });

    const handler = () => {
        dispatch(action());
    };  

    const handler2 = (event) => {
        dispatch(action(event.target.value));
    }; 

    return(
    <div className="container">
        <button className="refresh" onClick={handler}/>
    </div>
    )
}

export default Component 