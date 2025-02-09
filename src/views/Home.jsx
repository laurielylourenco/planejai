import { useEffect, useState } from 'react'
import Navbar from '../template/Navbar'

const Home = () => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const storedData = localStorage.getItem('userData')
        if (storedData) {
            setUserData(JSON.parse(storedData))
        }
    }, [])

    return (
        <div>
            <header className="navbar navbar-expand-md d-print-none">
                <div className="container-xl">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu"
                        aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                        <a href="#">
                            <img src="fundolongo1.png" alt="Planeja aí" style={{ height: '3vh' }} />


                        </a>
                    </div>
                    <div className="navbar-nav flex-row order-md-last">
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown"
                                aria-label="Open user menu">
                                <div className="d-none d-xl-block ps-2">
                                    <div>{userData?.nome}</div>
                                    <div className="mt-1 small text-secondary">UI Designer</div>
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <a href="./settings.html" className="dropdown-item">Configuração</a>
                                <a href="./sign-in.html" className="dropdown-item">Logout</a>

                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Navbar role={'1'} />  {/* Vai mudar de acordo com usuario */}

            <main>
                <h1>Bem-vindo, {userData?.nome}</h1>
            </main>

            <footer>
                footer

            </footer>
            {/* Renderize outros dados conforme necessário */}
        </div>
    )
}

export default Home
