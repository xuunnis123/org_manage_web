import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import  Tab  from 'react-bootstrap/Tab'
import Tabs  from 'react-bootstrap/Tabs'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Finance from '../components/Finance'
import Income from '../components/Income'
import Outcome from '../components/Outcome'
import { Link } from 'react-router-dom'
import SettingScreen from './SettingScreen'

function FinanceScreen() {
    
    const dispatch = useDispatch()
   
    useEffect(() =>{
      

    },[dispatch])

   
    
    return (
        
        
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="home" title="概況">
            <Finance />
        </Tab>
        <Tab eventKey="income" title="收入">
            <Income />
        </Tab>
        <Tab eventKey="outcome" title="支出" >
            <Outcome />
        </Tab>
        <Tab eventKey="settingScreen" title="項目管理" >
            <SettingScreen />
        </Tab>
        </Tabs>
        
    )
}

export default FinanceScreen
