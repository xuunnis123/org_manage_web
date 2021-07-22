import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { SCHOOL_DETAIL_REQUEST } from '../constants/schoolConstants'
import { schoolDetail,removeFromSchool } from '../actions/schoolActions'

function SchoolDetailScreen({ match,history }){

    const dispatch = useDispatch()
    const schoolDetailinfo = useSelector(state => state.schoolDetail)
    const { error, loading, school } = schoolDetailinfo
    const id = match.params.id
    const redirect = '/school'
    useEffect(() => {
        
        dispatch({type:SCHOOL_DETAIL_REQUEST})
        console.log(id)
        dispatch(schoolDetail(id))
    }, [id])
    const removeFromSchoolHandler = (id) => {
        dispatch(removeFromSchool(id))
        history.push(redirect)
    }
    return (
        <Row>
            <Row className='py-3'>
                <Col>
                     <Link to='/school'>
                     返回
                        </Link>
                </Col>
            </Row>
            <Col md={10}>
                <h2>{school.name} 詳細資訊</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <ListGroup variant="flush">
                    <ListGroup.Item>
                    學校名稱：{school.name}

                    </ListGroup.Item>
                    <ListGroup.Item>
                    學校負責人：{school.represent_person_name}

                    </ListGroup.Item>
                    <ListGroup.Item>
                    聯絡電話：{school.represent_person_phone}

                    </ListGroup.Item>
                    <ListGroup.Item>
                    備註項目：{school.memo}

                    </ListGroup.Item>

                </ListGroup>
                
                <Col md={3}>
                
                <Link to = {`/school/${id}/edit`}>
                <Button type="button">
                修改
                </Button>
                </Link>
                
                
                
                </Col>
                <Col md={3}>
                    <Button
                        type='button'
                        variant='danger'
                        onClick={()=>removeFromSchoolHandler(id)}
                    >
                        <i className='fas fa-trash'> 刪除</i>
                    </Button>
                    </Col>
                
            </Col>


        </Row>

       
    )

}
export default SchoolDetailScreen