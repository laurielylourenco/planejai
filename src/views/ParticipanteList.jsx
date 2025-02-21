import { Mail } from "lucide-react"
import { Link } from 'react-router-dom';

const ParticipanteList = ({ listaParticipante, onEdit }) => {
    console.log("listaParticipante", listaParticipante)

    if (listaParticipante.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                Nenhum palestrante cadastrado.
            </div>
        )
    }

    return (
        <div className="row row-cards">
            {listaParticipante.map((event) => (
                <div key={event.id} className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">{event.nome}</h3>
                            <div className="mb-2">

                                <Mail className="icon me-2" size={16} />
                                <span className="text-muted">{event.email}</span>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="btn-list justify-content-center">

                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ParticipanteList