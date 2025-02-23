"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { Clock, Users } from "lucide-react"

const LineUp = () => {
  const { id } = useParams()
  const [atividades, setAtividades] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [inscricoes, setInscricoes] = useState({})

  const fetchAtividades = useCallback(async () => {
    try {
  //    const atividadesResponse = await fetch(`http://localhost:4001/getAtividades.php?eventoId=${id}`)
      const atividadesResponse = await fetch(`http://localhost:8080/atividades`) // tem que ter filtro por evento
      if (!atividadesResponse.ok) {
        throw new Error("Erro ao buscar atividades")
      }
      const atividadesData = await atividadesResponse.json()
      setAtividades(atividadesData || [])
    } catch (error) {
      console.error("Erro ao buscar atividades:", error)
      setError(error.message)
      setAtividades([])
    } finally {
      setLoading(false)
    }
  }, [id])

  const fetchInscricoes = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:4001/getInscricoes.php?userId=1`) // Assumindo userId fixo para exemplo
      if (!response.ok) throw new Error("Erro ao buscar inscrições")
      const data = await response.json()

      // Transformar array de inscrições em objeto para fácil verificação
      const inscricoesObj = {}
      data.forEach((inscricao) => {
        inscricoesObj[inscricao.id_atividade] = true
      })
      setInscricoes(inscricoesObj)
    } catch (error) {
      console.error("Erro ao buscar inscrições:", error)
    }
  }, [])

  useEffect(() => {
    fetchAtividades()
    fetchInscricoes()
  }, [fetchAtividades, fetchInscricoes])

  const handleInscrever = async (atividadeId) => {
    try {
      const response = await fetch("http://localhost:4001/inscreverAtividade.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_atividade: atividadeId,
          atividade_id_evento: 1,
          id_usuario: 1, // Assumindo userId fixo para exemplo
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao realizar inscrição")
      }

      // Atualizar estado local
      setInscricoes((prev) => ({
        ...prev,
        [atividadeId]: true,
      }))

      alert("Inscrição realizada com sucesso!")
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao realizar inscrição")
    }
  }

  const handleCancelarInscricao = async (atividadeId) => {
    try {
      const response = await fetch(`http://localhost:4001/cancelarInscricao.php`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_atividade: atividadeId,
          atividade_id_evento: 1,
          id_usuario: 1, // Assumindo userId fixo para exemplo
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao cancelar inscrição")
      }

      // Atualizar estado local
      setInscricoes((prev) => {
        const newInscricoes = { ...prev }
        delete newInscricoes[atividadeId]
        return newInscricoes
      })

      alert("Inscrição cancelada com sucesso!")
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao cancelar inscrição")
    }
  }

  const formatarData = (data) => {
    if (!data) return ""
    const date = new Date(data)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatarHora = (dataHora) => {
    if (!dataHora) return ""
    const date = new Date(dataHora)
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Agrupar atividades por data
  const atividadesPorData = atividades.reduce((acc, atividade) => {
    const data = atividade.data.split(" ")[0]
    if (!acc[data]) {
      acc[data] = []
    }
    acc[data].push(atividade)
    return acc
  }, {})

  if (loading) {
    return (
      <div className="col-12">
        <div className="p-3">
          <div className="text-center">Carregando programação...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="col-12">
        <div className="p-3">
          <div className="alert alert-danger">Erro ao carregar programação: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="col-12">
      <div className="p-3">
        <h2 className="mb-4">Programação do Evento {id}</h2>
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Programação
            </a>
          </li>
        </ul>

        {Object.entries(atividadesPorData).map(([data, atividades]) => (
          <div key={data}>
            <h3 className="h5 mb-4">{formatarData(data)}</h3>

            <div className="list-group mb-4">
              {atividades.map((atividade) => (
                <div key={atividade.id} className="list-group-item">
                  <div className="d-flex w-100 justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <h5 className="mb-1">
                          <Clock className="icon me-2" size={16} />
                          {formatarHora(atividade.data)} - {atividade.duracao} min
                        </h5>
                        <small className="text-primary">{atividade.tipo_atividade}</small>
                      </div>
                      <p className="mb-1">{atividade.nome}</p>
                      <p className="mb-1 text-muted">{atividade.descricao}</p>
                      <div className="d-flex align-items-center gap-2 mt-2">
                        <Users size={16} className="text-muted" />
                        <small className="text-muted">Capacidade: {atividade.maxCapacidade} pessoas</small>
                      </div>
                    </div>
                    <div className="ms-3">
                      {inscricoes[atividade.id] ? (
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleCancelarInscricao(atividade.id)}
                        >
                          Cancelar Inscrição
                        </button>
                      ) : (
                        <button className="btn btn-primary btn-sm" onClick={() => handleInscrever(atividade.id)}>
                          Inscrever-se
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LineUp

