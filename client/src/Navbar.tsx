import { FiberManualRecord } from '@mui/icons-material';
import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import PulloutMenu from './components/Home Page/PulloutMenu';



const Navbar = ({ navbarLinks }: any) => {
  return (
    <nav className='navbar'>
      <span className='navbar-logo'>Schroedinger's Pantry</span>
      {/* <ul>
        {navbarLinks.map((item: any) => {
          return (
            <li className='navbar-item' key={item.title}>
              <a className='navbar-link' href={item.url}>
                {item.title}
              </a>
            </li>
          )
        })}
      </ul> */}
      <PulloutMenu />
    </nav>
  )
}

export default Navbar
