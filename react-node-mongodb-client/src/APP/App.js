import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AddUser from '../components/AddUser/AddUser'
import Header from '../components/Header/Header'
import Home from '../components/Home/Home'
import UpdateUser from '../components/UpdateUser/UpdateUser'
import './App.css'

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/update/:id" element={<UpdateUser />}></Route>
        <Route path="/users/add" element={<AddUser></AddUser>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App
