import logo from '../images/logo1.jpg';

const Header = () => {

    return (
        <header className="header">
            <img src={logo} className="logo" alt="charity-app-logo" />
        </header>
    )
}

export default Header