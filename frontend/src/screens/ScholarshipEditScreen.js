import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {  SCHOLARSHIP_UPDATE_RESET,SCHOLARSHIP_DETAIL_REQUEST } from '../constants/scholarshipConstants'

import { listScholarship, updateScholarship,scholarshipDetail } from '../actions/scholarshipActions'
import { listSemester } from '../actions/semesterActions'
import { listStudent } from '../actions/studentActions'

function ScholarshipEditScreen({ match, history}) {

    const scholarshipId = match.params.id
    const [semesterName,setSemesterName] = useState('請選擇學期')
    const [studentName, setStudentName] = useState('請選擇申請學生')
    const [name, setName] = useState('')
    const [semester, setSemester] = useState('')
    const [price, setPrice] = useState('')

    const dispatch = useDispatch()
  
    
    const redirect = '/scholarship'

    const scholarshipDetailReducer = useSelector(state => state.scholarshipDetail)
    const { error, loading, scholarship } = scholarshipDetailReducer

    const scholarshipUpdate = useSelector(state => state.scholarshipUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = scholarshipUpdate

    const studentList = useSelector(state => state.studentList)
    const { errorStudentList, loadingStudentList, students } = studentList

    const semesterList = useSelector(state => state.semesterList)
    const { errorsemesterList, loadingsemesterList, semesters } = semesterList
    
    useEffect(()=>{
        console.log(scholarshipId)
       
        dispatch({type:SCHOLARSHIP_DETAIL_REQUEST})
        dispatch(scholarshipDetail(scholarshipId))
        dispatch(listSemester())
        dispatch(listStudent())
        if(successUpdate){
            dispatch({ type: SCHOLARSHIP_UPDATE_RESET })
            history.push(redirect)
        }else{
            if (!scholarship.name || scholarship._id != Number(scholarshipId)){
               
            }else{
                setStudentName(scholarship.name)
                setSemesterName(scholarship.semester)
                setPrice(scholarship.price)
               
            }
            
        }
    },[scholarship._id])

    const handleSelectSemester=(e)=>{
        
        var splitSemester = e.split(',');
        var stringId = splitSemester[0]
        setSemester(parseInt(stringId, 10));

        setSemesterName(splitSemester[1]);  
      }
      const handleSelectStudent=(e)=>{
        
        var splitStudent = e.split(',');
        var stringId = splitStudent[0]
        setName(parseInt(stringId, 10));

        setStudentName(splitStudent[1]);  
      }

    

    const submitHandler =(e) =>{
       
        e.preventDefault()
        dispatch(updateScholarship({
            _id:scholarshipId,
            name,
            semester,
            price
        }))
        
        window.location.href = redirect
        
    }
    return (
        <FormContainer>
            <h1>修改獎學金</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            

            <Form.Group controlId='name'>
                <Form.Label>申請人名字</Form.Label>
                <DropdownButton
                aligndown="true"
                title= {studentName}
                id="dropdown-menu-align-down"
                onSelect={handleSelectStudent}
                    >

            {students.map((student,index) =>{
            
            return <Dropdown.Item eventKey={[student.id,student.name]} key={index}>{student.name}</Dropdown.Item>
            })}
                       
            </DropdownButton>
            </Form.Group>
           
            <Form.Group controlId='semester'>
                <Form.Label>申請學期</Form.Label>
                <DropdownButton
                aligndown="true"
                title= {semesterName}
                id="dropdown-menu-align-down"
                onSelect={handleSelectSemester}
                    >

            {semesters.map((semester,index) =>{
            
            return <Dropdown.Item eventKey={[semester._id,semester.name]} key={index}>{semester.name}</Dropdown.Item>
            })}
                       
            </DropdownButton>
            
            </Form.Group>
            <Form.Group controlId='price'>
                    <Form.Label>申請金額</Form.Label>
                    <Form.Control
                        required
                        type='price'
                        placeholder='輸入金額'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    >
                        
                    </Form.Control>
            </Form.Group>
           
                <Button type='submit' variant='primary'>
                    存檔
                </Button>
            </Form>
        
            <Row className='py-3'>
                <Col>
                     <Link to='/scholarship'>
                     取消
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default ScholarshipEditScreen
