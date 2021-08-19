import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card,FormGroup } from 'react-bootstrap'
import Message from '../components/Message'
import { uploadImage } from '../actions/caseActions'


function CaseScreen() {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)

    
    
    const uploadImageAdd = useSelector(state => state.uploadImageAdd)
    const { error, loading, uploadImageItem } = uploadImageAdd

    useEffect(() =>{
        

    },[dispatch])

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

      
    return (
        <Row>
            <Col md={8}>
                <h1>個案頁</h1>

                
                <h2>姓名</h2>

                <h2>訪談紀錄</h2>

                    <form onSubmit={uploadImgurImage}>
                    <input type="file" name="image" onChange={handleInputChange}/>
                    <input type='submit'/>
                    </form> 
                    <h4>預覽圖</h4>
                    <Col xs={400} md={400}>
                    
                    <Image src={uploadImageItem} thumbnail />
                    
                    </Col>
                    <Link href={uploadImageItem}>{uploadImageItem}</Link>
                    
            </Col>
                 
        </Row>
    )
}
export default CaseScreen
