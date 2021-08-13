import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav,  Container, Row ,NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logoutByGoogle } from '../actions/userActions'
import { GoogleLogout, GoogleLogin } from 'react-google-login';
function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userLoginGoogle = useSelector(state => state.userLoginGoogle)
    const {userGoogleInfo} = userLoginGoogle
    

    const dispatch = useDispatch()

    const responseGoogle = (response) => {
        console.log(response);
        axios
          .post("http://localhost:8000/api/users/token/obtain/", {
              
            token: response.tokenId,
          })
          .then((res) => {
            console.log("res.data=",res.data);
            // 拿到的 token 存在 localStorage
            localStorage.setItem("access_token", res.data.access);
            localStorage.setItem("refresh_token", res.data.refresh);
            localStorage.setItem("givenName",JSON.stringify(response.profileObj.name));
            localStorage.setItem('userInfo',JSON.stringify(res.data));
            window.location.href="/";
          })
          .catch((err) => {
            console.log(err);
          });
      }
      
      

    const logoutfromGoogle = () => {
        dispatch(logoutByGoogle())
        
     }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>

                    <LinkContainer to='/'>

                        <Navbar.Brand>Organization Web</Navbar.Brand>

                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to='/case'>
                                <Nav.Link><i className="fas fa-briefcase"></i> 關懷戶</Nav.Link>
                                
                            </LinkContainer>
                            <LinkContainer to='/scholarship'>
                                <Nav.Link><i className="fas fa-envelope-open-text"></i> 獎學金</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/finance'>
                                <Nav.Link><i className="fas fa-dollar-sign"></i> 財務</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/org_data'>
                                <Nav.Link><i className="fas fa-database"></i> 會務資料</Nav.Link>
                            </LinkContainer>
                            
                            <LinkContainer to='/member'>
                                <Nav.Link><i className="fas fa-user-friends"></i> 會員及監事名冊</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/student'>
                                <Nav.Link><i className="fas fa-graduation-cap"></i> 學生資料</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/school'>
                                <Nav.Link><i className="fas fa-school"></i> 學校資料</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/memo'>
                                <Nav.Link><i className="far fa-clipboard"></i> 關懷戶記事</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/setting'>
                                <Nav.Link><i className="far fa-clipboard"></i> 參數設定</Nav.Link>
                            </LinkContainer>
                            {userGoogleInfo ? (
                                <NavDropdown title={userGoogleInfo} id ='username' >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            個人資料
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <GoogleLogout
                                    clientId="767817704623-o0plq03jna3d56rg4l362ticv6e785fd.apps.googleusercontent.com"
                                    buttonText="登出"
                                   
                                    onLogoutSuccess={logoutfromGoogle}
                                    >
                                    </GoogleLogout>

                                </NavDropdown>
                            ):(
                             
                             <GoogleLogin
                             clientId="767817704623-o0plq03jna3d56rg4l362ticv6e785fd.apps.googleusercontent.com"
                             buttonText="使用 GOOGLE 登入"
                             onSuccess={responseGoogle}
                             onFailure={responseGoogle}
                             
                             cookiePolicy={'single_host_origin'}
                           />
                            )}

                            

                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
