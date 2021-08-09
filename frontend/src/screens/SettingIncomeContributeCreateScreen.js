import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl,FormLabel,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { addIncomeContributeContext } from '../actions/settingActions'



function SettingIncomeContributeCreateScreen({ location, history}) {
   
    const [context,setContext] = useState('')


    
    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/finance'
    const incomeContributeContextAdd = useSelector(state => state.incomeContributeContextAdd)
    const {error, loading, incomeContributeContext} = incomeContributeContextAdd
   
    useEffect(()=>{
      
    },[history, context, redirect])

   
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(addIncomeContributeContext( context))
        
        history.push(redirect)
        
    }
    return (
        <FormContainer>
            <h1>新增收入來源分類</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='context'>
                    <Form.Label>收入來源分類</Form.Label>
                    <Form.Control
                        required
                        type='context'
                        placeholder='輸入收入來源分類'
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

       
            
           
            
            
                <Button type='submit' variant='primary'>
                    建立
                </Button>
            </Form>
        
            <Row className='py-3'>
                <Col>
                     <Link to='/finance'>
                     取消
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default SettingIncomeContributeCreateScreen
