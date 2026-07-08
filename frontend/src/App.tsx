import { useEffect, useState} from "react";
import api from "./services/api";
import type { Pessoa } from "./types/Pessoa";

function App() {

  // existe uma variavel chamada pessoas
  // ela começa vazia mas obrigatoria sera uma lista de Pessoa
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  // cadastro de pessoas
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);
  const criarPessoa = async () => {
    await api.post("/Pessoa", {
      nome: nome,
      idade: idade
    });

    setNome("");
    setIdade(0);

    carregarPessoas();
  };

  // receber pessoas
  const carregarPessoas = async() =>
  {
    // usa GET da api para receber o JSON
    const resposta = await api.get("/Pessoa");

    // guarda resposta em pessoas
    setPessoas(resposta.data);
  };

  // execute uma vez quando a pagina abrir
  useEffect(() => {

    carregarPessoas();

  }, []);

  // exclusão de pessoas
  const deletarPessoa = async (id: number) => {

    await api.delete(`/Pessoa/${id}`);

    carregarPessoas();
  };

  //////////////////// RETURN ///////////////////////////////

  return (
    <>
      {/* =============LISTAGEM E EXCLUSÃO=============== */}

      <h1>Sistema Financeiro</h1>

      {pessoas.map((pessoa) => (

        <div key={pessoa.id}>

          <h3>{pessoa.nome}</h3>

          <p>Idade: {pessoa.idade}</p>

          <button onClick={() => deletarPessoa(pessoa.id)}>
            Excluir
          </button>

        </div>

      ))}

      {/* =================CADASTRO=================== */}

      <h2>Cadastrar Pessoa</h2>

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

export default App;