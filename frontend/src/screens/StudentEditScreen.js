import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {  STUDENT_UPDATE_RESET,STUDENT_DETAIL_REQUEST } from '../constants/studentConstants'
import { listStudent, updateStudent } from '../actions/studentActions'

function StudentEditScreen({ match, history}) {
    
    const studentId = match.params.id

    const [name, setName] = useState('')
    const [school, setSchool] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [tags, setTags] = useState('')
    const [is_end, setIs_end] = useState('')
    const [memo, setMemo] = useState('')
    const [file, setFile] = useState('')

    const dispatch = useDispatch()
  
    const studentDetail = useSelector(state => state.studentDetail)
    const { error, loading, student } = studentDetail

    const studentUpdate = useSelector(state => state.studentUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = studentUpdate
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/student'


    useEffect(()=>{
        console.log("studentId=",studentId)
        console.log("successUpdate=",successUpdate)
        dispatch({type:STUDENT_DETAIL_REQUEST})
        if(successUpdate){
            dispatch({ type: STUDENT_UPDATE_RESET })
            history.push(redirect)
        }else{
            if (!student.name || student.id != Number(studentId)){
                console.log("if")
                console.log("student.name=",student.name)
                console.log("student.id=",student.id)
                dispatch(listStudent())
            }else{
                console.log("else")
                setName(student.name)
                setSchool(student.school)
                setPhone(student.phone)
                setAddress(student.address)
                setTags(student.tags)
                setIs_end(student.is_end)
                setMemo(student.memo)
                setFile(student.file)
            }
            
        }
    },[dispatch, history, student,studentId, successUpdate])

    //dispatch(listSchool())
    const submitHandler =(e) =>{
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
        
        history.push(redirect)
        
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
                    <Form.Control
                        required
                        type='school'
                        placeholder='選擇學校'
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                    >

                    </Form.Control>
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
            <Form.Group controlId='is_end'>
                    <Form.Label>結束個案？</Form.Label>
                    <Form.Control
                        required
                        type='is_end'
                        placeholder=''
                        value={is_end}
                        onChange={(e) => setIs_end(e.target.value)}
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
                <Button type='submit' variant='primary'>
                    存檔
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
export default StudentEditScreen
