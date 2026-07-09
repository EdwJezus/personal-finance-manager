import { useEffect, useState} from "react";
import api from "../services/api";
import type { Pessoa } from "../types/Pessoa";
import type { Transacao } from "../types/Transacao";
import type { Total } from "../types/Total";
import PessoaList from "../components/Pessoa/PessoaList";
import PessoaForm from "../components/Pessoa/PessoaForm";
import TransacaoList from "../components/Transacao/TransacaoList";
import TransacaoForm from "../components/Transacao/TransacaoForm";
import TotalCard from "../components/Total/TotalCard";
import TotalPessoaList from "../components/Total/TotalPessoaList";
import "./Dashboard.css";

function Dashboard() {

  ///////////////////////////////////////////////////////////
  ////////////////////// ESTADOS /////////////////////////////
  ///////////////////////////////////////////////////////////

  //////////////// PESSOAS /////////////////////////

  // existe uma variavel chamada pessoas
  // ela começa vazia mas obrigatoria sera uma lista de Pessoa
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  // cadastro de pessoas
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);


  ////////////////// TRANSAÇÕES //////////////////////////////

  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState("");
  const [pessoaId, setPessoaId] = useState(0);


  ////////////////// METODOS GERAIS //////////////////////////////

  const [total, setTotal] = useState<Total | null>(null);


  ///////////////////////////////////////////////////////////
  ////////////////////// FUNÇÕES /////////////////////////////
  ///////////////////////////////////////////////////////////

  //////////////// PESSOAS /////////////////////////

  // cadastro de pessoas
  const criarPessoa = async () => {
    const resposta = await api.post("/Pessoa", {
      nome: nome,
      idade: idade
    });

    setNome("");
    setIdade(0);

    alert(resposta.data);

    carregarPessoas();
    carregarTotais();
  };

  // receber pessoas
  const carregarPessoas = async() =>
  {
    // usa GET da api para receber o JSON
    const resposta = await api.get("/Pessoa");

    // guarda resposta em pessoas
    setPessoas(resposta.data);
  };

  // exclusão de pessoas
  const deletarPessoa = async (id: number) => {

    const resposta = await api.delete(`/Pessoa/${id}`);

    alert(resposta.data);

    carregarPessoas();
    carregarTransacoes();
    carregarTotais();
  };


  ////////////////// TRANSAÇÕES //////////////////////////////

  const carregarTransacoes = async () => {
    const resposta = await api.get("/Transacao");

    setTransacoes(resposta.data);
  };

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
    carregarTotais();
  };


  ////////////////// METODOS GERAIS //////////////////////////////

  const carregarTotais = async () => {

    const resposta = await api.get("/Total");

    setTotal(resposta.data);

  };


  ///////////////////////////////////////////////////////////
  ////////////////////// USE EFFECT //////////////////////////
  ///////////////////////////////////////////////////////////

  // execute uma vez quando a pagina abrir
  useEffect(() => {

    carregarPessoas();
    carregarTransacoes();
    carregarTotais();

  }, []);


  ///////////////////////////////////////////////////////////
  /////////////////////// RETURN /////////////////////////////
  ///////////////////////////////////////////////////////////


  return (
    <>
        <h1>Sistema Financeiro</h1>

        {/* =============PESSOA LISTAGEM E EXCLUSÃO=============== */}
        
        <fieldset>
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
        </fieldset>

        {/* =================TRANSAÇÃO LISTAGEM=================== */}

        <fieldset>
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
        </fieldset>

        {/* =================LISTAGEM GERAL=================== */}

        <fieldset>
            <h2>Resumo Geral</h2>

            {total && (
                <>
                    <TotalCard total={total} />

                    <TotalPessoaList
                        totalPessoas={total.totaisPessoas}
                        pessoas={pessoas}
                    />
                </>
            )}
        </fieldset>

        </>
    );
    }

export default Dashboard;