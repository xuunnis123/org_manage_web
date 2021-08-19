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

    const clearVisitUpload = ()=>{
        console.log("clear")
        localStorage.setItem('visit_photo',JSON.stringify(uploadImageItem))
        setImage(null)
        
    }


      
    return (
        <Row>
            <Col md={8}>
                <h1>個案頁</h1>

                <h2>案號</h2>
                <h2>姓名</h2>
                <h2>學校</h2>
                <Card>資助內容</Card>
                <h3>資助總計</h3>
                <Card>獎學金</Card>
                <h3>獎學金總計</h3>

                <h2>總計</h2>
                
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
                 
        </Row>
        
    )
}
export default CaseScreen
