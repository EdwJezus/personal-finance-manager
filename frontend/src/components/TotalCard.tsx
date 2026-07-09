import type { Total } from "../types/Total";

interface Props {
    total: Total | null;
}

function TotalCard({ total }: Props) {

    if (!total) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <div>

                <p>Total Receita: {total.totalReceita}</p>

                <p>Total Despesa: {total.totalDespesa}</p>

                <p>Total Saldo: {total.totalSaldo}</p>

            </div>
        </>
    );
}

export default TotalCard;