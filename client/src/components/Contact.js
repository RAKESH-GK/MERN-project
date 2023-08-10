import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", phone: "", message: "" });

  const loadAboutPage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      setUser({ ...user, name: data.name, email: data.email, phone: data.phone });
      if (res.status !== 200) {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  }

  useEffect(() => {
    loadAboutPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = user;
    const res = await fetch('/contact', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    });
    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert(data.error);
    } else {
      window.alert(data.message);
      setUser({ ...user, message: "" });
    }
  }

  return (
    <div className='container pt-5'>
      <h3 className='pb-3'>Contact</h3>
      <div className="info">
        <h6>Name: {user.name}</h6>
        <h6>Phone: {user.phone}</h6>
        <h6>Email: {user.email}</h6>
        <h6>Address: {"Mangalore"}</h6>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3 w-25">
          <textarea type="text" className="form-control"
            name='message'
            value={user.message}
            onChange={handleInput} />
          <label htmlFor="floatingInput">message</label>
        </div>
        <button type="Submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  )
}
