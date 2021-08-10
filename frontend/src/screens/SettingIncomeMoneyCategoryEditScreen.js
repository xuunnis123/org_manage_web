import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl,FormLabel,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {  INCOME_MONEY_CATEGORY_LIST_UPDATE_RESET,INCOME_MONEY_CATEGORY_DETAIL_REQUEST } from '../constants/settingConstants'
import { updateIncomeMoneyCategory,incomeMoneyCategoryDetail } from '../actions/settingActions'



function SettingIncomeMoneyCategoryEditScreen({ match, history}) {
    const incomeMoneyCategoryId = match.params.id
    const[ name,setName] = useState('')

    const[ detail,setDetail] = useState('')

    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/finance'
    const incomeMoneyCategoryDetailsReducer = useSelector(state => state.incomeMoneyCategoryDetail)
    const {error, loading, incomeMoneyCate} = incomeMoneyCategoryDetailsReducer
   
    const incomeMoneyCategoryUpdate = useSelector(state => state.incomeMoneyCategoryUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = incomeMoneyCategoryUpdate
    useEffect(()=>{
        dispatch({type:INCOME_MONEY_CATEGORY_DETAIL_REQUEST})
        
        dispatch(incomeMoneyCategoryDetail(incomeMoneyCategoryId))
       
    
        if(successUpdate){
            
            dispatch({ type: INCOME_MONEY_CATEGORY_LIST_UPDATE_RESET })
            history.push(redirect)
        }else{
            if (!incomeMoneyCate.name || incomeMoneyCate._id != Number(incomeMoneyCategoryId)){
              
                
            }else{
                setName(incomeMoneyCate.name)
                setDetail(incomeMoneyCate.detail)

            }
        }
    },[incomeMoneyCate._id,match,incomeMoneyCategoryId])

   
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(updateIncomeMoneyCategory( 
            {
                _id:incomeMoneyCategoryId,
                name:name,

                detail:detail,
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

            <Form.Group controlId='name'>
                    <Form.Label>收入傳票號數代號</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='輸入收入傳票號數'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

       
            <Form.Group controlId='detail'>
                    <Form.Label>收入傳票號數解釋</Form.Label>
                    <Form.Control
                        required
                        type='detail'
                        placeholder='輸入收入傳票號數細節'
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
export default SettingIncomeMoneyCategoryEditScreen
