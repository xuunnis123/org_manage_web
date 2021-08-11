import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import {  addOutcome } from '../actions/financeActions'
import { listMember } from '../actions/memberActions'
import { listStudent } from '../actions/studentActions'
function FinanceOutcomeCreateScreen({history}) {
    const [categoryName, setCategoryName] = useState('請選擇傳票票號')
    const [titleName, setTitleName] = useState('請選擇支出項目')
    const [to_whomName, setTo_whomName] = useState('請選擇個案')
    const [confirmed_personName, setConfirmed_personName] = useState('請選擇經手人')
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [to_whom, setTo_whom] = useState('')
    const [confirmed_person, setConfirmed_person] = useState('')
    const [subject, setSubject] = useState('')
    const [detail, setDetail] = useState('')
    const [outcome_money, setOutcome_money] = useState('')
    const [unit, setUnit] = useState('NTD')
    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/finance'


    const outcomeAdd = useSelector(state => state.outcomeAdd)
    const {error, loading, outcome} = outcomeAdd


    const outcomeContributeContextList = useSelector(state => state.outcomeContributeContextList)
    const { errorincomeContribute, loadingincomeContribute, outcomeContributeContext } = outcomeContributeContextList

    const outcomeMoneyCategoryList = useSelector(state => state.outcomeMoneyCategoryList)
    const { erroroutcomeMoneyCategoryList, loadingoutcomeMoneyCategoryList, outcomeMoneyCategory} = outcomeMoneyCategoryList
    
    const memberList = useSelector(state => state.memberList)
    const { errorList, loadingList, members } = memberList

    const studentList = useSelector(state => state.studentList)
    const { errorStudentList, loadingStudentList, students } = studentList
    useEffect(()=>{
        
        dispatch(listMember())
        dispatch(listStudent())
    },[outcome,history, redirect])

    const handleSelectCategory=(e)=>{
        
        var splitCategory = e.split(',');
        setCategory(splitCategory[0])

        setCategoryName(splitCategory[1]);  
        
      }

      

      const handleSelectTitle=(e)=>{
        
        var splitTitle = e.split(',');
        setTitle(splitTitle[0])

        setTitleName(splitTitle[1]); 
        
        
      }
      
      const handleSelectTo_whom=(e)=>{
        
        var splitTitle = e.split(',');
        setTo_whom(splitTitle[0])

        setTo_whomName(splitTitle[1]); 
        
        
      }

      const handleSelectConfirm_person=(e)=>{
        
        var splitTitle = e.split(',');
        setConfirmed_person(splitTitle[0])

        setConfirmed_personName(splitTitle[1]); 
        
        
      }
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(addOutcome(category,title, to_whom, confirmed_person, subject, detail, outcome_money, unit))
        
        history.push(redirect)
        
    }
    return (
        <FormContainer>
            <h1>新增支出</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='category'>
                    <Form.Label>傳票號數</Form.Label>
                    <DropdownButton
                aligndown="true"
                title= {categoryName}
                id="dropdown-menu-align-down"
                onSelect={handleSelectCategory}
                    >

            {outcomeMoneyCategory.map((category,index) =>{
            
            return <Dropdown.Item eventKey={[category._id,category.name]} key={index}>{category.name}</Dropdown.Item>
            })}
                       
            </DropdownButton>
            </Form.Group>

            <Form.Group controlId='title'>
                    <Form.Label>內容</Form.Label>
                    <DropdownButton
                aligndown="true"
                title= {titleName}
                id="dropdown-menu-align-down"
                onSelect={handleSelectTitle}
                    >

            {outcomeContributeContext.map((title,index) =>{
            
            return <Dropdown.Item eventKey={[title._id,title.context]} key={index}>{title.context}</Dropdown.Item>
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
           
            <Form.Group controlId='to_whom'>
                    <Form.Label>個案姓名</Form.Label>
                    
                    <DropdownButton
                        aligndown="true"
                        title= {to_whomName}
                        id="dropdown-menu-align-down"
                        onSelect={handleSelectTo_whom}
                            >

                    {students.map((student,index) =>{
                    
                    return <Dropdown.Item eventKey={[student.id,student.name]} key={index}>{student.name}</Dropdown.Item>
                    })}
                            
                    </DropdownButton>
            </Form.Group>
            <Form.Group controlId='outcome_money'>
                    <Form.Label>支出金額</Form.Label>
                    <Form.Control
                        required
                        type='outcome'
                        placeholder='填入金額'
                        value={outcome_money}
                        onChange={(e) => setOutcome_money(e.target.value)}
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
                    <DropdownButton
                        aligndown="true"
                        title= {confirmed_personName}
                        id="dropdown-menu-align-down"
                        onSelect={handleSelectConfirm_person}
                            >

                    {members.map((member,index) =>{
                    
                    return <Dropdown.Item eventKey={[member._id,member.name]} key={index}>{member.name}</Dropdown.Item>
                    })}
                            
                    </DropdownButton>
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
export default FinanceOutcomeCreateScreen
