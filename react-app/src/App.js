import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom"
import SignUpPage from './Pages/Signup'
import LoginPage from './Pages/Login'
import HomePage from './Pages/Home'
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

const HomeMenu = () => {
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
                  }}> Sair </a>
              </div>
          </div>
      )
  }
}

const LoginRequiredRoutes = () => {
  const User = useUser();
  if (User.isLogguedIn() === true)
    return (
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
    )
  else
    return <RestrictedAreaWarning />
}

function App() {
  // const User = useUser()
  // useEffect(() => {
  // //   User.getMyProfileData()
  // }, [User.isLogguedIn()])
  return (
    <div className="container">
      <div className="d-flex w-100 h-100 flex-column align-items-center">
        <Router>
          <LoginInfo />
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
          </Routes>
          <LoginRequiredRoutes />
        </Router>
      </div>
    </div>
  );
}

export default App;
