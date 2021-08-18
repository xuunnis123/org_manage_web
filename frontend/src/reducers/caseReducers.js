import {
 UPLOAD_IMAGE_REQUEST ,
 UPLOAD_IMAGE_SUCCESS ,
 UPLOAD_IMAGE_FAIL,
} from '../constants/caseConstants'

export const uploadImageReducer = (  state = { uploadImage:{} }, action) =>{
    switch(action.type){
        case UPLOAD_IMAGE_REQUEST:
            return { loading : true, uploadImage:{} }
        
        case UPLOAD_IMAGE_SUCCESS:
            return { loading : false, uploadImage: action.payload }

        case UPLOAD_IMAGE_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}