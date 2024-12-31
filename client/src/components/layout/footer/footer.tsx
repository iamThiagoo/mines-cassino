import BlurFade from "@/components/ui/blur-fade";

const Footer = () => {
  return (
    <footer className="text-gray-200 text-center absolute w-full bottom-1 sm:bottom-2 mt-10 text-sm md:text-base">
      <BlurFade inView={true} inViewMargin="-50px" delay={1}>
        ✌️ Created by{" "}
        <a
          href="https://github.com/iamThiagoo"
          target="_blank"
          className="text-sky-500 hover:text-sky-300 transition-all duration-200"
        >
          @iamThiagoo
        </a>
      </BlurFade>
    </footer>
  );
};

export default Footer;
