import{
    INCOME_CONTRIBUTE_CONTEXT_LIST_REQUEST,
    INCOME_CONTRIBUTE_CONTEXT_LIST_SUCCESS,
    INCOME_CONTRIBUTE_CONTEXT_LIST_FAIL,
    
    OUTCOME_CONTRIBUTE_CONTEXT_LIST_REQUEST,
    OUTCOME_CONTRIBUTE_CONTEXT_LIST_SUCCESS,
    OUTCOME_CONTRIBUTE_CONTEXT_LIST_FAIL,
    
    INCOME_MONEY_CATEGORY_LIST_REQUEST,
    INCOME_MONEY_CATEGORY_LIST_SUCCESS,
    INCOME_MONEY_CATEGORY_LIST_FAIL,
    
    OUTCOME_MONEY_CATEGORY_LIST_REQUEST,
    OUTCOME_MONEY_CATEGORY_LIST_SUCCESS,
    OUTCOME_MONEY_CATEGORY_LIST_FAIL,
    
    INCOME_CONTRIBUTE_CONTEXT_ADD_REQUEST,
    INCOME_CONTRIBUTE_CONTEXT_ADD_SUCCESS,
    INCOME_CONTRIBUTE_CONTEXT_ADD_FAIL,
    
    OUTCOME_CONTRIBUTE_CONTEXT_ADD_REQUEST,
    OUTCOME_CONTRIBUTE_CONTEXT_ADD_SUCCESS,
    OUTCOME_CONTRIBUTE_CONTEXT_ADD_FAIL,
    
    INCOME_CONTRIBUTE_CONTEXT_UPDATE_REQUEST,
    INCOME_CONTRIBUTE_CONTEXT_UPDATE_SUCCESS,
    INCOME_CONTRIBUTE_CONTEXT_UPDATE_FAIL,
    
    OUTCOME_CONTRIBUTE_CONTEXT_UPDATE_REQUEST,
    OUTCOME_CONTRIBUTE_CONTEXT_UPDATE_SUCCESS,
    OUTCOME_CONTRIBUTE_CONTEXT_UPDATE_FAIL,
    
    INCOME_CONTRIBUTE_CONTEXT_DELETE_REQUEST,
    INCOME_CONTRIBUTE_CONTEXT_DELETE_SUCCESS,
    INCOME_CONTRIBUTE_CONTEXT_DELETE_FAIL,
    
    OUTCOME_CONTRIBUTE_CONTEXT_DELETE_REQUEST,
    OUTCOME_CONTRIBUTE_CONTEXT_DELETE_SUCCESS,
    OUTCOME_CONTRIBUTE_CONTEXT_DELETE_FAIL,
    
    
    
    INCOME_CONTRIBUTE_CONTEXT_UPDATE_RESET,
    OUTCOME_CONTRIBUTE_CONTEXT_UPDATE_RESET,
    
    INCOME_MONEY_CATEGORY_LIST_UPDATE_RESET,
    OUTCOME_MONEY_CATEGORY_LIST_UPDATE_RESET,
    
    
    INCOME_MONEY_CATEGORY_ADD_REQUEST,
    INCOME_MONEY_CATEGORY_ADD_SUCCESS,
    INCOME_MONEY_CATEGORY_ADD_FAIL,
    
    OUTCOME_MONEY_CATEGORY_ADD_REQUEST,
    OUTCOME_MONEY_CATEGORY_ADD_SUCCESS,
    OUTCOME_MONEY_CATEGORY_ADD_FAIL,
    
    INCOME_MONEY_CATEGORY_UPDATE_REQUEST,
    INCOME_MONEY_CATEGORY_UPDATE_SUCCESS,
    INCOME_MONEY_CATEGORY_UPDATE_FAIL,
    
    OUTCOME_MONEY_CATEGORY_UPDATE_REQUEST,
    OUTCOME_MONEY_CATEGORY_UPDATE_SUCCESS,
    OUTCOME_MONEY_CATEGORY_UPDATE_FAIL,
    
    INCOME_MONEY_CATEGORY_DELETE_REQUEST,
    INCOME_MONEY_CATEGORY_DELETE_SUCCESS,
    INCOME_MONEY_CATEGORY_DELETE_FAIL,
    
    OUTCOME_MONEY_CATEGORY_DELETE_REQUEST,
    OUTCOME_MONEY_CATEGORY_DELETE_SUCCESS,
    OUTCOME_MONEY_CATEGORY_DELETE_FAIL,
    
    INCOME_MONEY_CATEGORY_DETAIL_REQUEST,
    INCOME_MONEY_CATEGORY_DETAIL_SUCCESS,
    INCOME_MONEY_CATEGORY_DETAIL_FAIL,

    OUTCOME_MONEY_CATEGORY_DETAIL_REQUEST,
    OUTCOME_MONEY_CATEGORY_DETAIL_SUCCESS,
    OUTCOME_MONEY_CATEGORY_DETAIL_FAIL,

    INCOME_CONTRIBUTE_CONTEXT_DETAIL_REQUEST,
    INCOME_CONTRIBUTE_CONTEXT_DETAIL_SUCCESS,
    INCOME_CONTRIBUTE_CONTEXT_DETAIL_FAIL,

    OUTCOME_CONTRIBUTE_CONTEXT_DETAIL_REQUEST,
    OUTCOME_CONTRIBUTE_CONTEXT_DETAIL_SUCCESS,
    OUTCOME_CONTRIBUTE_CONTEXT_DETAIL_FAIL,



}from '../constants/settingConstants'

export const incomeContributeContextListReducers = ( state = { incomeContributeContext:[] }, action) =>{
    switch(action.type){
        case INCOME_CONTRIBUTE_CONTEXT_LIST_REQUEST:
            return { loading : true, incomeContributeContext:[] }
        
        case INCOME_CONTRIBUTE_CONTEXT_LIST_SUCCESS:
            return { loading : false, incomeContributeContext: action.payload }

        case INCOME_CONTRIBUTE_CONTEXT_LIST_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}

export const outcomeContributeContextListReducers = ( state = { outcomeContributeContext:[] }, action) =>{
    switch(action.type){
        case OUTCOME_CONTRIBUTE_CONTEXT_LIST_REQUEST:
            return { loadingoutcomeContributeContextList : true, outcomeContributeContext:[] }
        
        case OUTCOME_CONTRIBUTE_CONTEXT_LIST_SUCCESS:
            return { loadingoutcomeContributeContextList : false, outcomeContributeContext: action.payload }

        case OUTCOME_CONTRIBUTE_CONTEXT_LIST_FAIL:
            return { loadingoutcomeContributeContextList : false, erroroutcomeContributeContextList: action.payload }

        

        default:
            return state    
    }

}

export const incomeMoneyCategoryListReducers = ( state = { incomeMoneyCategory:[] }, action) =>{
    switch(action.type){
        case INCOME_MONEY_CATEGORY_LIST_REQUEST:
            return { loadingincomeMoneyCategoryList : true, incomeMoneyCategory:[] }
        
        case INCOME_MONEY_CATEGORY_LIST_SUCCESS:
            return { loadingincomeMoneyCategoryList : false, incomeMoneyCategory: action.payload }

        case INCOME_MONEY_CATEGORY_LIST_FAIL:
            return { loadingincomeMoneyCategoryList : false, errorincomeMoneyCategoryList: action.payload }

        

        default:
            return state    
    }

}

export const outcomeMoneyCategoryListReducers = ( state = { outcomeMoneyCategory:[] }, action) =>{
    switch(action.type){
        case OUTCOME_MONEY_CATEGORY_LIST_REQUEST:
            return { loadingoutcomeMoneyCategoryList : true, outcomeMoneyCategory:[] }
        
        case OUTCOME_MONEY_CATEGORY_LIST_SUCCESS:
            return { loadingoutcomeMoneyCategoryList : false, outcomeMoneyCategory: action.payload }

        case OUTCOME_MONEY_CATEGORY_LIST_FAIL:
            return { loadingoutcomeMoneyCategoryList : false, erroroutcomeMoneyCategoryList: action.payload }

        

        default:
            return state    
    }

}

export const incomeContributeContextAddReducers = ( state = {  }, action) =>{
    switch(action.type){
        case INCOME_CONTRIBUTE_CONTEXT_ADD_REQUEST:
            return { loading : true }
        
        case INCOME_CONTRIBUTE_CONTEXT_ADD_SUCCESS:
            return { loading : false, income_contribute_context: action.payload }

        case INCOME_CONTRIBUTE_CONTEXT_ADD_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }
}

export const incomeMoneyCategoryAddReducers = ( state = {  }, action) =>{
    switch(action.type){
        case INCOME_MONEY_CATEGORY_ADD_REQUEST:
            return { loading : true }
        
        case INCOME_MONEY_CATEGORY_ADD_SUCCESS:
            return { loading : false, income_money_category: action.payload }

        case INCOME_MONEY_CATEGORY_ADD_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }
}

export const outcomeContributeContextAddReducers = ( state = {  }, action) =>{
    switch(action.type){
        case OUTCOME_CONTRIBUTE_CONTEXT_ADD_REQUEST:
            return { loading : true }
        
        case OUTCOME_CONTRIBUTE_CONTEXT_ADD_SUCCESS:
            return { loading : false, outcome_contribute_context: action.payload }

        case OUTCOME_CONTRIBUTE_CONTEXT_ADD_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }
}

export const outcomeMoneyCategoryAddReducers = ( state = {  }, action) =>{
    switch(action.type){
        case OUTCOME_MONEY_CATEGORY_ADD_REQUEST:
            return { loading : true }
        
        case OUTCOME_MONEY_CATEGORY_ADD_SUCCESS:
            return { loading : false, outcome_money_category: action.payload }

        case OUTCOME_MONEY_CATEGORY_ADD_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }
}

export const incomeContributeContextUpdateReducers = ( state = { income_contribute_context:{} }, action) =>{
    switch(action.type){
        case INCOME_CONTRIBUTE_CONTEXT_UPDATE_REQUEST:
            return { loading : true }
        
        case INCOME_CONTRIBUTE_CONTEXT_UPDATE_SUCCESS:
            return { loading : false, success:true, income_contribute_context: action.payload }

        case INCOME_CONTRIBUTE_CONTEXT_UPDATE_FAIL:
            return { loading : false, error: action.payload }

        case INCOME_CONTRIBUTE_CONTEXT_UPDATE_RESET:
                return { income_contribute_context: {} }

        default:
            return state    
    }
}

export const incomeMoneyCategoryUpdateReducers = ( state = { income_money_category:{} }, action) =>{
    switch(action.type){
        case INCOME_MONEY_CATEGORY_UPDATE_REQUEST:
            return { loading : true }
        
        case INCOME_MONEY_CATEGORY_UPDATE_SUCCESS:
            return { loading : false, success:true, income_money_category: action.payload }

        case INCOME_MONEY_CATEGORY_UPDATE_FAIL:
            return { loading : false, error: action.payload }

        case INCOME_MONEY_CATEGORY_LIST_UPDATE_RESET:
                return { income_money_category: {} }

        default:
            return state    
    }
}

export const outcomeContributeContextUpdateReducers = ( state = { outcome_contribute_context:{} }, action) =>{
    switch(action.type){
        case OUTCOME_CONTRIBUTE_CONTEXT_UPDATE_REQUEST:
            return { loading : true }
        
        case OUTCOME_CONTRIBUTE_CONTEXT_UPDATE_SUCCESS:
            return { loading : false, success:true, outcome_contribute_context: action.payload }

        case OUTCOME_CONTRIBUTE_CONTEXT_UPDATE_FAIL:
            return { loading : false, error: action.payload }

        case OUTCOME_CONTRIBUTE_CONTEXT_UPDATE_RESET:
                return { outcome_contribute_context: {} }

        default:
            return state    
    }
}

export const outcomeMoneyCategoryUpdateReducers = ( state = { outcome_money_category:{} }, action) =>{
    switch(action.type){
        case OUTCOME_MONEY_CATEGORY_UPDATE_REQUEST:
            return { loading : true }
        
        case OUTCOME_MONEY_CATEGORY_UPDATE_SUCCESS:
            return { loading : false, success:true, outcome_money_category: action.payload }

        case OUTCOME_MONEY_CATEGORY_UPDATE_FAIL:
            return { loading : false, error: action.payload }

        case OUTCOME_MONEY_CATEGORY_LIST_UPDATE_RESET:
                return { outcome_money_category: {} }

        default:
            return state    
    }
}



export const incomeContributeContextDetailsReducer = ( state = { incomeContribute:{} }, action) =>{
    switch(action.type){
        case INCOME_CONTRIBUTE_CONTEXT_DETAIL_REQUEST:
            return { loading : true, ...state }
        
        case INCOME_CONTRIBUTE_CONTEXT_DETAIL_SUCCESS:
            console.log(action.payload)
            return { loading : false, incomeContribute: action.payload }

        case INCOME_CONTRIBUTE_CONTEXT_DETAIL_FAIL:
            return { loading : false, error: action.payload }

        case INCOME_CONTRIBUTE_CONTEXT_UPDATE_RESET:
            return {
                loading : false, error: action.payload 
            }

        default:
            return state    
    }

}

export const outcomeContributeContextDetailsReducer = ( state = { outcomeContribute:{} }, action) =>{
    switch(action.type){
        case OUTCOME_CONTRIBUTE_CONTEXT_DETAIL_REQUEST:
            return { loading : true, ...state }
        
        case OUTCOME_CONTRIBUTE_CONTEXT_DETAIL_SUCCESS:
            console.log(action.payload)
            return { loading : false, outcomeContribute: action.payload }

        case OUTCOME_CONTRIBUTE_CONTEXT_DETAIL_FAIL:
            return { loading : false, error: action.payload }

        case OUTCOME_CONTRIBUTE_CONTEXT_UPDATE_RESET:
            return {
                loading : false, error: action.payload 
            }

        default:
            return state    
    }

}

export const incomeMoneyCategoryDetailsReducer = ( state = { incomeMoneyCate:{} }, action) =>{
    switch(action.type){
        case INCOME_MONEY_CATEGORY_DETAIL_REQUEST:
            return { loading : true, ...state }
        
        case INCOME_MONEY_CATEGORY_DETAIL_SUCCESS:
            console.log(action.payload)
            return { loading : false, incomeMoneyCate: action.payload }

        case INCOME_MONEY_CATEGORY_DETAIL_FAIL:
            return { loading : false, error: action.payload }

        case INCOME_MONEY_CATEGORY_LIST_UPDATE_RESET:
            return {
                loading : false, error: action.payload 
            }

        default:
            return state    
    }

}

export const outcomeMoneyCategoryDetailsReducer = ( state = { outcomeMoneyCate:{} }, action) =>{
    switch(action.type){
        case OUTCOME_MONEY_CATEGORY_DETAIL_REQUEST:
            return { loading : true, ...state }
        
        case OUTCOME_MONEY_CATEGORY_DETAIL_SUCCESS:
            console.log(action.payload)
            return { loading : false, outcomeMoneyCate: action.payload }

        case OUTCOME_MONEY_CATEGORY_DETAIL_FAIL:
            return { loading : false, error: action.payload }

        case OUTCOME_MONEY_CATEGORY_LIST_UPDATE_RESET:
            return {
                loading : false, error: action.payload 
            }

        default:
            return state    
    }

}