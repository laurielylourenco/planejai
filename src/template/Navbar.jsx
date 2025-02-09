const Navbar = ({ role }) => {
    return (

        <>

            {role == '1' && (
                <header className="navbar-expand-md">
                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <div className="navbar">
                            <div className="container-xl">
                                <div className="row flex-fill align-items-center">
                                    <div className="col">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a className="nav-link" href="./">
                                                    <span className="nav-link-icon d-md-none d-lg-inline-block">

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                            className="icon icon-1">
                                                            <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                                                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                                                        </svg>
                                                    </span>
                                                    <span className="nav-link-title">
                                                        Home
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="nav-item ">
                                                <a className="nav-link " href="#"
                                                >
                                                    <span className="nav-link-icon d-md-none d-lg-inline-block">

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                            className="icon icon-1">
                                                            <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                                                            <path d="M12 12l8 -4.5" />
                                                            <path d="M12 12l0 9" />
                                                            <path d="M12 12l-8 -4.5" />
                                                            <path d="M16 5.25l-8 4.5" />
                                                        </svg>
                                                    </span>
                                                    <span className="nav-link-title">
                                                        Eventos
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="./form-elements.html">
                                                    <span className="nav-link-icon d-md-none d-lg-inline-block">

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                            className="icon icon-1">
                                                            <path d="M9 11l3 3l8 -8" />
                                                            <path
                                                                d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                                                        </svg>
                                                    </span>
                                                    <span className="nav-link-title">
                                                        Palestrantes
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#navbar-extra">
                                                    <span className="nav-link-icon d-md-none d-lg-inline-block">

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                            className="icon icon-1">
                                                            <path
                                                                d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                                        </svg>
                                                    </span>
                                                    <span className="nav-link-title">
                                                        Participantes
                                                    </span>
                                                </a>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

            )}


            {role == '2' && (
                <header className="navbar-expand-md">
                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <div className="navbar">
                            <div className="container-xl">
                                <div className="row flex-fill align-items-center">
                                    <div className="col">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a className="nav-link" href="./">
                                                    <span className="nav-link-icon d-md-none d-lg-inline-block">

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                            className="icon icon-1">
                                                            <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                                                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                                                        </svg>
                                                    </span>
                                                    <span className="nav-link-title">
                                                        Home
                                                    </span>
                                                </a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link" href="./form-elements.html">
                                                    <span className="nav-link-icon d-md-none d-lg-inline-block">

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                            className="icon icon-1">
                                                            <path d="M9 11l3 3l8 -8" />
                                                            <path
                                                                d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                                                        </svg>
                                                    </span>
                                                    <span className="nav-link-title">
                                                        Palestras
                                                    </span>
                                                </a>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            )}

            {role == '3' && (
                <header className="navbar-expand-md">
                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <div className="navbar">
                            <div className="container-xl">
                                <div className="row flex-fill align-items-center">
                                    <div className="col">
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a className="nav-link" href="./">
                                                    <span className="nav-link-icon d-md-none d-lg-inline-block">

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                            className="icon icon-1">
                                                            <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                                                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                                                        </svg>
                                                    </span>
                                                    <span className="nav-link-title">
                                                        Home
                                                    </span>
                                                </a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link" href="./form-elements.html">
                                                    <span className="nav-link-icon d-md-none d-lg-inline-block">

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                            className="icon icon-1">
                                                            <path d="M9 11l3 3l8 -8" />
                                                            <path
                                                                d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                                                        </svg>
                                                    </span>
                                                    <span className="nav-link-title">
                                                        Inscrição
                                                    </span>
                                                </a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link" href="./form-elements.html">
                                                    <span className="nav-link-icon d-md-none d-lg-inline-block">

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                            className="icon icon-1">
                                                            <path d="M9 11l3 3l8 -8" />
                                                            <path
                                                                d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                                                        </svg>
                                                    </span>
                                                    <span className="nav-link-title">
                                                        Programação
                                                    </span>
                                                </a>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            )}



        </>


    )

}

export default Navbar;