import { Link } from 'react-router-dom'
export default function Navbar(props) {
    //console.log('the props of Navbar:', props)
    // if the user is logged in
    const loggedIn = (
        <>
            <Link to="/profile">
                Profile
            </Link>
            <Link to="/">
                <span onClick={props.handleLogout}>Logout</span>
            </Link>
        </>
    )

    // if the user is logged out
    const loggedOut = (
        <>
            <Link to="/login">
                Login
            </Link>
            <Link to="/register">
                New Account
            </Link>
        </>
    )

    return (
        <nav>
            <Link to="/">
                Home
            </Link>
            {props.currentUser ? loggedIn : loggedOut}

        </nav>
    )
}