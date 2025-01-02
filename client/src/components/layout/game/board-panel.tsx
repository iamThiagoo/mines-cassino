import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ShimmerButton from "@/components/ui/shimmer-button";
import CurrencyInput from "../input/currency-input";

const BoardPanel = () => {
  return (
    <section className="px-3 pt-2 border-r border-gray-600">
      <div className="grid w-full max-w-full items-center gap-1.5">
        <Label htmlFor="bet" className="mb-2">Valor da Aposta</Label>
        <CurrencyInput />
      </div>

      <ShimmerButton className="shadow-2xl mt-6">
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          Iniciar Aposta
        </span>
      </ShimmerButton>

      <ShimmerButton className="shadow-2xl mt-4">
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          Encerrar Aposta - USD 2.32
        </span>
      </ShimmerButton>
    </section>
  );
};

export default BoardPanel;
