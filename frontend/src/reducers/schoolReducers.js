import { 
    SCHOOLS_LIST_REQUEST,
    SCHOOLS_LIST_SUCCESS,
    SCHOOLS_LIST_FAIL,

    

    SCHOOL_ADD_REQUEST,
    SCHOOL_ADD_SUCCESS,
    SCHOOL_ADD_FAIL,

    SCHOOL_UPDATE_REQUEST,
    SCHOOL_UPDATE_SUCCESS,
    SCHOOL_UPDATE_FAIL,

    SCHOOL_DETAIL_REQUEST,
    SCHOOL_DETAIL_SUCCESS,
    SCHOOL_DETAIL_FAIL,
    SCHOOL_UPDATE_RESET,

    SCHOOL_DELETE_REQUEST,
    SCHOOL_DELETE_SUCCESS,
    SCHOOL_DELETE_FAIL,

 } from '../constants/schoolConstants'
 export const schoolListReducers = ( state = { schools:[] }, action) =>{
    switch(action.type){
        case SCHOOLS_LIST_REQUEST:
            return { loading : true, schools:[] }
        
        case SCHOOLS_LIST_SUCCESS:
            return { loading : false, schools: action.payload }

        case SCHOOLS_LIST_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}


export const schoolDetailsReducer = ( state = { school:{} }, action) =>{
    switch(action.type){
        case SCHOOL_DETAIL_REQUEST:
            return { loading : true, ...state }
        
        case SCHOOL_DETAIL_SUCCESS:
            return { loading : false, school: action.payload }

        case SCHOOL_DETAIL_FAIL:
            return { loading : false, error: action.payload }

        case SCHOOL_DELETE_REQUEST:
            return {
                loading : false, error: action.payload 
            }

        default:
            return state    
    }

}

export const schoolAddReducers = ( state = {  }, action) =>{
    switch(action.type){
        case SCHOOL_ADD_REQUEST:
            return { loading : true }
        
        case SCHOOL_ADD_SUCCESS:
            return { loading : false, school: action.payload }

        case SCHOOL_ADD_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}
export const schoolUpdateReducers = ( state = { school:{} }, action) =>{
    switch(action.type){
        case SCHOOL_UPDATE_REQUEST:
            return { loading : true }
        
        case SCHOOL_UPDATE_SUCCESS:
            return { loading : false, success:true, school: action.payload }

        case SCHOOL_UPDATE_FAIL:
            return { loading : false, error: action.payload }

        case SCHOOL_UPDATE_RESET:
                return { product: {} }

        default:
            return state    
    }

}

