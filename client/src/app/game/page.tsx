import { Metadata } from "next";
import BlurFade from "@/components/ui/blur-fade";

export const metadata: Metadata = {
  title: "Aposte e Diverta-se | Mines",
  description: "...",
};

export default function Game() {
  return (
    <div className="mt-3 px-2 md:px-0">
      <BlurFade inView={true} inViewMargin="-50px" delay={1}>
        <h2 className="font-medium text-xl">Mines</h2>
      </BlurFade>
    </div>
  );
}
