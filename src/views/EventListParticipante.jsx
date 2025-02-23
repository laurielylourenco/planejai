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
        fetch("http://localhost:8080/eventos", options)
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

            <div className="row row-cards mt-5">
                {listaEventoPP.map((event) => (
                    <div key={event.id} className="col-md-6 col-lg-4">
                        <div className="card">
                            <div className="card-header">

                                <h3 className="card-title">{event.nome}</h3>
                                <div className="card-actions">
                                    <Link to={`/home/line-up/${event.id}`} className="" title="Visualizar">
                                        <Eye size={16} />
                                    </Link>
                                </div>
                            </div>

                            <div className="card-body">

                                <div className="mb-2">
                                    <MapPin className="icon me-2" size={16} />
                                    <span className="text-muted">{event.local}</span>

                                </div>

                                <div className="mb-2">
                                    <Calendar className="icon me-2" size={16} />
                                    <span className="text-muted">{`${event.dataInicio} - ${event.dataFim}`}</span>
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