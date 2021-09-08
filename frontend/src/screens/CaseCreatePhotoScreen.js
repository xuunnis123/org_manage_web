import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Table,Row, Col, ListGroup, Image, Form, Button, Card,FormGroup,Dropdown,DropdownButton,ProgressBar } from 'react-bootstrap'
import Message from '../components/Message'
import { uploadImage,uploadVisitForm,uploadAppliedForm,generateCaseNo,listStudentPhotos,addCase } from '../actions/caseActions'
import { listStudent } from '../actions/studentActions'
import Loader from '../components/Loader'
import CheckoutSteps from '../components/CheckoutSteps'
function CaseFinanceCreateScreen({history}) {
    const dispatch = useDispatch()
    
    
    const [studentId, setStudentId] = useState()
    const [caseNumber, setCaseNumber] = useState()
    const [image, setImage] = useState(null)

    const [visitFormImage,setVisitFormImage]=useState(null)
    const [appliedFormImage,setAppliedFormImage]=useState(null)
    const [visitImageList,setVisitImageList]=useState(null)
    const uploadVisitPhotosAdd = useSelector(state => state.uploadVisitPhotosAdd)
    const { error, loading, visitPhotos } = uploadVisitPhotosAdd


    const uploadVisitFormAdd = useSelector(state => state.uploadVisitFormAdd)
    const { visitfromerror, visitfromloading, visitForm } = uploadVisitFormAdd


    const uploadAppliedFormAdd = useSelector(state => state.uploadAppliedFormAdd)
    const { appliederror, appliedloading, appliedForm } = uploadAppliedFormAdd
  
    const studentAdd = useSelector(state => state.studentAdd)
    const {erroradd, loadingadd, student} = studentAdd

    const genCaseNo = useSelector(state => state.genCaseNo)
    const { genError, genLoading, caseNo } = genCaseNo
    
    const getCaseFilesList = useSelector(state => state.getCaseFilesList)
    const { filerror, fileloading, files } = getCaseFilesList
    
    const caseAdd = useSelector(state => state.caseAdd)
    const { caseerror, caseloading, caseData } = caseAdd
    

    useEffect(() =>{
        
        setStudentId(studentAdd.student.id)
        console.log(studentAdd.student.id)
        dispatch(generateCaseNo(studentAdd.student['id']))
        console.log(genCaseNo.caseNo)
        setCaseNumber(genCaseNo.caseNo)
        localStorage.removeItem('visit_photo')
    },[])

    useEffect(() =>{
    dispatch(listStudentPhotos(studentAdd.student.id))
    },[dispatch,visitPhotos,visitForm,appliedForm])
 

    const handleInputVisitChange =(event) =>{

        event.preventDefault();
      
        setImage(
            event.target.files[0]
           );
       
    }
    const uploadImgurVisitPhotos = (event) => {
        event.preventDefault();
        var data = new FormData(); 
        
        data.append("image", image); // add your file to form data
        data.append("type","訪視照片");
        data.append("name_id",studentAdd.student.id)
        dispatch(uploadImage(data))
        dispatch(listStudentPhotos(studentAdd.student.id))
        
    }

    const handleInputVisitFormChange =(event) =>{

        event.preventDefault();
        console.log(event.target.files[0])
        setVisitFormImage(
            event.target.files[0]
           );
       
    }
    const uploadImgurVisitFormPhotos = (event) => {
        event.preventDefault();
        var data = new FormData(); 
        console.log(visitFormImage)
        data.append("image", visitFormImage); // add your file to form data
        data.append("type","訪視表");
        data.append("name_id",studentAdd.student.id)
        dispatch(uploadVisitForm(data))
        dispatch(listStudentPhotos(studentAdd.student.id))
        
    }


    const handleInputAppliedFormChange =(event) =>{

        event.preventDefault();
        console.log(event.target.files[0])
        setAppliedFormImage(
            event.target.files[0]
           );
       
    }
    const uploadImgurAppliedFormPhotos = (event) => {
        event.preventDefault();
        var data = new FormData(); 
        console.log(appliedFormImage)
        data.append("image", appliedFormImage); // add your file to form data
        data.append("type","申請表");
        data.append("name_id",studentAdd.student.id)
        dispatch(uploadAppliedForm(data))
        dispatch(listStudentPhotos(studentAdd.student.id))
        
    }

    

    

    const saveCaseNo =() =>{
        
        console.log(studentId)
        console.log(caseNo)
        dispatch(addCase(studentId,caseNo))
        
        history.push('/case/createfinance')
        
    }
    
   
    
    return (
        <Row>
            <CheckoutSteps step1 step2/>
            <Col md={8}>
            
                <h3>
                產生案號:{caseNo}
                </h3>
                
                <div id="linksave">


                </div>
                <h3>上傳區</h3>
                <Card className="my-3 p-3 rounded">
                <h2>訪談照片</h2>

                    <form onSubmit={uploadImgurVisitPhotos}>
                    <input type="file" name="image" onChange={handleInputVisitChange}/>
                    <input type='submit'/>
                    </form> 
                  
                    
                    
                <h2>訪視表</h2>

                    <form onSubmit={uploadImgurVisitFormPhotos}>
                    <input type="file" name="visitform" onChange={handleInputVisitFormChange}/>
                    <input type='submit'/>
                    </form> 
                    

                <h2>申請表</h2>

                    <form onSubmit={uploadImgurAppliedFormPhotos}>
                    <input type="file" name="appliedform" onChange={handleInputAppliedFormChange}/>
                    <input type='submit'/>
                    </form> 
                    </Card>   
                    <br/>
                    {fileloading ? <Loader/>
            : filerror ? <Message variant='danger'>{filerror}</Message>
                : 
                <Row>
                    <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                            <tr>
                                <th>動作</th>
                            
                                <th>種類</th>
                                <th>連結</th>
                                <th>預覽圖</th>
                               
                               
                                
                            </tr>
                        </thead>
                    <tbody>

                    {files.map(file => (
                                <tr key={file._id}>
                                    <td>
                                    <Button
                                    type='button'
                                    variant='danger'
                        
                                    onClick={''}><i className='fas fa-trash'> </i>
                                    </Button>
                                    </td>
                                    <td>{file.type}</td>
                                    <td><Link href={file.link}>{file.link}</Link></td>
                                    <td><Image src={file.link} thumbnail /></td>
                            
                                </tr>
                            ))}
                    </tbody>
                    </Table>
                    </Row>
}
                    <Button type='button' variant='primary' onClick={saveCaseNo}>
                    儲存，下一步
                </Button>
                <Row className='py-3'>
                <Col>
                     <Link to='/case'>
                     取消
                        </Link>
                </Col>
            </Row>
                
            </Col>
            
            <ProgressBar animated now={40} label={`40%`}/>
            
            
        </Row>
        
    )
}
export default CaseFinanceCreateScreen
