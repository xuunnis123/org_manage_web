import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,FormGroup,Dropdown,DropdownButton,ProgressBar } from 'react-bootstrap'
import Message from '../components/Message'
import {  } from '../actions/caseActions'
import { studentDetail } from '../actions/studentActions'
import {outcomeDetail} from '../actions/financeActions'
import { scholarshipDetail } from '../actions/scholarshipActions'
import CheckoutSteps from '../components/CheckoutSteps'
import Loader from '../components/Loader'
import {  STUDENT_DETAIL_REQUEST } from '../constants/studentConstants'
import { schoolUpdateReducers } from '../reducers/schoolReducers'
function CaseCreateConfirmScreen({history,match}) {

    
    const studentId = match.params.id
    
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const [studentName, setStudentName] = useState('請選擇個案學生')
    



    const studentDetailReucer = useSelector(state=>state.studentDetail)
    const {errorStudent, loadingStudent, student} = studentDetailReucer


    const outcomeDetailReducer = useSelector(state=>state.outcomeDetail)
    const {errorOutcomeDetail, loadingOutcomeDetail, outcome} = outcomeDetailReducer
    
    const scholarshipDetailReducer = useSelector(state=>state.scholarshipDetail)
    const {errorScholarshipDetail, loadingScholarshipDetail, scholarship} = scholarshipDetailReducer

    


    useEffect(() =>{
        console.log(studentId)
        dispatch({type:STUDENT_DETAIL_REQUEST})
        dispatch(studentDetail(studentId))
        dispatch(outcomeDetail(studentId))
        dispatch(scholarshipDetail(studentId))

    },[dispatch,history])
    
    const finish =() =>{
        
        window.location.href = '/case/'
        
        
    }
   
    return (
        <Row>
            <CheckoutSteps step1 step2 step3 step4 step5/>
           <h2>新增個案確認</h2>
           
            
        

            {loadingStudent ? <Loader />
                : errorStudent ? <Message variant='danger'>{errorStudent}</Message>
                    :
                    <div>
                        <h2>姓名：{student.name}</h2>
                        <h4>學校：{student.school}</h4>
                        <h4>電話：{student.phone}</h4>
                        
                        <h4>地址：{student.address}</h4>
                        <h4>區域：{student.tags}</h4>
                    </div>
            }
            <hr/>
            <h2>資助項目</h2>
            {loadingOutcomeDetail ? <Loader />
                : errorOutcomeDetail ? <Message variant='danger'>{errorOutcomeDetail}</Message>
                    :{outcome} || []? <h3 style={{color:"red"}}>無資助項目</h3>
                        :<div>

                          <h3>資助項目： {outcome.name} </h3>
                          <h3>資助金額： {outcome.outcome_money} </h3>
                        
                        </div>
            }
            <hr/>
            <h2>獎學金</h2>
            {loadingScholarshipDetail ? <Loader />
                : errorScholarshipDetail ? <Message variant='danger'>{errorScholarshipDetail}</Message>
                    :{scholarship} || [] ? <h3 style={{color:"red"}}>無獎學金</h3>
                    :<div>
                    <h3>獎學金金額：{scholarship.price}</h3>
                    
                    </div>
            }
            <hr/>            
            <Row className='py-3'>
                <Col>
                <Button onClick = {finish}
                className='btn-block' 
                type='button'>
                     確認
                </Button>
                </Col>
                
            </Row>
            <ProgressBar animated now={100} label={`{100}%`}/>
        </Row>
        
    )
}
export default CaseCreateConfirmScreen
