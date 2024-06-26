import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from './Pages/Signup'

function App() {
  return (
    <div className="container">
      <div className="d-flex w-100 h-100 flex-column align-items-center">
        <Router>
          <Routes>
              <Route
                path='/'
                element={<SignUpPage />}
              />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
