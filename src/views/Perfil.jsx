import { useState, useEffect } from "react"
import { User, Mail, Lock, Save } from "lucide-react"
import { Navigate, useNavigate } from "react-router-dom"

const Perfil = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [formData, setFormData] = useState({
    role : "",
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  })

  useEffect(() => {
    const storedData = localStorage.getItem("userData")

    if (storedData) {
      try {
        const userData = JSON.parse(storedData)
        setFormData((prev) => ({
          ...prev,
          nome: userData.nome || "",
          email: userData.email || "",
          senha: "",
          confirmarSenha: "",
          role : userData.tipo_usuario,
        }))
      } catch (error) {
        console.error("Erro ao parsear dados do localStorage:", error)
        setError("Erro ao carregar dados do perfil")
      }
    }
    setLoading(false)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage("")

    // Validações
    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem")
      return
    }

    try {
      setSaving(true)

      const dataToSend = {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha || undefined, // Só envia a senha se foi preenchida
      }

      const url =  formData.role == "ORGANIZADOR" ? "http://localhost:8080/organizador" : "http://localhost:8080/palestrante"

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "insomnia/10.1.1",
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar perfil")
      }

      // Atualiza o localStorage com os novos dados
      const updatedUserData = {
        ...JSON.parse(localStorage.getItem("userData") || "{}"),
        nome: formData.nome,
        email: formData.email,
      }
      localStorage.setItem("userData", JSON.stringify(updatedUserData))

      setSuccessMessage("Perfil atualizado com sucesso!")

      setFormData((prev) => ({
        ...prev,
        senha: "",
        confirmarSenha: "",
      }))

      navigate(-1);
    } catch (error) {
      setError("Erro ao atualizar perfil: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container-xl">
        <div className="card">
          <div className="card-body text-center p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-xl">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Perfil do Usuário</h3>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="form-label">Nome</label>
              <div className="input-group">
                <span className="input-group-text">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  disabled
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Nova Senha</label>
              <div className="input-group">
                <span className="input-group-text">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  className="form-control"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  placeholder="Deixe em branco para manter a senha atual"
                />
              </div>
              <small className="form-text text-muted">
                Mínimo de 6 caracteres. Deixe em branco se não quiser alterar.
              </small>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Confirmar Nova Senha</label>
              <div className="input-group">
                <span className="input-group-text">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  className="form-control"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleInputChange}
                  placeholder="Confirme a nova senha"
                />
              </div>
            </div>

            <div className="form-footer">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save size={16} className="me-2" />
                    Atualizar Perfil
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Perfil

