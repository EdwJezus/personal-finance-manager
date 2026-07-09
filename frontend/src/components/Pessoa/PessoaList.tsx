import type { Pessoa } from "../types/Pessoa";

type Props = {
    pessoas: Pessoa[];
    deletarPessoa: (id: number) => void;
};

function PessoaList({ pessoas, deletarPessoa }: Props) {

    return (
        <>
            {pessoas.map((pessoa) => (

                <div key={pessoa.id}>

                    <h3>{pessoa.nome}</h3>

                    <p>Idade: {pessoa.idade}</p>

                    <p>Id: {pessoa.id}</p>

                    <button onClick={() => deletarPessoa(pessoa.id)}>
                        Excluir
                    </button>

                </div>

            ))}
        </>
    );
}

export default PessoaList;