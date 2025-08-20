import ProntuarioCard from './ProntuarioCard';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './ProntuarioList.css'

const ProntuarioList = ({ busca, onVerProntuario, onImprimirProntuario }) => {

    const [prontuarios, setProntuarios] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8082/cuidarme/api/prontuario/listar')
            .then(response => {
                setProntuarios(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar a lista de prontuários:", error);
            });
    }, []); 

    const prontuariosFiltrados = prontuarios.filter(p =>
        p.paciente && p.paciente.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.tipoAtendimento && p.tipoAtendimento.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="prontuarios-grid">
            {prontuariosFiltrados.map((prontuario) => (
                <ProntuarioCard 
                key={prontuario.id} 
                prontuario={prontuario} 
                onVerClick={onVerProntuario}
                onImprimirClick={onImprimirProntuario}
                />
            ))}
        </div>
    );
};
export default ProntuarioList;