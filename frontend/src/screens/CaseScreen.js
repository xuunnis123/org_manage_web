import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'


function CaseScreen({ match, location, history}) {
    

    return (
        <Row>
            <Col md={8}>
                <Card>個案頁</Card>
               
            </Col>
        </Row>
    )
}
export default CaseScreen
