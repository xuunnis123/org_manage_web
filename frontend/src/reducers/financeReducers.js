import { 
     FINANCE_LIST_REQUEST,
     FINANCE_LIST_SUCCESS,
     FINANCE_LIST_FAIL, 
    
     INCOME_LIST_REQUEST,
     INCOME_LIST_SUCCESS,
     INCOME_LIST_FAIL,
    
     OUTCOME_LIST_REQUEST,
     OUTCOME_LIST_SUCCESS,
     OUTCOME_LIST_FAIL,
    
     INCOME_ADD_REQUEST,
     INCOME_ADD_SUCCESS,
     INCOME_ADD_FAIL,
    
     OUTCOME_ADD_REQUEST,
     OUTCOME_ADD_SUCCESS,
     OUTCOME_ADD_FAIL,
    
     INCOME_UPDATE_REQUEST,
     INCOME_UPDATE_SUCCESS,
     INCOME_UPDATE_FAIL,
    
     OUTCOME_UPDATE_REQUEST,
     OUTCOME_UPDATE_SUCCESS,
     OUTCOME_UPDATE_FAIL,
    
     INCOME_DETAIL_REQUEST,
     INCOME_DETAIL_SUCCESS,
     INCOME_DETAIL_FAIL,
    
     OUTCOME_DETAIL_REQUEST,
     OUTCOME_DETAIL_SUCCESS,
     OUTCOME_DETAIL_FAIL,
    
     INCOME_UPDATE_RESET,
     OUTCOME_UPDATE_RESET,
    
     INCOME_DELETE_REQUEST,
     INCOME_DELETE_SUCCESS,
     INCOME_DELETE_FAIL,
    
     OUTCOME_DELETE_REQUEST,
     OUTCOME_DELETE_SUCCESS,
     OUTCOME_DELETE_FAIL,

     INCOME_SUM_REQUEST,
     INCOME_SUM_SUCCESS,
     INCOME_SUM_FAIL,

     OUTCOME_SUM_REQUEST,
     OUTCOME_SUM_SUCCESS,
     OUTCOME_SUM_FAIL,

     OUTCOME_ADD_ITEM,
     OUTCOME_REMOVE_ITEM,



 } from '../constants/financeConstants'


 export const financeListReducers = ( state = { finance:[] }, action) =>{
    switch(action.type){
        case FINANCE_LIST_REQUEST:
            return { loading : true, finance:[] }
        
        case FINANCE_LIST_SUCCESS:
            return { loading : false, finance: action.payload }

        case FINANCE_LIST_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}
export const incomeSumReducers = ( state = { incomesum:[] }, action) =>{
    switch(action.type){
        case INCOME_SUM_REQUEST:
            return { loading : true, incomesum:[] }
        
        case INCOME_SUM_SUCCESS:
            return { loading : false, incomesum: action.payload }

        case INCOME_SUM_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}
export const outcomeSumReducers = ( state = { outcomesum:[] }, action) =>{
    switch(action.type){
        case OUTCOME_SUM_REQUEST:
            return { loading : true, outcomesum:[] }
        
        case OUTCOME_SUM_SUCCESS:
            return { loading : false, outcomesum: action.payload }

        case OUTCOME_SUM_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}
export const incomeListReducers = ( state = { incomes:[] }, action) =>{
    switch(action.type){
        case INCOME_LIST_REQUEST:
            return { loading : true, incomes:[] }
        
        case INCOME_LIST_SUCCESS:
            return { loading : false, incomes: action.payload }

        case INCOME_LIST_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}

export const outcomeListReducers = ( state = { outcomes:[] }, action) =>{
    switch(action.type){
        case OUTCOME_LIST_REQUEST:
            return { loading : true, outcomes:[] }
        
        case OUTCOME_LIST_SUCCESS:
            return { loading : false, outcomes: action.payload }

        case OUTCOME_LIST_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}

export const incomeDetailsReducer = ( state = { income:{} }, action) =>{
    switch(action.type){
        case INCOME_DETAIL_REQUEST:
            return { loading : true, ...state }
        
        case INCOME_DETAIL_SUCCESS:
            console.log(action.payload)
            return { loading : false, income: action.payload }

        case INCOME_DETAIL_FAIL:
            return { loading : false, error: action.payload }

        case INCOME_UPDATE_RESET:
            return {
                loading : false, error: action.payload 
            }

        default:
            return state    
    }

}

export const outcomeDetailsReducer = ( state = { outcome:{} }, action) =>{
    switch(action.type){
        case OUTCOME_DETAIL_REQUEST:
            return { loading : true, ...state }
        
        case OUTCOME_DETAIL_SUCCESS:
            console.log(action.payload)
            return { loading : false, outcome: action.payload }

        case OUTCOME_DETAIL_FAIL:
            return { loading : false, errorOutcomeDetail: action.payload }

        case OUTCOME_UPDATE_RESET:
            return {
                loading : false, errorOutcomeDetail: action.payload 
            }

        default:
            return state    
    }

}

export const incomeAddReducers = ( state = {  }, action) =>{
    switch(action.type){
        case INCOME_ADD_REQUEST:
            return { loading : true }
        
        case INCOME_ADD_SUCCESS:
            return { loading : false, income: action.payload }

        case INCOME_ADD_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}
export const outcomeAddReducers = ( state = {  }, action) =>{
    switch(action.type){
        case OUTCOME_ADD_REQUEST:
            return { loading : true }
        
        case OUTCOME_ADD_SUCCESS:
            return { loading : false, outcome: action.payload }

        case OUTCOME_ADD_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}
export const incomeUpdateReducers = ( state = { income:{} }, action) =>{
    switch(action.type){
        case INCOME_UPDATE_REQUEST:
            return { loading : true }
        
        case INCOME_UPDATE_SUCCESS:
            return { loading : false, success:true, income: action.payload }

        case INCOME_UPDATE_FAIL:
            return { loading : false, error: action.payload }

        case INCOME_UPDATE_RESET:
                return { income: {} }

        default:
            return state    
    }

}

export const outcomeUpdateReducers = ( state = { outcome:{} }, action) =>{
    switch(action.type){
        case OUTCOME_UPDATE_REQUEST:
            return { loading : true }
        
        case OUTCOME_UPDATE_SUCCESS:
            return { loading : false, success:true, outcome: action.payload }

        case OUTCOME_UPDATE_FAIL:
            return { loading : false, error: action.payload }

        case OUTCOME_UPDATE_RESET:
                return { outcome: {} }

        default:
            return state    
    }

}

export const outcomeFinanceListReducer = (state = { outcomeItems: []}, action) => {
    switch (action.type) {
        case OUTCOME_ADD_ITEM:
            const item = action.payload
            const existItem = state.outcomeItems.find(x => x.name === item.name)

            if (existItem) {
                return {
                    ...state,
                    outcomeItems: state.outcomeItems.map(x =>
                        x.name === existItem.name ? item : x)
                }

            } else {
                return {
                    ...state,
                    cartItems: [...state.outcomeItems, item]
                }
            }

        case OUTCOME_REMOVE_ITEM:
            return {
                ...state,
                outcomeItems: state.outcomeItems.filter(x => x.name !== action.payload)
            }

        default:
            return state
        }
    }