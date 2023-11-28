import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';

const Header = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [navItemLink, setNavItemLink] = useState([])

    const toggle = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    useEffect(() => {
        const isLogin = localStorage.getItem('login')
        const role = localStorage.getItem('role')

        let navItemLink;
        if (!isLogin) {
            navItemLink = [
                { to: '/', title: 'Home', onClick: () => { } },
                { to: '/login', title: 'Login', onClick: () => { } },
                { to: '/register', title: 'Register', onClick: () => { } },
            ]
        } else {
            if (role === 'user') {
                navItemLink = [
                    { to: '/', title: 'Home', onClick: () => { } },
                    { to: '/cart', title: 'Cart', onClick: () => { } },
                    { to: '/order', title: 'Order', onClick: () => { } },
                    { to: null, title: 'Logout', onClick: handleLogout },
                ]
            } else {
                navItemLink = [
                    { to: '/item', title: 'Item', onClick: () => { } },
                    { to: '/order', title: 'Order', onClick: () => { } },
                    { to: null, title: 'Logout', onClick: handleLogout },
                ]
            }
        }

        setNavItemLink(navItemLink)

    }, [])


    return (
        <div>
            <Navbar color='light' light expand='md' container='fluid' >
                <NavbarBrand >Simple Olshop</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        {navItemLink.map(link =>
                            <NavItem key={link.to}>
                                <Link className='nav-link' to={link.to} onClick={link.onClick}>{link.title}</Link>
                            </NavItem>
                        )}
                    </Nav>

                </Collapse>
            </Navbar>
        </div>
    )
}

export default Header