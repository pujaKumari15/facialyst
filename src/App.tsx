import '@mantine/core/styles.css';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { MantineProvider } from '@mantine/core';
import { Routes, Route } from "react-router-dom";
import { Employee } from './Pages/Employee/Employee';
import { Dashboard } from './Components/Dashboard';
import AuthRoute from './Components/AuthRoute';
import { Login } from './Pages/Login/Login';
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <MantineProvider defaultColorScheme="dark">
      <Routes>
        <Route path="/" element={<Employee showNavbar />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AuthRoute />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Route>
      </Routes>
      <ToastContainer />
    </MantineProvider>
  )
}

export default App
