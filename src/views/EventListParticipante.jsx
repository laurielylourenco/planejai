import { Calendar, Clock, Eye, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';

const EventoListPartipante = () => {

    const [listaEventoPP, setListaEventoPP] = useState([])

    useEffect(() => {
        fetchEventos()
    }, [])

    const fetchEventos = () => {
        const options = { method: "GET", headers: { "Content-Type": "application/json" } }
        // fetch("http://localhost:8080/eventos", options)
        fetch("http://localhost:4001/getEventos.php", options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar eventos")
                }
                return response.json()
            })
            .then((data) => {
                console.log("data: ", data)
                setListaEventoPP(data)
            })
            .catch((err) => console.error(err))
    }
    return (

        <div className="container-xl">

            <div className="row g-2 align-items-center">
                <div className="col">
                    <h2 className="page-title">Eventos</h2>
                    <div className="text-muted mt-1">Lista de eventos disponiveis</div>
                </div>
            </div>

            <div className="row row-cards">
            {listaEventoPP.map((event) => (
                <div key={event.id} className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">{event.nome}</h3>
                            <div className="mb-2">
                                <MapPin className="icon me-2" size={16} />
                                <span className="text-muted">{event.local}</span>
                            </div>
                            <div className="mb-2">
                                <Calendar className="icon me-2" size={16} />
                                <span className="text-muted">{event.dataInicio}</span>
                            </div>
                            <div className="mb-2">
                                <Clock className="icon me-2" size={16} />
                                <span className="text-muted">{`${event.horaInicio} - ${event.horaFim}`}</span>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="btn-list justify-content-center">
                                <Link to={`/home/line-up/${event.id}`} className="btn btn-icon btn-secondary" title="Visualizar">
                                    <Eye size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    )


}

export default EventoListPartipante