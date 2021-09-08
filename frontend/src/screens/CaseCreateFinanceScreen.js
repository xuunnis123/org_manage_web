import React, {useState,useEffect,useRef,useReducer} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,FormGroup,Dropdown,DropdownButton,ProgressBar } from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {  addOutcome } from '../actions/financeActions'
import { listMember } from '../actions/memberActions'
import { studentDetail } from '../actions/studentActions'
import CheckoutSteps from '../components/CheckoutSteps'
import Loader from '../components/Loader'
import {caseOutcomeLoadingReducer} from '../reducers/caseReducers'

function CaseFinanceCreateScreen({history}) {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
 
    
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
    const [save, setSave] = useState('')
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/case/createscholarship'


    const outcomeAdd = useSelector(state => state.outcomeAdd)
    const {error, loading, outcome} = outcomeAdd


    const outcomeContributeContextList = useSelector(state => state.outcomeContributeContextList)
    const { errorincomeContribute, loadingincomeContribute, outcomeContributeContext } = outcomeContributeContextList

    const outcomeMoneyCategoryList = useSelector(state => state.outcomeMoneyCategoryList)
    const { erroroutcomeMoneyCategoryList, loadingoutcomeMoneyCategoryList, outcomeMoneyCategory} = outcomeMoneyCategoryList
    
    const memberList = useSelector(state => state.memberList)
    const { errorList, loadingList, members } = memberList

    
    const studentDetailReducer = useSelector(state => state.studentDetail)
    const { errorstudent, loadingstudent, student } = studentDetailReducer

    const caseAdd = useSelector(state => state.caseAdd)
    const { caseerror, caseloading, caseData } = caseAdd

    const prevCase = useRef("");
    
    const [savestudent,savestudentDispatch] = useReducer(caseOutcomeLoadingReducer,0);
    
    useEffect(()=>{
        
        prevCase.current = caseData;
        console.log(prevCase)
        
        dispatch(listMember())
     
        setTo_whom(prevCase.student_name)
       
        
    },[outcome,history,caseData,caseAdd])
    
    useEffect(()=>{
        
        
        //setTo_whom(prevCase.student_name)
        //setSave(prevCase.student_name)
       
        console.log("to_whom=",to_whom)
       
    },[to_whom])


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

    const showMore =()=>{

        console.log("click to show more");
    }

    return (
        <FormContainer>
            <Button type='button' variant='primary' onClick={showMore}>新增支出</Button>
            <h1>案號：</h1>
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
                    <Form.Control
                    
                        type='text'
                        //value={prevCase.current.student.name}
                        value={to_whom}
                        readOnly
                        
                    />
                         
                    
                    
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
                     <Link to='/case'>
                     取消
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default CaseFinanceCreateScreen
