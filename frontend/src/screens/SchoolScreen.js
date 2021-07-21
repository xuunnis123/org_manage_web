import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import School from '../components/School'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { listSchool, addSchool } from '../actions/schoolActions'

function SchoolScreen({ match, location, history}) {
    
    //const [name, setName] = useState('')
    //const [represent_person_name, setRepresent_person_name] = useState('')
    //const [represent_person_phone, setRepresent_person_phone] = useState('')
    

    const dispatch = useDispatch()
    const schoolList = useSelector(state => state.schoolList)
    const { error, loading, schools } = schoolList

    useEffect(() =>{
        dispatch(listSchool())
      

    },[dispatch])
    //dispatch(listSchool())
    const addToSchoolHandler =() =>{
        
        history.push('/school/create')
    }
    return (
        <div>
            <h1>學校列表</h1>
            <Button 
                onClick = {addToSchoolHandler}
                className='btn-block' 
                type='button'> 
                新增學校
             </Button>
            {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                : 
                <Row>
                    {schools.map(school => (
                        <Col key={school._id} sm={12} md={6} lg={4} xl={3}>
                            <School school={school} />
                        </Col>
                        
                ))}


            </Row>
        }

            
        </div>
    )
}
export default SchoolScreen
