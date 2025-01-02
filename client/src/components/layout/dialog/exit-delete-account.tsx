'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ExitDeleteAccountDialog = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleExitDeleteAccount = async () => {
    try {
      const userId = getCookie("userId");
      const token = getCookie("token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar conta.");
      }

      ['userId', 'balance', 'username', 'token'].forEach(cookie => deleteCookie(cookie));
      toast({title: "Conta deletada com sucesso!"});
      router.push('/');
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      toast({
        variant: "destructive",
        title: "Opsss... Algo deu errado!",
        description: "Não foi possível sair e deletar sua conta. Tente novamente!",
      });
    }
  };

  if (!isClient) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-red-400 flex items-center gap-x-2 hover:text-red-300 rounded-sm py-2 transition-all duration-200">
        Sair
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="hidden md:block size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
          />
        </svg>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Sua conta será permanentemente
            deletada, e todos os seus "ganhos" serão removidos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleExitDeleteAccount()} className="bg-red-700">
            Sair e Deletar Conta
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExitDeleteAccountDialog;
