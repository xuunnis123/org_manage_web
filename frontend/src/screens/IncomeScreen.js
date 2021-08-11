
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import  Tab  from 'react-bootstrap/Tab'
import Tabs  from 'react-bootstrap/Tabs'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link, useHistory } from 'react-router-dom'
import { listIncome,sumIncome,removeFromIncome  } from '../actions/financeActions'
function IncomeScreen() {
    let history = useHistory();
    const dispatch = useDispatch()
    const financeList = useSelector(state => state.financeList)
    const { error, loading, finance } = financeList
    const incomeSum = useSelector(state => state.incomeSum)
    const { incomeSumError, incomeSumLoading, incomesum } = incomeSum

    const incomeList = useSelector(state => state.incomeList)
    const { incomeError, incomeLoading, incomes } = incomeList
   
    useEffect(() =>{
       
        dispatch(listIncome())
        dispatch(sumIncome())

    },[dispatch])

    const addToIncomeHandler =() =>{
        
        history.push('/finance/income/create')
    }
    const removeFromIncomeHandler = (id) => {
        dispatch(removeFromIncome(id))
        window.location.reload()
    }
    return (
        
        <Row>
        <Col><Button 
        variant="outline-primary"
        onClick = {addToIncomeHandler}
        className='btn-block' 
        type='button'>新增收入款項</Button></Col>
        
        <h1>收入列表</h1>
       
        <h3>總收入統計 + {incomesum} NTD</h3>           

                        <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>動作</th>
                            
                                <th>日期</th>
                                <th>傳票號數</th>
                                <th>科目</th>
                                <th>類別</th>
                                <th>摘要</th>
                                <th>捐助來源</th>
                                <th>收入金額</th>
                                <th>單位</th>
                                
                                <th>經手人</th>
                               
                                
                            </tr>
                        </thead>

                        <tbody>
                            {incomes.map(oneIncome => (
                                <tr key={oneIncome._id}>
                                    <td><Link to={`/finance/income/${oneIncome._id}/edit`}><Button type="button"><i className='fas fa-edit'></i></Button></Link>
                                    <Button
                                    type='button'
                                    variant='danger'
                        
                                    onClick={()=>removeFromIncomeHandler(oneIncome._id)}><i className='fas fa-trash'> </i>
                                    </Button>
                                    </td>
                                    
                                    
                
                                    <td>{oneIncome.modified_at}</td>
                                    <td>{oneIncome.category}</td>
                                    <td>{oneIncome.subject}</td>
                                    <td>{oneIncome.title}</td>
                                    <td>{oneIncome.detail}</td>
                                    <td>{oneIncome.from_whom}</td>
                                    <td>{oneIncome.income_money}</td>
                                    <td>{oneIncome.unit}</td>
                                    <td>{oneIncome.confirmed_person}</td>
                            
                                </tr>
                            ))}
                        </tbody>
                        </Table>
        </Row>                        
       
         
    )
}

export default IncomeScreen
