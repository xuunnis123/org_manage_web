import { 
    STUDENTS_LIST_REQUEST,
    STUDENTS_LIST_SUCCESS,
    STUDENTS_LIST_FAIL,

    

    STUDENT_ADD_REQUEST,
    STUDENT_ADD_SUCCESS,
    STUDENT_ADD_FAIL,

    STUDENT_UPDATE_REQUEST,
    STUDENT_UPDATE_SUCCESS,
    STUDENT_UPDATE_FAIL,

    STUDENT_DETAIL_REQUEST,
    STUDENT_DETAIL_SUCCESS,
    STUDENT_DETAIL_FAIL,
    STUDENT_UPDATE_RESET,

    STUDENT_DELETE_REQUEST,
    STUDENT_DELETE_SUCCESS,
    STUDENT_DELETE_FAIL,

 } from '../constants/studentConstants'
 export const studentListReducers = ( state = { students:[] }, action) =>{
    switch(action.type){
        case STUDENTS_LIST_REQUEST:
            return { loading : true, students:[] }
        
        case STUDENTS_LIST_SUCCESS:
            return { loading : false, students: action.payload }

        case STUDENTS_LIST_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}


export const studentDetailsReducer = ( state = { student:{} }, action) =>{
    switch(action.type){
        case STUDENT_DETAIL_REQUEST:
            return { loading : true, ...state }
        
        case STUDENT_DETAIL_SUCCESS:
            console.log(action.payload)
            return { loading : false, student: action.payload }

        case STUDENT_DETAIL_FAIL:
            return { loading : false, error: action.payload }

        case STUDENT_UPDATE_RESET:
            return {
                loading : false, error: action.payload 
            }

        default:
            return state    
    }

}

export const studentAddReducers = ( state = {  }, action) =>{
    switch(action.type){
        case STUDENT_ADD_REQUEST:
            return { loading : true }
        
        case STUDENT_ADD_SUCCESS:
            return { loading : false, student: action.payload }

        case STUDENT_ADD_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}
export const studentUpdateReducers = ( state = { student:{} }, action) =>{
    switch(action.type){
        case STUDENT_UPDATE_REQUEST:
            return { loading : true }
        
        case STUDENT_UPDATE_SUCCESS:
            return { loading : false, success:true, student: action.payload }

        case STUDENT_UPDATE_FAIL:
            return { loading : false, error: action.payload }

        case STUDENT_UPDATE_RESET:
                return { student: {} }

        default:
            return state    
    }

}

