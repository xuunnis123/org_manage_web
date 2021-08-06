
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import  Tab  from 'react-bootstrap/Tab'
import Tabs  from 'react-bootstrap/Tabs'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { listIncome,sumIncome  } from '../actions/financeActions'
function CategoryContributeContext() {
    const dispatch = useDispatch()
    
   
    useEffect(() =>{
      

    },[dispatch])
    return (
        
        <Row>
        施工中
        </Row>                        
       
         
    )
}

export default CategoryContributeContext
