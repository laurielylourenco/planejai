import { useState, useEffect } from "react"

const CriarAtividade = ({ eventoId, data, atividadeParaEditar, onAtividadeCriada, onAtividadeAtualizada }) => {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    capacidadeMaxima: "",
    duracao: "",
    tipo_atividade: "",
    hora: "",
  })

  useEffect(() => {
    if (atividadeParaEditar) {
      const [data, hora] = atividadeParaEditar.data.split(" ")
      setFormData({
        nome: atividadeParaEditar.nome,
        descricao: atividadeParaEditar.descricao,
        capacidadeMaxima: atividadeParaEditar.capacidadeMaxima,
        duracao: atividadeParaEditar.duracao,
        tipo_atividade: atividadeParaEditar.tipo_atividade,
        hora: hora.substring(0, 5),
      })
    }
  }, [atividadeParaEditar])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    try {
      const dataCompleta = `${data}T${formData.hora}:00`
      let res = formData
      const dadosParaEnviar = {
        ...formData,
        data: dataCompleta,
        eventoId: eventoId,
      }


      const url = atividadeParaEditar
        ? `http://localhost:4001/updateAtividade.php?id=${atividadeParaEditar.id}`
        : "http://localhost:8080/atividade"

      //
      const method = atividadeParaEditar ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosParaEnviar),
      })

      if (!response.ok) {
        throw new Error(atividadeParaEditar ? "Erro ao atualizar atividade" : "Erro ao criar atividade")
      }

     // const responseData = await response.json()

      // Limpar o formulário
      setFormData({
        nome: "",
        descricao: "",
        capacidadeMaxima: "",
        duracao: "",
        tipo_atividade: "",
        hora: "",
      })

      // Chamar o callback apropriado
      if (atividadeParaEditar) {
        onAtividadeAtualizada?.(dadosParaEnviar)
      } else {
        onAtividadeCriada?.(dadosParaEnviar)
      }
    } catch (error) {
      console.error("Erro:", error)
      alert(error.message)
    }
  }

  return (
    <div className="modal fade" id="modal-atividade" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{atividadeParaEditar ? "Editar Atividade" : "Nova Atividade"}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Nome da Atividade</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descrição</label>
              <textarea
                className="form-control"
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                rows="3"
              ></textarea>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Horário</label>
                  <input
                    type="time"
                    className="form-control"
                    name="hora"
                    value={formData.hora}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Duração (minutos)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="duracao"
                    value={formData.duracao}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Capacidade Máxima</label>
                  <input
                    type="number"
                    className="form-control"
                    name="capacidadeMaxima"
                    value={formData.capacidadeMaxima}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Tipo de Atividade</label>
                  <select
                    className="form-select"
                    name="tipo_atividade"
                    value={formData.tipo_atividade}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="PALESTRA">Palestra</option>
                    {/*        <option value="Workshop">Workshop</option>
                    <option value="Mesa Redonda">Mesa Redonda</option> */}
                    <option value="MINICURSO">Curso</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-link link-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="button" className="btn btn-primary ms-auto" onClick={handleSubmit}>
              {atividadeParaEditar ? "Atualizar" : "Criar"} Atividade
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CriarAtividade

