import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import School from '../components/School'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { listSchool, addSchool } from '../actions/schoolActions'

function SchoolCreateScreen({ match, location, history}) {
    
    //const [name, setName] = useState('')
    //const [represent_person_name, setRepresent_person_name] = useState('')
    //const [represent_person_phone, setRepresent_person_phone] = useState('')
    

    const dispatch = useDispatch()
  

    
    //dispatch(listSchool())
    const addToCartHandler =() =>{
        history.push(`/school/create`)
    }
    return (
        <div>
            <h1>新增學校</h1>
            
            
        </div>
    )
}
export default SchoolCreateScreen
