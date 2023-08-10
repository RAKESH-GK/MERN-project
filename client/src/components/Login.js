import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/signin", {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
               email,password
            })
        });
        const data = await res.json();
        if (res.status === 400 || !data) {
            window.alert(data.error);
        } else {
            window.alert(data.message);
            navigate('/');
        }
    }

    return (
        <div className="container pt-5">
            <h3 className='pb-3'>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3 w-25">
                    <input type="email" className="form-control"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3 w-25">
                    <input type="password" className="form-control"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                    <label htmlFor="floatingInput">Password</label>
                </div>
                <button type="Submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
