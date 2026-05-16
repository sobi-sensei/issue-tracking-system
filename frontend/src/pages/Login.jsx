import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'

function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await API.post('/auth/login', formData)

            localStorage.setItem(
                'token',
                response.data.token
            )

            navigate('/dashboard')
        } catch (error) {
          console.log(error)
          alert('Login Failed')
        }
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center md-2">
              Welcome Back      
            </h1>

            <p className="text-center text-gray-400 mb-6">
              Login to your account
            </p>

            <form onSubmit={handleSubmit}>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">
                            Email
                        </span>
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        className="input input-bordered"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-control mb-6">
                    <label className="label">
                        <span className="label-text">
                            Password
                        </span>
                    </label>

                    <input 
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className="input input-bordered"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <button className="btn btn-primary w-full">
                    Login
                </button>

            </form>

            <p className="text-centered mt-5">
                Don't have an account?
                <Link
                    to="/signup"
                    className="text-primary ml-2"
                >
                    Singup
                </Link>
            </p>
          </div>
        </div>
      </div>
    )
}

export default Login