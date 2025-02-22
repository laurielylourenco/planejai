import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/fundolongo1.png';

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nome, setNome] = useState('')
    const [role, setRole] = useState('')  // Novo estado para o select
    const navigate = useNavigate()

    const handleSignUp = (e) => {
        try {

            e.preventDefault()

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: nome,
                    senha: password,
                    email: email,
                    role: role,  // Incluindo o valor selecionado
                })
            }

            let url = ''
            switch (role) {
                case '1':
                    url = 'organizador'
                    break;
                case '2':
                    url = 'palestrante'
                    break;
                case '3':
                    url = 'participante'
                    break;
                default:
                    throw new Error('Url inválida')

            }

            fetch(`http://localhost:8080/${url}`, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Credenciais inválidas')
                    }
                    return response.text()
                })
                .then(data => {
                    //console.log('data:  ',data)
                    localStorage.setItem('userToken', data.token)
                    localStorage.setItem('userData', JSON.stringify({
                        nome: 'lauriely',
                        senha: password,
                        email: email,
                        role: role,  // Salvando a role também
                    })) // mockr

                    alert('Conta criada com sucesso')
                    navigate('/login')
                })
                .catch(err => {
                    console.log(err)
                    alert(err.message)  // Exibe o erro
                })
        } catch (error) {
            alert(error.message)
        }
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
                        Crie sua conta
                    </h2>
                    <form method="get" autoComplete="off" noValidate onSubmit={handleSignUp}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Nome</label>
                            <input type="text" className="form-control" value={nome} onChange={e => setNome(e.target.value)} required />
                        </div>

                        <div className="mb-2">
                            <label className="form-label">Senha</label>
                            <div className="input-group input-group-flat">
                                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="off" />
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

                        <div className="mb-3">
                            <label className="form-label">Qual será o seu papel no evento?</label>
                            <select
                                className="form-select"
                                value={role}
                                onChange={e => setRole(e.target.value)} // Atualiza o estado
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="1">Organizar</option>
                                <option value="2">Participar</option>
                                <option value="3">Palestrar</option>
                            </select>
                        </div>

                        <div className="form-footer">
                            <button type="submit" className="btn btn-primary w-100">Criar conta</button>
                        </div>
                    </form>

                    <div className="text-center text-secondary mt-3">
                        Já tem uma conta? <Link to="/login">Faça login</Link>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-6 col-xl-8 d-none d-lg-block">
                <div className="bg-cover h-100 min-vh-100" style={{ backgroundImage: 'url(/img/imagem_signup2.jpg)' }} ></div>
            </div>
        </div>
    )
}

export default SignUp
