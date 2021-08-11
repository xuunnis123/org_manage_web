import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {  INCOME_UPDATE_RESET,INCOME_DETAIL_REQUEST } from '../constants/financeConstants'
import {  incomeDetail,updateIncome } from '../actions/financeActions'
import { listMember } from '../actions/memberActions'
function FinanceIncomeEditScreen({match,history}) {
    const incomeId = match.params.id
    const [categoryName, setCategoryName] = useState('請選擇傳票票號')
    const [titleName, setTitleName] = useState('請選擇收入項目')
    const [from_whomName, setFrom_whomName] = useState('請選擇捐款人')
    const [confirmed_personName, setConfirmed_personName] = useState('請選擇經手人')
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


 
    const incomeContributeContextList = useSelector(state => state.incomeContributeContextList)
    const { errorincomeContribute, loadingincomeContribute, incomeContributeContext } = incomeContributeContextList

    const incomeMoneyCategoryList = useSelector(state => state.incomeMoneyCategoryList)
    const { errorincomeMoneyCategoryList, loadingincomeMoneyCategoryList, incomeMoneyCategory} = incomeMoneyCategoryList
    
    const memberList = useSelector(state => state.memberList)
    const { errorList, loadingList, members } = memberList

    const incomeUpdate = useSelector(state => state.incomeUpdate)
    const { updateerror, updateloading, success: successUpdate } = incomeUpdate

    const incomeDetailReducer = useSelector(state => state.incomeDetail)
    const { error, loading, income } = incomeDetailReducer
    
    useEffect(()=>{
        dispatch({type:INCOME_DETAIL_REQUEST})
        
        dispatch(incomeDetail(incomeId))
       
        dispatch(listMember())

        if(successUpdate){
            
            dispatch({ type: INCOME_UPDATE_RESET })
            history.push(redirect)
        }else{
            if (!income || income._id != Number(incomeId)){
              
                
            }else{
                
                setCategoryName(income.category)
                setTitleName(income.title)
                setFrom_whomName(income.from_whom)
                setConfirmed_personName(income.confirmed_person)
            

                setSubject(income.subject)
                setDetail(income.detail)
                setIncome_money(income.income_money)
                setUnit(income.unit)
            }
        }

    },[income._id])

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
      
      const handleSelectFrom_whom=(e)=>{
        
        var splitTitle = e.split(',');
        setFrom_whom(splitTitle[0])

        setFrom_whomName(splitTitle[1]); 
        
        
      }

      const handleSelectConfirm_person=(e)=>{
        
        var splitTitle = e.split(',');
        setConfirmed_person(splitTitle[0])

        setConfirmed_personName(splitTitle[1]); 
        
        
      }
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(updateIncome(
            {
            _id:incomeId,
            category,
            title, 
            from_whom, 
            confirmed_person, 
            subject, 
            detail, 
            income_money, 
            unit
            }))
        
            window.location.href = redirect
        
    }
    return (
        <FormContainer>
            <h1>修改收入</h1>
            
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

            {incomeMoneyCategory.map((category,index) =>{
            
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

            {incomeContributeContext.map((title,index) =>{
            
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
           
            <Form.Group controlId='from_whom'>
                    <Form.Label>捐贈人</Form.Label>
                    
                    <DropdownButton
                        aligndown="true"
                        title= {from_whomName}
                        id="dropdown-menu-align-down"
                        onSelect={handleSelectFrom_whom}
                            >

                    {members.map((member,index) =>{
                    
                    return <Dropdown.Item eventKey={[member._id,member.name]} key={index}>{member.name}</Dropdown.Item>
                    })}
                            
                    </DropdownButton>
            </Form.Group>
            <Form.Group controlId='income_money'>
                    <Form.Label>收入金額</Form.Label>
                    <Form.Control
                        required
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
                    保存
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
export default FinanceIncomeEditScreen
