import type { Pessoa } from "../types/Pessoa";

interface Props {
    descricao: string;
    setDescricao: (valor: string) => void;

    valor: number;
    setValor: (valor: number) => void;

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


        <input
            type="number"
            placeholder="Valor"
            value={props.valor}
            onChange={(e) => props.setValor(Number(e.target.value))}
        />


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


        <button onClick={props.criarTransacao}>
            Cadastrar
        </button>

        </>
    );
}

export default TransacaoForm;