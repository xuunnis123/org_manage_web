
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import  Tab  from 'react-bootstrap/Tab'
import Tabs  from 'react-bootstrap/Tabs'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link,useHistory } from 'react-router-dom'
import { listOutcome,sumOutcome,removeFromOutcome } from '../actions/financeActions'
function OutcomeScreen() {
    let history = useHistory();
    const dispatch = useDispatch()
  
    const outcomeList = useSelector(state => state.outcomeList)
    const { outcomeError, outcomeLoading, outcomes } = outcomeList
    
    const outcomeSum = useSelector(state => state.outcomeSum)
    const { outcomeSumError, outcomeSumLoading, outcomesum } = outcomeSum
   
    useEffect(() =>{
       
        dispatch(listOutcome())
        dispatch(sumOutcome())

    },[dispatch])

    const addToOutcomeHandler =() =>{
        
        history.push('/finance/outcome/create')
    }

    const removeFromOutcomeHandler = (id) => {
        dispatch(removeFromOutcome(id))
        window.location.reload()
    }
    return (
        
        <Row>
        <Col><Button 
        variant="outline-primary"
        onClick = {addToOutcomeHandler}
        className='btn-block' 
        type='button'>新增支出款項</Button></Col>
            
                    <h1>支出列表</h1>
                    <h3>總支出統計 - {outcomesum} NTD </h3>
                        <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>動作</th>
                            
                                <th>日期</th>
                                <th>傳票號數</th>
                                <th>科目</th>
                                <th>類別</th>
                                <th>摘要</th>
                                <th>捐助對象</th>
                                <th>支出金額</th>
                                <th>單位</th>
                                
                                <th>經手人</th>
                               
                                
                            </tr>
                        </thead>

                        <tbody>
                            {outcomes.map(oneOutcome => (
                                <tr key={oneOutcome._id}>
                                    <td><Link to={`/finance/outcome/${oneOutcome._id}/edit`}><Button type="button"><i className='fas fa-edit'></i></Button></Link>
                                    <Button
                                    type='button'
                                    variant='danger'
                        
                                    onClick={()=>removeFromOutcomeHandler(oneOutcome._id)}><i className='fas fa-trash'> </i>
                                    </Button>
                                    </td>
                   
                                    <td>{oneOutcome.modified_at}</td>
                                    <td>{oneOutcome.category}</td>
                                    <td>{oneOutcome.subject}</td>
                                    <td>{oneOutcome.title}</td>
                                    <td>{oneOutcome.detail}</td>
                                    <td>{oneOutcome.to_whom}</td>
                                    <td>{oneOutcome.outcome_money}</td>
                                    <td>{oneOutcome.unit}</td>
                                    <td>{oneOutcome.confirmed_person}</td>
                            
                                </tr>
                            ))}
                        </tbody>
                        </Table>
        </Row>            
    )
}

export default OutcomeScreen
