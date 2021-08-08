import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl,FormLabel,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { addOutcomeMoneyCategory } from '../actions/settingActions'



function SettingOutcomeCategoryCreateScreen({ location, history}) {
   
    const[ name,setName] = useState('')

    const[ detail,setDetail] = useState('')

    
    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/finance'
    const outcomeMoneyCategoryAdd = useSelector(state => state.outcomeMoneyCategoryAdd)
    const {error, loading, outcome_money_category} = outcomeMoneyCategoryAdd
   
    useEffect(()=>{
      
    },[history, name,detail, redirect])

   
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(addOutcomeMoneyCategory( name,detail))
        
        history.push(redirect)
        
    }
    return (
        <FormContainer>
            <h1>新增支出傳票號數</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label>支出傳票號數代號</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='輸入支出傳票號數'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

       
            <Form.Group controlId='detail'>
                    <Form.Label>支出傳票號數解釋</Form.Label>
                    <Form.Control
                        required
                        type='detail'
                        placeholder='輸入支出傳票號數細節'
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
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
export default SettingOutcomeCategoryCreateScreen
