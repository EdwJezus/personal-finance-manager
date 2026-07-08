import { useEffect, useState} from "react";
import api from "./services/api";
import type { Pessoa } from "./types/Pessoa";
import PessoaList from "./components/PessoaList";
import PessoaForm from "./components/PessoaForm";

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

      <PessoaList
          pessoas={pessoas}
          deletarPessoa={deletarPessoa}
      />

      {/* =================CADASTRO=================== */}

      <h2>Cadastrar Pessoa</h2>

      <PessoaForm
          nome={nome}
          idade={idade}
          setNome={setNome}
          setIdade={setIdade}
          criarPessoa={criarPessoa}
      />

    </>
  );
}

export default App;