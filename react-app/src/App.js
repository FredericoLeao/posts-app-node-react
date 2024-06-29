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
import HomePage from './Pages/Home';
import { useUser } from './Entities/User'
import RestrictedAreaWarning from './SharedComponents/RestrictedAreaWarning';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoguedIn } from './Store/authUserSlice';

const LoginInfo = () => {
  const authUser = useSelector((state) => state.authUser.value)
  if (authUser.isLoguedIn !== true) {
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
  const authUser = useSelector((state) => state.authUser.value)
  const dispatch = useDispatch()

  if (authUser.isLoguedIn === true) {
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
                  }}> Sair </a>
              </div>
          </div>
      )
  }
}

export default function App() {
  const User = useUser()
  const authUser = useSelector((state) => state.authUser.value)
  useEffect(() => { User.getMyProfileData() }, [])

  if (authUser.isLoguedIn === true)
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
        <RestrictedAreaWarning userLoguedIn={authUser.isLoguedIn} />
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
            <Route
              path='/'
              element={<HomePage />}
            />
          </Routes>
          {loginRequiredRoutes}
        </Router>
      </div>
    </div>
  );
}

