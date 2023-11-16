import '@mantine/core/styles.css';
import './App.css'
import { MantineProvider } from '@mantine/core';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Employee } from './Pages/Employee/Employee';

function App() {

  return (
    <MantineProvider defaultColorScheme="dark">
      <Routes>
        <Route path="/" element={<Employee />} />
      </Routes>
    </MantineProvider>
  )
}

export default App
