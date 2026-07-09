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
import iconeHeader from "../assets/icons/header.png";

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
    const [idade, setIdade] = useState<number | "">("");


    ////////////////// TRANSAÇÕES //////////////////////////////

    const [transacoes, setTransacoes] = useState<Transacao[]>([]);

    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState<number | "">("");
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
        idade: Number(idade)
        });

        setNome("");
        setIdade("");

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
            valor: Number(valor),
            tipo,
            pessoaId
        });

        setDescricao("");
        setValor("");
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
        <header className="navbar">

            <div className="logo">

                <img
                    src={iconeHeader}
                    alt="Logo"
                />

                <h1>Sistema de Controle de Gastos Residenciais</h1>

            </div>

        </header>

        {/* =============PESSOA LISTAGEM E EXCLUSÃO=============== */}
        
        <div className="container">

            <div className="colunaPessoa">

                <fieldset className="cardListarPessoas">

                    <h2>Pessoas</h2>

                    <div className="listapessoas-scroll">

                        <PessoaList
                            pessoas={pessoas}
                            deletarPessoa={deletarPessoa}
                        />

                    </div>

                </fieldset>

                {/* =================PESSOA CADASTRO=================== */}

                <fieldset>
                    <h2>Cadastrar Pessoa</h2>

                    <PessoaForm
                        nome={nome}
                        idade={idade}
                        setNome={setNome}
                        setIdade={setIdade}
                        criarPessoa={criarPessoa}
                    />
                </fieldset>
            </div>

            <fieldset className="fieldsetResumo">
                {/* =================LISTAGEM GERAL=================== */}
            
                <h2>Resumo Geral</h2>

                {total && (
                    <>
                        <div className="cards-resumo">

                            <TotalCard
                                titulo="Receitas"
                                valor={total.totalReceita}
                            />

                            <TotalCard
                                titulo="Despesas"
                                valor={total.totalDespesa}
                            />

                            <TotalCard
                                titulo="Saldo"
                                valor={total.totalSaldo}
                            />

                        </div>

                        <div className="listatotal-scroll">
                            <TotalPessoaList
                                totalPessoas={total.totaisPessoas}
                                pessoas={pessoas}
                            />
                        </div>

                    </>
                )}
            </fieldset>

            <fieldset className="fieldsetTransacoes">
                {/* =================TRANSAÇÃO LISTAGEM=================== */}

                <h2>Transações</h2>
                
                <div className="listatransacoes-scroll">
                    <TransacaoList
                        transacoes={transacoes}
                        pessoas={pessoas}
                    />
                </div>

                {/* =================TRANSAÇÃO CADASTRO=================== */}

                <h2 className="cadastrarTransacao">Cadastrar Transação</h2>

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


        </div>

        </>
    );
    }

export default Dashboard;