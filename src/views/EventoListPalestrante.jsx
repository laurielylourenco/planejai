import { Calendar, MapPin, Clock, Pencil, Eye, Trash2, EyeClosed } from "lucide-react"
import { Link } from 'react-router-dom';

const EventoListPalestrante = ({ listaEvento }) => {
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
            <div className="card-header">
              <h3 className="card-title">{event.nome}</h3>
              <div className="card-actions">

                <Link to={`/home/evento/${event.id}`} className="" title="Visualizar">
                  <Eye size={16} />
                </Link>
              </div>

            </div>


            <div className="card-body">


              <div className="">
                <MapPin className="icon me-2" size={16} />
                <span className="text-muted">{event.local}</span>
              </div>
              <div className="">
                <Calendar className="icon me-2" size={16} />
                <span className="text-muted">{`${event.dataInicio} - ${event.dataFim}`}</span>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  )
}

export default EventoListPalestrante


