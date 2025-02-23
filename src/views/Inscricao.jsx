import { useState, useEffect } from "react"
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from "lucide-react"

const Inscricao = () => {
  const [inscricoes, setInscricoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [participante_ins, setParticipanteIns] = useState(JSON.parse(localStorage.getItem("userData")))
  useEffect(() => {

    const storedData = localStorage.getItem("userData")

    if (storedData) {
      setParticipanteIns(JSON.parse(storedData))
    }

    const fetchInscricoes = async () => {
      try {
        const response = await fetch(`http://localhost:8080/inscricao/${participante_ins?.usuario}`)
        if (!response.ok) {
          throw new Error("Erro ao carregar inscrições")
        }
        const data = await response.json()
        setInscricoes(data)
      } catch (error) {
        console.error("Erro:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInscricoes()
  }, [])

  const formatarData = (dataString) => {
    const data = new Date(dataString)
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatarHora = (dataString) => {
    const data = new Date(dataString)
    return data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="container-xl">
        <div className="row">
          <div className="col-12">
            <div className="text-center p-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-xl">
        <div className="row">
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (inscricoes.length === 0) {
    return (
      <div className="container-xl">
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info" role="alert">
              Você ainda não possui inscrições em atividades.
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-xl">
      <div className="row">
        <div className="col-12">
          <div className="page-header mb-4">
            <h2>Minhas Inscrições</h2>
          </div>

          <div className="table-responsive">
            <table className="table table-vcenter">
              <thead>
                <tr>
                  <th>Atividade</th>
                  <th>Evento</th>
                  <th>Data e Hora</th>
                  <th>Duração</th>
                  <th>Local</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inscricoes.map((inscricao) => (
                  <tr key={inscricao.endpointCode}>
                    <td>
                      <div>
                        <strong>{inscricao.atividade.nome}</strong>
                        <div className="text-muted">
                          <small>{inscricao.atividade.tipoAtividade}</small>
                        </div>
                        <div className="text-muted">
                          <small>{inscricao.atividade.descricao}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <strong>{inscricao.atividade.evento.nome}</strong>
                        <div className="text-muted">
                          <small>{inscricao.atividade.evento.descricao}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center text-muted">
                        <Calendar size={16} className="me-1" />
                        <span>{formatarData(inscricao.atividade.data)}</span>
                        <Clock size={16} className="ms-2 me-1" />
                        <span>{formatarHora(inscricao.atividade.data)}</span>
                      </div>
                    </td>
                    <td>
                      <span className="text-muted">{inscricao.atividade.minutosDuracao} minutos</span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center text-muted">
                        <MapPin size={16} className="me-1" />
                        <span>{inscricao.atividade.evento.local}</span>
                      </div>
                    </td>
                    <td>
                      {inscricao.presencaConfirmada ? (
                        <div className="d-flex align-items-center text-success">
                          <CheckCircle size={16} className="me-1" />
                          <span>Presença Confirmada</span>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center text-danger">
                          <XCircle size={16} className="me-1" />
                          <span>Aguardando Confirmação</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inscricao

