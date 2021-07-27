import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { listMember,removeFromMember } from '../actions/memberActions'

function MemberScreen({ match, location, history}) {
  

    const dispatch = useDispatch()
    const memberList = useSelector(state => state.memberList)
    const { error, loading, members } = memberList


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
                                <th>職業</th>
                                <th>電話</th>
                                <th>地址</th>
                                <th>服務名稱</th>
                                <th>是否為慈善會會員</th>
                                <th>是否為管理員</th>
                                <th>備註</th>
                                <th>家族</th>
                                <th>介紹人</th>
                                
                            </tr>
                        </thead>

                        <tbody>
                            {members.map(oneMem => (
                                <tr key={oneMem._id}>
                                    <td><Link to={`/member/${oneMem._id}/edit`}><Button type="button"><i className='fas fa-edit'></i></Button></Link>
                                    <Button
                                    type='button'
                                    variant='danger'
                                    onClick={()=>removeFromMemberHandler(oneMem._id)}><i className='fas fa-trash'> </i>
                                    </Button></td>
                                    
                                    <td>{oneMem._id}</td>
                                    <td>{oneMem.name}</td>
                                    <td>{oneMem.job}</td>
                                    <td>{oneMem.phone}</td>
                                    <td>{oneMem.address}</td>
                                    <td>{oneMem.title}</td>
                                    <td>{oneMem.is_staff == true ? "是":"否"}</td>
                                    <td>{oneMem.is_admin == true ? "是":"否"}</td>
                                    <td>{oneMem.memo}</td>
                                    <td>{oneMem.family}</td>
                                    <td>{oneMem.intro_by}</td>
                                </tr>
                            ))}
                        </tbody>
                        </Table>



                      
                        
                        
                


            </Row>
        }

            
        </div>
    )
}
export default MemberScreen
