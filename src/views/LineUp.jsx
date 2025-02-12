const LineUp = () => {
    return (

        <>
            <div className="col-12">
                <div className="p-3">
                    <h2 className="mb-4">Programação do Evento</h2>
                    <ul className="nav nav-tabs mb-3">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                Programação
                            </a>
                        </li>
                    </ul>

                    <h3 className="h5 mb-4">25/11/2024</h3>

                    {/* Schedule Items */}
                    <div className="list-group">
                        <div className="list-group-item">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">10:00 - 12:00</h5>
                                <small className="text-primary">Palestra</small>
                            </div>
                            <p className="mb-1">
                                Abertura Da Semana Do ICE: Iniciativas De IA No ICMC-USP E O Centro De Pesquisa Aplicada Em IA Para
                                Cidades Inteligentes E Sustentáveis
                            </p>
                            <small className="text-muted">Palestra Com André Carlos Ponce de Leon Ferreira de Carvalho</small>
                        </div>

                        <div className="list-group-item">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">14:00 - 15:00</h5>
                                <small className="text-primary">Palestra</small>
                            </div>
                            <p className="mb-1">Desbravando O Caminho: Desafios E Conquistas De Uma Mulher Na Tecnologia</p>
                            <small className="text-muted">Palestra Com Hellen Reis</small>
                        </div>

                        <div className="list-group-item">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">15:00 - 16:30</h5>
                                <small className="text-primary">Mesa-redonda</small>
                            </div>
                            <p className="mb-1">Café Das Minas</p>
                            <small className="text-muted">
                                Mesa-redonda Com Aline de Paula Sotte, Camila Borelli Zeller, Luciana Campos
                            </small>
                        </div>
                    </div>
                </div>
            </div>


        </>


    )

}

export default LineUp;