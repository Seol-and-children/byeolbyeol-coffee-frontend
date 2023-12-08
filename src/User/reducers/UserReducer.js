import { 
    LOGIN_USER, SIGNUP_USER
} from '../Component/types'

export default function (state = {}, action) {
    switch(action.tpye) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            break;
        case SIGNUP_USER:
            return { ...state, signup : action.payload}
            break;
        default:
            return state;
    }
}