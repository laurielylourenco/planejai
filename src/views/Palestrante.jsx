"use client"

import { useState, useEffect } from "react"
import EventList from "./EventoList"
import * as bootstrap from "bootstrap"
import PalestranteList from "./PalestranteList"

const Palestrante = () => {
    const [listaPalestrante, setListaPalestrante] = useState([])
    const [editingEvent, setEditingEvent] = useState(null)

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: ""
    })

    useEffect(() => {
        fetchEventos()
    }, [])

    const fetchEventos = () => {
        const options = { method: "GET", headers: { "Content-Type": "application/json" } }

        fetch("http://localhost:8080/palestrante", options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar palestrante")
                }
                return response.json()
            })
            .then((data) => {
                console.log("data: ", data)
                setListaPalestrante(data)
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


    const handleSubmit = () => {
        const formattedData = {
            ...formData
        }

        const url = editingEvent
            ? `http://localhost:4001/updateEvent.php?id=${editingEvent.id}`
            : "http://localhost:8080/palestrante"

        const options = {
            method: editingEvent ? "PUT" : "POST",
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
                console.log('retorno',data)
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
            email: event.email,
            senha: event.senha,
        })
        const modal = new bootstrap.Modal(document.getElementById("modal-team"))
        modal.show()
    }

    const resetForm = () => {
        setFormData({
            nome: "",
            email: "",
            senha: ""
        })
        setEditingEvent(null)
    }

    return (
        <div className="container-xl">
            <div className="row g-2 align-items-center">
                <div className="col">
                    <h2 className="page-title">Palestrante</h2>
                    <div className="text-muted mt-1">Aqui estão seus palestrante cadastrados</div>
                </div>
                <div className="col-auto ms-auto d-print-none">
                    <div className="d-flex">
                        <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-team">
                            <i className="bi bi-plus-lg"></i> Novo Palestrante
                        </a>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modal-team" tabIndex={-1} role="dialog" aria-hidden={true}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{editingEvent ? "Editar Palestrante" : "Novo Palestrante"}</h5>
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
                                <label className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    placeholder="Nome"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="row">
                                <div className="col-6">

                                    <div className="mb-3">
                                        <label className="form-label">Senha</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="senha"
                                            value={formData.senha}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                </div>   
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
             
             <PalestranteList listaPalestrante={listaPalestrante} onEdit={handleEdit}/>
            </div>
        </div>
    )
}

export default Palestrante