import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,FormGroup } from 'react-bootstrap'
import Message from '../components/Message'
import { uploadImage } from '../actions/caseActions'


function CaseScreen({history}) {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)

    
    useEffect(() =>{
        

    },[dispatch])

    const addToCaseHandler =() =>{
        
        history.push('/case/createstudent')
    }


      
    return (
        <Row>
            <Col><Button 
        variant="outline-primary"
        onClick = {addToCaseHandler}
        className='btn-block' 
        type='button'>新增個案</Button></Col>
            
                 
        </Row>
        
    )
}
export default CaseScreen
