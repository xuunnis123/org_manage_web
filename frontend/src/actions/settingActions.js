import axios from 'axios'
import {
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


    

} from '../constants/settingConstants'
export const listIncomeContributeContext = () => async(dispatch) =>{
    try {
        dispatch({
            type: INCOME_CONTRIBUTE_CONTEXT_LIST_REQUEST
        })

        const {data} = await axios.get('/api/setting/income/contributeContextList') 
        
        dispatch({
            type:INCOME_CONTRIBUTE_CONTEXT_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: INCOME_CONTRIBUTE_CONTEXT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}
export const listOutcomeContributeContext = () => async(dispatch) =>{
    try {
        dispatch({
            type: OUTCOME_CONTRIBUTE_CONTEXT_LIST_REQUEST
        })

        const {data} = await axios.get('/api/setting/outcome/contributeContextList') 
        
        dispatch({
            type:OUTCOME_CONTRIBUTE_CONTEXT_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: OUTCOME_CONTRIBUTE_CONTEXT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}
export const listIncomeMoneyCategory = () => async(dispatch) =>{
    try {
        dispatch({
            type: INCOME_MONEY_CATEGORY_LIST_REQUEST
        })

        const {data} = await axios.get('/api/setting/income/moneycategoryList') 
        
        dispatch({
            type:INCOME_MONEY_CATEGORY_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: INCOME_MONEY_CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}
export const listOutcomeMoneyCategory = () => async(dispatch) =>{
    try {
        dispatch({
            type: OUTCOME_MONEY_CATEGORY_LIST_REQUEST
        })

        const {data} = await axios.get('/api/setting/outcome/moneycategoryList') 
        
        dispatch({
            type:OUTCOME_MONEY_CATEGORY_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: OUTCOME_MONEY_CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const incomeContributeContextDetail = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: INCOME_CONTRIBUTE_CONTEXT_DETAIL_REQUEST
        })
        console.log(id)
        const {data} = await axios.get(`/api/setting/income/contributeContext/${id}`) 
        
        dispatch({
            type:INCOME_CONTRIBUTE_CONTEXT_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: INCOME_CONTRIBUTE_CONTEXT_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const outcomeContributeContextDetail = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: OUTCOME_CONTRIBUTE_CONTEXT_DETAIL_REQUEST
        })
        console.log(id)
        const {data} = await axios.get(`/api/setting/outcome/contributeContext/${id}`) 
        
        dispatch({
            type:OUTCOME_CONTRIBUTE_CONTEXT_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: OUTCOME_CONTRIBUTE_CONTEXT_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const incomeMoneyCategoryDetail = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: INCOME_MONEY_CATEGORY_DETAIL_REQUEST
        })
        console.log(id)
        const {data} = await axios.get(`/api/setting/income/moneycategory/${id}`) 
        
        dispatch({
            type:INCOME_MONEY_CATEGORY_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: INCOME_MONEY_CATEGORY_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const outcomeMoneyCategoryDetail = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: OUTCOME_MONEY_CATEGORY_DETAIL_REQUEST
        })
        console.log(id)
        const {data} = await axios.get(`/api/setting/outcome/moneycategory/${id}`) 
        
        dispatch({
            type:OUTCOME_MONEY_CATEGORY_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: OUTCOME_MONEY_CATEGORY_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const addIncomeContributeContext = ( context) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: INCOME_CONTRIBUTE_CONTEXT_ADD_REQUEST
            })
            const {
                userLogin: { userInfo },
            } = getState()
    
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        const {data} = await axios.post(
             '/api/setting/income/contributeContext/create/',
             {'context': context},
             config
             ) 
         
         dispatch({
             type:INCOME_CONTRIBUTE_CONTEXT_ADD_SUCCESS,
             payload:data
         })

         

    }catch(error){
        dispatch({ 
            type: INCOME_CONTRIBUTE_CONTEXT_ADD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const addOutcomeContributeContext = ( context) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: OUTCOME_CONTRIBUTE_CONTEXT_ADD_REQUEST
            })
            const {
                userLogin: { userInfo },
            } = getState()
    
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        const {data} = await axios.post(
             '/api/setting/outcome/contributeContext/create/',
             {'context': context},
             config
             ) 
         
         dispatch({
             type:OUTCOME_CONTRIBUTE_CONTEXT_ADD_SUCCESS,
             payload:data
         })

         

    }catch(error){
        dispatch({ 
            type: OUTCOME_CONTRIBUTE_CONTEXT_ADD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const addIncomeMoneyCategory = ( name,detail) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: INCOME_MONEY_CATEGORY_ADD_REQUEST
            })
            const {
                userLogin: { userInfo },
            } = getState()
    
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        const {data} = await axios.post(
             '/api/setting/income/moneycategory/create/',
             {'name': name,'detail':detail},
             config
             ) 
         
         dispatch({
             type:INCOME_MONEY_CATEGORY_ADD_SUCCESS,
             payload:data
         })

         

    }catch(error){
        dispatch({ 
            type: INCOME_MONEY_CATEGORY_ADD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const addOutcomeMoneyCategory = ( name,detail) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: OUTCOME_MONEY_CATEGORY_ADD_REQUEST
            })
            const {
                userLogin: { userInfo },
            } = getState()
    
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        const {data} = await axios.post(
             '/api/setting/outcome/moneycategory/create/',
             {'name': name,'detail':detail},
             config
             ) 
         
         dispatch({
             type:OUTCOME_MONEY_CATEGORY_ADD_SUCCESS,
             payload:data
         })

         

    }catch(error){
        dispatch({ 
            type: OUTCOME_MONEY_CATEGORY_ADD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const updateIncomeContributeContext = (incomeContributeContext) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: INCOME_CONTRIBUTE_CONTEXT_UPDATE_REQUEST
            })
            const {
                userLogin: { userInfo },
            } = getState()
    
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
    
        const {data} = await axios.put(
             `/api/setting/income/contributeContext/update/${incomeContributeContext._id}`,
             incomeContributeContext,
             config
             ) 
         
         dispatch({
             type:INCOME_CONTRIBUTE_CONTEXT_UPDATE_SUCCESS,
             payload:data
         })

       

    }catch(error){
        dispatch({ 
            type: INCOME_CONTRIBUTE_CONTEXT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const updateOutcomeContributeContext = (outcomeContributeContext) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: OUTCOME_CONTRIBUTE_CONTEXT_UPDATE_REQUEST
            })
            const {
                userLogin: { userInfo },
            } = getState()
    
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        
        const {data} = await axios.put(
             `/api/setting/outcome/contributeContext/update/${outcomeContributeContext._id}`,
             outcomeContributeContext,
             config
             ) 
         
         dispatch({
             type:OUTCOME_CONTRIBUTE_CONTEXT_UPDATE_SUCCESS,
             payload:data
         })

       

    }catch(error){
        dispatch({ 
            type: OUTCOME_CONTRIBUTE_CONTEXT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}
export const updateIncomeMoneyCategory = (incomeMoneyCategory) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: INCOME_MONEY_CATEGORY_UPDATE_REQUEST
            })
            const {
                userLogin: { userInfo },
            } = getState()
    
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        
        const {data} = await axios.put(
             `/api/setting/income/moneycategory/update/${incomeMoneyCategory._id}`,
             incomeMoneyCategory,
             config
             ) 
         
         dispatch({
             type:INCOME_MONEY_CATEGORY_UPDATE_SUCCESS,
             payload:data
         })

       

    }catch(error){
        dispatch({ 
            type: INCOME_MONEY_CATEGORY_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const updateOutcomeMoneyCategory = (outcomeMoneyCategory) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: OUTCOME_MONEY_CATEGORY_UPDATE_REQUEST
            })
            const {
                userLogin: { userInfo },
            } = getState()
    
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.access}`
                }
            }
        
        const {data} = await axios.put(
             `/api/setting/outcome/moneycategory/update/${outcomeMoneyCategory._id}`,
             outcomeMoneyCategory,
             config
             ) 
         
         dispatch({
             type:OUTCOME_MONEY_CATEGORY_UPDATE_SUCCESS,
             payload:data
         })

       

    }catch(error){
        dispatch({ 
            type: OUTCOME_MONEY_CATEGORY_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}
export const removeFromIncomeContributeContext = (id) => async(dispatch, getState) => {
    try{
        console.log("into delete")
    dispatch({
        type: INCOME_CONTRIBUTE_CONTEXT_DELETE_REQUEST,
    })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }
        const {data} = await axios.delete(
         `/api/setting/income/contributeContext/delete/${id}`,
         config
         ) 
        
        dispatch({
            type:INCOME_CONTRIBUTE_CONTEXT_DELETE_SUCCESS,
            payload:data
        })
    
    }catch(error){
        dispatch({ 
            type: INCOME_CONTRIBUTE_CONTEXT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
    
}
export const removeFromOutcomeContributeContext = (id) => async(dispatch, getState) => {
    try{
        console.log("into delete")
    dispatch({
        type: OUTCOME_CONTRIBUTE_CONTEXT_DELETE_REQUEST,
    })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }
        const {data} = await axios.delete(
         `/api/setting/outcome/contributeContext/delete/${id}`,
         config
         ) 
        
        dispatch({
            type:OUTCOME_CONTRIBUTE_CONTEXT_DELETE_SUCCESS,
            payload:data
        })
    
    }catch(error){
        dispatch({ 
            type: OUTCOME_CONTRIBUTE_CONTEXT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
    
}
export const removeFromIncomeMoneyCategory = (id) => async(dispatch, getState) => {
    try{
        console.log("into delete")
    dispatch({
        type: INCOME_MONEY_CATEGORY_DELETE_REQUEST,
    })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }
        const {data} = await axios.delete(
         `/api/setting/income/moneycategory/delete/${id}`,
         config
         ) 
        
        dispatch({
            type:INCOME_MONEY_CATEGORY_DELETE_SUCCESS,
            payload:data
        })
    
    }catch(error){
        dispatch({ 
            type: INCOME_MONEY_CATEGORY_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
    
}
export const removeFromOutcomeMoneyCategory = (id) => async(dispatch, getState) => {
    try{
        console.log("into delete")
    dispatch({
        type: OUTCOME_MONEY_CATEGORY_DELETE_REQUEST,
    })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }
        const {data} = await axios.delete(
         `/api/setting/outcome/moneycategory/delete/${id}`,
         config
         ) 
        
        dispatch({
            type:OUTCOME_MONEY_CATEGORY_DELETE_SUCCESS,
            payload:data
        })
    
    }catch(error){
        dispatch({ 
            type: OUTCOME_MONEY_CATEGORY_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
    
}

