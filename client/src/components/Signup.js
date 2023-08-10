import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });
    let name, value;
    const handleInput = (e) => {
        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch("/register", {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert(data.error);
        } else {
            window.alert(data.message);
            navigate('/login');
        }
    }

    return (
        <div className="container pt-5">
            <h3 className='pb-3'>Sign Up</h3>
            <form onSubmit={handleSubmit} >
                <div className="form-floating mb-3 w-50">
                    <input type="text" className="form-control" autoComplete='off'
                        name='name'
                        value={user.name}
                        onChange={handleInput}
                    />
                    <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3 w-50">
                    <input type="email" className="form-control" autoComplete='off'
                        name='email'
                        value={user.email}
                        onChange={handleInput} />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3  w-50 ">
                    <input type="number" className="form-control" autoComplete='off'
                        name='phone'
                        value={user.phone}
                        onChange={handleInput} />
                    <label htmlFor="floatingInput">Phone</label>
                </div>
                <div className="form-floating mb-3 w-50">
                    <input type="text" className="form-control" autoComplete='off'
                        name='work'
                        value={user.work}
                        onChange={handleInput} />
                    <label htmlFor="floatingInput">Work</label>
                </div>
                <div className="form-floating mb-3 w-50">
                    <input type="password" className="form-control" autoComplete='off'
                        name='password'
                        value={user.password}
                        onChange={handleInput} />
                    <label htmlFor="floatingInput">Password</label>
                </div>
                <div className="form-floating mb-3 w-50">
                    <input type="text" className="form-control" autoComplete='off'
                        name='cpassword'
                        value={user.cpassword}
                        onChange={handleInput} />
                    <label htmlFor="floatingInput">Confirm Password</label>
                </div>
                <button type="Submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
