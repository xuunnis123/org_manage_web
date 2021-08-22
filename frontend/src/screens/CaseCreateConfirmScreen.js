import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,FormGroup,Dropdown,DropdownButton,ProgressBar } from 'react-bootstrap'
import Message from '../components/Message'
import { uploadImage } from '../actions/caseActions'
import { listStudent } from '../actions/studentActions'
import CheckoutSteps from '../components/CheckoutSteps'
function CaseCreateConfirmScreen({history}) {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const [studentName, setStudentName] = useState('請選擇個案學生')
    const [student, setStudent] = useState('')
    
    const uploadImageAdd = useSelector(state => state.uploadImageAdd)
    const { error, loading, uploadImageItem } = uploadImageAdd

    const studentList = useSelector(state => state.studentList)
    const { errorStudentList, loadingStudentList, students } = studentList

    useEffect(() =>{
        dispatch(listStudent())

    },[dispatch,history])

    const handleInputChange =(event) =>{

        event.preventDefault();
      
        setImage(
            event.target.files[0]
           );
       
    }
    const uploadImgurImage = (event) => {
        event.preventDefault();
        var data = new FormData(); 
        
        data.append("image", image); // add your file to form data
        
        dispatch(uploadImage(data))
        
        
    }

    const clearVisitUpload = ()=>{
        console.log("clear")
        localStorage.setItem('visit_photo',JSON.stringify(uploadImageItem))
        setImage(null)
        
    }

    const handleSelectStudent=(e)=>{
        
        var splitTitle = e.split(',');
        setStudent(splitTitle[0])

        setStudentName(splitTitle[1]); 
        
        
      }

    const submitHandler =(e) =>{
        e.preventDefault()
        
        dispatch()
        
        history.push()
        
    }
      
    return (
        <Row>
            <CheckoutSteps step1 step2 step3 step4 step5/>
            <Col md={8}>
                
                <Form onSubmit={submitHandler}></Form>
                <h2>案號</h2>

                <Form.Group controlId='student'>
                    <Form.Label>個案學生姓名</Form.Label>
                    
                    <DropdownButton
                        aligndown="true"
                        title= {studentName}
                        id="dropdown-menu-align-down"
                        onSelect={handleSelectStudent}
                            >

                    {students.map((student,index) =>{
                    
                    return <Dropdown.Item eventKey={[student.id,student.name]} key={index}>{student.name}</Dropdown.Item>
                    })}
                            
                    </DropdownButton>
            </Form.Group>
                
                
                <h2>訪談照片</h2>

                    <form onSubmit={uploadImgurImage}>
                    <input type="file" name="image" onChange={handleInputChange}/>
                    <input type='submit'/>
                    </form> 
                    <h4>預覽縮圖</h4>
                    <Col xs={400} md={400}>
                    
                    <Image src={uploadImageItem} thumbnail />
                    
                    </Col>
                    <Button onClick={clearVisitUpload}>確認</Button>
                    <Card href={uploadImageItem}>{uploadImageItem}</Card>
                    
                <h2>訪視表</h2>

                    <form onSubmit={uploadImgurImage}>
                    <input type="file" name="image" onChange={handleInputChange}/>
                    <input type='submit'/>
                    </form> 
                    <h4>預覽縮圖</h4>
                    <Col xs={400} md={400}>

                    <Image src={uploadImageItem} thumbnail />

                    </Col>
                    <Link href={uploadImageItem}>{uploadImageItem}</Link> 

                <h2>訪視表</h2>

                    <form onSubmit={uploadImgurImage}>
                    <input type="file" name="image" onChange={handleInputChange}/>
                    <input type='submit'/>
                    </form> 
                    <h4>預覽縮圖</h4>
                    <Col xs={400} md={400}>

                    <Image src={uploadImageItem} thumbnail />

                    </Col>
                    <Link href={uploadImageItem}>{uploadImageItem}</Link>   
            </Col>
            <ProgressBar animated now={100} label={`{100}%`}/>
        </Row>
        
    )
}
export default CaseCreateConfirmScreen
