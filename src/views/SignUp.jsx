"use client"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Save, Eye, EyeOff } from "lucide-react"
import logo from "../assets/fundolongo1.png"

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nome, setNome] = useState("")
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const clearError = (e) => {
    e?.preventDefault()
    setError(null)
  }

  const clearSuccess = (e) => {
    e?.preventDefault()
    setSuccessMessage("")
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage("")
    setLoading(true)

    try {
      let url = ""
      switch (role) {
        case "1":
          url = "organizador"
          break
        case "2":
          url = "participante"
          break
        case "3":
          url = "palestrante"
          break
        default:
          throw new Error("Selecione um papel para continuar")
      }

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          senha: password,
          email,
          role,
        }),
      }

      const response = await fetch(`http://localhost:8080/${url}`, options)
      const data = await response.text()

      if (!response.ok) {
        throw new Error(data || "Erro ao criar conta")
      }

      localStorage.setItem("userToken", data.token)
      localStorage.setItem(
        "userData",
        JSON.stringify({
          nome,
          senha: password,
          email,
          role,
        }),
      )

      setSuccessMessage("Conta criada com sucesso! Redirecionando para o login...")
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row g-0 flex-fill">
      <div className="col-12 col-lg-6 col-xl-4 border-top-wide border-primary d-flex flex-column justify-content-center">
        <div className="container container-tight my-5 px-lg-5">
          <div className="text-center mb-4">
            <a href="#" className="navbar-brand navbar-brand-autodark">
              <img src={logo || "/placeholder.svg"} alt="Planeja aí" />
            </a>
          </div>
          <h2 className="h3 text-center mb-3">Crie sua conta</h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              <div className="d-flex justify-content-between align-items-center">
                <div>{error}</div>
                <button type="button" className="btn-close" onClick={clearError} aria-label="Fechar"></button>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success" role="alert">
              <div className="d-flex justify-content-between align-items-center">
                <div>{successMessage}</div>
                <button type="button" className="btn-close" onClick={clearSuccess} aria-label="Fechar"></button>
              </div>
            </div>
          )}

          <form method="get" autoComplete="off" noValidate onSubmit={handleSignUp}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Senha</label>
              <div className="input-group input-group-flat">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="off"
                  disabled={loading}
                />
                <span className="input-group-text">
                  <a
                    href="#"
                    className="link-secondary"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowPassword(!showPassword)
                    }}
                    title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </a>
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Qual será o seu papel no evento?</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                disabled={loading}
              >
                <option value="">Selecione</option>
                <option value="1">Organizar</option>
                <option value="2">Participar</option>
                <option value="3">Palestrar</option>
              </select>
            </div>

            <div className="form-footer">
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Criando conta...
                  </>
                ) : (
                  <>
                    <Save size={16} className="me-2" />
                    Criar conta
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="text-center text-secondary mt-3">
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6 col-xl-8 d-none d-lg-block">
        <div className="bg-cover h-100 min-vh-100" style={{ backgroundImage: "url(/img/imagem_signup2.jpg)" }}></div>
      </div>
    </div>
  )
}

export default SignUp
