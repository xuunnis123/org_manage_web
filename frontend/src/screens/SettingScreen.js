import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'


import { listFinance, listIncome, listOutcome } from '../actions/financeActions'

function SettingScreen() {
    
    const dispatch = useDispatch()
    const financeList = useSelector(state => state.financeList)
    const { error, loading, finance } = financeList

    const incomeList = useSelector(state => state.incomeList)
    const { incomeError, incomeLoading, incomes } = incomeList
    
    const outcomeList = useSelector(state => state.outcomeList)
    const { outcomeError, outcomeLoading, outcomes } = outcomeList
    
    useEffect(() =>{
       
      

    },[dispatch])

    return (
        <div>
            <h1>設定頁面</h1>
            
            {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                : 
                <Row>
               設定頁面
            </Row>
        }

            
        </div>
    )
}

export default SettingScreen
