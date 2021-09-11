import { 
    SCHOLARSHIP_LIST_REQUEST,
    SCHOLARSHIP_LIST_SUCCESS,
    SCHOLARSHIP_LIST_FAIL,

    

    SCHOLARSHIP_ADD_REQUEST,
    SCHOLARSHIP_ADD_SUCCESS,
    SCHOLARSHIP_ADD_FAIL,

    SCHOLARSHIP_UPDATE_REQUEST,
    SCHOLARSHIP_UPDATE_SUCCESS,
    SCHOLARSHIP_UPDATE_FAIL,

    SCHOLARSHIP_DETAIL_REQUEST,
    SCHOLARSHIP_DETAIL_SUCCESS,
    SCHOLARSHIP_DETAIL_FAIL,
    SCHOLARSHIP_UPDATE_RESET,

    SCHOLARSHIP_DELETE_REQUEST,
    SCHOLARSHIP_DELETE_SUCCESS,
    SCHOLARSHIP_DELETE_FAIL,

 } from '../constants/scholarshipConstants'
 export const scholarshipListReducers = ( state = { scholarships:[] }, action) =>{
    switch(action.type){
        case SCHOLARSHIP_LIST_REQUEST:
            return { loading : true, scholarships:[] }
        
        case SCHOLARSHIP_LIST_SUCCESS:
            return { loading : false, scholarships: action.payload }

        case SCHOLARSHIP_LIST_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}


export const scholarshipDetailsReducer = ( state = { scholarship:{} }, action) =>{
    switch(action.type){
        case SCHOLARSHIP_DETAIL_REQUEST:
            return { loading : true, ...state }
        
        case SCHOLARSHIP_DETAIL_SUCCESS:
            console.log(action.payload)
            return { loading : false, scholarship: action.payload }

        case SCHOLARSHIP_DETAIL_FAIL:
            return { loading : false, errorScholarshipDetail: action.payload }

        case SCHOLARSHIP_UPDATE_RESET:
            return {
                loading : false, errorScholarshipDetail: action.payload 
            }

        default:
            return state    
    }

}

export const scholarshipAddReducers = ( state = {  }, action) =>{
    switch(action.type){
        case SCHOLARSHIP_ADD_REQUEST:
            return { loading : true }
        
        case SCHOLARSHIP_ADD_SUCCESS:
            return { loading : false, scholarship: action.payload }

        case SCHOLARSHIP_ADD_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}
export const scholarshipUpdateReducers = ( state = { scholarship:{} }, action) =>{
    switch(action.type){
        case SCHOLARSHIP_UPDATE_REQUEST:
            return { loading : true }
        
        case SCHOLARSHIP_UPDATE_SUCCESS:
            return { loading : false, success:true, scholarship: action.payload }

        case SCHOLARSHIP_UPDATE_FAIL:
            return { loading : false, error: action.payload }

        case SCHOLARSHIP_UPDATE_RESET:
                return { scholarship: {} }

        default:
            return state    
    }

}

