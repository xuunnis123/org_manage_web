import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import {  addIncome } from '../actions/financeActions'

function FinanceIncomeCreateScreen({history}) {
    
    const [name, setName] = useState('')
    const [represent_person_name, setRepresent_person_name] = useState('')
    const [represent_person_phone, setRepresent_person_phone] = useState('')
    const [memo, setMemo] = useState('')

    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/finance'
    const incomeAdd = useSelector(state => state.incomeAdd)
    const {error, loading, income} = incomeAdd

    useEffect(()=>{
        
        if(income){
            
            history.push(redirect)
        }
        
    },[history, income, redirect])

    //dispatch(listSchool())
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(addIncome(category,title, from_whom, confirmed_person, subject, detail, income_money, unit))
        
        history.push(redirect)
        
    }
    return (
        <FormContainer>
            <h1>新增學校</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label>學校名稱</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='輸入學校名字'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='represent_person_name'>
                    <Form.Label>學校接洽人</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='輸入接洽人姓名'
                        value={represent_person_name}
                        onChange={(e) => setRepresent_person_name(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='represent_person_phone'>
                    <Form.Label>聯絡電話</Form.Label>
                    <Form.Control
                        required
                        type='phone'
                        placeholder='輸入聯絡電話'
                        value={represent_person_phone}
                        onChange={(e) => setRepresent_person_phone(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='memo'>
                    <Form.Label>備註</Form.Label>
                    <Form.Control
                        type='memo'
                        placeholder='備註欄'
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

                <Button type='submit' variant='primary'>
                    建立
                </Button>
            </Form>
        
            <Row className='py-3'>
                <Col>
                     <Link to='/school'>
                     取消
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default FinanceIncomeCreateScreen
