const Evento = () => {
    return (

        <div className="row">

            <div className="col-10">

                <h1>Evento</h1>
                <p>Gerencie seus eventos</p>
            </div>
            <div className="col-2">


                <div class="col-auto ms-auto d-print-none">
                    <div class="d-flex">

                        <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-team">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                            Novo evento
                        </a>
                    </div>
                </div>

                <div class="modal modal-blur fade" id="modal-team" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">

                            <div class="modal-body">

                                <div class="mb-3">
                                    <form>

                                        <div>
                                            <label className="form-label">Nome do evento</label>
                                            <input type="text" className="form-control" name="example-text-input" placeholder="Input placeholder" />
                                        </div>

                                        <div>
                                            <label className="form-label">Local do evento</label>
                                            <input type="text" className="form-control" name="example-text-input" placeholder="Input placeholder" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Data inicio </label>
                                            <input type="text" name="input-mask" className="form-control" data-mask="00/00/0000" data-mask-visible="true" placeholder="00/00/0000" autocomplete="off" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Hora inicio</label>
                                            <input type="text" name="input-mask" className="form-control" data-mask="00:00:00" data-mask-visible="true" placeholder="00:00:00" autocomplete="off" />
                                        </div>


                                        <div className="mb-3">
                                            <label className="form-label">Data fim </label>
                                            <input type="text" name="input-mask" className="form-control" data-mask="00/00/0000" data-mask-visible="true" placeholder="00/00/0000" autocomplete="off" />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Hora fim</label>
                                            <input type="text" name="input-mask" className="form-control" data-mask="00:00:00" data-mask-visible="true" placeholder="00:00:00" autocomplete="off" />
                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn me-auto" data-bs-dismiss="modal">Fechar</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Criar evento</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Evento;