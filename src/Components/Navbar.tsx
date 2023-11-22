import { useState } from 'react';
import { Group} from '@mantine/core';
import {
    IconUserCircle,
    IconTable,
    IconGraph,
    IconBrandCakephp,
    IconIconsOff,
  IconUsersGroup,
  IconScan,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';
import { useNavigate } from "react-router-dom";


const data = [
  { link: '/dashboard/employeeRegistration', label: 'Employee Registration', icon: IconUserCircle },
  { link: '', label: 'Entry Scan', icon: IconScan },
  { link: '/dashboard/timeSheet', label: 'Time Sheet', icon: IconTable },
  { link: '', label: 'Candidate Analysis', icon: IconGraph },
  { link: '/dashboard/overallAttendance', label: 'Overall Attandance', icon: IconUsersGroup },
  { link: '', label: 'Unauthorized Users', icon: IconIconsOff },
  { link: '', label: 'Food Provision', icon: IconBrandCakephp },
];

export function Navbar() {
  const [active, setActive] = useState('Billing');
  const navigate = useNavigate()

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header}>
        <img width="40" height="40" src="https://img.icons8.com/ultraviolet/40/facial-recognition-scan.png" alt="facial-recognition-scan" />
        <text style={{color:"white",fontSize:"30px"}}>Facialyst</text>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}