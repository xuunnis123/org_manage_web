import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import RecentNewsScreen from './RecentNewsScreen'




function HomeScreen() {
    const info = useDispatch()
    const login = useDispatch()
    
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList

   

    return (
        <div>
            
            
            {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
                : 
                <Row>
                   <RecentNewsScreen/>
                   
            </Row>
        }

            
        </div>
    )
}

export default HomeScreen
