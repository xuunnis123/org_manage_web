import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl,FormLabel,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { listMember, addMember } from '../actions/memberActions'



function MemberCreateScreen({ match, location, history}) {
   
    const [familyName,setFamilyName] = useState('請選擇家庭')
    const [intro_byName,setIntro_byName] = useState('請選擇介紹人')
    const [name, setName] = useState('')
    const [job, setJob] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [title, setTitle] = useState('')
    const [is_staff, setIs_staff] = useState('True')
    const [is_admin, setIs_admin] = useState('False')
    const [memo, setMemo] = useState('')
    const [family, setFamily] = useState('')
    const [intro_by, setIntro_by] = useState('')

    
    const dispatch = useDispatch()
  
    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/member'
    const memberAdd = useSelector(state => state.memberAdd)
    const {error, loading, member} = memberAdd
    
    const memberList = useSelector(state => state.memberList)
    const { errorList, loadingList, members } = memberList

    useEffect(()=>{
        dispatch(listMember())
        
        if(member){
            history.push(redirect)
        }
    },[history, member, redirect])

   
   
    const handleSelectFamily=(e)=>{
        
        var splitFamily = e.split(',');
        
        setFamily(splitFamily[0])

        setFamilyName(splitFamily[1]);  
      }
      
      const handleSelectIntro=(e)=>{
        
        var splitIntro = e.split(',');
        
        setIntro_by(splitIntro[0])

        setIntro_byName(splitIntro[1]);  
      }
    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch(addMember( name,job, phone, address, title, is_staff, is_admin, memo, family, intro_by))
        
        history.push(redirect)
        
    }
    return (
        <FormContainer>
            <h1>新增會員</h1>
            
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label>會員名字</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='輸入會員名字'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

       
            
            <Form.Group controlId='phone'>
                    <Form.Label>聯絡電話</Form.Label>
                    <Form.Control
                        required
                        type='phone'
                        placeholder='輸入電話'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='address'>
                    <Form.Label>聯絡地址</Form.Label>
                    <Form.Control
                        required
                        type='address'
                        placeholder='輸入地址'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='job'>
                    <Form.Label>職業</Form.Label>
                    <Form.Control
                        required
                        type='job'
                        placeholder='輸入職業'
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='title'>
                    <Form.Label>職位</Form.Label>
                    <Form.Control
                        required
                        type='title'
                        placeholder='輸入地區標籤'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    >
                        
                    </Form.Control>
            </Form.Group>

            
            
            <Form.Group controlId='memo'>
                    <Form.Label>備註</Form.Label>
                    <Form.Control
                        type='memo'
                        placeholder='備註'
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>
           

            <Form.Group as={Row} className="mb-3" controlId="is_staff">
                <Col>
            <Form.Check 
                id = "is_staff_field"
                label="會員" 
                value={is_staff}
                onChange={() => setIs_staff('true')}/>
            </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="is_admin">
                <Col>
            <Form.Check 
                id = "is_admin_field"
                label="管理員" 
                value={is_admin}
                onChange={() => setIs_admin('true')}/>
            </Col>
            </Form.Group>
            <Form.Group controlId='family'>
                <Form.Label>家庭</Form.Label>
                <DropdownButton
                aligndown="true"
                title= {familyName}
                id="dropdown-menu-align-down"
                onSelect={handleSelectFamily}
                    >

            {members.map((member,index) =>{
            
            return <Dropdown.Item eventKey={[member._id,member.name]} key={index}>{member.name}</Dropdown.Item>
            })}
                       
            </DropdownButton>
            
            </Form.Group>

            <Form.Group controlId='intro_by'>
                <Form.Label>介紹人</Form.Label>
                <DropdownButton
                aligndown="true"
                title= {intro_byName}
                id="dropdown-menu-align-down"
                onSelect={handleSelectIntro}
                    >

            {members.map((member,index) =>{
            
            return <Dropdown.Item eventKey={[member._id,member.name]} key={index}>{member.name}</Dropdown.Item>
            })}
                       
            </DropdownButton>
            
            </Form.Group>
                <Button type='submit' variant='primary'>
                    建立
                </Button>
            </Form>
        
            <Row className='py-3'>
                <Col>
                     <Link to='/member'>
                     取消
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
export default MemberCreateScreen
