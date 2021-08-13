import axios from 'axios'
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
export const listScholarship = () => async(dispatch) =>{
    try {
        dispatch({
            type: SCHOLARSHIP_LIST_REQUEST
        })

        const {data} = await axios.get('/api/scholarship/scholarshipList/') 
        
        dispatch({
            type:SCHOLARSHIP_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: SCHOLARSHIP_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const scholarshipDetail = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: SCHOLARSHIP_DETAIL_REQUEST
        })
        console.log(id)
        const {data} = await axios.get(`/api/scholarship/${id}`) 
        
        dispatch({
            type:SCHOLARSHIP_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: SCHOLARSHIP_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const addScholarship = ( name,semester, price) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: SCHOLARSHIP_ADD_REQUEST
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
             '/api/scholarship/create/',
             { 'name': name ,'semester':semester,'price':price},
             config
             ) 
         
         dispatch({
             type:SCHOLARSHIP_ADD_SUCCESS,
             payload:data
         })

         

    }catch(error){
        dispatch({ 
            type: SCHOLARSHIP_ADD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}



export const updateScholarship = (scholarship) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: SCHOLARSHIP_UPDATE_REQUEST
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
             `/api/scholarship/update/${scholarship._id}`,
             scholarship,
             config
             ) 
         
         dispatch({
             type:SCHOLARSHIP_UPDATE_SUCCESS,
             payload:data
         })

         dispatch({
            type:SCHOLARSHIP_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: SCHOLARSHIP_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const removeFromScholarship = (id) => async(dispatch, getState) => {
    try{
        console.log("into delete")
    dispatch({
        type: SCHOLARSHIP_DELETE_REQUEST,
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
         `/api/scholarship/delete/${id}`,
         config
         ) 
        
        dispatch({
            type:SCHOLARSHIP_DELETE_SUCCESS,
            payload:data
        })
    
    }catch(error){
        dispatch({ 
            type: SCHOLARSHIP_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
    
}

