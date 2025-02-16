import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/fundolongo1.png';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

            fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    senha: password,
                    email: email,
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Credenciais inválidas')
                    }
                    return response.text()
                })
                .then(data => {
                    //console.log('data:  ',data)

                    ///  if (data && data.token) {
                    // Armazenar apenas o token JWT

                    fetch(`http://localhost:8080/usuario?email=${email}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'text/plain' }
                    })
                        .then(response => response.json())
                        .then(response => {

                            localStorage.setItem('userToken', data.token)
                            localStorage.setItem('userData', JSON.stringify({
                                email: response.email,
                                nome: response.nome,
                                tipo_usuario: response.tipoUsuario
                            }))

                            navigate('/home')
                        })
                        .catch(err => console.error(err));
                    // Redireciona para a home
               

                })
                .catch(err => {
                    console.log(err)
                   // alert(err.message)  // Exibe o erro
                })
    }

    return (
        <div className="row g-0 flex-fill">
            <div className="col-12 col-lg-6 col-xl-4 border-top-wide border-primary d-flex flex-column justify-content-center">
                <div className="container container-tight my-5 px-lg-5">
                    <div className="text-center mb-4">
                        <a href="#" className="navbar-brand navbar-brand-autodark">
                            <img src={logo} alt="Planeja aí" style={{ height: '' }} />
                        </a>
                    </div>
                    <h2 className="h3 text-center mb-3">
                        Login
                    </h2>
                    <form method="get" autoComplete="off" noValidate onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Senha</label>
                            <div className="input-group input-group-flat">
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    autoComplete="off"
                                />
                                <span className="input-group-text">
                                    <a href="#" className="link-secondary" title="Show password" data-bs-toggle="tooltip">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-1">
                                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                        </svg>
                                    </a>
                                </span>
                            </div>
                        </div>

                        <div className="form-footer">
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </div>
                    </form>
                    <div className="text-center text-secondary mt-3">
                        Ainda não tem conta? <Link to="/signup">Cadastre-se</Link>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-8 d-none d-lg-block">
                <div className="bg-cover h-100 min-vh-100" style={{ backgroundImage: 'url(/img/evento1.jpg)' }} ></div>
            </div>
        </div>
    )
}

export default Login
