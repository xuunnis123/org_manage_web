import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {  STUDENT_UPDATE_RESET,STUDENT_DETAIL_REQUEST } from '../constants/studentConstants'
import { listStudent, updateStudent } from '../actions/studentActions'

function TestScreen({ match, history}) {
    
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

    const schoolList = useSelector(state => state.schoolList)
    const { schoolListerror, schoolListloading, schools } = schoolList
    
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

            
    )
}
export default TestScreen
