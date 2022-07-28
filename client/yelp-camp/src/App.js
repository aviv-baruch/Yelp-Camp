import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Campgrounds from './pages/Campgrounds'
import SingleCampground from './pages/SingleCampground'
import SharedLayout from './pages/SharedLayout'
import CampSharedLayout from './pages/SharedCampgroundLayout'
import NewCampground from './pages/New'
import Error from './pages/Error'
import Edit from './pages/Edit'

export default function App() {
  return (
    <main className={"d-flex flex-column vh-100"}>
      <Routes>
        <Route keypath='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='campgrounds' element={<CampSharedLayout />}>
            <Route index element={<Campgrounds />} />
            <Route path=':id' element={<CampSharedLayout />} >
              <Route index element={<SingleCampground />} />
              <Route path='edit' element={<Edit />} />
            </Route>
            <Route path='*' element={<Error />} />
            <Route path='new' element={<NewCampground />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </main>
  )
}