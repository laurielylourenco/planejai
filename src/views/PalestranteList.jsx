import { Mail } from "lucide-react"
import { Link } from 'react-router-dom';

const PalestranteList = ({ listaPalestrante, onEdit }) => {
    console.log("listaParticipante", listaPalestrante)

    if (listaPalestrante.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                Nenhum palestrante cadastrado.
            </div>
        )
    }

    return (
        <div className="row row-cards">
            {listaPalestrante.map((event) => (
                <div key={event.id} className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">{event.nome}</h3>
                            <div className="mb-2">

                                <Mail className="icon me-2" size={16} />
                                <span className="text-muted">{event.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PalestranteList