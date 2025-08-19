import { useState } from "react"; 
import Prontuario from "./Prontuario";
import ModelosDeclaracoes from './ModelosDeclaracoes';
import ProntuarioList from "./ProntuarioList"; 

const BotoesProntuario = () => {
    const [abaAtiva, setAbaAtiva] = useState("novo");

    return (
        <div className="pagina-container">
            <Prontuario 
                abaAtiva={abaAtiva}
                onMudarAba={setAbaAtiva} 
            />
            <main>
                {abaAtiva === 'novo' && <ProntuarioList />}
                {abaAtiva === 'modelosDeclaracoes' && <ModelosDeclaracoes />}
            </main>
        </div>
    );
};

export default BotoesProntuario;