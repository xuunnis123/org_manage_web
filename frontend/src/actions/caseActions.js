import axios from 'axios'
import {
    UPLOAD_VISITPHOTOS_REQUEST ,
    UPLOAD_VISITPHOTOS_SUCCESS ,
    UPLOAD_VISITPHOTOS_FAIL,
   
    UPLOAD_VISITFORM_REQUEST,
    UPLOAD_VISITFORM_SUCCESS,
    UPLOAD_VISITFORM_FAIL,
    
    UPLOAD_APPLIEDFORM_REQUEST,
    UPLOAD_APPLIEDFORM_SUCCESS,
    UPLOAD_APPLIEDFORM_FAIL,


    CASE_NO_GENERATE_REQUEST,
    CASE_NO_GENERATE_SUCCESS,
    CASE_NO_GENERATE_FAIL,

    CASE_FILES_LIST_REQUEST,
    CASE_FILES_LIST_SUCCESS,
    CASE_FILES_LIST_FAIL,
   
    CASE_FILES_DELETE_REQUEST,
    CASE_FILES_DELETE_SUCCESS,
    CASE_FILES_DELETE_FAIL,

    CASE_ADD_REQUEST,
    CASE_ADD_SUCCESS,
    CASE_ADD_FAIL,

   } from '../constants/caseConstants'
export const uploadImage = (file) => async (dispatch, getState) => {
    console.log("Action")
    try {
       

        dispatch({
            type: UPLOAD_VISITPHOTOS_REQUEST
        })

        console.log(file)
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.post(
            `/api/imgur/upload/`,
            file,
            config
        )

        dispatch({
            type:UPLOAD_VISITPHOTOS_SUCCESS,
            payload:data
            
        })

       

    } catch (error) {
        dispatch({
            type: UPLOAD_VISITPHOTOS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const uploadVisitForm = (file) => async (dispatch, getState) => {
    console.log("Action2")
    try {
       

        dispatch({
            type: UPLOAD_VISITFORM_REQUEST
        })

        console.log(file)
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.post(
            `/api/imgur/upload/`,
            file,
            config
        )

        dispatch({
            type:UPLOAD_VISITFORM_SUCCESS,
            payload:data
            
        })

       

    } catch (error) {
        dispatch({
            type:     UPLOAD_VISITFORM_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const uploadAppliedForm = (file) => async (dispatch, getState) => {
    console.log("Action3")
    try {
       

        dispatch({
            type: UPLOAD_APPLIEDFORM_REQUEST
        })

        console.log(file)
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.post(
            `/api/imgur/upload/`,
            file,
            config
        )

        dispatch({
            type:UPLOAD_APPLIEDFORM_SUCCESS,
            payload:data
            
        })

       

    } catch (error) {
        dispatch({
            type: UPLOAD_APPLIEDFORM_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const generateCaseNo = (student) => async (dispatch, getState) => {
    
    try {
       

        dispatch({
            type: CASE_NO_GENERATE_REQUEST
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
        console.log(student)
        const { data } = await axios.post(
            `/api/case/gencaseno/`,
            student,
            config
        )
        console.log(data)
        localStorage.setItem("case_no",data)
        dispatch({
            type:CASE_NO_GENERATE_SUCCESS,
            payload:data
            
        })

       

    } catch (error) {
        dispatch({
            type: CASE_NO_GENERATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listStudentPhotos = (id) => async(dispatch,getState) =>{
    try {
        dispatch({
            type: CASE_FILES_LIST_REQUEST
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
        const {data} = await axios.get(
            `/api/case/getphotoList/${id}`,
            config
            ) 
        
        dispatch({
            type:CASE_FILES_LIST_SUCCESS,
            payload:data,
            
        })

    }catch(error){
        dispatch({ 
            type: CASE_FILES_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

export const addCase = ( student_id,case_no) => async(dispatch,getState) =>{
    try{
        dispatch({
                type: CASE_ADD_REQUEST
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
            console.log(case_no)
        const {data} = await axios.post(
             '/api/case/create/',
             {'student_id': student_id, 'case_no': case_no },
             config
             ) 
         
         dispatch({
             type:CASE_ADD_SUCCESS,
             payload:data
         })

         

    }catch(error){
        dispatch({ 
            type: CASE_ADD_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
            
        })
    }
}

