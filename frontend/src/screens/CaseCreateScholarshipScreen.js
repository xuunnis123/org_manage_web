import React, {useState,useEffect,useRef} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,FormGroup,Dropdown,DropdownButton,ProgressBar } from 'react-bootstrap'
import Message from '../components/Message'
import { uploadImage } from '../actions/caseActions'
import { listStudent } from '../actions/studentActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { listScholarship, addScholarship } from '../actions/scholarshipActions'
import { listSemester } from '../actions/semesterActions'


function CaseCreateScholarshipScreen({history}) {
    const [semesterName,setSemesterName] = useState('請選擇學期')
    const [studentName, setStudentName] = useState('請選擇申請學生')
    const [name, setName] = useState('')
    const [semester, setSemester] = useState('')
    const [price, setPrice] = useState('')
   

    
    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/case/createconfirm'
    const scholarshipAdd = useSelector(state => state.scholarshipAdd)
    const {error, loading, scholarship} = scholarshipAdd
    
    const scholarshipList = useSelector(state => state.scholarshipList)
    const { errorList, loadingList, scholarships } = scholarshipList

    const studentList = useSelector(state => state.studentList)
    const { errorStudentList, loadingStudentList, students } = studentList

    const semesterList = useSelector(state => state.semesterList)
    const { errorsemesterList, loadingsemesterList, semesters } = semesterList

    const caseAdd = useSelector(state => state.caseAdd)
    const { caseerror, caseloading, caseData } = caseAdd

    const studentAdd = useSelector(state => state.studentAdd)
    const {erroradd, loadingadd, student} = studentAdd

    const prevCase = useRef("");

    const [showForm, setShowForm] = useState(false);
    const showFormFunction =() =>{
        setShowForm(!showForm);
    }

    useEffect(()=>{
        prevCase.current = caseData;
        dispatch(listSemester())
        dispatch(listStudent())
        
        
        if(scholarship){
            history.push(redirect)
        }
    },[history, scholarship, redirect])

    useEffect(()=>{
        
        
        //setTo_whom(prevCase.student_name)
        //setSave(prevCase.student_name)
       
        console.log("to_whom=",name)
       
    },[name])
   
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
        
        history.push(`/case/createconfirm/${student.id}/`)
        
    }

    const skipToNext =() =>{
        
    
        history.push(`/case/createconfirm/${student.id}/`)
        
    }

    
      
    return (
        <Row>
            <CheckoutSteps step1 step2 step3 step4/>
            <FormContainer>
            <h1>新增獎學金</h1>
            <Button type='button' variant='primary' onClick={showFormFunction}>新增支出</Button>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            {showForm &&(
            <Form onSubmit={submitHandler}>

         
            <Form.Group controlId='name'>
                <Form.Label>申請人名字</Form.Label>
                <Form.Control
                         
                             type='text'
                             //value={prevCase.current.student.name}
                             value={name}
                             readOnly
                             
                         />
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
            )}

            <Row className='py-3'>
                <Col>
                <Button onClick = {skipToNext}
                className='btn-block' 
                type='button'>
                     略過
                </Button>
                </Col>
            </Row>
        </FormContainer>
            <ProgressBar animated now={80} label={`{80}%`}/>
        </Row>
        
    )
}
export default CaseCreateScholarshipScreen
