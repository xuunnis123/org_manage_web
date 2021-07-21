import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
function School({ school }) {
    return (
       <Card className="my-3 p-3 rounded">
            
               
            
            <Card.Body>

                <Card.Text as="div">
                    <div className="my-3">
                        
                        {school.name} 
                    </div>
                    
                </Card.Text>
                <Card.Text as="h3">
                    負責人:{school.represent_person_name}
                </Card.Text>
                <Card.Text as="h3">
                    負責人電話:{school.represent_person_phone}
                </Card.Text>
                <Card.Text as="h3">
                    備註:
                    {school.memo}
                </Card.Text>
                <Card.Text as="h5">
                    <Link to ={`/school/detail/${school._id}`}>詳細資訊</Link>
                </Card.Text>
            </Card.Body>
       </Card>
    )
}

export default School
