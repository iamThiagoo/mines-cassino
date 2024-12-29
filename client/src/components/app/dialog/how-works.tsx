import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { cn } from "@/lib/utils";

const HowWorksDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>Como funciona?</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Como funciona?</DialogTitle>
          <DialogDescription>
            <p className={cn("mt-1")}>O jogo "Mines" é uma experiência simples e emocionante inspirada em um dos formatos mais populares de cassinos online. No entanto, neste caso, o jogo foi desenvolvido exclusivamente para fins educativos e de entretenimento, ou seja, é totalmente gratuito e não envolve dinheiro real. A ideia é apenas se divertir e aprender com a lógica por trás de jogos interativos.</p>

            <div className={cn("mt-3 border-t border-gray-300")}>
                <h2 className={cn("font-bold text-base mt-2")}>Regras Básicas do Jogo:</h2>
                <p className={cn("text-sm mt-2")}>Exploração do tabuleiro: O tabuleiro consiste em várias células ocultas. Seu objetivo é clicar em células seguras, evitando aquelas que escondem minas.</p>
                <p className={cn("text-sm mt-2")}>Acumulação de pontos: Cada célula segura revela um prêmio fictício (sem valor real). Você pode continuar clicando para acumular mais pontos ou parar e "sair" com sua pontuação a qualquer momento.</p>
                <p className={cn("text-sm mt-2")}>Fim de jogo: Se você clicar em uma célula que contém uma mina, o jogo termina.</p>
            </div>

            <div className={cn("mt-3 border-t border-gray-300")}>
                <h2 className={cn("font-bold text-base mt-2")}>Objetivo do Jogo:</h2>
                <p className={cn("text-sm mt-2")}>O desafio principal é testar sua intuição e estratégia enquanto tenta explorar o máximo de células possíveis sem ativar as minas.</p>
            </div>
            
            <div className={cn("mt-3 border-t border-gray-300")}>
                <h2 className={cn("font-bold text-base mt-2")}>Por que Jogar?</h2>
                <p className={cn("text-sm mt-2")}>Diversão Garantida: É uma maneira leve e divertida de passar o tempo.</p>
                <p className={cn("text-sm mt-2")}>Desenvolvimento de Habilidades: Ajuda a exercitar raciocínio lógico e tomada de decisões.</p>
                <p className={cn("text-sm mt-2")}>Sem Pressão Financeira: Por ser totalmente gratuito e não valer dinheiro, você pode jogar tranquilamente, apenas para se divertir.</p>
            </div>
            
            <div className={cn("pt-3 mt-3 border-t border-gray-300")}>
                <p>Este jogo foi criado como um projeto de aprendizado em desenvolvimento de software, sendo perfeito para quem gosta de jogos estratégicos e interativos. Divirta-se explorando o tabuleiro e descubra até onde sua sorte e estratégia podem levá-lo!</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HowWorksDialog;