import axios from 'axios'
import {
    UPLOAD_IMAGE_REQUEST ,
    UPLOAD_IMAGE_SUCCESS ,
    UPLOAD_IMAGE_FAIL,
   } from '../constants/caseConstants'
export const uploadImage = (file) => async (dispatch, getState) => {
    console.log("Action")
    try {
       

        dispatch({
            type: UPLOAD_IMAGE_REQUEST
        })

        console.log(file)
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.post(
            `/api/imgur/upload/`,
            file,
            config
        )

        dispatch({
            type:UPLOAD_IMAGE_SUCCESS,
            payload:data
            
        })

       

    } catch (error) {
        dispatch({
            type: UPLOAD_IMAGE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
