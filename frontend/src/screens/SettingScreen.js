import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Route , withRouter,useHistory} from 'react-router-dom';
import { Row, Col,Table,Button,Nav } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'

import { listIncomeContributeContext,listOutcomeContributeContext,listIncomeMoneyCategory, listOutcomeMoneyCategory,addIncomeContributeContext,addOutcomeContributeContext,addIncomeMoneyCategory,addOutcomeMoneyCategory,updateIncomeContributeContext,updateOutcomeContributeContext,updateIncomeMoneyCategory,updateOutcomeMoneyCategory,removeFromIncomeContributeContext,removeFromOutcomeContributeContext,removeFromIncomeMoneyCategory,removeFromOutcomeMoneyCategory} from '../actions/settingActions'

function SettingScreen() {
    
    let history = useHistory();
    const dispatch = useDispatch()
    const incomeContributeContextList = useSelector(state => state.incomeContributeContextList)
    const { error, loading, incomeContributeContext } = incomeContributeContextList
    const outcomeContributeContextList = useSelector(state => state.outcomeContributeContextList)
    const { erroroutcomeContributeContextList, loadingoutcomeContributeContextList, outcomeContributeContext } = outcomeContributeContextList
    const incomeMoneyCategoryList = useSelector(state => state.incomeMoneyCategoryList)
    const { errorincomeMoneyCategoryList, loadingincomeMoneyCategoryList, incomeMoneyCategory} = incomeMoneyCategoryList
    const outcomeMoneyCategoryList = useSelector(state => state.outcomeMoneyCategoryList)
    const { erroroutcomeMoneyCategoryList, loadingoutcomeMoneyCategoryList, outcomeMoneyCategory} = outcomeMoneyCategoryList
    useEffect(() =>{
        dispatch(listIncomeContributeContext())
        dispatch(listOutcomeContributeContext())
        dispatch(listIncomeMoneyCategory())
        dispatch(listOutcomeMoneyCategory())
    
        
    },[dispatch])
    const addToIncomeContributeContextHandler =() =>{
        
        history.push('/setting/income/contributecontext/create')
    }
    const addToOutcomeContributeContextHandler =() =>{
        history.push('/setting/outcome/contributecontext/create')
    }
    const addToIncomeMoneyCategoryHandler =() =>{
        history.push('/setting/income/moneycategory/create')
    }
    const addToOutcomeMoneyCategoryHandler =() =>{
        history.push('/setting/outcome/moneycategory/create')
    }

    const removeFromIncomeContributeContextHandler = (id) => {
        dispatch(removeFromIncomeContributeContext(id))
        window.location.reload()
    }
    const removeFromOutcomeContributeContextHandler = (id) => {
        dispatch(removeFromOutcomeContributeContext(id))
        window.location.reload()
    }

    
    const removeFromIncomeMoneyCategoryHandler = (id) => {
        dispatch(removeFromIncomeMoneyCategory(id))
        window.location.reload()
    }

    const removeFromOutcomeMoneyCategoryHandler = (id) => {
        dispatch(removeFromOutcomeMoneyCategory(id))
        window.location.reload()
    }
    return (
        <div>
            <h1>設定頁面</h1>
            
            {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                : erroroutcomeContributeContextList?<Message variant='danger'>{erroroutcomeContributeContextList}</Message>
                :errorincomeMoneyCategoryList?<Message variant='danger'>{errorincomeMoneyCategoryList}</Message>
                :erroroutcomeMoneyCategoryList?<Message variant='danger'>{erroroutcomeMoneyCategoryList}</Message>
                :
                <Row>
                    <LinkContainer to='/semester'>
                                <Nav.Link><i className="far fa-clipboard"></i> 學期設定</Nav.Link>
                    </LinkContainer>
                    <h2>項目種類</h2>
                    <h3>收入部分</h3>
                    <Col>
                    <Button
                        onClick = {addToIncomeContributeContextHandler}
                        className='btn-block' 
                        type='button'> 
                        新增收入來源分類
                    </Button>
                    </Col>
                     <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>動作</th>
                                
                                <th>收入來源分類</th>
                                
                               
                            </tr>
                        </thead>

                        <tbody>
                            {incomeContributeContext.map(oneIncomeContributeContext => (
                                <tr key={oneIncomeContributeContext._id}>
                                    <td><Link to={`/setting/income/contributecontext/${oneIncomeContributeContext._id}/edit`}><Button type="button"><i className='fas fa-edit'></i></Button></Link>
                                    <Button
                                    type='button'
                                    variant='danger'
                        
                                    onClick={()=>removeFromIncomeContributeContextHandler(oneIncomeContributeContext._id)}><i className='fas fa-trash'> </i>
                                    </Button></td>
                                    
                                    <td>{oneIncomeContributeContext.context}</td>
                                   
                                    
                                </tr>
                            ))}
                        </tbody>
                        </Table>

                        <h3>支出部分</h3>
                        <Col>
                        <Button 
                        onClick = {addToOutcomeContributeContextHandler}
                        className='btn-block' 
                        type='button'> 
                        新增支出來源分類
                    </Button>
                    </Col>
                        <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>動作</th>
                                
                                <th>支出來源分類</th>
                                
                               
                            </tr>
                        </thead>

                        <tbody>
                            {outcomeContributeContext.map(oneOutcomeContributeContext => (
                                <tr key={oneOutcomeContributeContext._id}>
                                    <td><Link to={`/setting/outcome/contributecontext/${oneOutcomeContributeContext._id}/edit`}><Button type="button"><i className='fas fa-edit'></i></Button></Link>
                                    <Button
                                    type='button'
                                    variant='danger'
                                    onClick={()=>removeFromOutcomeContributeContextHandler(oneOutcomeContributeContext._id)}><i className='fas fa-trash'> </i>
                                    </Button></td>
                                    
                                    <td>{oneOutcomeContributeContext.context}</td>
                                   
                                    
                                </tr>
                            ))}
                        </tbody>
                        </Table>

                        <h2>傳票種類</h2>
                        <h3>收入部分</h3>
                        <Col>
                        <Button 
                        onClick = {addToIncomeMoneyCategoryHandler}
                        className='btn-block' 
                        type='button'> 
                        新增收入傳票號數代碼
                    </Button>
                    </Col>
                        <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>動作</th>
                                
                                <th>收入傳票號數代碼</th>
                                <th>收入傳票號數解釋</th>
                               
                            </tr>
                        </thead>

                        <tbody>
                            {incomeMoneyCategory.map(oneIncomeMoneyCategory => (
                                <tr key={oneIncomeMoneyCategory._id}>
                                    <td><Link to={`/setting/income/moneycategory/${oneIncomeMoneyCategory._id}/edit`}><Button type="button"><i className='fas fa-edit'></i></Button></Link>
                                    <Button
                                    type='button'
                                    variant='danger'
                                    onClick={()=>removeFromIncomeMoneyCategoryHandler(oneIncomeMoneyCategory._id)}><i className='fas fa-trash'> </i>
                                    </Button></td>
                                    
                                    <td>{oneIncomeMoneyCategory.name}</td>
                                    <td>{oneIncomeMoneyCategory.detail}</td>
                                   
                                    
                                </tr>
                            ))}
                        </tbody>
                        </Table>
                        <h3>支出部分</h3>
                        <Col>
                        <Button 
                        onClick = {addToOutcomeMoneyCategoryHandler}
                        className='btn-block' 
                        type='button'> 
                        新增支出傳票號數代碼
                    </Button>
                    </Col>
                        <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>動作</th>
                                
                                <th>支出傳票號數代碼</th>
                                <th>支出傳票號數解釋</th>
                               
                            </tr>
                        </thead>

                        <tbody>
                            {outcomeMoneyCategory.map(oneOutcomeMoneyCategory => (
                                <tr key={oneOutcomeMoneyCategory._id}>
                                    <td><Link to={`/setting/outcome/moneycategory/${oneOutcomeMoneyCategory._id}/edit`}><Button type="button"><i className='fas fa-edit'></i></Button></Link>
                                    <Button
                                    type='button'
                                    variant='danger'
                                    onClick={()=>removeFromOutcomeMoneyCategoryHandler(oneOutcomeMoneyCategory._id)}><i className='fas fa-trash'> </i>
                                    </Button></td>
                                    
                                    <td>{oneOutcomeMoneyCategory.name}</td>
                                    <td>{oneOutcomeMoneyCategory.detail}</td>
                                   
                                    
                                </tr>
                            ))}
                        </tbody>
                        </Table>
            </Row>
        }

            
        </div>
    )
}

export default SettingScreen
