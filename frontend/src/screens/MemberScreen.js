import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { listMember,removeFromMember } from '../actions/memberActions'

function StudentScreen({ match, location, history}) {
    
    //const [name, setName] = useState('')
    //const [represent_person_name, setRepresent_person_name] = useState('')
    //const [represent_person_phone, setRepresent_person_phone] = useState('')
    

    const dispatch = useDispatch()
    const studentList = useSelector(state => state.studentList)
    const { error, loading, students } = studentList
    const studentDetail = useSelector(state => state.studentDetail)
    const { detailerror, detailloading, student } = studentDetail

    const redirect = '/member'
    useEffect(() =>{
        dispatch(listMember())
      

    },[dispatch])
    
    const addToMemberHandler =() =>{
        history.push('/member/create')
    }
    const removeFromMemberHandler = (id) => {
        dispatch(removeFromMember(id))
        window.location.reload()
    }
    return (
        <div>
            <h1>會員列表</h1>
            <Button 
                onClick = {addToMemberHandler}
                className='btn-block' 
                type='button'> 
                新增會員
             </Button>
            {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                : 
                <Row>
                    

                        <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>動作</th>
                                <th>ID</th>
                                <th>會員名字</th>
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
                            {students.map(oneStud => (
                                <tr key={oneStud.id}>
                                    <td><Link to={`/member/${oneStud.id}/edit`}><Button type="button"><i className='fas fa-edit'></i></Button></Link>
                                    <Button
                                    type='button'
                                    variant='danger'
                                    onClick={()=>removeFromMemberHandler(oneStud.id)}><i className='fas fa-trash'> </i>
                                    </Button></td>
                                    <td>{oneStud.id}</td>
                                    <td>{oneStud.name}</td>
                                    <td>{oneStud.school}</td>
                                    <td>{oneStud.phone}</td>
                                    <td>{oneStud.address}</td>
                                    <td>{oneStud.tags}</td>
                                    <td>{oneStud.is_end == true ? "是":"否"}</td>
                                    <td>{oneStud.memo}</td>
                                    <td>{oneStud.file}</td>
                                </tr>
                            ))}
                        </tbody>
                        </Table>



                      
                        
                        
                


            </Row>
        }

            
        </div>
    )
}
export default StudentScreen
