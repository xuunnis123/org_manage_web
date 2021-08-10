import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl,FormLabel,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {  OUTCOME_MONEY_CATEGORY_LIST_UPDATE_RESET,OUTCOME_MONEY_CATEGORY_DETAIL_REQUEST } from '../constants/settingConstants'
import { updateOutcomeMoneyCategory,outcomeMoneyCategoryDetail } from '../actions/settingActions'



function SettingOutcomeMoneyCategoryEditScreen({ match, history}) {
    const outcomeMoneyCategoryId = match.params.id
    const[ name,setName] = useState('')

    const[ detail,setDetail] = useState('')

    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/finance'
    const outcomeMoneyCategoryDetailsReducer = useSelector(state => state.outcomeMoneyCategoryDetail)
    const {error, loading, outcomeMoneyCate} = outcomeMoneyCategoryDetailsReducer
   
    const incomeMoneyCategoryUpdate = useSelector(state => state.incomeMoneyCategoryUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = incomeMoneyCategoryUpdate
    useEffect(()=>{
        dispatch({type:OUTCOME_MONEY_CATEGORY_DETAIL_REQUEST})
        
        dispatch(outcomeMoneyCategoryDetail(outcomeMoneyCategoryId))
       
    
        if(successUpdate){
            
            dispatch({ type: OUTCOME_MONEY_CATEGORY_LIST_UPDATE_RESET })
            history.push(redirect)
        }else{
            if (!outcomeMoneyCate.name || outcomeMoneyCate._id != Number(outcomeMoneyCategoryId)){
              
                
            }else{
                setName(outcomeMoneyCate.name)
                setDetail(outcomeMoneyCate.detail)

            }
        }
    },[outcomeMoneyCate._id,match,outcomeMoneyCategoryId])

   
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(updateOutcomeMoneyCategory( 
            {
                _id:outcomeMoneyCategoryId,
                name:name,

                detail:detail,
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

            <Form.Group controlId='name'>
                    <Form.Label>支出傳票號數代號</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='輸入支出傳票號數'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

       
            <Form.Group controlId='detail'>
                    <Form.Label>支出傳票號數解釋</Form.Label>
                    <Form.Control
                        required
                        type='detail'
                        placeholder='輸入支出傳票號數細節'
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
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
export default SettingOutcomeMoneyCategoryEditScreen
