import { useState, useEffect } from 'react';
import './ConsultasAgendadas.css';

const RemarcarAgendamento = ({ consulta, onSalvar, onCancelar }) => {
    const [data, setData] = useState('');
    const [horario, setHorario] = useState('');
    const [localidade, setLocalidade] = useState('');
    const [tipo, setTipo] = useState('');

    useEffect(() => {
        const dataObj = new Date(consulta.data);
        const dataISO = dataObj.toISOString().split('T')[0];
        const hora = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        setData(dataISO);
        setHorario(hora);
        setLocalidade(consulta.localidade);
        setTipo(consulta.localidade === 'Online' ? 'online' : 'presencial');
    }, [consulta]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (tipo === 'presencial' && !localidade) {
            alert("Por favor, selecione a localidade para o atendimento presencial.");
            return;
        }
        
        const novaDataHora = `${data}T${horario}:00`;
        const novaLocalidade = tipo === 'presencial' ? localidade : 'Online';

        onSalvar(consulta.lookupId, {
            data: novaDataHora,
            localidade: novaLocalidade,
        });
    };

    return (
        <div className="remarcar-card">
            <form onSubmit={handleSubmit} className="remarcar-form">
                <div className="form-field">
                    <label>Data</label>
                    <input type="date" value={data} onChange={e => setData(e.target.value)} required />
                </div>
                <div className="form-field">
                    <label>Horário</label>
                    <input type="time" value={horario} onChange={e => setHorario(e.target.value)} required />
                </div>
                <div className="form-field">
                    <label>Tipo</label>
                    <select value={tipo} onChange={e => setTipo(e.target.value)} required>
                        <option value="online">Online</option>
                        <option value="presencial">Presencial</option>
                    </select>
                </div>

                {tipo === 'presencial' && (
                    <div className="form-field">
                        <label>Localidade</label>
                        <select 
                            value={localidade} 
                            onChange={e => setLocalidade(e.target.value)} 
                            required
                        >
                            <option value="">Selecione o local</option>
                            <option value="CRAS - Alagoa Grande">CRAS - Alagoa Grande</option>
                            <option value="CRAS - Nova Cruz">CRAS - Nova Cruz</option>
                            <option value="Cuidar e Ser - Campina Grande">Cuidar e Ser - Campina Grande</option>
                        </select>
                    </div>
                )}

                <div className="remarcar-actions">
                    <button type="submit" className="footer-button">Salvar</button>
                    <button type="button" className="footer-button-cancel" onClick={onCancelar}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default RemarcarAgendamento;