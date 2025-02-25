import { useEffect, useState } from 'react'
import Navbar from '../template/Navbar'
import { Outlet, useLocation, Link } from 'react-router-dom'
import logo from '../assets/fundolongo1.png';
const Home = () => {
    const [userData, setUserData] = useState(localStorage.getItem('userData'));
    const location = useLocation();

    const handleLogout = () => {
        localStorage.clear(); // Limpa todo o localStorage
        window.location.href = '/login'; // Redireciona para a página de login
    };

    useEffect(() => {
        const storedData = localStorage.getItem('userData')

        console.log('storedData:  ', storedData)
        if (storedData) {
            setUserData(JSON.parse(storedData))
        }

    }, [])

    return (
        <div className="d-flex flex-column min-vh-100">

            {/* Wrapper para sticky footer */}
            <div className="container-fluid flex-grow-1">

                {/* flex-grow-1 faz o conteúdo expandir */}
                {/* Header - Mantendo sua estrutura atual mas organizando melhor */}
                <header className="navbar navbar-expand-lg navbar-light bg-white border-bottom mb-3">
                    <div className="container-xl">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="navbar-brand pe-0 pe-md-3">
                            <a href="#">
                                <img src={logo} alt="Planeja aí" style={{ height: "3vh" }} />
                            </a>
                        </div>

                        <div className="navbar-nav flex-row order-md-last">
                            <div className="nav-item dropdown">
                                <a
                                    href="#"
                                    className="nav-link d-flex lh-1 text-reset p-0"
                                    data-bs-toggle="dropdown"
                                    aria-label="Open user menu"
                                >
                                    <div className="d-none d-xl-block ps-2">
                                        <div>{userData?.nome}</div>
                                        <div className="mt-1 small text-secondary">{userData?.tipo_usuario}</div>
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    {(userData.tipo_usuario == 'ORGANIZADOR' || userData.tipo_usuario == 'PALESTRANTE') ? <Link to={"/home/perfil"} className='dropdown-item'>Perfil</Link> : ""}



                                    <a href="#" className="dropdown-item" onClick={handleLogout}> Logout </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                {/* Main Content Area - Estrutura em 3 colunas */}
                <div className="row g-3">
                    {/* Sidebar - Mantendo sua navegação existente */}
                    {/* Sidebar - Mantendo sua navegação existente */}
                    {userData && <Navbar role={userData.tipo_usuario} />}


                    {/* Main Content */}
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-body">

                                {/* Aqui você pode adicionar o conteúdo principal */}
                                <div className="content-area">

                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* Footer - Agora fora do container principal e com mt-auto */}
            <footer className="footer border-top mt-auto">
                <div className="container-xl">
                    <div className="row py-4">
                        <div className="col-12 text-center">
                            <p className="mb-0">© 2024 Planeja aí. Todos os direitos reservados.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home
