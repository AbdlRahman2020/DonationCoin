import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <NavLink to="/contact" className="footerLink"><p className="footertext">Help and Contact</p></NavLink>
      <NavLink to="/" className="footerLink"><p className="footertext">Copyright &copy; 2021</p></NavLink>
    </footer>
  )
}

export default Footer

