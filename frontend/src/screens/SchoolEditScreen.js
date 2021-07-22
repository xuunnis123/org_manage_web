import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {  SCHOOL_UPDATE_RESET } from '../constants/schoolConstants'
import { listSchool, updateSchool } from '../actions/schoolActions'

function SchoolEditScreen({ match, history}) {
    
    const schoolId = match.params.id

    const [name, setName] = useState('')
    const [represent_person_name, setRepresent_person_name] = useState('')
    const [represent_person_phone, setRepresent_person_phone] = useState('')
    const [memo, setMemo] = useState('')

    const dispatch = useDispatch()
  
    const schoolDetail = useSelector(state => state.schoolDetail)
    const { error, loading, school } = schoolDetail

    const schoolUpdate = useSelector(state => state.schoolUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = schoolUpdate
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/school'


    useEffect(()=>{
        
        if(successUpdate){
            dispatch({ type: SCHOOL_UPDATE_RESET })
            history.push(redirect)
        }else{
            if (!school.name || school._id != Number(schoolId)){
                dispatch(listSchool())
            }else{
                setName(school.name)
                setRepresent_person_name(school.represent_person_name)
                setRepresent_person_phone(school.represent_person_phone)
                setMemo(school.memo)
            }
            
        }
    },[dispatch, history, school,schoolId, successUpdate])

    //dispatch(listSchool())
    const submitHandler =(e) =>{
        e.preventDefault()
        dispatch(updateSchool({
            _id: schoolId,
            name,
            represent_person_name,
            represent_person_phone,
            memo
        }))
        
        history.push(redirect)
        
    }
    return (
        <FormContainer>
            <h1>修改學校</h1>
            
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loadingUpdate && <Loader />}
            
            <Form onSubmit={submitHandler}>
            
            <Form.Group controlId='name'>
                    <Form.Label>學校名稱</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='輸入學校名字'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='represent_person_name'>
                    <Form.Label>學校接洽人</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='輸入接洽人姓名'
                        value={represent_person_name}
                        onChange={(e) => setRepresent_person_name(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='represent_person_phone'>
                    <Form.Label>聯絡電話</Form.Label>
                    <Form.Control
                        required
                        type='phone'
                        placeholder='輸入電話'
                        value={represent_person_phone}
                        onChange={(e) => setRepresent_person_phone(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='memo'>
                    <Form.Label>備註</Form.Label>
                    <Form.Control
                        type='memo'
                        placeholder='備註欄'
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
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
export default SchoolEditScreen
