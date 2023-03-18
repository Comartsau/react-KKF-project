
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'


// Components
import NavBar from './components/NavBar/NavBar'
import RegisterComponent from './components/RegisterComponent'
import HotJobComponent from './components/HotJobComponent'
import SearchJobConponent from './components/SearchJobComponent'
import InternshipComponent from './components/InternshipConponent'
import OpenRoleComponent from './components/OpenRoleComponent'
import LoginComponent from './components/LoginComponent'

function App() {


  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/hotjob" element={ <HotJobComponent />} />
        <Route path="/searchjob" element={ <SearchJobConponent />} />
        <Route path="/internship" element={ <InternshipComponent />} />
        <Route path="/openrole" element={ <OpenRoleComponent />} />
        <Route path="/login" element={ <LoginComponent />} />
        <Route path="/register" element={ <RegisterComponent />} />
      </Routes>
    </div>

  )
}

export default App
