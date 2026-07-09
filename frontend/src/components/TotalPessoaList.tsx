import type { TotalPessoa } from "../types/TotalPessoa";
import type { Pessoa } from "../types/Pessoa";

interface Props {
    totalPessoas: TotalPessoa[];
    pessoas: Pessoa[];
}

function TotalPessoaList({ totalPessoas, pessoas }: Props) {

    return (
        <>
            {totalPessoas.map((totalPessoa) => {

                const pessoa = pessoas.find(
                    (p) => p.id === totalPessoa.id
                );

                return (
                    <div key={totalPessoa.id}>

                        <p>Pessoa: {pessoa?.nome}</p>

                        <p>Pessoa Receita: {totalPessoa.pessoaReceita}</p>

                        <p>Pessoa Despesa: {totalPessoa.pessoaDespesa}</p>

                        <p>Pessoa Saldo: {totalPessoa.pessoaSaldo}</p>

                    </div>
                );
            })}
        </>
    );
}

export default TotalPessoaList;