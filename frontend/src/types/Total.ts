import type { TotalPessoa } from "./TotalPessoa";

export interface Total {
    totalReceita: number;
    totalDespesa: number;
    totalSaldo: number;
    totaisPessoas: TotalPessoa[];
}