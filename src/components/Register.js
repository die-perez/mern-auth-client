import { useState } from 'react'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Redirect } from 'react-router-dom'
import Profile from './Profile'

export default function Register(props) {
    // state for the controlled form
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // state for the flash message from the server
    const [message, setMessage] = useState('')
    // handle form submission
    const handleSubmit = async e => {
        try {
            e.preventDefault()
            // make a request body
            const requestBody = {
                name: name,
                email: email,
                password: password
            }

            // post registration data to the server
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, requestBody)

            // take the token out of response
            const { token } = response.data

            // set token in local storage
            localStorage.setItem('jwtToken', token)

            // decode token
            const decoded = jwt.decode(token)

            // set user in the App.js state
            props.setCurrentUser(decoded)

        } catch (err) {
            // set message if the error is a 400
            if(err.response.status === 400) {
                setMessage(err.response.data.msg)
            } else {
                console.log(err)
            }
        }  
        console.log('submit the form')
    }

    // redirect if the user is logged in
    if(props.currentUser) return <Redirect to="/profile" component={ Profile } currentUser={props.currentUser} />

    return (
        <div>
            <h3>Registration form</h3>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name-input">Name:</label>
                <input 
                    id="name-input"
                    type="text" 
                    placeholder="Enter your name"
                    onChange={ e => setName(e.target.value) }
                    value={name}
                />
                <label htmlFor="email-input">Email:</label>
                <input 
                    id="email-input"
                    type="email" 
                    placeholder="Enter your email"
                    onChange={ e => setEmail(e.target.value) }
                    value={email}
                />
                <label htmlFor="password-input">Password:</label>
                <input 
                    id="password-input"
                    type="password" 
                    placeholder="Desired password"
                    onChange={ e => setPassword(e.target.value) }
                    value={password}
                />
                <input 
                    type="submit" 
                    value="make new account"
                />
            </form>
        </div>
    )
}