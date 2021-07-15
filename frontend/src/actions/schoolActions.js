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