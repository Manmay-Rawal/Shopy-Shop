import React from 'react'
import Navbar from '../components/navbar'
import Shoping from '../image/Login-Background.jpg'
function Home() {
  return (
    <>
        <Navbar/>
    <div
      style={{
        backgroundImage: `url(${Shoping})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    ></div>
    </>
  )
}

export default Home