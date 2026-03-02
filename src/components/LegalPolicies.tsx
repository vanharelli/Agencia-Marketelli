import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Lock, Eye, CheckCircle } from 'lucide-react';

interface LegalPoliciesProps {
  onBack: () => void;
}

const LegalPolicies = ({ onBack }: LegalPoliciesProps) => {
  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] font-sans selection:bg-[#A020F0] selection:text-white">
      {/* HEADER: SIMPLES E LIMPO */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto w-full flex justify-between items-center">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#A020F0] hover:text-white transition-colors font-bold text-sm uppercase tracking-[2px]"
          >
            <ArrowLeft size={20} /> Voltar
          </button>
          <div className="flex items-center gap-3">
            <img src="/Marketellilogo.webp" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="text-lg font-black tracking-[4px] uppercase">MARKETELLI</span>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-[4px] uppercase text-[#A020F0]">Termos de Uso e Políticas</h1>
          <p className="text-gray-400 text-sm tracking-[2px] uppercase italic">Transparência e Governança de Dados • Versão 2026</p>
        </motion.div>

        <section className="space-y-12">
          {/* 01. Objetivo da Coleta */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-l-4 border-[#A020F0] pl-6">
              <ShieldCheck className="text-[#A020F0]" size={32} />
              <h2 className="text-2xl font-black tracking-[2px] uppercase">01. Objetivo da Coleta</h2>
            </div>
            <p className="text-gray-300 leading-relaxed font-light text-lg">
              A Marketelli coleta informações exclusivamente para realizar o diagnóstico de viabilidade de projetos hoteleiros, turísticos e de serviços. O preenchimento do formulário não garante a contratação, sendo uma etapa prévia de análise técnica obrigatória para garantir a qualidade da nossa entrega.
            </p>
          </div>

          {/* 02. Dados Coletados */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-l-4 border-[#A020F0] pl-6">
              <Eye className="text-[#A020F0]" size={32} />
              <h2 className="text-2xl font-black tracking-[2px] uppercase">02. Dados Coletados</h2>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed font-light text-lg">
              <p>Coletamos apenas as informações necessárias para iniciar o seu atendimento e validar a viabilidade do seu projeto:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <li className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 italic">
                  <div className="w-2 h-2 rounded-full bg-[#A020F0]"></div> Nome Completo
                </li>
                <li className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 italic">
                  <div className="w-2 h-2 rounded-full bg-[#A020F0]"></div> WhatsApp
                </li>
                <li className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 italic">
                  <div className="w-2 h-2 rounded-full bg-[#A020F0]"></div> E-mail Profissional
                </li>
                <li className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 italic">
                  <div className="w-2 h-2 rounded-full bg-[#A020F0]"></div> Dados da Empresa e Negócio
                </li>
              </ul>
            </div>
          </div>

          {/* 03. Finalidade e Redirecionamento */}
          <div className="space-y-6 text-gray-300 leading-relaxed font-light text-lg">
            <div className="flex items-center gap-4 border-l-4 border-[#A020F0] pl-6">
              <CheckCircle className="text-[#A020F0]" size={32} />
              <h2 className="text-2xl font-black tracking-[2px] uppercase">03. Finalidade e Redirecionamento</h2>
            </div>
            <p>
              Estes dados têm uma única finalidade: permitir que nossa diretoria analise o seu perfil empresarial antes do contato direto. Ao clicar em enviar, suas informações são processadas e você é redirecionado automaticamente ao nosso Canal Executivo no WhatsApp para continuidade do atendimento.
            </p>
          </div>

          {/* 04. Tratamento de Informações e Sigilo */}
          <div className="space-y-6 text-gray-300 leading-relaxed font-light text-lg">
            <div className="flex items-center gap-4 border-l-4 border-[#A020F0] pl-6">
              <Lock className="text-[#A020F0]" size={32} />
              <h2 className="text-2xl font-black tracking-[2px] uppercase">04. Tratamento de Informações</h2>
            </div>
            <p>
              Não utilizamos seus dados para envio de spam ou compartilhamento com redes de terceiros. Todas as informações enviadas via portal são criptografadas e tratadas como sigilo comercial, utilizadas exclusivamente para a construção da sua proposta de infraestrutura tecnológica.
            </p>
          </div>

          {/* 05. Responsabilidade Técnica */}
          <div className="space-y-6 text-gray-300 leading-relaxed font-light text-lg">
            <div className="flex items-center gap-4 border-l-4 border-[#A020F0] pl-6">
              <h2 className="text-2xl font-black tracking-[2px] uppercase">05. Responsabilidade Técnica</h2>
            </div>
            <p>
              A Marketelli entrega a infraestrutura e as ferramentas de automação. A gestão estratégica do negócio e o cumprimento das leis locais de cada estabelecimento após a implementação são de responsabilidade integral do proprietário/contratante.
            </p>
          </div>

          {/* 06. Consentimento */}
          <div className="p-8 bg-white/5 border border-[#A020F0]/30 rounded-2xl italic text-center">
            <p className="text-gray-300 text-lg leading-relaxed">
              "Ao prosseguir com o preenchimento, você autoriza o contato da nossa equipe de inteligência para tratar dos detalhes técnicos do seu projeto e análise de viabilidade."
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER: SIMPLES */}
      <footer className="py-12 border-t border-white/10 text-center">
        <p className="text-gray-500 text-xs tracking-[4px] uppercase">
          Seus dados são tratados com sigilo profissional. Marketelli 2026
        </p>
      </footer>
    </div>
  );
};

export default LegalPolicies;