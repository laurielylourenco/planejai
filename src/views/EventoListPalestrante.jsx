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

  /* <div class="card">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-3">
                      <img src="https://cdn.dribbble.com/users/844826/screenshots/14547977/media/e7749bd1b09d9415b8dc265a7dbe81f6.png" alt="Projects Dashboards" class="rounded">
                    </div>
                    <div class="col">
                      <h3 class="card-title mb-1">
                        <a href="#" class="text-reset">Projects Dashboards</a>
                      </h3>
                      <div class="text-secondary">
                        Updated 2 hours ago
                      </div>
                      <div class="mt-3">
                        <div class="row g-2 align-items-center">
                          <div class="col-auto">
                            76%
                          </div>
                          <div class="col">
                            <div class="progress progress-sm">
                              <div class="progress-bar" style="width: 76%" role="progressbar" aria-valuenow="76" aria-valuemin="0" aria-valuemax="100" aria-label="76% Complete">
                                <span class="visually-hidden">76% Complete</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-auto">
                      <div class="dropdown">
                        <a href="#" class="btn-action show" data-bs-toggle="dropdown" aria-expanded="true">
                          <!-- Download SVG icon from http://tabler-icons.io/i/dots-vertical -->
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path></svg>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end show" data-popper-placement="bottom-end" style="position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 34px);">
                          <a href="#" class="dropdown-item">Import</a>
                          <a href="#" class="dropdown-item">Export</a>
                          <a href="#" class="dropdown-item">Download</a>
                          <a href="#" class="dropdown-item text-danger">Delete</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>    
  
  */
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
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EventoListPalestrante


