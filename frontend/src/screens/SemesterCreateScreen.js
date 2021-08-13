import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl,FormLabel,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { listScholarship, addScholarship } from '../actions/scholarshipActions'
import { listSemester } from '../actions/semesterActions'
import { listStudent } from '../actions/studentActions'

function ScholarshipCreateScreen({ match, location, history}) {
   
    const [semesterName,setSemesterName] = useState('請選擇學期')
    const [studentName, setStudentName] = useState('請選擇申請學生')
    const [name, setName] = useState('')
    const [semester, setSemester] = useState('')
    const [price, setPrice] = useState('')
   

    
    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/scholarship'
    const scholarshipAdd = useSelector(state => state.scholarshipAdd)
    const {error, loading, scholarship} = scholarshipAdd
    
    const scholarshipList = useSelector(state => state.scholarshipList)
    const { errorList, loadingList, scholarships } = scholarshipList

    const studentList = useSelector(state => state.studentList)
    const { errorStudentList, loadingStudentList, students } = studentList

    const semesterList = useSelector(state => state.semesterList)
    const { errorsemesterList, loadingsemesterList, semesters } = semesterList
    useEffect(()=>{
        dispatch(listSemester())
        dispatch(listStudent())
        
        
        if(scholarship){
            history.push(redirect)
        }
    },[history, scholarship, redirect])

   
   
    const handleSelectSemester=(e)=>{
        
        var splitSemester = e.split(',');
        
        setSemester(splitSemester[0]);

        setSemesterName(splitSemester[1]);  
      }
      const handleSelectStudent=(e)=>{
        
        var splitStudent = e.split(',');
        
        setName(splitStudent[0]);

        setStudentName(splitStudent[1]);  
      }
     
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(addScholarship( name,semester, price))
        
        history.push(redirect)
        
    }
    return (
        <FormContainer>
            <h1>新增獎學金</h1>
            
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
                    建立
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
export default ScholarshipCreateScreen
