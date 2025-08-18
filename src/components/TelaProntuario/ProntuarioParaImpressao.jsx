import './Prontuario.css'
import React, {forwardRef, useImperativeHandle} from 'react';
import logonome from '../../assets/logonome.png';

const ProntuarioParaImpressao = forwardRef(({ dados }, ref) => {
    useImperativeHandle(ref, () => ({
        imprimir() {
            window.print();
        }
    }));

    if(!dados || !dados.paciente) {
        return (
            <div className="print-componente">
                <p>Selecione um paciente e preencha os dados para gerar o prontuário</p>
            </div>
        );
    } 
    const formatarData = (dataStr) => {
    if (!dataStr) return 'N/A';
    const data = new Date(dataStr + '00:00:00'); 
    return data.toLocaleDateString('pt-BR');
  }


    return (
        <div className="print-componente">
            <div id="prontuario-para-impressao">
                <header className="prontuario-header">
                    <img src={logonome} alt="Logo Cuidar.me" className="logo" />
                    <h1>Prontuário do paciente</h1>
                </header>
                <main className="prontuario-body">
                     <section className="info-paciente">
                        <p><strong>Paciente:</strong> {dados.paciente.nome}</p>
                        <p><strong>CPF:</strong> {dados.paciente.cpf}</p>
                        <p><strong>Data da Sessão:</strong> {formatarData(dados.dataRegistro)}</p>
                        <p><strong>Horário:</strong> {dados.horario || 'N/A'}</p>
                    </section>

                    <hr />

                    <section className="detalhes-sessao">
                        <h3>Demanda Principal / Queixa</h3>
                        <p>{dados.demanda || 'Nenhuma informação fornecida.'}</p>
                        <h3>Técnicas Utilizadas e Intervenções</h3>
                        <p>{dados.tecnicasUtilizadas || 'Nenhuma informação fornecida.'}</p>
                        <h3>Informações Adicionais e Evolução</h3>
                        <p>{dados.observacoes || 'Nenhuma informação fornecida.'}</p>
                    </section>
                </main>
                <footer className="prontuario-footer">
                    <p>Profissional Responsável: [Seu Nome Aqui] | CRP: [Seu CRP aqui]</p>
                    <p>Documento gerado em: {new Date().toLocaleString('pt-BR')}</p>
                </footer>
            </div>
        </div>
    )
})

export default ProntuarioParaImpressao;