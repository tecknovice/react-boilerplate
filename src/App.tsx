import { Routes, Route } from 'react-router-dom'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import AdminIndex from './admin'
import ClientIndex from './client'
function App() {
    return (
        <Routes>
            <Route path="/" element={<ClientIndex />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={<AdminIndex />} />
        </Routes>
    )
}

export default App
