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
    
    const [name, setName] = useState('')
    const [school, setSchool] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [tags, setTags] = useState('')
    const [is_end, setIs_end] = useState('')
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

    const applySelect = (e) => {setSchool(e.target.value)};
   
    const handleSelect=(e)=>{
        console.log(e);
        setSchool(e)
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

            <DropdownButton
                alignRight
                title="Dropdown right"
                id="dropdown-menu-align-right"
                onSelect={handleSelect}
                    >
                        <Dropdown.Item eventKey="option-1">option-1</Dropdown.Item>
                        <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
                        <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="some link">some link</Dropdown.Item>
            </DropdownButton>
            
            <Form.Group controlId="formControlsSelect">
            <Form.Label>學校</Form.Label>
            
            
            <Form.Control
             as="select"
             custom
             onChange={(e) => setSchool(e.target.value)}
             size="lg"
            > 
            
        
            {schools.map((school) =>{
            
            return <option key={school._id} value={school._id}>{school.name}</option>
            
            })}

            
            </Form.Control>
            </Form.Group>
            <h4>You selected {school}</h4>
            
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
            <Form.Check label="結束個案" value={is_end}
                        onChange={(e) => setIs_end(e.target.value)}/>
            </Col>
            </Form.Group>
                <Button type='submit' variant='primary'>
                    建立
                </Button>
            </Form>
        
            <Row className='py-3'>
                <Col>
                     <Link to='/school'>
                     取消
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default StudentCreateScreen
