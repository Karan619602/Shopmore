import { LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS ,
    REGISTER_USER_REQUEST,
    REGISTER_USER_FAIL,
     REGISTER_USER_SUCCESS,
     LOAD_USER_REQUEST,
     LOAD_USER_SUCCESS,
     LOAD_USER_FAIL,
   LOGOUT_SUCCESS,
   LOGOUT_FAIL,
UPDATE_PROFILE_REQUEST,
UPDATE_PROFILE_SUCCESS,
UPDATE_PROFILE_FAIL,
UPDATE_PROFILE_RESET,
FORGOT_PASSWORD_REQUEST,
FORGOT_PASSWORD_SUCCESS,
FORGOT_PASSWORD_FAIL,
RESET_PASSWORD_REQUEST,
RESET_PASSWORD_SUCCESS,
RESET_PASSWORD_FAIL} from "../constant/userconstants";



export const authReducer=(state={user:{}},action)=>{
    switch(action.type)
    {

        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return{
                loading:true,
                isAuthenicated:false,
            }

            case LOGIN_SUCCESS:
            case REGISTER_USER_SUCCESS:
            case LOAD_USER_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    isAuthenicated:true,
                     user:action.payload
                }

                case LOGOUT_SUCCESS:
                    return {
                        loading:false,
                        isAuthenicated:false,
                        user:null
                    }
                case LOAD_USER_FAIL:
                    return{
                        loading:false,
                        isAuthenicated:false,
                        user:null,
                        error:action.payload
                    }
                    case LOGOUT_FAIL:
                        return{
                            ...state,error:action.payload
                        }
                case LOGIN_FAIL:
                case REGISTER_USER_FAIL:
                    return{
                        ...state,
                        loading:false,
                        isAuthenicated:false,
                        user:null,
                        error:action.payload
                    }
                    case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:action.payload
                        }
    default:
        return state;

    }
}

export const userReducer=(state={},action)=>{
    switch(action.type){

    case UPDATE_PROFILE_REQUEST:
        return{
            ...state,
            loading:true,
            isAuthenicated:true,

        }
        case UPDATE_PROFILE_SUCCESS:
            return{
             ...state,
             loading:false,
             isUpdated:action.payload
            }
            case UPDATE_PROFILE_RESET:
                return {
                    ...state,
                    isUpdated:false
                }
            case UPDATE_PROFILE_FAIL:
                return {
                    ...state,loading:false,
                    error:action.payload
                }
                case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:action.payload
                        }
      default:
          return state
    }
}

export const forgotpasswordReducer=(state={},action)=>{
    switch(action.type){

    case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
        return{
            ...state,
            loading:true,
            error:null
            
        }
        case FORGOT_PASSWORD_SUCCESS:
            return{
             ...state,
            loading:false,
             message:action.payload
            }
            case RESET_PASSWORD_SUCCESS:
                return{
                    ...state,
                    success:action.payload
                }
            case FORGOT_PASSWORD_FAIL:
                case RESET_PASSWORD_FAIL:
                return {
                    ...state,
                    loading:false,
                   error:action.payload
                }
                case CLEAR_ERRORS:
                        return{
                            ...state,
                            error:action.payload
                        }
            
      default:
          return state
    }
}