import type { TotalPessoa } from "../../types/TotalPessoa";
import type { Pessoa } from "../../types/Pessoa";

interface Props {
    totalPessoas: TotalPessoa[];
    pessoas: Pessoa[];
}

function TotalPessoaList({ totalPessoas, pessoas }: Props) {

    return (

        <table>

            <thead>
                <tr>
                    <th>Pessoa</th>
                    <th>Receita</th>
                    <th>Despesa</th>
                    <th>Saldo</th>
                </tr>
            </thead>

            <tbody>

                {totalPessoas.map((totalPessoa) => {

                    const pessoa = pessoas.find(
                        p => p.id === totalPessoa.id
                    );

                    return (

                        <tr key={totalPessoa.id}>

                            <td>{pessoa?.nome}</td>

                            <td>R$ {totalPessoa.pessoaReceita}</td>

                            <td>R$ {totalPessoa.pessoaDespesa}</td>

                            <td>R$ {totalPessoa.pessoaSaldo}</td>

                        </tr>

                    );

                })}

            </tbody>

        </table>

    );

}

export default TotalPessoaList;