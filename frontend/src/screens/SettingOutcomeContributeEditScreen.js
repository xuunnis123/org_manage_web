import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl,FormLabel,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {  OUTCOME_CONTRIBUTE_CONTEXT_UPDATE_RESET,OUTCOME_CONTRIBUTE_CONTEXT_DETAIL_REQUEST } from '../constants/settingConstants'
import { updateOutcomeContributeContext,outcomeContributeContextDetail } from '../actions/settingActions'



function SettingOutcomeContributeEditScreen({ match, history}) {
    const outcomeContributeContextId = match.params.id
    const [context,setContext] = useState('')    
    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/finance'
    const outcomeContributeContextDetailState = useSelector(state => state.outcomeContributeContextDetail)
    const {error, loading, outcomeContribute} = outcomeContributeContextDetailState
   
    const outcomeContributeContextUpdate = useSelector(state => state.outcomeContributeContextUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = outcomeContributeContextUpdate
    useEffect(()=>{
        dispatch({type:OUTCOME_CONTRIBUTE_CONTEXT_DETAIL_REQUEST})
        
        dispatch(outcomeContributeContextDetail(outcomeContributeContextId))
       
    
        if(successUpdate){
            
            dispatch({ type: OUTCOME_CONTRIBUTE_CONTEXT_UPDATE_RESET })
            history.push(redirect)
        }else{
            if (!outcomeContribute.context || outcomeContribute._id != Number(outcomeContributeContextId)){
              
                
            }else{
                setContext(outcomeContribute.context)

            }
        }
    },[outcomeContribute._id,match,outcomeContributeContextId])

   
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(updateOutcomeContributeContext( 
            {
                _id:outcomeContributeContextId,
                context:context,
            }
            ))
        
        window.location.href = redirect
        
    }
    return (
        <FormContainer>
            <h1>修改支出來源分類</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='context'>
                    <Form.Label>支出來源分類</Form.Label>
                    <Form.Control
                        required
                        type='context'
                        placeholder='輸入支出來源分類'
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
export default SettingOutcomeContributeEditScreen
