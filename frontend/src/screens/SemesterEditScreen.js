import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import {  SEMESTER_UPDATE_RESET,SEMESTER_DETAIL_REQUEST } from '../constants/semesterConstants'

import { listSemester, updateSemester,semesterDetail } from '../actions/semesterActions'



function SemesterEditScreen({ match, history}) {

    const semesterId = match.params.id
    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [start_date, setStart_date] = useState(new Date())
    const [end_date, setEnd_date] = useState(new Date())

    const dispatch = useDispatch()
  
    
    const redirect = '/semester'

    const semesterDetailReducer = useSelector(state => state.semesterDetail)
    const { error, loading, semester } = semesterDetailReducer

    const semesterUpdate = useSelector(state => state.semesterUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = semesterUpdate


    
    useEffect(()=>{
        console.log(semesterId)
       
        dispatch({type:SEMESTER_DETAIL_REQUEST})
        dispatch(semesterDetail(semesterId))
       
        if(successUpdate){
            dispatch({ type: SEMESTER_UPDATE_RESET })
            history.push(redirect)
        }else{
            if (!semester.name || semester._id != Number(semesterId)){
               
            }else{
                setName(semester.name)
                setYear(semester.year)
                var start_date_for=moment(semester.start_date).toDate();
                setStart_date(start_date_for)

                var end_date_for=moment(semester.end_date).toDate();
                setEnd_date(end_date_for)
              
               
            }
            
        }
    },[semester._id])

    
    

    const submitHandler =(e) =>{
       
        e.preventDefault()
        dispatch(updateSemester({
            _id:semesterId,
            name,
            year,
            start_date,
            end_date,
        }))
        
        window.location.href = redirect
        
    }
    return (
        <FormContainer>
            <h1>????????????</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            
            <Form.Group controlId='name'>
                <Form.Label>??????</Form.Label>
                <Form.Control
                        required
                        type='name'
                        placeholder='?????????????????????XXX ?????????/?????????'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                        
                    </Form.Control>
            </Form.Group>
            

            
            <Form.Group controlId='year'>
                    <Form.Label>??????</Form.Label>
                    <Form.Control
                        required
                        type='year'
                        placeholder='??????????????????(YYYY)'
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        
                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='start_date'>
                    <Form.Label>??????????????????</Form.Label>
                    
                        <DatePicker 
                        selected={start_date} 
                        onChange={(date) => setStart_date(date)} 
                        dateFormat = "yyyy-MM-dd"
                        />
                    
            </Form.Group>
            <Form.Group controlId='end_date'>
                    <Form.Label>??????????????????</Form.Label>
                    <DatePicker 
                    selected={end_date} 
                    onChange={(date) => setEnd_date(date)} 
                    dateFormat = "yyyy-MM-dd"
                    />
            </Form.Group>

                <Button type='submit' variant='primary'>
                    ??????
                </Button>
            </Form>
        
            <Row className='py-3'>
                <Col>
                     <Link to='/semester'>
                     ??????
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default SemesterEditScreen
