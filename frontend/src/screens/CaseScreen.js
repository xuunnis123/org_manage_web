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

                    
                    
                <h2>訪視表</h2>

                   
                <h2>申請表</h2>

                   
            </Col>
                 
        </Row>
        
    )
}
export default CaseScreen
