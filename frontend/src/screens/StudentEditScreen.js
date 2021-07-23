import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {  STUDENT_UPDATE_RESET,STUDENT_DETAIL_REQUEST } from '../constants/studentConstants'
import {  SCHOOLS_LIST_REQUEST } from '../constants/schoolConstants'

import { listStudent, updateStudent, studentDetail } from '../actions/studentActions'
import { listSchool } from '../actions/schoolActions'
function StudentEditScreen({ match, history}) {
    
    const studentId = match.params.id
    const [schoolTitle,setSchoolTitle] = useState('請選擇學校')
    const [name, setName] = useState('')
    const [school, setSchool] = useState('')

    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [tags, setTags] = useState('')
    const [is_end, setIs_end] = useState('')

    const [memo, setMemo] = useState('')
    const [file, setFile] = useState('')

    const dispatch = useDispatch()
  
    const studentDetailReducer = useSelector(state => state.studentDetail)
    const { error, loading, student } = studentDetailReducer

    const studentUpdate = useSelector(state => state.studentUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = studentUpdate

    const schoolList = useSelector(state => state.schoolList)
    const { schoolListerror, schoolListloading, schools } = schoolList
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/student'

    
    useEffect(()=>{
        
       
        dispatch({type:STUDENT_DETAIL_REQUEST})
        dispatch(studentDetail(studentId))
        dispatch(listSchool())
        if(successUpdate){
            dispatch({ type: STUDENT_UPDATE_RESET })
            history.push(redirect)
        }else{
            if (!student.name || student.id != Number(studentId)){
                console.log("if")
                console.log("student.id=",student.id)
                console.log("studentId=",studentId)
                dispatch(listStudent())
            }else{
                
                console.log("else")
                console.log(student.school)
                setName(student.name)
                
                setSchool(student.school)
                
                setSchoolTitle(student.school)
                setPhone(student.phone)
                setAddress(student.address)
                setTags(student.tags)
                
                if(student.is_end == true){
                    
                    setIs_end(true)
                }
                else{
                    setIs_end(false)
                }
                //setIs_end(student.is_end)
                setMemo(student.memo)
                setFile(student.file)
            }
            
        }
    },[student.id])
//[dispatch, history,studentId,student,successUpdate,schools]
    const handleSelect=(e)=>{
        
        var splitSchool = e.split(',');
        var stringId = splitSchool[0]
        setSchool(parseInt(stringId, 10))

        setSchoolTitle(splitSchool[1]);  
        
      }
    
    const checkboxHandle=()=>
      {
          var save= is_end
          save=!save
        setIs_end(save)
       
        
      }
    
    const submitHandler =(e) =>{
        console.log("look data")
        
        console.log("is_end=",is_end)
        console.log("school=",school)
        console.log(studentId,
            name,
            school,
            phone,
            address,
            tags,
            is_end,
            memo,
            file)
        e.preventDefault()
        dispatch(updateStudent({
            id: studentId,
            name,
            school,
            phone,
            address,
            tags,
            is_end,
            memo,
            file
        }))
        
        window.location.href = redirect
        
    }
    return (
        <FormContainer>
            <h1>修改學生</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label>學生名字</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='輸入學生名字'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='school'>
                <Form.Label>學校</Form.Label>
                <DropdownButton
                aligndown="true"
                title= {schoolTitle}
                id="dropdown-menu-align-down"
                onSelect={handleSelect}
                
                    >

            {schools.map((school,index) =>{
            
            return <Dropdown.Item eventKey={[school._id,school.name] } key={index} >{school.name}</Dropdown.Item>
            })}
                       
            </DropdownButton>
            
            </Form.Group>

            <Form.Group controlId='phone'>
                    <Form.Label>聯絡電話</Form.Label>
                    <Form.Control
                        required
                        type='phone'
                        placeholder='輸入電話'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='address'>
                    <Form.Label>聯絡地址</Form.Label>
                    <Form.Control
                        required
                        type='address'
                        placeholder='輸入地址'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='tags'>
                    <Form.Label>標籤</Form.Label>
                    <Form.Control
                        required
                        type='tags'
                        placeholder='輸入地區標籤'
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
           
            <Form.Group controlId='memo'>
                    <Form.Label>備註</Form.Label>
                    <Form.Control
                        type='memo'
                        placeholder='備註'
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='file'>
                    <Form.Label>檔案</Form.Label>
                    <Form.Control
                        type='file'
                        placeholder='上傳檔案'
                        value={file}
                        onChange={(e) => setFile(e.target.checked)}
                    >

                    </Form.Control>
            </Form.Group>
            
            <Form.Group as={Row} className="mb-3" controlId="is_end">
                <Col>
            <Form.Check 
                id = "is_end_field"
                label="結束個案" 
                value={is_end}
                checked={is_end}
                onChange={checkboxHandle}/>
                
            </Col>
            
            </Form.Group>
                <Button type='submit' variant='primary'>
                    存檔
                </Button>
            </Form>
        
            <Row className='py-3'>
                <Col>
                     <Link to='/student'>
                     取消
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default StudentEditScreen
