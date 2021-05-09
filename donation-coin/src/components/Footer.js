import { NavLink } from 'react-router-dom';

const Footer = () => {

  return (
    <footer>
      <NavLink to="/" className="footerLink">Home</NavLink>
      <NavLink to="/about" className="footerLink">About</NavLink>
      <NavLink to="/browse" className="footerLink">Browse the projects</NavLink>
      <NavLink to="/track" className="footerLink">Track your donation</NavLink>
    </footer>
  )
}

export default Footer

