import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Table, Row, Col, ListGroup, Image, Form, Button, Card,FormGroup } from 'react-bootstrap'
import Message from '../components/Message'
import { uploadImage,listCase } from '../actions/caseActions'


function CaseScreen({history}) {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)

    
    useEffect(() =>{
        

    },[dispatch])

    const addToCaseHandler =() =>{
        
        history.push('/case/createstudent')
    }


      
    return (
        <Row>
            <Col><Button 
        variant="outline-primary"
        onClick = {addToCaseHandler}
        className='btn-block' 
        type='button'>新增個案</Button></Col>
            
            <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>動作</th>
                            
                                <th>日期</th>
                                <th>案號</th>
                                <th>個案姓名</th>
                                <th>區域</th>
                                <th>學校</th>
                                <th>起始年份</th>
                                <th>結束年份</th>
                                <th>個案情況</th>
                                <th>資助情況</th>
                                
                                <th>附件</th>
                               
                                
                            </tr>
                        </thead>

                        <tbody>
                            {incomes.map(oneIncome => (
                                <tr key={oneIncome._id}>
                                    <td><Link to={`/finance/income/${oneIncome._id}/edit`}><Button type="button"><i className='fas fa-edit'></i></Button></Link>
                                    <Button
                                    type='button'
                                    variant='danger'
                        
                                    onClick={()=>removeFromIncomeHandler(oneIncome._id)}><i className='fas fa-trash'> </i>
                                    </Button>
                                    </td>
                                    
                                    
                
                                    <td>{oneIncome.modified_at}</td>
                                    <td>{oneIncome.category}</td>
                                    <td>{oneIncome.subject}</td>
                                    <td>{oneIncome.title}</td>
                                    <td>{oneIncome.detail}</td>
                                    <td>{oneIncome.from_whom}</td>
                                    <td>{oneIncome.income_money}</td>
                                    <td>{oneIncome.unit}</td>
                                    <td>{oneIncome.confirmed_person}</td>
                            
                                </tr>
                            ))}
                        </tbody>
                        </Table>        
        </Row>
        
    )
}
export default CaseScreen
