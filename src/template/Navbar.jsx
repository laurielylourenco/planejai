import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ role }) => {

    const navigate = useNavigate();
    const location = useLocation();
    return (

        <>

            {role == 'ORGANIZADOR' && (
                <div className="col-md-2 border-end">
                    <div className="list-group">
                        <Link to="/home" className={`list-group-item list-group-item-action ${location.pathname === '/home' ? 'active' : ''}`}>
                            Início
                        </Link>

                        <Link to="/home/evento" className={`list-group-item list-group-item-action ${location.pathname === '/home/evento' ? 'active' : ''}`}>
                            Eventos
                        </Link>
                        <Link to="/home/palestrantes" className={`list-group-item list-group-item-action ${location.pathname === '/home/palestrantes' ? 'active' : ''}`}>
                            Palestrantes
                        </Link>
                        <Link to="/home/participantes" className={`list-group-item list-group-item-action ${location.pathname === '/home/participantes' ? 'active' : ''}`}>
                            Participantes
                        </Link>
                    </div>
                </div>

            )}


            {role == 'PALESTRANTE' && (



                <div className="col-md-2 border-end">
                    <div className="list-group">
                        <Link to="/home" className={`list-group-item list-group-item-action ${location.pathname === '/home' ? 'active' : ''}`}>
                            Início
                        </Link>


                        {/* Todos eventos que palestrante */}
                        <Link to="/home/in-event" className={`list-group-item list-group-item-action ${location.pathname === '/home/in-event' ? 'active' : ''}`}>
                            Eventos
                        </Link>

                    </div>
                </div>

            )}

            {role == 'PARTICIPANTE' && (

                <div className="col-md-2 border-end">
                    <div className="list-group">
                        <Link to="/home" className={`list-group-item list-group-item-action ${location.pathname === '/home' ? 'active' : ''}`}>
                            Início
                        </Link>
                        <Link to="/home/inscricao" className={`list-group-item list-group-item-action ${location.pathname === '/home/inscricao' ? 'active' : ''}`}>
                            Inscrição
                        </Link>
                        <Link to="/home/line-up" className={`list-group-item list-group-item-action ${location.pathname === '/home/line-up' ? 'active' : ''}`}>
                            Programação
                        </Link>

                    </div>
                </div>
            )}



        </>


    )

}

export default Navbar;