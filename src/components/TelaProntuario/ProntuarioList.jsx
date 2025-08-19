import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProntuarioCard from './ProntuarioCard';

const ProntuarioList = ({ busca, onVerProntuario, onImprimirProntuario }) => {
    const [prontuarios, setProntuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState("");
    const [horario, setHorario] = useState('');
    const [observacoes, setObservacoes] = useState('');


    useEffect(() => {
        const fetchProntuarios = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8082/cuidarme/api/prontuario/listar');

                const prontuariosFormatados = response.data.map(prontuario => ({
                    id: prontuario.lookupId,
                    nome: prontuario.paciente ? prontuario.paciente.nome : 'Paciente não identificado',
                    infoAdicionais: prontuario.observacoes,
                    dataRegistro: prontuario.data,
                    dadosOriginais: prontuario
                }));
                
                setProntuarios(prontuariosFormatados);

            } catch (err) {
                console.error('Erro ao buscar prontuários:', err);
            } finally {
                setLoading(false); 
            }
        };

        fetchProntuarios();
    }, []);

    const prontuariosFiltrados = prontuarios.filter(p => {
        const buscaLower = busca ? busca.toLowerCase() : '';
        const nome = p.nome ? p.nome.toLowerCase() : '';
        const observacoes = p.infoAdicionais ? p.infoAdicionais.toLowerCase() : '';

        return nome.includes(buscaLower) || observacoes.includes(buscaLower);
    });

    if (loading) {
        return <p>Carregando prontuários...</p>;
    }

    return (
        <div className="prontuarios-grid">
            {prontuariosFiltrados.length === 0 ? (
                <p className="no-prontuarios-message">Nenhum prontuário encontrado.</p>
            ) : (
                prontuariosFiltrados.map((prontuario) => (
                    <ProntuarioCard 
                        key={prontuario.id} 
                        prontuario={prontuario} 
                        onVerClick={onVerProntuario}
                        onImprimirClick={onImprimirProntuario}
                    />
                ))
            )}
        </div>
    );
};

export default ProntuarioList;