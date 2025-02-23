import { useEffect, useState } from "react"
import EventoListPalestrante from "./EventoListPalestrante"



const EventoPalestrante = () => {

    const [listaEventoP, setListaEventoP] = useState([])

    useEffect(() => {



        const fetchEventosPalestrante = async () => {

            const eventoResponse = await fetch(`http://localhost:4001/getEventoPalestrante.php?id_palestrante=6`)
            const eventoData = await eventoResponse.json()

            console.log('eventoData', eventoData)
            setListaEventoP([eventoData])
        }

        fetchEventosPalestrante()
    }, [])




    return (

        <div className="row">

            <div className="col-12">

                <h1>Evento</h1>
                <p>Lista de eventos</p>


                <EventoListPalestrante listaEvento={listaEventoP} />
            </div>
        </div>

    )
}

export default EventoPalestrante;