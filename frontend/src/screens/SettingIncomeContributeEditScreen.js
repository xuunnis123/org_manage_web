import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl,FormLabel,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {  INCOME_CONTRIBUTE_CONTEXT_UPDATE_RESET,INCOME_CONTRIBUTE_CONTEXT_DETAIL_REQUEST } from '../constants/settingConstants'
import { updateIncomeContributeContext,incomeContributeContextDetail } from '../actions/settingActions'



function SettingIncomeContributeEditScreen({ match, history}) {
    const incomeContributeContextId = match.params.id
    const [context,setContext] = useState('')    
    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/finance'
    const incomeContributeContextDetailState = useSelector(state => state.incomeContributeContextDetail)
    const {error, loading, incomeContribute} = incomeContributeContextDetailState
   
    const incomeContributeContextUpdate = useSelector(state => state.incomeContributeContextUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = incomeContributeContextUpdate
    useEffect(()=>{
        dispatch({type:INCOME_CONTRIBUTE_CONTEXT_DETAIL_REQUEST})
        
        dispatch(incomeContributeContextDetail(incomeContributeContextId))
       
    
        if(successUpdate){
            
            dispatch({ type: INCOME_CONTRIBUTE_CONTEXT_UPDATE_RESET })
            history.push(redirect)
        }else{
            if (!incomeContribute.context || incomeContribute._id != Number(incomeContributeContextId)){
              
                
            }else{
                setContext(incomeContribute.context)

            }
        }
    },[incomeContribute._id,match,incomeContributeContextId])

   
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(updateIncomeContributeContext( 
            {
                _id:incomeContributeContextId,
                context:context,
            }
            ))
        
        window.location.href = redirect
        
    }
    return (
        <FormContainer>
            <h1>修改收入來源分類</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='context'>
                    <Form.Label>收入來源分類</Form.Label>
                    <Form.Control
                        required
                        type='context'
                        placeholder='輸入收入來源分類'
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

       
            
           
            
            
                <Button type='submit' variant='primary'>
                    存檔
                </Button>
            </Form>
        
            <Row className='py-3'>
                <Col>
                     <Link to='/finance'>
                     取消
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default SettingIncomeContributeEditScreen
