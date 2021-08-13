import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { listSemester,removeFromSemester } from '../actions/semesterActions'

function SemesterScreen({ match, location, history}) {
  

    const dispatch = useDispatch()
    const semesterList = useSelector(state => state.semesterList)
    const { error, loading, semesters } = semesterList


    const redirect = '/semester'
    useEffect(() =>{
        dispatch(listSemester())
      

    },[dispatch])
    
    const addToSemesterHandler =() =>{
        history.push('/semester/create')
    }
    const removeFromSemesterHandler = (id) => {
        dispatch(removeFromSemester(id))
        window.location.reload()
    }
    return (
        <div>
            <h1>學期列表</h1>
            <Button 
                onClick = {addToSemesterHandler}
                className='btn-block' 
                type='button'> 
                新增學期
             </Button>
            {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                : 
                <Row>
                    

                        <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>動作</th>
                                
                                <th>學期</th>
                                <th>年份</th>
                                <th>學期開始日</th>
                                <th>學期結束日</th>
                                
                                
                            </tr>
                        </thead>

                        <tbody>
                            {semesters.map(onesemester => (
                                <tr key={onesemester._id}>
                                    <td><Link to={`/semester/${onesemester._id}/edit`}><Button type="button"><i className='fas fa-edit'></i></Button></Link>
                                    <Button
                                    type='button'
                                    variant='danger'
                                    onClick={()=>removeFromSemesterHandler(onesemester._id)}><i className='fas fa-trash'> </i>
                                    </Button></td>
                                    
                                    <td>{onesemester.name}</td>
                                    <td>{onesemester.year}</td>
                                    <td>{onesemester.start_date}</td>
                                    <td>{onesemester.end_date}</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                        </Table>



                      
                        
                        
                


            </Row>
        }

            
        </div>
    )
}
export default SemesterScreen
