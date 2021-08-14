import { 
    SEMESTERS_LIST_REQUEST,
    SEMESTERS_LIST_SUCCESS,
    SEMESTERS_LIST_FAIL,

    

    SEMESTER_ADD_REQUEST,
    SEMESTER_ADD_SUCCESS,
    SEMESTER_ADD_FAIL,

    SEMESTER_UPDATE_REQUEST,
    SEMESTER_UPDATE_SUCCESS,
    SEMESTER_UPDATE_FAIL,

    SEMESTER_DETAIL_REQUEST,
    SEMESTER_DETAIL_SUCCESS,
    SEMESTER_DETAIL_FAIL,
    SEMESTER_UPDATE_RESET,

    SEMESTER_DELETE_REQUEST,
    SEMESTER_DELETE_SUCCESS,
    SEMESTER_DELETE_FAIL,

 } from '../constants/semesterConstants'
 export const semesterListReducers = ( state = { semesters:[] }, action) =>{
    switch(action.type){
        case SEMESTERS_LIST_REQUEST:
            return { loading : true, semesters:[] }
        
        case SEMESTERS_LIST_SUCCESS:
            return { loading : false, semesters: action.payload }

        case SEMESTERS_LIST_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}


export const semesterDetailsReducer = ( state = { semester:{} }, action) =>{
    switch(action.type){
        case SEMESTER_DETAIL_REQUEST:
            return { loading : true, ...state }
        
        case SEMESTER_DETAIL_SUCCESS:
           
            return { loading : false, semester: action.payload }

        case SEMESTER_DETAIL_FAIL:
            return { loading : false, error: action.payload }

        case SEMESTER_UPDATE_RESET:
            return {
                loading : false, error: action.payload 
            }

        default:
            return state    
    }

}

export const semesterAddReducers = ( state = {  }, action) =>{
    switch(action.type){
        case SEMESTER_ADD_REQUEST:
            return { loading : true }
        
        case SEMESTER_ADD_SUCCESS:
            return { loading : false, semester: action.payload }

        case SEMESTER_ADD_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}
export const semesterUpdateReducers = ( state = { semester:{} }, action) =>{
    switch(action.type){
        case SEMESTER_UPDATE_REQUEST:
            return { loading : true }
        
        case SEMESTER_UPDATE_SUCCESS:
            return { loading : false, success:true, semester: action.payload }

        case SEMESTER_UPDATE_FAIL:
            return { loading : false, error: action.payload }

        case SEMESTER_UPDATE_RESET:
                return { semester: {} }

        default:
            return state    
    }

}

