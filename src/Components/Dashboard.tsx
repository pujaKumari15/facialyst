import { useDisclosure } from '@mantine/hooks';
import { AppShell} from '@mantine/core';
import { Navbar } from './Navbar';
import { Route, Routes } from 'react-router-dom';
import { EmployeeRegistration } from '../Pages/EmployeeRegistration/EmployeeRegistration';
import { Employee } from '../Pages/Employee/Employee';
import { OverallAttendance } from '../Pages/OverallAttendance/OverallAttendance';
import { TimeSheet } from '../Pages/TimeSheet/TimeSheet';

export function Dashboard() {
  const [opened] = useDisclosure();

  return (
    <AppShell
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Navbar>
        <Navbar/>
      </AppShell.Navbar>
      <AppShell.Main>
      <Routes>
        <Route path="employeeRegistration" element={<EmployeeRegistration />} />
        <Route path="employee" element={<Employee />} />
        <Route path="overallAttendance" element={<OverallAttendance />} />
        <Route path="timeSheet" element={<TimeSheet />} />
      </Routes>
      </AppShell.Main>
    </AppShell>
  );
}