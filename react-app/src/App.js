import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom"
import SignUpPage from './Pages/Signup'
import LoginPage from './Pages/Login'
import HomePage from './Pages/Home'
import MyProfilePage from './Pages/MyProfile'
import MyPostsPage from './Pages/MyPosts'

function App() {
  const [myProfileData, setMyProfileData] = useState({})
  const [httpLoading, setHttpLoading] = useState(false)
  const [name, setName] = useState('')

  const IsLogguedIn = () => {
    let token = sessionStorage.getItem('postsapp-login-token')
    if(token && token !== null) {
      return 'Usuário Logado!'
    } else {
      return (
        <div>
          Você não está logado! Faça o login <Link to="/login"> Login </Link>
          Ou <Link to="/cadastro">cadastre-se</Link>
        </div>
      )
    }
  }

  const MyProfileData = () => {
    if (httpLoading === true) return;
    if (!myProfileData || Object.keys(myProfileData).length === 0) {
        setHttpLoading(true)
        axios
            .get(
                'http://localhost:8000/api/profile',
                { headers: { Authorization: sessionStorage.getItem('postsapp-login-token') } }
            )
            .then((res) => {
                setMyProfileData(res.data)
                setName(res.data.name)
            })
            .catch((res) => {
              console.log('erro ??')
              console.log(res.response.data)
              setMyProfileData({ error: true })
            })
            .finally(() => setHttpLoading(false))
    }
    return
  }

  const HomeMenu = () => {
    if (Object.keys(myProfileData).length > 0 && !myProfileData.error) {
        return (
            <div className="d-flex p-2">
                <div className="d-flex mx-2 border-bottom">
                    <Link to="/meus-dados"> Meus Dados </Link>
                </div>
                <div className="d-flex mx-2 border-bottom">
                    <Link to="/posts"> Posts </Link>
                </div>
                <div className="d-flex mx-2 border-bottom">
                    <a href='#' onClick={(e) => {
                      e.preventDefault();
                      sessionStorage.removeItem('postsapp-login-token')}
                    }> Sair </a>
                </div>
            </div>
        )
    }
  }

  return (
    <div className="container">
      <div className="d-flex w-100 h-100 flex-column align-items-center">
        <MyProfileData />
        <Router>
          <IsLogguedIn />
          <div className="nav">
                <HomeMenu />
            </div>
          <Routes>
              <Route
                path='/'
                element={<HomePage />}
              />
              <Route
                path='/cadastro'
                element={<SignUpPage />}
              />
              <Route
                path='/login'
                element={<LoginPage />}
              />
              <Route
                path='/meus-dados'
                element={<MyProfilePage />}
              />
              <Route
                path='/posts'
                element={<MyPostsPage />}
              />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
