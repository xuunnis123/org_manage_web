
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import  Tab  from 'react-bootstrap/Tab'
import Tabs  from 'react-bootstrap/Tabs'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { listFinance,  } from '../actions/financeActions'
function Finance() {
    const dispatch = useDispatch()
    const financeList = useSelector(state => state.financeList)
    const { error, loading, finance } = financeList
    const incomeSum = useSelector(state => state.incomeSum)
    const { incomeSumError, incomeSumLoading, incomesum } = incomeSum
    
    const outcomeSum = useSelector(state => state.outcomeSum)
    const { outcomeSumError, outcomeSumLoading, outcomesum } = outcomeSum

    useEffect(() =>{
        dispatch(listFinance())
       

    },[dispatch])
    return (
        <Row>
        <h1>財務管理頁面</h1>
        <h2>概況</h2>
            
            
            {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                : 
                <Row>
                    <Table striped bordered hover responsive className='table-lg'>
                    <thead>
                        <tr>
                            
                            <th>收入</th>
                            <th>支出</th>
                            <th>目前結餘</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                               
                                <td>
                                { incomesum }
                                </td>
                                <td>
                                { outcomesum }
                                </td>
                                <td>
                                { finance }
                                </td>
                            </tr>
                        </tbody>
    
                 </Table>
            </Row>
            
            }
            
            </Row>
    )
}

export default Finance
