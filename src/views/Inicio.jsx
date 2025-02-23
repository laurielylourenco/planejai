import React from 'react';

const Inicio = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 text-center">
                    <h1>Bem-vindo ao Planeja aí!</h1>
                    <p className="lead">Nosso sistema foi desenvolvido para organização eventos de forma prática.

                    </p>
                    
                    <div className="mt-4">
                        <h3>O que você pode fazer:</h3>
                        <ul className="list-unstyled">
                            <li><strong>Organizar eventos</strong> - Crie e gerencie eventos com facilidade.</li>
                            <li><strong>Participar de eventos</strong> - Registre sua participação em eventos que mais te interessam.</li>
                            <li><strong>Visualizar detalhes</strong> - Acesse todas as informações sobre os eventos em um só lugar.</li>
                        </ul>
                    </div>

                    <p className="mt-4">Explore o sistema e aproveite todas as funcionalidades para otimizar a sua experiência na gestão de eventos!</p>
                </div>
            </div>
        </div>
    );
}

export default Inicio;
