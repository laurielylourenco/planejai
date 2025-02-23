import { useState, useEffect, useCallback } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { ChevronLeft, ChevronRight, Clock, Users, AlarmClock, Plus, EllipsisVertical, Undo2, Trash2, Pencil } from "lucide-react"
import CriarAtividade from "./CriarAtividade"

const DetalheEvento = () => {
  const { id } = useParams()
  const [evento, setEvento] = useState(null)
  const [atividades, setAtividades] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [datas, setDatas] = useState([])
  const [dataSelecionada, setDataSelecionada] = useState(null)
  const [atividadeParaEditar, setAtividadeParaEditar] = useState(null)
  const navigate = useNavigate();
  const colunasPorPagina = 4

  const fetchAtividades = useCallback(async () => {
    try {
      // const atividadesResponse = await fetch(`http://localhost:8080/atividade/${id}`)

      const atividadesResponse = await fetch(`http://localhost:8080/atividades`) // esta pegando o todas atividade independete de eventos apenas para teste
      const atividadesData = await atividadesResponse.json()
      console.log("Atividades atualizadas:", atividadesData)
      setAtividades(atividadesData || [])
    } catch (error) {
      console.error("Erro ao buscar atividades:", error)
      setAtividades([])
    }
  }, [id])

  // Função auxiliar para ajustar o timezone
  const ajustarData = useCallback((data) => {
    if (!data) return null
    const [ano, mes, dia] = data.split("-")
    // Criando a data no timezone local
    return new Date(ano, mes - 1, dia)
  }, [])

  useEffect(() => {
    const fetchEventoEAtividades = async () => {
      try {

        const eventoResponse = await fetch(`http://localhost:8080/evento/${id}`)
        const eventoData = await eventoResponse.json()
        setEvento(eventoData)

        const atividadesResponse = await fetch(`http://localhost:8080/atividades`)
        const atividadesData = await atividadesResponse.json()
        console.log('atividadesData', atividadesData)
        setAtividades(atividadesData || [])

        if (eventoData.dataInicio && eventoData.dataFim) {
          const start = ajustarData(eventoData.dataInicio)
          const end = ajustarData(eventoData.dataFim)
          const dateArray = []

          let currentDate = start
          while (currentDate <= end) {
            dateArray.push(currentDate.toISOString().split("T")[0])
            currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1))
          }
          setDatas(dateArray)
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
        setAtividades([])
      }
    }

    fetchEventoEAtividades()
  }, [id, ajustarData])



  const voltar = () => {
    navigate(-1); // Isso irá voltar à página anterior
  };


  const handleNovaAtividade = (data) => {
    setDataSelecionada(data)
    setAtividadeParaEditar(null) // Reseta a atividade para edição
    const modal = new bootstrap.Modal(document.getElementById("modal-atividade"))
    modal.show()
  }

  const handleEditarAtividade = (atividade) => {
    setAtividadeParaEditar(atividade)
    setDataSelecionada(atividade.data.split(" ")[0])
    const modal = new bootstrap.Modal(document.getElementById("modal-atividade"))
    modal.show()
  }

  const handleDeletarAtividade = async (atividade) => {
    if (window.confirm("Tem certeza que deseja deletar esta atividade?")) {
      try {
        const response = await fetch(`http://localhost:8080/atividade/${atividade.id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Erro ao deletar atividade")
        }

        await fetchAtividades() // Recarrega a lista após deletar
      } catch (error) {
        console.error("Erro:", error)
        alert(error.message)
      }
    }
  }

  const handleAtividadeCriada = async (novaAtividade) => {
    await fetchAtividades()
    const modal = document.getElementById("modal-atividade")
    const bootstrapModal = bootstrap.Modal.getInstance(modal)
    if (bootstrapModal) {
      bootstrapModal.hide()
    }
  }

  const handleAtividadeAtualizada = async (atividadeAtualizada) => {
    await fetchAtividades()
    const modal = document.getElementById("modal-atividade")
    const bootstrapModal = bootstrap.Modal.getInstance(modal)
    if (bootstrapModal) {
      bootstrapModal.hide()
    }
    setAtividadeParaEditar(null)
  }

  const totalPages = Math.ceil(datas.length / colunasPorPagina)
  const datasVisiveis = datas.slice(currentPage * colunasPorPagina, currentPage * colunasPorPagina + colunasPorPagina)

  const formatarData = (data) => {
    if (!data) return ""
    const date = new Date(data)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      timeZone: "UTC",
    })
  }

  const formatarHora = (dataHora) => {
    if (!dataHora) return ""
    const date = new Date(dataHora)
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    })
  }

  const getAtividadesPorData = (data) => {
    if (!Array.isArray(atividades)) return []

    return atividades.filter((atividade) => {
      if (!atividade || !atividade.data) return false
      try {
        const dataAtividade = new Date(atividade.data).toISOString().split("T")[0]
        return dataAtividade === data
      } catch (error) {
        console.error("Erro ao processar atividade:", atividade)
        return false
      }
    })
  }

  if (!evento) {
    return <div className="text-center p-5">Carregando...</div>
  }

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2">

          <a href="#" onClick={voltar} className="">
            <Undo2 />
          </a>
          <h2 className="mb-0">{evento.nome}</h2>

          <span className="text-muted">
            ({formatarData(evento.dataInicio)} - {formatarData(evento.dataFim)})
          </span>
        </div>
        <div className="btn-group">
          <button
            className="btn btn-outline-primary"
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="row flex-nowrap overflow-hidden">
        {datasVisiveis.map((data) => (
          <div key={data} className="col-md-3">
            <div className="card h-100">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0 text-primary">{formatarData(data)}</h5>
                <button className="btn btn-sm btn-primary" onClick={() => handleNovaAtividade(data)}>
                  <Plus size={16} />
                </button>
              </div>
              <div className="card-body p-2" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                {getAtividadesPorData(data).length > 0 ? (
                  getAtividadesPorData(data).map((atividade) => (
                    <div key={atividade.id} className="card mb-3 border-0 bg-light">
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center gap-2">
                            <Clock size={16} className="text-primary" />
                            <small className="text-primary">{formatarHora(atividade.data)}</small>
                          </div>
                          <div className="card-actions">
                            <div className="dropdown">
                              <a href="#" className="btn-action" data-bs-toggle="dropdown" aria-expanded="false">
                                <EllipsisVertical />
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a
                                  href="#"
                                  className="dropdown-item"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    handleEditarAtividade(atividade)
                                  }}
                                >
                                  Atualizar
                                </a>
                                <a
                                  href="#"
                                  className="dropdown-item"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    handleDeletarAtividade(atividade)
                                  }}
                                >
                                  Deletar
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h6 className="card-title mb-2">{atividade.nome}</h6>
                        <p className="card-text small mb-2 text-muted">{atividade.descricao}</p>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <div className="d-flex align-items-center gap-2">
                            <Users size={16} className="text-muted" />
                            <small className="text-muted">{atividade.maxCapacidade} pessoas</small>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <AlarmClock size={16} className="text-muted" />
                            <small className="text-muted">{atividade.minutosDuracao} minutos</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted p-3">
                    <small>Nenhuma atividade para este dia</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <CriarAtividade
        eventoId={id}
        data={dataSelecionada}
        atividadeParaEditar={atividadeParaEditar}
        onAtividadeCriada={handleAtividadeCriada}
        onAtividadeAtualizada={handleAtividadeAtualizada}
      />
    </div>
  )
}

export default DetalheEvento
