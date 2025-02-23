"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, MapPin, CheckCircle, XCircle, Search } from "lucide-react"

const Participante = () => {
  const [inscricoes, setInscricoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchInscricoes = async () => {
      try {
        const response = await fetch("http://localhost:8080/inscricoes")
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

  // Filtrar inscrições baseado no termo de busca
  const inscricoesFiltradas = inscricoes.filter((inscricao) =>
    inscricao.participante.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Agrupar inscrições por evento
  const inscricoesPorEvento = inscricoesFiltradas.reduce((acc, inscricao) => {
    const eventoId = inscricao.atividade.evento.id
    if (!acc[eventoId]) {
      acc[eventoId] = {
        evento: inscricao.atividade.evento,
        inscricoes: [],
      }
    }
    acc[eventoId].inscricoes.push(inscricao)
    return acc
  }, {})

  if (loading) {
    return (
      <div className="container-xl">
        <div className="text-center p-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-xl">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container-xl">
      <div className="page-header d-print-none mb-4">
        <div className="row align-items-center">
          <div className="col">
            <h2>Lista de Participantes</h2>
          </div>
          <div className="col-auto ms-auto">
            <div className="d-flex">
              <div className="input-icon">
                <span className="input-icon-addon">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {inscricoesFiltradas.length === 0 ? (
        <div className="alert alert-info" role="alert">
          {inscricoes.length === 0 ? "Nenhuma inscrição encontrada." : "Nenhum participante encontrado com este nome."}
        </div>
      ) : (
        Object.values(inscricoesPorEvento).map(({ evento, inscricoes }) => (
          <div key={evento.id} className="card mb-4">
            <div className="card-header">
              <h3 className="card-title">
                {evento.nome}
                <div className="text-muted mt-1" style={{ fontSize: "0.875rem" }}>
                  <MapPin size={16} className="me-1" />
                  {evento.local} • {formatarData(evento.dataInicio)} até {formatarData(evento.dataFim)}
                </div>
              </h3>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th>Participante</th>
                      <th>Atividade</th>
                      <th>Data e Hora</th>
                      <th>Duração</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inscricoes.map((inscricao) => (
                      <tr key={inscricao.endpointCode}>
                        <td>
                          <div>
                            <strong>{inscricao.participante.nome}</strong>
                            <div className="text-muted">
                              <small>{inscricao.participante.email}</small>
                            </div>
                          </div>
                        </td>
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
                          {inscricao.presencaConfirmada ? (
                            <div className="d-flex align-items-center text-success">
                              <CheckCircle size={16} className="me-1" />
                              <span>Presença Confirmada</span>
                            </div>
                          ) : (
                            <div className="d-flex align-items-center text-muted">
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
        ))
      )}
    </div>
  )
}

export default Participante

