import React from 'react'
import Header from '../components/admin/Header'
import Foooter from '../components/admin/Foooter'
import { Outlet } from 'react-router-dom'
import UserHeader from '../components/user/UserHeader'

export default function SharedLayout() {
  return (
    <>

        {/* <Header /> */}
        <UserHeader />
        <Outlet  />
        <Foooter />
    </>
  )
}
