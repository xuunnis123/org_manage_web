import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import School from '../components/School'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { listStudent } from '../actions/studentActions'

function StudentScreen({ match, location, history}) {
    
    //const [name, setName] = useState('')
    //const [represent_person_name, setRepresent_person_name] = useState('')
    //const [represent_person_phone, setRepresent_person_phone] = useState('')
    

    const dispatch = useDispatch()
    const studentList = useSelector(state => state.studentList)
    const { error, loading, students } = studentList

    useEffect(() =>{
        dispatch(listStudent())
      

    },[dispatch])
    
    const addToStudentHandler =() =>{
        history.push('/student/create')
    }
    return (
        <div>
            <h1>學生列表</h1>
            <Button 
                onClick = {addToStudentHandler}
                className='btn-block' 
                type='button'> 
                新增學生
             </Button>
            {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                : 
                <Row>
                    {students.map(student => (

                        <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>學生名字</th>
                                <th>學校</th>
                                <th>電話</th>
                                <th>地址</th>
                                <th>區域標籤</th>
                                <th>是否為結束個案</th>
                                <th>備註</th>
                                <th>檔案</th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            {students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.school}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.address}</td>
                                    <td>{student.tags}</td>
                                    <td>{student.is_end}</td>
                                    <td>{student.memo}</td>
                                    <td>{student.file}</td>
                                </tr>
                            ))}
                        </tbody>
                        </Table>



                      
                        
                        
                ))}


            </Row>
        }

            
        </div>
    )
}
export default StudentScreen
