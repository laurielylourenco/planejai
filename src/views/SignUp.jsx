import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSignUp = (e) => {
        e.preventDefault()
        alert("Conta criada com sucesso!")
        navigate('/login')
    }

    return (
        <div class="row g-0 flex-fill">
            <div class="col-12 col-lg-6 col-xl-4 border-top-wide border-primary d-flex flex-column justify-content-center">
                <div class="container container-tight my-5 px-lg-5">
                    <div class="text-center mb-4">
                        <a href="#" class="navbar-brand navbar-brand-autodark">

                            <img src="fundolongo.png" alt="Planeja aí" style={{ height: '200px' }} />
                        </a>
                    </div>
                    <h2 class="h3 text-center mb-3">
                        Cadastro
                    </h2>
                    <form method="get" autocomplete="off" novalidate onSubmit={handleSignUp}>
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div class="mb-2">
                            <label class="form-label">Senha</label>
                            <div class="input-group input-group-flat">

                                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required autocomplete="off" />
                                <span class="input-group-text">
                                    <a href="#" class="link-secondary" title="Show password" data-bs-toggle="tooltip">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-1"><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                    </a>
                                </span>
                            </div>
                        </div>

                        <div class="form-footer">
                            <button type="submit" class="btn btn-primary w-100">Sign in</button>
                        </div>
                    </form>
                    <div class="text-center text-secondary mt-3">
                        Já tem uma conta? <Link to="/login">Faça login</Link>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6 col-xl-8 d-none d-lg-block">

                <div class="bg-cover h-100 min-vh-100" style={{ backgroundImage: 'url(/img/eventos.jpg)' }} ></div>
            </div>
        </div>
    )
}

export default SignUp
