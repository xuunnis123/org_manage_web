import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl,FormLabel,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { addSemester } from '../actions/semesterActions'

function SemesterCreateScreen({ match, location, history}) {

    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [start_date, setStart_date] = useState(new Date())
    const [end_date, setEnd_date] = useState(new Date())
   
    
    
    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/semester'
    const semesterAdd = useSelector(state => state.semesterAdd)
    const {error, loading, semester} = semesterAdd
   
    
    useEffect(()=>{
       
        if(semester){
            history.push(redirect)
        }
        
    },[history,semester, redirect])

   
   
     
    const submitHandler =(e) =>{
        e.preventDefault()
        
        var format_start_date = moment(start_date).format('YYYY-MM-DD') ;
        var format_end_date = moment(end_date).format('YYYY-MM-DD') ;
        
        
        
        dispatch(addSemester( name,year, format_start_date,format_end_date))
        
        history.push(redirect)
        
    }
    return (
        <FormContainer>
            <h1>新增學期</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>
            
         
            <Form.Group controlId='name'>
                <Form.Label>學期</Form.Label>
                <Form.Control
                        required
                        type='name'
                        placeholder='輸入學期名稱：XXX 年度上/下學期'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                        
                    </Form.Control>
            </Form.Group>
            

            
            <Form.Group controlId='year'>
                    <Form.Label>年份</Form.Label>
                    <Form.Control
                        required
                        type='year'
                        placeholder='輸入西元年份(YYYY)'
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        
                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='start_date'>
                    <Form.Label>學期開始日期</Form.Label>
                    
                        <DatePicker 
                        selected={start_date} 
                        onChange={(date) => setStart_date(date)} 
                        dateFormat = "yyyy-MM-dd"
                        />
                    
            </Form.Group>
            <Form.Group controlId='end_date'>
                    <Form.Label>學期結束日期</Form.Label>
                    <DatePicker 
                    selected={end_date} 
                    onChange={(date) => setEnd_date(date)} 
                    dateFormat = "yyyy-MM-dd"
                    />
            </Form.Group>
                <Button type='submit' variant='primary'>
                    建立
                </Button>
            </Form>
        
            <Row className='py-3'>
                <Col>
                     <Link to='/semester'>
                     取消
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default SemesterCreateScreen
