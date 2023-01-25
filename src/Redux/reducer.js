import {TYPE} from "./types";

const initialState = {

};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE:
            return {...state}
            
        default:
            return state
    }
}