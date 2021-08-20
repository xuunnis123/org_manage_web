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
