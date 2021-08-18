import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { uploadImage } from '../actions/caseActions'

function CaseScreen({ match, location, history}) {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)

    const handleInputChange =(event) =>{

        event.preventDefault();
        console.log(event)
        console.log(event.target.files[0])
        setImage({
          // [event.target.name]: event.target.files[0]
          image: event.target.files[0]
          // image: event.target.files[0]
        });
    }
    const uploadImgurImage = (event) => {
        event.preventDefault();
        let data = new FormData(); 
     
        data.append("image", image); // add your file to form data
        console.log(data)
        dispatch(uploadImage(data))
        
        
    }

    
    return (
        <Row>
            <Col md={8}>
                <Card>個案頁</Card>
                

                    <form onSubmit={uploadImgurImage}>
                    <input type="file" name="image" onChange={handleInputChange}/>
                    <button>Submit</button>
                    </form>  
            </Col>
                    
        </Row>
    )
}
export default CaseScreen
