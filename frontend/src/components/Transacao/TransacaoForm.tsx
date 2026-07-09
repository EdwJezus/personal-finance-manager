import type { Pessoa } from "../../types/Pessoa";

interface Props {
    descricao: string;
    setDescricao: (valor: string) => void;

    valor: number | "";
    setValor: (valor: number | "") => void;

    tipo: string;
    setTipo: (valor: string) => void;

    pessoaId: number;
    setPessoaId: (valor: number) => void;

    pessoas: Pessoa[];

    criarTransacao: () => void;
}


function TransacaoForm(props: Props) {

    return (
        <>

        <input
            type="text"
            placeholder="Descricao"
            value={props.descricao}
            onChange={(e) => props.setDescricao(e.target.value)}
        />

        <br></br>

        <input
            type="number"
            placeholder="Valor (R$)"
            value={props.valor}
            onChange={(e) =>
                props.setValor(
                    e.target.value === "" ? "" : Number(e.target.value)
                )
            }
        />

        <br></br>

        <select
            value={props.tipo}
            onChange={(e) => props.setTipo(e.target.value)}
        >

            <option value="">
                Selecione um tipo de transação
            </option>

            <option value="RECEITA">
                Receita
            </option>

            <option value="DESPESA">
                Despesa
            </option>

        </select>

        <br></br>

        <select
            value={props.pessoaId}
            onChange={(e) => props.setPessoaId(Number(e.target.value))}
        >

            <option value="0">
                Selecione uma pessoa
            </option>


            {props.pessoas.map((pessoa) => (

                <option 
                    key={pessoa.id}
                    value={pessoa.id}
                >
                    {pessoa.nome}
                </option>

            ))}


        </select>

        <br></br>

        <button onClick={props.criarTransacao} className="formButton">
            Cadastrar
        </button>

        </>
    );
}

export default TransacaoForm;