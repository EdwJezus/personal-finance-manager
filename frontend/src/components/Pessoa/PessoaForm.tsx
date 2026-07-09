type Props = {
    nome: string;
    idade: number;

    setNome: (nome: string) => void;
    setIdade: (idade: number) => void;

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

            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <input
                type="number"
                placeholder="Idade"
                value={idade}
                onChange={(e) => setIdade(Number(e.target.value))}
            />

            <button onClick={criarPessoa}>
                Cadastrar
            </button>

        </>
    );
}

export default PessoaForm;