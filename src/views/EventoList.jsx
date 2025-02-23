import { Calendar, MapPin, Clock, EllipsisVertical, Users, Eye, Pencil, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

const EventList = ({ listaEvento, onEdit, onDelete }) => {
  console.log("listaEvento", listaEvento)

  const formatarData = (data) => {
    if (!data) return ""
    const date = new Date(data)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

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
          <div className="card h-100">
            <div className="card-header border-0 pt-3 pb-0">
              <div className="d-flex justify-content-between align-items-start w-100">
                <div>
                  <h3 className="card-title mb-1">{event.nome}</h3>
                  {event.descricao && (
                    <p className="text-muted text-truncate mb-3" style={{ maxWidth: "250px" }}>
                      {event.descricao}
                    </p>
                  )}
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <EllipsisVertical size={16} />
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <Link to={`/home/evento/${event.id}`} className="dropdown-item">
                      <Eye className="icon dropdown-item-icon" size={16} />
                      Visualizar
                    </Link>
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault()
                        onEdit(event)
                      }}
                    >
                      <Pencil className="icon dropdown-item-icon" size={16} />
                      Editar
                    </a>
                    <a
                      href="#"
                      className="dropdown-item text-danger"
                      onClick={(e) => {
                        e.preventDefault()
                        if (window.confirm(`Deseja realmente excluir o evento "${event.nome}"?`)) {
                          onDelete(event)
                        }
                      }}
                    >
                      <Trash2 className="icon dropdown-item-icon" size={16} />
                      Excluir
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body pt-2">
              <div className="list-group list-group-flush">
                <div className="list-group-item border-0 px-0">
                  <div className="d-flex align-items-center">
                    <MapPin className="icon text-primary me-2" size={16} />
                    <span className="text-muted">{event.local}</span>
                  </div>
                </div>
                <div className="list-group-item border-0 px-0">
                  <div className="d-flex align-items-center">
                    <Calendar className="icon text-primary me-2" size={16} />
                    <span className="text-muted">
                      {formatarData(event.dataInicio)} - {formatarData(event.dataFim)}
                    </span>
                  </div>
                </div>
{/*                 <div className="list-group-item border-0 px-0">
                  <div className="d-flex align-items-center">
                    <Clock className="icon text-primary me-2" size={16} />
                    <span className="text-muted">{`${event.horaInicio} - ${event.horaFim}`}</span>
                  </div>
                </div> */}
                {event.maxAtividades && (
                  <div className="list-group-item border-0 px-0">
                    <div className="d-flex align-items-center">
                      <Users className="icon text-primary me-2" size={16} />
                      <span className="text-muted">{event.maxAtividades} atividades simultâneas</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EventList
