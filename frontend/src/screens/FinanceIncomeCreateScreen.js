import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import {  addIncome } from '../actions/financeActions'

function FinanceIncomeCreateScreen({history}) {
    
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [from_whom, setFrom_whom] = useState('')
    const [confirmed_person, setConfirmed_person] = useState('')
    const [subject, setSubject] = useState('')
    const [detail, setDetail] = useState('')
    const [income_money, setIncome_money] = useState('')
    const [unit, setUnit] = useState('NTD')
    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/finance'
    const incomeAdd = useSelector(state => state.incomeAdd)
    const {error, loading, income} = incomeAdd

    const categoryList = useSelector(state => state.categoryList)
    const {cateerror, cateloading, categories} = categoryList
    useEffect(()=>{
        
        if(income){
            
            history.push(redirect)
        }
        
    },[history, income, redirect])

    const handleSelectCategory=(e)=>{
        
        var splitFamily = e.split(',');
        
        
      }
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(addIncome(category,title, from_whom, confirmed_person, subject, detail, income_money, unit))
        
        history.push(redirect)
        
    }
    return (
        <FormContainer>
            <h1>新增收入</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='category'>
                    <Form.Label>傳票號數</Form.Label>
                    <DropdownButton
                aligndown="true"
                title= {category}
                id="dropdown-menu-align-down"
                onSelect={handleSelectCategory}
                    >

            {categories.map((category,index) =>{
            
            return <Dropdown.Item eventKey={[category._id,category.name]} key={index}>{category.name}</Dropdown.Item>
            })}
                       
            </DropdownButton>
            </Form.Group>

            <Form.Group controlId='subject'>
                    <Form.Label>科目</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='輸入科目'
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='represent_person_phone'>
                    <Form.Label>摘要</Form.Label>
                    <Form.Control
                        required
                        type='detail'
                        placeholder='輸入摘要'
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
           
            <Form.Group controlId='from_whom'>
                    <Form.Label>捐贈人</Form.Label>
                    <Form.Control
                        type='from_whom'
                        placeholder='備註欄'
                        value={from_whom}
                        onChange={(e) => setFrom_whom(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='income_money'>
                    <Form.Label>收入金額</Form.Label>
                    <Form.Control
                        type='memo'
                        placeholder='備註欄'
                        value={income_money}
                        onChange={(e) => setIncome_money(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='unit'>
                    <Form.Label>單位</Form.Label>
                    <Form.Control
                        type='unit'
                        placeholder='預設 新台幣 NTD'
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmed_person'>
                    <Form.Label>審核人</Form.Label>
                    <Form.Control
                        type='memo'
                        placeholder='備註欄'
                        value={confirmed_person}
                        onChange={(e) => setConfirmed_person(e.target.value)}
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
