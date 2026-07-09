import type { Pessoa } from "../../types/Pessoa";
import iconeDeletar from "../../assets/icons/deletar.png";
import iconePessoa from "../../assets/icons/pessoa.png";

type Props = {
    pessoas: Pessoa[];
    deletarPessoa: (id: number) => void;
};

function PessoaList({ pessoas, deletarPessoa }: Props) {

    return (
        <>
            {pessoas.map((pessoa) => (

                <fieldset className="cardPessoa" key={pessoa.id}>

                    <div className="infoPessoa">

                        <img src={iconePessoa} alt="iconePessoa" className="iconePessoa"/>

                        <div>

                            <h3>{pessoa.nome}</h3>

                            <p>Idade: {pessoa.idade}</p>

                        </div>

                    </div>

                    <div>

                        <button onClick={() => deletarPessoa(pessoa.id)} className="buttonDeletar">
                            <img src={iconeDeletar} alt="iconeDeletar"/>
                        </button>

                    </div>

                    
                </fieldset>

            ))}
        </>
    );
}

export default PessoaList;