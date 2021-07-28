import axios from 'axios'
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
export const listMember = () => async(dispatch) =>{
    try {
        dispatch({
            type: MEMBERS_LIST_REQUEST
        })

        const {data} = await axios.get('/api/member/members/') 
        
        dispatch({
            type:MEMBERS_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: MEMBERS_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const memberDetail = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: MEMBER_DETAIL_REQUEST
        })
        console.log(id)
        const {data} = await axios.get(`/api/member/${id}`) 
        
        dispatch({
            type:MEMBER_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: MEMBER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const addMember = ( name,job, phone, address, title, is_staff, is_admin, memo, family, intro_by) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: MEMBER_ADD_REQUEST
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
             '/api/member/create/',
             {'job': job, 'name': name ,'phone':phone,'address':address,'title':title,'is_staff':is_staff,'memo':memo, 'is_admin': is_admin,'family':family,'intro_by':intro_by},
             config
             ) 
         
         dispatch({
             type:MEMBER_ADD_SUCCESS,
             payload:data
         })

         

    }catch(error){
        dispatch({ 
            type: MEMBER_ADD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}



export const updateMember = (member) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: MEMBER_UPDATE_REQUEST
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
             `/api/member/update/${member._id}`,
             member,
             config
             ) 
         
         dispatch({
             type:MEMBER_UPDATE_SUCCESS,
             payload:data
         })

         dispatch({
            type:MEMBER_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: MEMBER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const removeFromMember = (id) => async(dispatch, getState) => {
    try{
        console.log("into delete")
    dispatch({
        type: MEMBER_DELETE_REQUEST,
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
         `/api/member/delete/${id}`,
         config
         ) 
        
        dispatch({
            type:MEMBER_DELETE_SUCCESS,
            payload:data
        })
    
    }catch(error){
        dispatch({ 
            type: MEMBER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
    
}

