import React, {useState,useEffect,useRef, useLayoutEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,FormGroup,Dropdown,DropdownButton,ProgressBar } from 'react-bootstrap'
import Message from '../components/Message'
import { uploadImage } from '../actions/caseActions'
import { listStudent,addStudent } from '../actions/studentActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { listSchool } from '../actions/schoolActions'
import { createStore } from 'redux'
import Loader from '../components/Loader'

function CaseCreateStudentConfirmScreen({history}) {
    const dispatch = useDispatch()
   
    const studentAdd = useSelector(state => state.studentAdd)
    const {error, loading, student} = studentAdd
   
    useEffect(() =>{
        
    },[])

    
    const jumpNextHandler =  (e) =>{
        e.preventDefault()
        
        
        history.push('/case/createphoto')
        
    }
      
    return (
        <Row>
        
        <CheckoutSteps step1/>
        
        
        
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <h1>已新增學生</h1>
       
        <Button
        variant="outline-primary"
        onClick = {jumpNextHandler}
        className='btn-block' 
        type='button'>
            前往設定細節
        </Button>
        <ProgressBar animated now={30} label={`30%`}/>
    </Row>
)
}
export default CaseCreateStudentConfirmScreen
