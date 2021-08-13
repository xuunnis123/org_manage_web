import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { listScholarship,removeFromScholarship } from '../actions/scholarshipActions'

function ScholarshipScreen({ match, location, history}) {
  

    const dispatch = useDispatch()
    const scholarshipList = useSelector(state => state.scholarshipList)
    const { error, loading, scholarships } = scholarshipList


    const redirect = '/scholarship'
    useEffect(() =>{
        dispatch(listScholarship())
      

    },[dispatch])
    
    const addToScholarshipHandler =() =>{
        history.push('/scholarship/create')
    }
    const removeFromScholarshipHandler = (id) => {
        dispatch(removeFromScholarship(id))
        window.location.reload()
    }
    return (
        <div>
            <h1>獎學金列表</h1>
            <Button 
                onClick = {addToScholarshipHandler}
                className='btn-block' 
                type='button'> 
                新增獎學金
             </Button>
            {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                : 
                <Row>
                    

                        <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>動作</th>
                                
                                <th>申請人名字</th>
                                <th>學期</th>
                                <th>獎學金金額</th>
                                
                                
                            </tr>
                        </thead>

                        <tbody>
                            {scholarships.map(onescholarship => (
                                <tr key={onescholarship._id}>
                                    <td><Link to={`/scholarship/${onescholarship._id}/edit`}><Button type="button"><i className='fas fa-edit'></i></Button></Link>
                                    <Button
                                    type='button'
                                    variant='danger'
                                    onClick={()=>removeFromScholarshipHandler(onescholarship._id)}><i className='fas fa-trash'> </i>
                                    </Button></td>
                                    
                                    <td>{onescholarship.name}</td>
                                    <td>{onescholarship.semester}</td>
                                    <td>{onescholarship.price}</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                        </Table>



                      
                        
                        
                


            </Row>
        }

            
        </div>
    )
}
export default ScholarshipScreen
