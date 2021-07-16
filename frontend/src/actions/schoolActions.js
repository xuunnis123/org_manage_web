import axios from 'axios'
import {
    SCHOOLS_LIST_REQUEST,
    SCHOOLS_LIST_SUCCESS,
    SCHOOLS_LIST_FAIL,

    SCHOOL_REQUEST,
    SCHOOL_REQUEST_SUCCESS,
    SCHOOL_REQUEST_FAIL,

    SCHOOL_ADD_REQUEST,
    SCHOOL_ADD_SUCCESS,
    SCHOOL_ADD_FAIL,

    SCHOOL_UPDATE_REQUEST,
    SCHOOL_UPDATE_SUCCESS,
    SCHOOL_UPDATE_FAIL,

    SCHOOL_DETAIL_REQUEST,
    SCHOOL_DETAIL_SUCCESS,
    SCHOOL_DETAIL_FAIL,

    SCHOOL_DELETE_REQUEST,
    SCHOOL_DELETE_SUCCESS,
    SCHOOL_DELETE_FAIL,

} from '../constants/schoolConstants'
export const listSchool = () => async(dispatch) =>{
    try {
        dispatch({
            type: SCHOOLS_LIST_REQUEST
        })

        const {data} = await axios.get('/api/school/schools/') 
        
        dispatch({
            type:SCHOOLS_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: SCHOOLS_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const schoolDetail = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: SCHOOL_DETAIL_REQUEST
        })
        console.log(id)
        const {data} = await axios.get(`/api/school/${id}`) 
        
        dispatch({
            type:SCHOOL_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: SCHOOL_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const addSchool = (name,represent_person_name,represent_person_phone,memo) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: SCHOOL_ADD_REQUEST
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
             '/api/school/create/',
             {'name': name, 'represent_person_name': represent_person_name ,'represent_person_phone':represent_person_phone,'memo':memo},
             config
             ) 
         
         dispatch({
             type:SCHOOL_ADD_SUCCESS,
             payload:data
         })

         

    }catch(error){
        dispatch({ 
            type: SCHOOL_ADD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}



export const updateSchool = (school) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: SCHOOL_UPDATE_REQUEST
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
             `/api/school/update/${school._id}`,
             school,
             config
             ) 
         
         dispatch({
             type:SCHOOL_UPDATE_SUCCESS,
             payload:data
         })

         dispatch({
            type:SCHOOL_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: SCHOOL_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const removeFromSchool = (id) => async(dispatch, getState) => {
    try{
        console.log("into delete")
    dispatch({
        type: SCHOOL_DELETE_REQUEST,
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
         `/api/school/delete/${id}`,
         config
         ) 
        
        dispatch({
            type:SCHOOL_DELETE_SUCCESS,
            payload:data
        })
    
    }catch(error){
        dispatch({ 
            type: SCHOOL_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
    
}

