import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {  MEMBER_UPDATE_RESET,MEMBER_DETAIL_REQUEST } from '../constants/memberConstants'

import { listMember, updateMember, memberDetail } from '../actions/memberActions'
import { listSchool } from '../actions/schoolActions'
function MemberEditScreen({ match, history}) {

    const memberId = match.params.id
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
  
    
    const redirect = '/member'

    const memberDetailReducer = useSelector(state => state.memberDetail)
    const { error, loading, member } = memberDetailReducer

    const memberUpdate = useSelector(state => state.memberUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = memberUpdate


    
    const memberList = useSelector(state => state.memberList)
    const { errorList, loadingList, members } = memberList
    
    useEffect(()=>{
        
       
        dispatch({type:MEMBER_DETAIL_REQUEST})
        dispatch(memberDetail(memberId))
        dispatch(listMember())
        if(successUpdate){
            dispatch({ type: MEMBER_UPDATE_RESET })
            history.push(redirect)
        }else{
            if (!member.name || member._id != Number(memberId)){
                console.log("if")
                console.log(member)
                console.log("member.id=",member._id)
                console.log("memberId=",memberId)
                dispatch(listMember())
            }else{
                

                setFamilyName(member.family)
                setIntro_byName(member.intro_by)
                setName(member.name)
                setJob(member.job)
                setPhone(member.phone)
                setAddress(member.address)
                setTitle(member.title)
                if(member.is_staff == true){
                    
                    setIs_staff(true)
                }
                else{
                    setIs_staff(false)
                }
                if(member.is_admin == true){
                    
                    setIs_admin(true)
                }
                else{
                    setIs_admin(false)
                }
                setMemo(member.memo)
                
            }
            
        }
    },[member._id])

    const handleSelectFamily=(e)=>{
        
        var splitFamily = e.split(',');
        var stringId = splitFamily[0]
        setFamily(parseInt(stringId, 10))

        setFamilyName(splitFamily[1]);  
        
      }
      const handleSelectIntro=(e)=>{
        
        var splitIntro = e.split(',');
        var stringId = splitIntro[0]
        setIntro_by(parseInt(stringId, 10))

        setIntro_byName(splitIntro[1]);  
        
      }

    
    const is_staff_checkboxHandle=()=>
      {
          var save= is_staff
          save=!save
        setIs_staff(save)
       
        
      }
      const is_admin_checkboxHandle=()=>
      {
          var save= is_admin
          save=!save
        setIs_admin(save)
       
        
      }
    const submitHandler =(e) =>{
        console.log("look data")
       
       
        e.preventDefault()
        dispatch(updateMember({
            _id:memberId,
            name,
            job, 
            phone, 
            address, 
            title, 
            is_staff, 
            is_admin, 
            memo, 
            family, 
            intro_by
        }))
        
        window.location.href = redirect
        
    }
    return (
        <FormContainer>
            <h1>修改會員</h1>
            
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
                checked={is_staff}
                onChange={is_staff_checkboxHandle}/>
            </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="is_admin">
                <Col>
            <Form.Check 
                id = "is_admin_field"
                label="管理員" 
                value={is_admin}
                checked={is_admin}
                onChange={is_admin_checkboxHandle}/>
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
                    存檔
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
export default MemberEditScreen
