import { 
    MEMBERS_LIST_REQUEST,
    MEMBERS_LIST_SUCCESS,
    MEMBERS_LIST_FAIL,

    

    MEMBER_ADD_REQUEST,
    MEMBER_ADD_SUCCESS,
    MEMBER_ADD_FAIL,

    MEMBER_UPDATE_REQUEST,
    MEMBER_UPDATE_SUCCESS,
    MEMBER_UPDATE_FAIL,

    MEMBER_DETAIL_REQUEST,
    MEMBER_DETAIL_SUCCESS,
    MEMBER_DETAIL_FAIL,
    MEMBER_UPDATE_RESET,

    MEMBER_DELETE_REQUEST,
    MEMBER_DELETE_SUCCESS,
    MEMBER_DELETE_FAIL,

 } from '../constants/memberConstants'
 export const memberListReducers = ( state = { members:[] }, action) =>{
    switch(action.type){
        case MEMBERS_LIST_REQUEST:
            return { loading : true, members:[] }
        
        case MEMBERS_LIST_SUCCESS:
            return { loading : false, members: action.payload }

        case MEMBERS_LIST_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}


export const memberDetailsReducer = ( state = { member:{} }, action) =>{
    switch(action.type){
        case MEMBER_DETAIL_REQUEST:
            return { loading : true, ...state }
        
        case MEMBER_DETAIL_SUCCESS:
            console.log(action.payload)
            return { loading : false, member: action.payload }

        case MEMBER_DETAIL_FAIL:
            return { loading : false, error: action.payload }

        case MEMBER_UPDATE_RESET:
            return {
                loading : false, error: action.payload 
            }

        default:
            return state    
    }

}

export const memberAddReducers = ( state = {  }, action) =>{
    switch(action.type){
        case MEMBER_ADD_REQUEST:
            return { loading : true }
        
        case MEMBER_ADD_SUCCESS:
            return { loading : false, member: action.payload }

        case MEMBER_ADD_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}
export const memberUpdateReducers = ( state = { member:{} }, action) =>{
    switch(action.type){
        case MEMBER_UPDATE_REQUEST:
            return { loading : true }
        
        case MEMBER_UPDATE_SUCCESS:
            return { loading : false, success:true, member: action.payload }

        case MEMBER_UPDATE_FAIL:
            return { loading : false, error: action.payload }

        case MEMBER_UPDATE_RESET:
                return { member: {} }

        default:
            return state    
    }

}

