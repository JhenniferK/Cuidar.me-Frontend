import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

import './ModelosDeclaracoes.css';

const templatesDisponiveis = [
    {
        id: 'prontuario_pessoal',
        titulo: 'Prontuário Pessoal do Paciente',
        categoria: 'Prontuário',
        descricao: 'Modelo para o acompanhamento dos atendimentos psicológicos.',
        conteudoParaImpressao: 'Acompanhamento da evolução psicológica.'
    },
    {
        id: 'declaracao_comparecimento',
        titulo: 'Declaração de Comparecimento',
        categoria: 'Declaração',
        descricao: 'Modelo para declaração de comparecimento à sessão.',
        conteudoParaImpressao: 'Eu, [Nome do Psicólogo], declaro que o paciente [Nome do Paciente] compareceu à consulta no dia XX/XX/XXXX.'
    },
];

const DocumentoParaImpressao = React.forwardRef(({ template }, ref) => (
    <div ref={ref} className="documento-impressao">
        <h1>{template.titulo}</h1>
        <p>{template.conteudoParaImpressao}</p>
        <br /><br />
        <p>_________________________</p>
        <p>Assinatura do Profissional</p>
    </div>
));

const ModeloCard = ({ modelo }) => {
    const componenteParaImprimirRef = useRef();

    const iniciarImpressao = useReactToPrint({
        content: () => componenteParaImprimirRef.current,
        documentTitle: modelo.titulo,
    });
    
    const manipularUsoDoTemplate = () => {
        alert(`Abrindo editor para: ${modelo.titulo}`);
    };

    return (
        <div className="template-card">
            <div style={{ display: 'none' }}>
                <DocumentoParaImpressao ref={componenteParaImprimirRef} template={modelo} />
            </div>

            <div className="template-card-header-modelosDeclaracoes">
                <h2 className="template-titulo">{modelo.titulo}</h2>
                <span className={`template-categoria ${modelo.categoria.toLowerCase()}`}>
                    {modelo.categoria}
                </span>
            </div>

            <p className="template-descricao">{modelo.descricao}</p>

            <div className="template-acoes">
                <button className="botao-usar-template" onClick={manipularUsoDoTemplate}>
                    <FontAwesomeIcon icon={faFileAlt} className="icone-botao" />
                    Usar Template
                </button>
                <button className="botao-imprimir" onClick={iniciarImpressao}>
                    <FontAwesomeIcon icon={faPrint} />
                </button>
            </div>
        </div>
    );
};

function ModelosDeclaracoes() {
    return (
        <div className="tela-container">
            <div className="templates-grade">
                {templatesDisponiveis.map((modelo) => (
                    <ModeloCard key={modelo.id} modelo={modelo} />
                ))}
            </div>
        </div>
    );
}

export default ModelosDeclaracoes;