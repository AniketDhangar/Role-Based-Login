import React from 'react'
import Dashboard from './Dashboard'
import User from './User'
import { Route, Routes } from 'react-router-dom'

function AdminRoutes() {
    return (
        <div>

            <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/users' element={<User />} />
            </Routes>
        </div>
    )
}

export default AdminRoutes