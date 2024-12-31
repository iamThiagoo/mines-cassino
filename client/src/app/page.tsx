import UsernameInputGroup from "@/components/layout/input/username-input-group";
import BlurFade from "@/components/ui/blur-fade";
import Image from "next/image";
import Bomb from '@/assets/images/bomb.png';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Embarque nessa Aventura | Mines',
  description: '...',
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center -mt-7">
      <div className="h-auto -mt-7 flex justify-center items-center">
        <Image
          src={Bomb}
          className={`filter-shadow animate-shrink ml-3 sm:ml-3`}
          alt="Logo do app, uma mina."
        />
      </div>
      <div className="text-center justify-center items-center mt-3 px-2 md:px-0">
        <BlurFade
          inView={true}
          inViewMargin="-50px"
          delay={1}
        >
          <h2 className="font-medium text-xl">Mines</h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 sm:mb-4 tracking-tighter mt-2 md:mt-5">
            Explore, arrisque e descubra sua sorte em cada passo!
          </h3>
          <p className="max-w-3xl mx-auto text-sm md:text-lg mb-5 md:mb-8 text-[#a5a5a5] font-medium text-balance">
            Escolha seus blocos com cuidado, desvende prêmios incríveis a cada
            clique e teste sua coragem para avançar ainda mais, mas cuidado: uma
            mina pode encerrar sua sorte.
          </p>
          <UsernameInputGroup />
        </BlurFade>
      </div>
    </div>
  );
}
