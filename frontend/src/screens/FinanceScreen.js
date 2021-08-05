import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { listFinance, listIncome, listOutcome } from '../actions/financeActions'

function FinanceScreen() {
    
    const dispatch = useDispatch()
    const financeList = useSelector(state => state.financeList)
    const { error, loading, finance } = financeList

    const incomeList = useSelector(state => state.incomeList)
    const { incomeError, incomeLoading, incomes } = incomeList
    
    const outcomeList = useSelector(state => state.outcomeList)
    const { outcomeError, outcomeLoading, outcomes } = outcomeList
    
    useEffect(() =>{
        dispatch(listFinance())
        dispatch(listIncome())
        dispatch(listOutcome())
      

    },[dispatch])

    return (
        <div>
            
            <h1>財務管理頁面</h1>
            <h2>概況</h2>
            {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                : 
                <Row>
                 目前結餘：{ finance } 元
                 收入：{incomes} 元
                 支出：{outcomes} 元
            </Row>
            
        }

        
        </div>
    )
}

export default FinanceScreen
