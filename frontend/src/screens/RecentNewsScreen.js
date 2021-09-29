import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl,FormLabel,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

function RecentNewsScreen() {
   
   
    
    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/'
    
    useEffect(()=>{
       
      
    },[redirect])

   
   
    return (
        <FormContainer>
            <h1>最新消息</h1>
            <h2>公告類型</h2>

            <hr/>
        </FormContainer>
    )
}
export default RecentNewsScreen
