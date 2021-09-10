import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,FormGroup,Dropdown,DropdownButton,ProgressBar } from 'react-bootstrap'
import Message from '../components/Message'
import {  } from '../actions/caseActions'
import { studentDetail } from '../actions/studentActions'
import {outcomeDetail} from '../actions/financeActions'
import {scholarshipDetail} from '../actions/scholorshipActions'
import CheckoutSteps from '../components/CheckoutSteps'

function CaseCreateConfirmScreen({history,match}) {

    
    const studentId = match.params.id
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const [studentName, setStudentName] = useState('請選擇個案學生')
    const [student, setStudent] = useState('')


    const studentList = useSelector(state => state.studentList)
    const { errorStudentList, loadingStudentList, students } = studentList

    const studentDetailReucer = useSelector(state=>state.studentDetail)
    const {errorStudent, loadingStudent, this_student} = studentDetailReucer

    useEffect(() =>{
        dispatch(studentDetail(studentId))
        dispatch()

    },[dispatch,history])

   
    return (
        <Row>
            <CheckoutSteps step1 step2 step3 step4 step5/>
           FINAL
            <ProgressBar animated now={100} label={`{100}%`}/>
        </Row>
        
    )
}
export default CaseCreateConfirmScreen
