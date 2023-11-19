import '@mantine/core/styles.css';
import './App.css'
import { MantineProvider } from '@mantine/core';
import { Routes, Route } from "react-router-dom";
import { Employee } from './Pages/Employee/Employee';
import { Navbar } from './Components/Navbar';
import { Landing } from './Components/Landing';
import { Dashboard } from './Components/Dashboard';

function App() {

  return (
    <MantineProvider defaultColorScheme="dark">
      <Routes>
        <Route path="/" element={<Employee />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </MantineProvider>
  )
}

export default App
