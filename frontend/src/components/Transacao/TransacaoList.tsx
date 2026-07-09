import type { Transacao } from "../../types/Transacao";
import type { Pessoa } from "../../types/Pessoa";

interface Props {
    transacoes: Transacao[];
    pessoas: Pessoa[];
}

function TransacaoList({ transacoes, pessoas }: Props) {

    return (

        <table>

            <thead>

                <tr>
                    <th>Pessoa</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Tipo</th>
                </tr>
            </thead>

            <tbody>

                {transacoes.map((transacao) => {

                    const pessoa = pessoas.find(
                        p => p.id === transacao.pessoaId
                    );

                    return (
                        <tr key={transacao.id}>

                            <td>{pessoa?.nome}</td>

                            <td>{transacao.descricao}</td>

                            <td>R$ {transacao.valor}</td>

                            <td>{transacao.tipo}</td>

                        </tr>
                    );

                })}

            </tbody>

        </table>
    );
}

export default TransacaoList;