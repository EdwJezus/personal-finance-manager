interface Props {
    titulo: string;
    valor: number;
}

function TotalCard({ titulo, valor }: Props) {

    return (
        <div className="total-card">
            <h3>{titulo}</h3>
            <p>R$ {valor}</p>
        </div>
    );

}

export default TotalCard;