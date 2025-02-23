import { useEffect, useState } from "react"
import EventoListPalestrante from "./EventoListPalestrante"



const EventoPalestrante = () => {

    const [listaEventoP, setListaEventoP] = useState([])

    useEffect(() => {



        const fetchEventosPalestrante = async () => {

            const eventoResponse = await fetch(`http://localhost:8080/eventos`)
            const eventoData = await eventoResponse.json()

            console.log('eventoData', eventoData)
            setListaEventoP(eventoData)
        }

        fetchEventosPalestrante()
    }, [])




    return (

        <div className="row">

            <div className="col-12">

                <h1>Evento</h1>
                <p>Lista de eventos 1</p>


                <EventoListPalestrante listaEvento={listaEventoP} />
            </div>
        </div>

    )
}

export default EventoPalestrante;