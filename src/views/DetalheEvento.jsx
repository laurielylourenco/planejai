"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"

const DetalheEvento = () => {
    const { id } = useParams()
    const [evento, setEvento] = useState(null)
    const [atividades, setAtividades] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [datas, setDatas] = useState([])
    const colunasPorPagina = 4

    useEffect(() => {
        const fetchEventoEAtividades = async () => {
            try {
                const eventoResponse = await fetch(`http://localhost:4001/getEvento.php?id=${id}`)
                const eventoData = await eventoResponse.json()
                setEvento(eventoData)

                const atividadesResponse = await fetch(`http://localhost:4001/getAtividades.php?eventoId=${id}`)
                const atividadesData = await atividadesResponse.json()

                
                setAtividades([atividadesData])

                if (eventoData.dataInicio && eventoData.dataFim) {
                    const start = new Date(eventoData.dataInicio)
                    const end = new Date(eventoData.dataFim)
                    const dateArray = []
                    let currentDate = start
                    while (currentDate <= end) {
                        dateArray.push(currentDate.toISOString().split("T")[0])
                        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1))
                    }
                    setDatas(dateArray)
                }
            } catch (error) {
                console.error("Erro ao buscar dados do evento ou atividades:", error)
            }
        }

        fetchEventoEAtividades()
    }, [id])

    const totalPages = Math.ceil(datas.length / colunasPorPagina)
    const datasVisiveis = datas.slice(currentPage * colunasPorPagina, currentPage * colunasPorPagina + colunasPorPagina)

    const formatarData = (data) => {
        return new Date(data).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
        })
    }

    const getAtividadesPorData = (data) => {

        console.log(atividades, data)
        return atividades.filter((atividade) => atividade.data.startsWith(data))
    }

    if (!evento) {
        return <div className="text-center p-5">Carregando...</div>
    }

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-2">
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
                            <div className="card-header bg-light">
                                <h5 className="card-title mb-0 text-primary">{formatarData(data)}</h5>
                            </div>
                            <div className="card-body p-2" style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                                {getAtividadesPorData(data).length > 0 ? (
                                    getAtividadesPorData(data).map((atividade) => (
                                        <div key={atividade.id} className="card mb-3 border-0 bg-light">
                                            <div className="card-body p-3">
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <Clock size={16} className="text-primary" />
                                                    <small className="text-primary">{atividade.data}</small>
                                                </div>
                                                <h6 className="card-title mb-2">{atividade.nome}</h6>
                                                <p className="card-text small mb-2 text-muted">{atividade.descricao}</p>
                                                <div className="d-flex flex-column gap-1">
                                                    <small className="text-muted">
                                                        <strong>Local:</strong> {atividade.local}
                                                    </small>
                                                    <small className="text-muted">
                                                        <strong>Responsável:</strong> {atividade.responsavel}
                                                    </small>
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
        </div>
    )
}

export default DetalheEvento
