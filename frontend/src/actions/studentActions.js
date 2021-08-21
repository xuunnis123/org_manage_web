import axios from 'axios'
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
export const listStudent = () => async(dispatch) =>{
    try {
        dispatch({
            type: STUDENTS_LIST_REQUEST
        })

        const {data} = await axios.get('/api/student/students/') 
        
        dispatch({
            type:STUDENTS_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: STUDENTS_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const studentDetail = (id) => async(dispatch) =>{
    try {
        dispatch({
            type: STUDENT_DETAIL_REQUEST
        })
        console.log(id)
        const {data} = await axios.get(`/api/student/${id}`) 
        
        dispatch({
            type:STUDENT_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: STUDENT_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const addStudent = (school, name, phone, address, tags, is_end, memo, file) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: STUDENT_ADD_REQUEST
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
             '/api/student/create/',
             {'school': school, 'name': name ,'phone':phone,'address':address,'tags':tags,'is_end':is_end,'memo':memo, 'file': file},
             config
             ) 
         localStorage.setItem("student",data.id)
         dispatch({
             type:STUDENT_ADD_SUCCESS,
             payload:data
             
         })

         

    }catch(error){
        dispatch({ 
            type: STUDENT_ADD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}



export const updateStudent = (student) => async(dispatch,getState) =>{
    try{
        dispatch({

                type: STUDENT_UPDATE_REQUEST
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
        console.log({student})
        const {data} = await axios.put(
             `/api/student/update/${student.id}`,
             student,
             config
             ) 
         
         dispatch({
             type:STUDENT_UPDATE_SUCCESS,
             payload:data
         })

         dispatch({
            type:STUDENT_DETAIL_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({ 
            type: STUDENT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}


export const removeFromStudent = (id) => async(dispatch, getState) => {
    try{
        console.log("into delete")
    dispatch({
        type: STUDENT_DELETE_REQUEST,
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
         `/api/student/delete/${id}`,
         config
         ) 
        
        dispatch({
            type:STUDENT_DELETE_SUCCESS,
            payload:data
        })
    
    }catch(error){
        dispatch({ 
            type: STUDENT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
    
}

