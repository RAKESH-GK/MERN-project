import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  const [user,setUser]=useState({});

  const loadAboutPage = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setUser(data);
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

  return (
    <div className='container' id="about">
      <div className="row main_row">
        <div className="col-5 profile_image ">
          <img src="" alt="" />
        </div>
        <div className="col-6 pt-4">
          <h5>{user.name}</h5>
          <p>{user.work}</p>
          <small>Ranking 1/10</small>
        </div>
      </div>
    </div>
  )
}
