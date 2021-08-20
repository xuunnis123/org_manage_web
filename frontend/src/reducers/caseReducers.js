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

export const uploadVisitPhotosReducer = (  state = { visitPhotos:[] } , action) =>{
    switch(action.type){
        case UPLOAD_VISITPHOTOS_REQUEST:
            return { loading : true, ...state }
        
        case UPLOAD_VISITPHOTOS_SUCCESS:
            return { loading : false, visitPhotos: action.payload }

        case UPLOAD_VISITPHOTOS_FAIL:
            return { loading : false, error: action.payload }

        

        default:
            return state    
    }

}


export const uploadVisitFormReducer = (  state = { } , action) =>{
    switch(action.type){
        case UPLOAD_VISITFORM_REQUEST:
            return { visitfromloading : true, ...state }
        
        case UPLOAD_VISITFORM_SUCCESS:
            return { visitfromloading : false, visitForm: action.payload }

        case UPLOAD_VISITFORM_FAIL:
            return { visitfromloading : false, visitfromerror: action.payload }

        

        default:
            return state    
    }

}

export const uploadAppliedFormReducer = (  state = { } , action) =>{
    switch(action.type){
        case UPLOAD_APPLIEDFORM_REQUEST:
            return { appliedloading : true, ...state }
        
        case UPLOAD_APPLIEDFORM_SUCCESS:
            return { appliedloading : false, appliedForm: action.payload }

        case UPLOAD_APPLIEDFORM_FAIL:
            return { appliedloading : false, appliederror: action.payload }

        

        default:
            return state    
    }

}