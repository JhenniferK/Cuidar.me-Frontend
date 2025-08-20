import { useState } from "react"; 
import Prontuario from "./Prontuario";

const BotoesProntuario = () => {
    const [abaAtiva, setAbaAtiva] = useState("novo");

    return (
        <div className="pagina-container">
            <Prontuario 
                abaAtiva={abaAtiva}
                onMudarAba={setAbaAtiva} 
            />
        </div>
    );
};

export default BotoesProntuario;