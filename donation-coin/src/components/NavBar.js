import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/" className="navLink"><p className="navtext">Home</p></NavLink>
      <NavLink to="/about" className="navLink"><p className="navtext">About</p></NavLink>
      <NavLink to="/browse" className="navLink"><p className="navtext">Browse the projects</p></NavLink>
      <NavLink to="/track" className="navLink"><p className="navtext">Track</p></NavLink>
      
    </nav>
  )
}

export default NavBar

