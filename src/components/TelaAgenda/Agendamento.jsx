import { useState } from "react";
import Agenda from './Agenda';
import NovoAgendamento from "./NovoAgendamento";
import ConsultasAgendadas from "./ConsultasAgendadas";

const Agendamento = () => {
    const [abaAtiva, setAbaAtiva] = useState("novo");

    return (
        <div className="page-container">
            <Agenda 
                abaAtiva={abaAtiva}
                onMudarAba={setAbaAtiva} 
            />
            <main>
                {abaAtiva === 'novo' && <NovoAgendamento />}
                {abaAtiva === 'consultas' && <ConsultasAgendadas />}
            </main>
        </div>
    );
};

export default Agendamento;