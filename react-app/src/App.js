import { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import SignUpPage from './Pages/Signup'
import LoginPage from './Pages/Login'
import MyProfilePage from './Pages/MyProfile'
import MyPostsPage from './Pages/MyPosts'
import { useUser } from './Entities/User'
import RestrictedAreaWarning from './SharedComponents/RestrictedAreaWarning';

const LoginInfo = () => {
  const User = useUser();
  if (User.isLogguedIn() !== true) {
    return (
      <div>
        Você não está logado! Faça o login <Link to="/login"> Login </Link>
        Ou <Link to="/cadastro">cadastre-se</Link>
      </div>
    )
  }
}

const HomeMenu = ({ onLoginStatus }) => {
  const User = useUser();
  if (User.isLogguedIn() === true) {
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
                    User.logout()
                    onLoginStatus(false)
                  }}> Sair </a>
              </div>
          </div>
      )
  }
}

export default function App() {
  const User = useUser()

  if (User.isLogguedIn() === true)
    var loginRequiredRoutes = 
      <Routes>
        <Route
          path='/meus-dados'
          element={<MyProfilePage />}
        />
        <Route
          path='/posts'
          element={<MyPostsPage />}
        />
      </Routes>

  return (
    <div className="container">
      <div className="d-flex w-100 h-100 flex-column align-items-center">
        <RestrictedAreaWarning userLoguedIn={User.isLogguedIn()} />
        <Router>
          <LoginInfo />
          <div className="nav">
                <HomeMenu onLoginStatus={() => User.getMyProfileData()}/>
            </div>
          <Routes>
            <Route
              path='/cadastro'
              element={<SignUpPage />}
            />
            <Route
              path='/login'
              element={<LoginPage onLoginStatus={() => User.getMyProfileData()}/>}
            />
          </Routes>
          {loginRequiredRoutes}
        </Router>
      </div>
    </div>
  );
}

