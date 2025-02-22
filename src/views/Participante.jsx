import { useEffect, useState } from "react"
import PalestranteList from "./PalestranteList"

const Participante = () => {
    const [listaParticipante, setListaParticipante] = useState([])
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

        fetch("http://localhost:8080/participante", options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar palestrante")
                }
                return response.json()
            })
            .then((data) => {
                console.log("data: ", data)
                setListaParticipante(data)
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

    return (

        <div className="row">

            <div className="col-12">

                <h1>Participantes</h1>
                <p>Participantes page</p>

                <div className="row">
                </div>
            </div>
        </div>

    )
}

export default Participante;