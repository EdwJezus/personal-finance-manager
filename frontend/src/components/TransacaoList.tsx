import type { Transacao } from "../types/Transacao";

interface Props {
    transacoes: Transacao[];
}

function TransacaoList({ transacoes }: Props) {

    return (
        <>
            {transacoes.map((transacao) => (

                <div key={transacao.id}>

                    <h3>{transacao.descricao}</h3>

                    <p>Valor: R$ {transacao.valor}</p>

                    <p>{transacao.tipo}</p>

                    <p>Pessoa ID: {transacao.pessoaId}</p>

                </div>

            ))}

        </>
    );
}

export default TransacaoList;