import axios from 'axios'
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

} from '../constants/financeConstants'
export const listFinance = () => async(dispatch) =>{
    try {
        dispatch({
            type: FINANCE_LIST_REQUEST
        })

        const {data} = await axios.get('/api/member/members/') 
        
        dispatch({
            type:FINANCE_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: FINANCE_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}
export const listIncome = () => async(dispatch) =>{
    try {
        dispatch({
            type: INCOME_LIST_REQUEST
        })

        const {data} = await axios.get('/api/member/members/') 
        
        dispatch({
            type:INCOME_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: INCOME_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}
export const listOutcome = () => async(dispatch) =>{
    try {
        dispatch({
            type: OUTCOME_LIST_REQUEST
        })

        const {data} = await axios.get('/api/member/members/') 
        
        dispatch({
            type:OUTCOME_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: OUTCOME_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const incomeDetail = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: INCOME_DETAIL_REQUEST
        })
        console.log(id)
        const {data} = await axios.get(`/api/INCOME/${id}`) 
        
        dispatch({
            type:INCOME_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: INCOME_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}
export const outcomeDetail = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: OUTCOME_DETAIL_REQUEST
        })
        console.log(id)
        const {data} = await axios.get(`/api/OUTCOME/${id}`) 
        
        dispatch({
            type:OUTCOME_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: OUTCOME_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const addIncome = ( name,job, phone, address, title, is_staff, is_admin, memo, family, intro_by) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: INCOME_ADD_REQUEST
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
             '/api/INCOME/create/',
             {'job': job, 'name': name ,'phone':phone,'address':address,'title':title,'is_staff':is_staff,'memo':memo, 'is_admin': is_admin,'family':family,'intro_by':intro_by},
             config
             ) 
         
         dispatch({
             type:INCOME_ADD_SUCCESS,
             payload:data
         })

         

    }catch(error){
        dispatch({ 
            type: INCOME_ADD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const addOutcome = ( name,job, phone, address, title, is_staff, is_admin, memo, family, intro_by) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: OUTCOME_ADD_REQUEST
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
             '/api/OUTCOME/create/',
             {'job': job, 'name': name ,'phone':phone,'address':address,'title':title,'is_staff':is_staff,'memo':memo, 'is_admin': is_admin,'family':family,'intro_by':intro_by},
             config
             ) 
         
         dispatch({
             type:OUTCOME_ADD_SUCCESS,
             payload:data
         })

         

    }catch(error){
        dispatch({ 
            type: OUTCOME_ADD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const updateIncome = (income) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: INCOME_UPDATE_REQUEST
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
             `/api/finance/income/update/${income._id}`,
             income,
             config
             ) 
         
         dispatch({
             type:INCOME_UPDATE_SUCCESS,
             payload:data
         })

         dispatch({
            type:INCOME_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: INCOME_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const updateOutcome = (outcome) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: OUTCOME_UPDATE_REQUEST
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
             `/api/finance/outcome/update/${outcome._id}`,
             outcome,
             config
             ) 
         
         dispatch({
             type:OUTCOME_UPDATE_SUCCESS,
             payload:data
         })

         dispatch({
            type:OUTCOME_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: OUTCOME_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}
export const removeFromIncome = (id) => async(dispatch, getState) => {
    try{
        console.log("into delete")
    dispatch({
        type: INCOME_DELETE_REQUEST,
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
         `/api/INCOME/delete/${id}`,
         config
         ) 
        
        dispatch({
            type:INCOME_DELETE_SUCCESS,
            payload:data
        })
    
    }catch(error){
        dispatch({ 
            type: INCOME_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
    
}

export const removeFromOutcome = (id) => async(dispatch, getState) => {
    try{
        console.log("into delete")
    dispatch({
        type: OUTCOME_DELETE_REQUEST,
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
         `/api/OUTCOME/delete/${id}`,
         config
         ) 
        
        dispatch({
            type:OUTCOME_DELETE_SUCCESS,
            payload:data
        })
    
    }catch(error){
        dispatch({ 
            type: OUTCOME_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
    
}

