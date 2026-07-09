import { useEffect, useState} from "react";
import api from "./services/api";
import type { Pessoa } from "./types/Pessoa";
import type { Transacao } from "./types/Transacao";
import PessoaList from "./components/PessoaList";
import PessoaForm from "./components/PessoaForm";
import TransacaoList from "./components/TransacaoList";
import TransacaoForm from "./components/TransacaoForm";

function App() {

  //////////////// PESSOAS /////////////////////////

  // existe uma variavel chamada pessoas
  // ela começa vazia mas obrigatoria sera uma lista de Pessoa
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  // cadastro de pessoas
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);
  const criarPessoa = async () => {
    const resposta = await api.post("/Pessoa", {
      nome: nome,
      idade: idade
    });

    setNome("");
    setIdade(0);

    alert(resposta.data);

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
    carregarTransacoes();

  }, []);

  // exclusão de pessoas
  const deletarPessoa = async (id: number) => {

    const resposta = await api.delete(`/Pessoa/${id}`);

    alert(resposta.data);

    carregarPessoas();
    carregarTransacoes();
  };

  ////////////////// TRANSAÇÕES //////////////////////////////
  
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  const carregarTransacoes = async () => {
    const resposta = await api.get("/Transacao");

    setTransacoes(resposta.data);
  };

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState("");
  const [pessoaId, setPessoaId] = useState(0);

  const criarTransacao = async () => {

    const resposta = await api.post("/Transacao", {
        descricao,
        valor,
        tipo,
        pessoaId
    });

    setDescricao("");
    setValor(0);
    setTipo("");
    setPessoaId(0);

    alert(resposta.data);

    carregarTransacoes();
  };

  ///////////////////////////////////////////////////////////
  //////////////////// RETURN ///////////////////////////////
  ///////////////////////////////////////////////////////////


  return (
    <>
      {/* =============PESSOA LISTAGEM E EXCLUSÃO=============== */}

      <h1>Sistema Financeiro</h1>

      <h2>Listar Pessoas</h2>

      <PessoaList
          pessoas={pessoas}
          deletarPessoa={deletarPessoa}
      />

      {/* =================PESSOA CADASTRO=================== */}

      <h2>Cadastrar Pessoa</h2>

      <PessoaForm
          nome={nome}
          idade={idade}
          setNome={setNome}
          setIdade={setIdade}
          criarPessoa={criarPessoa}
      />

      {/* =================TRANSAÇÃO LISTAGEM=================== */}

      <h2>Listar Transações</h2>

      <TransacaoList
          transacoes={transacoes}
      />

      {/* =================TRANSAÇÃO CADASTRO=================== */}

      <h2>Cadastrar Transações</h2>

      <TransacaoForm
          descricao={descricao}
          setDescricao={setDescricao}

          valor={valor}
          setValor={setValor}

          tipo={tipo}
          setTipo={setTipo}

          pessoaId={pessoaId}
          setPessoaId={setPessoaId}

          pessoas={pessoas}

          criarTransacao={criarTransacao}
      />

    </>
  );
}

export default App;