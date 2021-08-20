import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({ step1, step2, step3, step4,step5 }) {

    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/case/createstudent'>
                        <Nav.Link>學生資訊</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>學生資訊</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/case/createphoto'>
                        <Nav.Link>訪視照片/申請表</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>訪視照片/申請表</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/case/createfinance'>
                        <Nav.Link>資助項目</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>資助項目</Nav.Link>
                    )}
            </Nav.Item>
            
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/case/createscholarship'>
                        <Nav.Link>獎學金</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>獎學金</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step5 ? (
                    <LinkContainer to='/case/createconfirm'>
                        <Nav.Link>確認</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>確認</Nav.Link>
                    )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
