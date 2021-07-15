import { 
    SCHOOLS_LIST_REQUEST,
    SCHOOLS_LIST_SUCCESS,
    SCHOOLS_LIST_FAIL,

    SCHOOL_REQUEST,
    SCHOOL_REQUEST_SUCCESS,
    SCHOOL_REQUEST_FAIL,

    SCHOOL_ADD_REQUEST,
    SCHOOL_ADD_SUCCESS,
    SCHOOL_ADD_FAIL,

    SCHOOL_UPDATE_REQUEST,
    SCHOOL_UPDATE_SUCCESS,
    SCHOOL_UPDATE_FAIL,

 } from '../constants/schoolConstants'

 export const schoolListReducers = ( state = {  }, action) =>{
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


export const schoolSelectReducers = ( state = {  }, action) =>{
    switch(action.type){
        case SCHOOL_REQUEST:
            return { loading : true }
        
        case SCHOOL_REQUEST_SUCCESS:
            return { loading : false, userInfo: action.payload }

        case SCHOOL_REQUEST_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}

export const schoolAddReducers = ( state = {  }, action) =>{
    switch(action.type){
        case SCHOOL_ADD_REQUEST:
            return { loading : true }
        
        case SCHOOL_ADD_SUCCESS:
            return { loading : false, userInfo: action.payload }

        case SCHOOL_ADD_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}
export const schoolUpdateReducers = ( state = {  }, action) =>{
    switch(action.type){
        case SCHOOL_UPDATE_REQUEST:
            return { loading : true }
        
        case SCHOOL_UPDATE_SUCCESS:
            return { loading : false, userInfo: action.payload }

        case SCHOOL_UPDATE_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}