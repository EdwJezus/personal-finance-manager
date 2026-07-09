type Props = {
    nome: string;
    idade: number | "";

    setNome: (nome: string) => void;
    setIdade: (valor: number | "") => void;

    criarPessoa: () => void;
};

function PessoaForm({
    nome,
    idade,
    setNome,
    setIdade,
    criarPessoa
}: Props) {

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <br></br>

                <input
                    type="number"
                    placeholder="Idade"
                    value={idade}
                    onChange={(e) => 
                        setIdade(
                            e.target.value === ""
                                ? ""
                                : Number(e.target.value)
                        )
                    }
                />

                <br></br>

                <button onClick={criarPessoa} className="formButton">
                    Cadastrar
                </button>
            </div>

        </>
    );
}

export default PessoaForm;