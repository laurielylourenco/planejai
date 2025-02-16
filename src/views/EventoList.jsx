import { Calendar, MapPin, Clock, Pencil, Eye, Trash2 } from "lucide-react"
import { Link } from 'react-router-dom';

const EventList = ({ listaEvento, onEdit }) => {
    console.log("listaEvento", listaEvento)

    if (listaEvento.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                Nenhum evento encontrado.
            </div>
        )
    }

    return (
        <div className="row row-cards">
            {listaEvento.map((event) => (
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
                                <Link to={`/home/evento/${event.id}`} className="btn btn-icon btn-secondary" title="Visualizar">
                                    <Eye size={16} />
                                </Link>
                                <button className="btn btn-icon btn-primary" onClick={() => onEdit(event)} title="Editar">
                                    <Pencil size={16} />
                                </button>
                                <button className="btn btn-icon btn-danger" title="Excluir">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EventList


