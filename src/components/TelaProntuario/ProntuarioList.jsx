import ProntuarioCard from './ProntuarioCard';
import { useState } from 'react';
import './ProntuarioList.css'

const prontuariosData = [
  {
    id: 1,
    nome: 'João Silva Santos',
    data: '14/01/2024',
    tipo: 'Terapia Individual',
    diagnostico: 'Transtorno de Ansiedade Generalizada'
  },
  {
    id: 2,
    nome: 'Maria Oliveira Costa',
    data: '13/01/2024',
    tipo: 'Sessão de Retorno',
    diagnostico: 'Episódio Depressivo Moderado'
  },
  {
    id: 3,
    nome: 'Pedro Almeida Lima',
    data: '12/01/2024',
    tipo: 'Avaliação Psicológica',
    diagnostico: 'Transtorno do Pânico'
  },
  {
    id: 4,
    nome: 'Ana Paula Ferreira',
    data: '11/01/2024',
    tipo: 'Terapia de Casal',
    diagnostico: 'Dificuldades de Relacionamento'
  }
];

const ProntuarioList = () => {
    const [busca] = useState(""); 

     const prontuariosFiltrados = prontuariosData.filter(p =>
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.tipo.toLowerCase().includes(busca.toLowerCase())
    );
    return (
        <div className="prontuarios-grid">
            {prontuariosFiltrados.map((prontuario) => (
                <ProntuarioCard key={prontuario.id} prontuario={prontuario} />
            ))}
        </div>
    );
};
export default ProntuarioList;