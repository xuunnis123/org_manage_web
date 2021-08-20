import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({ step1, step2, step3, step4,step5 }) {

    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/student/create'>
                        <Nav.Link>學生資訊</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>學生資訊</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>訪視照片/申請表</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>訪視照片/申請表</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/finance/outcome/create'>
                        <Nav.Link>資助項目</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>資助項目</Nav.Link>
                    )}
            </Nav.Item>
            
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/scholarship/create'>
                        <Nav.Link>獎學金</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>獎學金</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step5 ? (
                    <LinkContainer to='/case/create'>
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
