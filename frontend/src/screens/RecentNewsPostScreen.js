import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl,FormLabel,Dropdown,DropdownButton } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listMember, addMember } from '../actions/memberActions'

function RecentNewsPostScreen() {
   
    const [title, setTitle] = useState('') 
    const [post_by, setPost_by] = useState('')
    const [context, setContext] = useState('')
    const [postname_by, setPostname_by] = useState('')
    
    const dispatch = useDispatch()
    const memberList = useSelector(state => state.memberList)
    const { errorList, loadingList, members } = memberList

    //const redirect = location.search ? location.search.split('=')[1] :'/school'
    const redirect = '/'
    
    useEffect(()=>{
       dispatch(listMember())
      
    },[redirect])

    const handleSelectPostBy=(e)=>{
        
        var splitIntro = e.split(',');
        
        setIntro_by(splitIntro[0])

        setIntro_byName(splitIntro[1]);  
      }

      const submitHandler =(e) =>{
        e.preventDefault()
        
        //dispatch(addScholarship( name,semester, price))
        
        //history.push(redirect)
        
    }
   
    return (
        <FormContainer>
        <h1>新增消息</h1>
        
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        
        <Form onSubmit={submitHandler}>

        <Form.Group controlId='name'>
                <Form.Label>消息標題</Form.Label>
                <Form.Control
                    required
                    type='title'
                    placeholder='輸入消息標題'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                >

                </Form.Control>
        </Form.Group>

   
        
        <Form.Group controlId='phone'>
                <Form.Label>消息內容</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='輸入電話'
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                >

                </Form.Control>
        </Form.Group>
        
        
        
        

       
       

        <Form.Group controlId='post_by'>
            <Form.Label>發佈人</Form.Label>
            <DropdownButton
            aligndown="true"
            title= {post_by}
            id="dropdown-menu-align-down"
            onSelect={handleSelectPostBy}
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
export default RecentNewsPostScreen
