import { useState, useEffect } from "react"
import EventList from "./EventoList"
const Evento = () => {
  const [listaEvento, setListaEvento] = useState([])
  const [editingEvent, setEditingEvent] = useState(null)

  const [formData, setFormData] = useState({
    nome: "",
    local: "",
    dataInicio: "",
    horaInicio: "",
    dataFim: "",
    horaFim: "",
    maxAtividades: "",
    descricao: "",
  })

  useEffect(() => {
    fetchEventos()
  }, [])

  const fetchEventos = () => {
    const options = { method: "GET", headers: { "Content-Type": "application/json" } }
    fetch("http://localhost:8080/eventos", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar eventos")
        }
        return response.json()
      })
      .then((data) => {
        console.log("data: ", data)
        setListaEvento(data)
      })
      .catch((err) => console.error(err))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":")
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
  }

  const handleSubmit = () => {
    const formattedData = {
      ...formData,
      horaInicio: formatTime(formData.horaInicio),
      horaFim: formatTime(formData.horaFim),
    }

    const url = editingEvent
      ? `http://localhost:8080/evento/${editingEvent.id}`
      : "http://localhost:8080/evento"

    const options = {
      method: editingEvent ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
    }

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao salvar evento")
        }
        return response.text()
      })
      .then((data) => {
        console.log(data)
        fetchEventos() // Atualiza a lista de eventos
        resetForm()
      })
      .catch((err) => {
        console.log(err)
        alert(err.message)
      })
  }

  const handleEdit = (event) => {
    setEditingEvent(event)
    setFormData({
      nome: event.nome,
      local: event.local,
      dataInicio: event.dataInicio,
      horaInicio: event.horaInicio,
      dataFim: event.dataFim,
      horaFim: event.horaFim,
      maxAtividades: event.maxAtividades || "",
      descricao: event.descricao || "",
    })
    const modal = new bootstrap.Modal(document.getElementById("modal-team"))
    modal.show()
  }

  const resetForm = () => {
    setFormData({
      nome: "",
      local: "",
      dataInicio: "",
      horaInicio: "",
      dataFim: "",
      horaFim: "",
      maxAtividades: "",
      descricao: "",
    })
    setEditingEvent(null)
  }

  return (
    <div className="container-xl">
      <div className="row g-2 align-items-center">
        <div className="col">
          <h2 className="page-title">Eventos</h2>
          <div className="text-muted mt-1">Gerencie seus eventos</div>
        </div>
        <div className="col-auto ms-auto d-print-none">
          <div className="d-flex">
            <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-team">
              <i className="bi bi-plus-lg"></i> Novo evento
            </a>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modal-team" tabIndex={-1} role="dialog" aria-hidden={true}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{editingEvent ? "Editar Evento" : "Novo Evento"}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={resetForm}
              ></button>
            </div>
            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">Nome do evento</label>
                <input
                  type="text"
                  className="form-control"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome do evento"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Local do evento</label>
                <input
                  type="text"
                  className="form-control"
                  name="local"
                  value={formData.local}
                  onChange={handleInputChange}
                  placeholder="Local do evento"
                />
              </div>
              <div className="row">
                <div className="col-6">

                  <div className="mb-3">
                    <label className="form-label">Data início</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dataInicio"
                      value={formData.dataInicio}
                      onChange={handleInputChange}
                    />
                  </div>

                </div>

                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Hora início</label>
                    <input
                      type="time"
                      className="form-control"
                      name="horaInicio"
                      value={formData.horaInicio}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>


              <div className="row">

                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Data fim</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dataFim"
                      value={formData.dataFim}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-6">

                  <div className="mb-3">
                    <label className="form-label">Hora fim</label>
                    <input
                      type="time"
                      className="form-control"
                      name="horaFim"
                      value={formData.horaFim}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>


              <div className="mb-3">
                <label className="form-label">Quantidade máxima de atividades simultâneas</label>
                <input
                  type="number"
                  className="form-control"
                  name="maxAtividades"
                  value={formData.maxAtividades}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descrição</label>
                <textarea
                  className="form-control"
                  name="descricao"
                  rows="3"
                  placeholder="Descrição do evento"
                  value={formData.descricao}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-link link-secondary" data-bs-dismiss="modal" onClick={resetForm}>
                Cancelar
              </button>
              <button type="button" className="btn btn-primary ms-auto" onClick={handleSubmit} data-bs-dismiss="modal">
                {editingEvent ? "Atualizar evento" : "Criar evento"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <EventList listaEvento={listaEvento} onEdit={handleEdit} />
      </div>
    </div>
  )
}

export default Evento