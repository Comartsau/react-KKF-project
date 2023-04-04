
import './App.css'
import { Routes,Route } from 'react-router-dom'
import { useEffect, useState } from 'react'


// Components
import NavBar from './components/NavBar/NavBar'
import RegisterComponent from './components/RegisterComponent'
import HotJobComponent from './components/HotJobComponent'
import SearchJobConponent from './components/SearchJobComponent'
import InternshipComponent from './components/InternshipConponent'
import OpenRoleComponent from './components/OpenRoleComponent'
import ProfileComponent from './components/ProfileComponent'
import ProductComponent from './components/ProductComponent'
import AdminHome from './components/Admin/AdminHome'
import EditProducts from './components/Admin/EditProducts'
import CreateProduct from './components/Admin/CreateProduct'
import AddStock from './components/Admin/AddStock'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  
  useEffect(() => {
    const check = localStorage.getItem("check");

    if (check === '1') {
      setIsLoggedIn(true);
    }
  },[])


  return (
    <div className="App">
      <NavBar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}  />
      <Routes>
        <Route path="/hotjob" element={ <HotJobComponent />} />
        <Route path="/searchjob" element={ <SearchJobConponent />} />
        <Route path="/internship" element={ <InternshipComponent />} />
        <Route path="/openrole" element={ <OpenRoleComponent />} />
        <Route path="/register" element={ <RegisterComponent />} />
        <Route path="/adminhome" element={ <AdminHome />} />
        <Route path="/product" element={ <ProductComponent />} />
        <Route path="/productedit/:id" element={ <EditProducts />} />
        <Route path="/createproduct" element={ <CreateProduct />} />
        <Route path="/addstock" element={ <AddStock />} />
        {/* {check === '1' ? <Route path="/product" element={ <Product />} /> : <Route path="/home" element={ <HomeComponent />} />} */}
        <Route path="/profile" element={ <ProfileComponent setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}  />} />
      </Routes>
    </div>

  )
}

export default App
