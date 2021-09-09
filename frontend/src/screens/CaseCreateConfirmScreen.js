import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,FormGroup,Dropdown,DropdownButton,ProgressBar } from 'react-bootstrap'
import Message from '../components/Message'
import { uploadImage } from '../actions/caseActions'
import { listStudent } from '../actions/studentActions'
import CheckoutSteps from '../components/CheckoutSteps'
function CaseCreateConfirmScreen({history}) {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const [studentName, setStudentName] = useState('請選擇個案學生')
    const [student, setStudent] = useState('')


    const studentList = useSelector(state => state.studentList)
    const { errorStudentList, loadingStudentList, students } = studentList

    useEffect(() =>{
        dispatch(listStudent())

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
