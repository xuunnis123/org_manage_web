import axios from 'axios'
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
export const listSemester = () => async(dispatch) =>{
    try {
        dispatch({
            type: SEMESTERS_LIST_REQUEST
        })

        const {data} = await axios.get('/api/semester/semesterList/') 
        
        dispatch({
            type:SEMESTERS_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: SEMESTERS_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const semesterDetail = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: SEMESTER_DETAIL_REQUEST
        })
        
        const {data} = await axios.get(`/api/semester/${id}`) 
        
        dispatch({
            type:SEMESTER_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: SEMESTER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const addSemester = ( name,year, start_date, end_date) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: SEMESTER_ADD_REQUEST
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
             '/api/semester/create/',
             {'name': name ,'year':year,'start_date':start_date,'end_date':end_date},
             config
             ) 
         
         dispatch({
             type:SEMESTER_ADD_SUCCESS,
             payload:data
         })

         

    }catch(error){
        dispatch({ 
            type: SEMESTER_ADD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}



export const updateSemester = (semester) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: SEMESTER_UPDATE_REQUEST
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
             `/api/semester/update/${semester._id}`,
             semester,
             config
             ) 
         
         dispatch({
             type:SEMESTER_UPDATE_SUCCESS,
             payload:data
         })

         dispatch({
            type:SEMESTER_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: SEMESTER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const removeFromSemester = (id) => async(dispatch, getState) => {
    try{
        
    dispatch({
        type: SEMESTER_DELETE_REQUEST,
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
         `/api/semester/delete/${id}`,
         config
         ) 
        
        dispatch({
            type:SEMESTER_DELETE_SUCCESS,
            payload:data
        })
    
    }catch(error){
        dispatch({ 
            type: SEMESTER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
    
}

