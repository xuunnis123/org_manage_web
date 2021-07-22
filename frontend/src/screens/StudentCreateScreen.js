import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl,FormLabel,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { listStudent, addStudent } from '../actions/studentActions'

import { listSchool } from '../actions/schoolActions'

function StudentCreateScreen({ match, location, history}) {
   
    const [schoolTitle,setSchoolTitle] = useState('請選擇學校')
    const [name, setName] = useState('')
    const [school, setSchool] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [tags, setTags] = useState('')
    const [is_end, setIs_end] = useState('False')
    const [memo, setMemo] = useState('')
    const [file, setFile] = useState('')
    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/student'
    const studentAdd = useSelector(state => state.studentAdd)
    const {error, loading, student} = studentAdd
    
    const schoolList = useSelector(state => state.schoolList)
    const { schoolListerror, schoolListloading, schools } = schoolList

    useEffect(()=>{
        dispatch(listSchool())
        
        if(student){
            history.push(redirect)
        }
    },[history, student, redirect])

   
   
    const handleSelect=(e)=>{
        
        var splitSchool = e.split(',');
        
        setSchool(splitSchool[0])

        setSchoolTitle(splitSchool[1]);  
      }

     
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(addStudent(school, name, phone, address, tags, is_end, memo, file))
        
        history.push(redirect)
        
    }
    return (
        <FormContainer>
            <h1>新增學生</h1>
            
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

            <Form.Group controlId='test'>
                <Form.Label>學校</Form.Label>
                <DropdownButton
                aligndown="true"
                title= {schoolTitle}
                id="dropdown-menu-align-down"
                onSelect={handleSelect}
                    >

            {schools.map((school,index) =>{
            
            return <Dropdown.Item eventKey={[school._id,school.name]} key={index}>{school.name}</Dropdown.Item>
            })}
                       
            </DropdownButton>
            
            </Form.Group>
            <Row className='py-3'>
                <Col>
                     <Link to='/school/create'>
                     新增學校
                        </Link>
                </Col>
            </Row>
            
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
                        onChange={(e) => setFile(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="is_end">
                <Col>
            <Form.Check 
                id = "is_end_field"
                label="結束個案" 
                value={is_end}
                onChange={() => setIs_end('true')}/>
            </Col>
            </Form.Group>
                <Button type='submit' variant='primary'>
                    建立
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
export default StudentCreateScreen
