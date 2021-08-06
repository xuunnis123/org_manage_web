import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { listFinance, listIncome, listOutcome,sumIncome,sumOutcome } from '../actions/financeActions'
import { incomeSumReducers } from '../reducers/financeReducers'

function FinanceScreen() {
    
    const dispatch = useDispatch()
    const financeList = useSelector(state => state.financeList)
    const { error, loading, finance } = financeList

    const incomeList = useSelector(state => state.incomeList)
    const { incomeError, incomeLoading, incomes } = incomeList
    
    const outcomeList = useSelector(state => state.outcomeList)
    const { outcomeError, outcomeLoading, outcomes } = outcomeList

    const incomeSum = useSelector(state => state.incomeSum)
    const { incomeSumError, incomeSumLoading, incomesum } = incomeSum
    
    const outcomeSum = useSelector(state => state.outcomeSum)
    const { outcomeSumError, outcomeSumLoading, outcomesum } = outcomeSum
    useEffect(() =>{
        dispatch(listFinance())
        dispatch(listIncome())
        dispatch(listOutcome())
        dispatch(sumIncome())
        dispatch(sumOutcome())

    },[dispatch])

    return (
        <div>
            
            <h1>財務管理頁面</h1>
            <tr>
                <td><Button>收入頁面</Button>
            
                <Button>支出頁面</Button></td>
            </tr>
            <tr>
            <h2>概況</h2>
            {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                : 
                <Row>
                    <Table striped bordered hover responsive className='table-lg'>
                    <thead>
                        <tr>
                            <th>目前結餘</th>
                            <th>收入</th>
                            <th>支出</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                { finance }
                                </td>
                                <td>
                                { incomesum }
                                </td>
                                <td>
                                { outcomesum }
                                </td>
                            </tr>
                        </tbody>
    
                 </Table>
            </Row>
            
            }
            </tr>
           
        <h2>支出列表</h2>
        <Row>
                    

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
                                    <td><Link to={``}><Button type="button"><i className='fas fa-edit'></i></Button></Link></td>
                   
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
        <h2>收入列表</h2>
        <Row>
                    

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
                                    <td><Link to={``}><Button type="button"><i className='fas fa-edit'></i></Button></Link></td>
                                    
                                    
                
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
        </div>
        
    )
}

export default FinanceScreen
