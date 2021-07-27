import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers ,productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducers, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userLoginGoogleReducers} from './reducers/userReducers'
import { orderCreateReducer } from './reducers/orderReducers'

import {  schoolListReducers, schoolDetailsReducer, schoolAddReducers, schoolUpdateReducers} from './reducers/schoolReducers'

import { studentListReducers,studentAddReducers,studentDetailsReducer,studentUpdateReducers } from './reducers/studentReducers'

import { memberListReducers,memberAddReducers,memberDetailsReducer,memberUpdateReducers } from './reducers/memberReducers'
const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducers,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userLoginGoogle:userLoginGoogleReducers,
    orderCreate:orderCreateReducer,

    schoolAdd :schoolAddReducers,
    schoolUpdate:schoolUpdateReducers,
    schoolDetail:schoolDetailsReducer,
    schoolList:schoolListReducers,

    studentList:studentListReducers,
    studentAdd:studentAddReducers,
    studentUpdate:studentUpdateReducers,
    studentDetail:studentDetailsReducer,

    memberList:memberListReducers,
    memberAdd:memberAddReducers,
    memberUpdate:memberUpdateReducers,
    memberDetail:memberDetailsReducer,
})


const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')): null

const userInfoFromGoogle =localStorage.getItem('givenName') ?
    JSON.parse(localStorage.getItem('givenName')): null

 

const initialState = {
    
    userLogin:{ userInfo : userInfoFromStorage },
    userLoginGoogle:{userGoogleInfo : userInfoFromGoogle}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store