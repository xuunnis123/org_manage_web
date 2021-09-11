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

   
    return (
        <Row>
            <CheckoutSteps step1 step2 step3 step4 step5/>
           新增個案確認
           
            
        

            {loadingStudent ? <Loader />
                : errorStudent ? <Message variant='danger'>{errorStudent}</Message>
                    :
                    <div>
                        <h2>姓名：{student.name}</h2>
                    </div>
            }

            {loadingOutcomeDetail ? <Loader />
                : errorOutcomeDetail ? <Message variant='danger'>{errorOutcomeDetail}</Message>
                    :{outcome} == null? <h1>無支出</h1>
                        :<div>

                          Test {outcome} Test
                        
                        </div>
            }

            {loadingScholarshipDetail ? <Loader />
                : errorScholarshipDetail ? <Message variant='danger'>{errorScholarshipDetail}</Message>
                    :{scholarship} == null ? <h1>無獎學金</h1>
                    :<div>
                    <h2>獎學金：TEST</h2>
                    </div>
            }
                        
            <Row className='py-3'>
                <Col>
                     <Link to='/case/'>
                     確認
                        </Link>
                </Col>
            </Row>
            <ProgressBar animated now={100} label={`{100}%`}/>
        </Row>
        
    )
}
export default CaseCreateConfirmScreen
