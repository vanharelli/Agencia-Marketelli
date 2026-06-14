import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Hotel, Utensils, Instagram, Check, Mail, X, ChevronRight, Plus, ChevronLeft,
  Star, MessageCircle, Car, ChevronDown, ArrowUpRight, Bot, Clock, Target,
  ShieldCheck, Sparkles, Menu,
} from 'lucide-react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LegalPolicies from './components/LegalPolicies';
import { useFrontendShield } from './hooks/useFrontendShield';
import { useDoubleBackExit } from './hooks/useDoubleBackExit';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useReveal } from './hooks/useReveal';
import HeroCanvas from './components/HeroCanvas';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import CountUp from './components/CountUp';
import TiltCard from './components/ui/TiltCard';
import { MagneticButton } from './components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

// Conversão Google Ads de forma type-safe (sem poluir o escopo global).
const fireConversion = () => {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'conversion', { send_to: 'AW-17787868153/INSIRA_O_ROTULO_AQUI' });
  }
};

const PartnerImage = ({ src, alt, name, role }: { src: string; alt: string; name: string; role: string }) => {
  return (
    <div className="w-full relative group flex flex-col items-center" data-cursor="hover">
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#A020F0]/30 to-[#D18CFF]/10 rounded-full blur-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative z-10 aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 group-hover:border-[#A020F0]/60 transition-colors duration-500">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-all duration-700 scale-105 grayscale group-hover:grayscale-0 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
      <div className="mt-4 text-center z-10">
        <h4 className="text-white font-black tracking-[2px] text-sm uppercase">{name}</h4>
        <p className="text-[#A020F0] text-[10px] font-bold tracking-[1px] uppercase">{role}</p>
      </div>
    </div>
  );
};

const MarketelliOfficial = () => {
  const [ready, setReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useFrontendShield();
  useDoubleBackExit(isModalOpen, () => setIsModalOpen(false));
  useSmoothScroll(ready);
  const revealScope = useReveal<HTMLDivElement>([ready]);

  const [currentPage, setCurrentPage] = useState<'home' | 'policies'>('home');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const [modalStep, setModalStep] = useState(1);
  const [selectedSectorData, setSelectedSectorData] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '', whatsapp: '', email: '', website: '', instagram: '', details: '',
  });
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherSector, setOtherSector] = useState('');
  const [activeComment, setActiveComment] = useState(0);
  const { scrollY } = useScroll();
  const formScrollRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const openModal = () => { setMenuOpen(false); setModalStep(1); setIsModalOpen(true); };
  const goTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { label: 'Soluções', id: 'setores' },
    { label: 'Diferenciais', id: 'diferenciais' },
    { label: 'Equipe', id: 'equipe' },
    { label: 'Depoimentos', id: 'depoimentos' },
  ];

  // Trava o scroll do fundo enquanto o menu mobile está aberto.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [menuOpen]);

  // ---- Hero kinetic intro (após o preloader) ----
  const heroRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!ready) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set('.hero-anim', { opacity: 1, y: 0 });
        gsap.set('.hero-word', { yPercent: 0, opacity: 1 });
        return;
      }
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from('.hero-word', {
        yPercent: 120, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.09,
      })
        .from('.hero-anim', { y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15 }, '-=0.5');
    }, heroRef);
    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    const checkScroll = () => {
      if (formScrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = formScrollRef.current;
        setShowScrollHint(scrollHeight > clientHeight && scrollTop + clientHeight < scrollHeight - 20);
      }
    };
    const scrollElement = formScrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    return () => {
      if (scrollElement) scrollElement.removeEventListener('scroll', checkScroll);
    };
  }, [modalStep, isModalOpen]);

  const liveComments = [
    { text: "Eu perdia muita venda de passeio à noite. Com o sistema da Marketelli, acordei com 3 vouchers vendidos de madrugada. O sistema se pagou na primeira semana.", author: "Juliana Martins", role: "Proprietária de Pousada", time: "há 2 min", avatar: "JM", rating: 5 },
    { text: "A gente tinha um problema sério com fila no check-in. O sistema deles resolveu isso de um jeito que a recepção agora consegue dar atenção de verdade pro hóspede, sem correria.", author: "Ricardo Sanches", role: "Diretor de Resort", time: "há 12 min", avatar: "RS", rating: 5 },
    { text: "Reduzimos a dependência do Booking em 30%. O robô fecha a reserva, tira dúvidas e só passa para o humano na hora do pagamento.", author: "Felipe Andrade", role: "Gerente Comercial", time: "há 45 min", avatar: "FA", rating: 5 },
    { text: "O sistema parece que lê a mente do cliente. Ele manda mensagem na hora certa e o pessoal volta mesmo. Nossa taxa de retorno nunca foi tão alta.", author: "Larissa Viana", role: "Dona de Beach Club", time: "há 1 hora", avatar: "LV", rating: 5 },
    { text: "O cardápio digital aumentou nosso ticket médio em 20%. O sistema oferece adicionais e bebidas de forma muito mais eficiente que o garçom na correria.", author: "Bianca Melo", role: "Dona de Restaurante", time: "há 2 horas", avatar: "BM", rating: 5 },
    { text: "Sempre quis atender o pessoal de fora, mas era difícil. Agora, com o site em várias línguas e o sistema de reserva deles, a gente recebe turista toda semana e o faturamento subiu muito.", author: "Gustavo Mendes", role: "Operador de Turismo", time: "há 3 horas", avatar: "GM", rating: 5 },
    { text: "O diferencial é que eles entendem a operação. Não é aquela agência que posta foto bonita mas não sabe o que é um hotel lotado ou um bar no sábado à noite.", author: "Marcos Cordeiro", role: "CEO Grupo Gastronômico", time: "há 5 horas", avatar: "MC", rating: 5 },
    { text: "Agora eu sei exatamente o que sai e o que fica parado na cozinha. O sistema avisa tudo em tempo real e a gente parou de jogar dinheiro fora com desperdício.", author: "Helena Souza", role: "Chef Executiva", time: "há 6 horas", avatar: "HS", rating: 5 },
    { text: "Eu precisava de algo rápido pro meu novo lançamento e eles entregaram tudo pronto. O cliente já entra no site e sente que o negócio é de outro nível, valorizou muito o empreendimento.", author: "Bruno Costa", role: "Investidor Imobiliário", time: "há 8 horas", avatar: "BC", rating: 5 },
    { text: "O visual que eles fizeram pra nossa marca mudou o nível do nosso público. Agora a gente atrai aquele cliente que não questiona preço, porque a apresentação passa muita confiança.", author: "Sofia Rocha", role: "Marketing de Hotelaria", time: "há 10 horas", avatar: "SR", rating: 5 },
    { text: "Os cardápios com sugestão inteligente são fantásticos. Itens de maior margem viraram os mais vendidos. O lucro líquido subiu 15%.", author: "André Torres", role: "Gerente de A&B", time: "há 14 horas", avatar: "AT", rating: 5 },
    { text: "O suporte deles é real. Tivemos uma dúvida num sábado de feriado às 2h da manhã e fomos atendidos em minutos. Isso é parceria.", author: "Patrícia Lima", role: "Proprietária de Hotel", time: "há 18 horas", avatar: "PL", rating: 5 },
    { text: "O que eu mais gosto é que o sistema não me deixa na mão. No sábado, que é o pico, ele aguenta tudo e ainda responde as dúvidas básicas dos clientes sozinho pelo WhatsApp.", author: "Fábio Oliveira", role: "Dono de Rede de Pizzarias", time: "há 20 horas", avatar: "FO", rating: 5 },
    { text: "A gente não aparecia no Google. Agora, qualquer turista que procura pela região acha a gente de primeira. O movimento de clientes qualificados aumentou demais.", author: "Carla Mendes", role: "Consultora de Viagens", time: "há 22 horas", avatar: "CM", rating: 5 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveComment((prev) => (prev + 1) % liveComments.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [liveComments.length]);

  const headerBg = useTransform(scrollY, [0, 100], ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.6)"]);
  const blurValue = useTransform(scrollY, [0, 100], [0, 16]);
  const headerBlur = useTransform(blurValue, (v) => `blur(${v}px)`);
  const headerBorder = useTransform(scrollY, [0, 100], ["rgba(160, 32, 240, 0)", "rgba(160, 32, 240, 0.3)"]);

  const sectors = [
    { id: 'hotelaria', title: 'HOTELARIA', desc: 'Check-in digital e reservas automáticas para hotéis e pousadas.', icon: <Hotel className="text-white relative z-10" size={28} /> },
    { id: 'logistica', title: 'TURISMO', desc: 'Reservas de passeios e transfers organizadas em um só lugar.', icon: <Car className="text-white relative z-10" size={28} /> },
    { id: 'gastronomia', title: 'GASTRONOMIA', desc: 'Cardápio digital e pedidos diretos, sem taxas de aplicativos.', icon: <Utensils className="text-white relative z-10" size={28} /> },
    { id: 'outros', title: 'OUTRO', desc: 'Atua em outra área? Criamos uma solução sob medida.', icon: <Plus className="text-white relative z-10" size={28} /> },
  ];

  const sectorCards = [
    {
      title: "HOTELARIA",
      subtitle: "Atendimento padronizado e reservas na hora.",
      icon: <Hotel size={32} />,
      points: [
        "Recepção digital que agiliza o check-in e acaba com as filas.",
        "Dados dos hóspedes organizados e protegidos.",
        "O cliente reserva, tira dúvidas e confirma tudo pelo celular, a qualquer hora.",
      ],
    },
    {
      title: "TURISMO E PASSEIOS",
      subtitle: "Agenda organizada e reservas sem confusão.",
      icon: <Car size={32} />,
      points: [
        "Um formulário que já chega no seu WhatsApp com o perfil e o roteiro do turista.",
        "Mensagens automáticas para quem começou a reservar e não finalizou.",
        "Voucher e confirmação enviados na hora, assim que a reserva é paga.",
      ],
    },
    {
      title: "GASTRONOMIA",
      subtitle: "Pedidos diretos, sem comissão de aplicativos.",
      icon: <Utensils size={32} />,
      points: [
        "Seu próprio canal de pedidos, sem pagar comissão para iFood e similares.",
        "Cardápio que sugere bebidas e adicionais e aumenta o valor de cada pedido.",
        "Comandas organizadas que reduzem a espera e os erros nos pedidos.",
      ],
    },
  ];

  const differentials = [
    { icon: <Target size={22} />, title: "UM PROCESSO QUE VENDE", text: "Em vez de fórmulas genéricas, montamos um caminho de vendas testado, que traz dinheiro novo para o seu caixa." },
    { icon: <Clock size={22} />, title: "ATENDIMENTO 24 HORAS", text: "Seu estabelecimento fecha, mas o atendimento online continua. Você vende e responde dúvidas até de madrugada." },
    { icon: <ShieldCheck size={22} />, title: "QUEM ENTENDE DA SUA ROTINA", text: "Já trabalhamos dentro de hotéis, restaurantes e turismo. Conhecemos os problemas do dia a dia e resolvemos os erros nos horários de pico." },
  ];

  const stats = [
    { end: 13, suffix: "+", label: "Anos de experiência prática" },
    { end: 24, suffix: "h", label: "Atendimento sem parar" },
    { end: 100, suffix: "%", label: "Dedicação ao seu projeto" },
    { end: 30, suffix: "%", label: "Menos dependência de apps" },
  ];

  const marqueeItems = [
    "Hotelaria", "Restaurantes", "Pousadas", "Turismo", "Cardápio Digital",
    "Reserva Online", "Tráfego Pago", "Atendimento 24h", "Sites", "Inteligência Artificial",
  ];

  if (currentPage === 'policies') {
    return <LegalPolicies onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div ref={revealScope} className="min-h-screen bg-[#050505] text-[#E5E4E2] font-sans selection:bg-[#A020F0] selection:text-white overflow-x-hidden">

      {!ready && <Preloader onComplete={() => setReady(true)} />}
      <CustomCursor />
      <ScrollProgress />

      {/* MENU MOBILE EM TELA CHEIA */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-lenis-prevent
            className="fixed inset-0 z-[95] bg-black/95 backdrop-blur-2xl flex flex-col lg:hidden"
          >
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="aurora aurora-1 opacity-30" />
            </div>
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <img src="/Marketellilogo.webp" alt="" className="w-8 h-8 object-contain" />
                <span className="text-base font-black tracking-[4px] text-white">MARKETELLI</span>
              </div>
              <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors p-2" aria-label="Fechar menu">
                <X size={26} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  onClick={() => goTo(link.id)}
                  className="group flex items-center justify-between py-4 border-b border-white/5 text-left"
                >
                  <span className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white group-hover:text-[#A020F0] transition-colors">{link.label}</span>
                  <ArrowUpRight className="text-gray-600 group-hover:text-[#A020F0] transition-colors" size={24} />
                </motion.button>
              ))}
            </nav>

            <div className="px-8 pb-10 space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <button onClick={openModal} className="w-full bg-[#A020F0] text-white font-black py-4 rounded-full uppercase tracking-[2px] text-sm shadow-[0_0_30px_rgba(160,32,240,0.5)]">
                  Diagnóstico grátis
                </button>
              </motion.div>
              <div className="flex items-center justify-center gap-4">
                <a href="https://wa.me/5561982062229" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center border border-white/20" aria-label="WhatsApp"><MessageCircle size={18} className="text-white" /></a>
                <a href="mailto:atendimento@marketelli.com" className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border border-white/20" aria-label="E-mail"><Mail size={18} className="text-white" /></a>
                <a href="https://instagram.com/marketelli_" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center border border-white/20" aria-label="Instagram"><Instagram size={18} className="text-white" /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE DIAGNÓSTICO */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative w-full max-w-4xl bg-white/5 backdrop-blur-3xl border border-[#A020F0]/30 rounded-2xl p-4 md:p-6 shadow-[0_0_50px_rgba(160,32,240,0.3)] flex flex-col overflow-hidden ${modalStep === 1 ? 'h-auto max-h-[90dvh]' : 'h-[85dvh] max-h-[90dvh]'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setIsModalOpen(false); setModalStep(1); setShowOtherInput(false); }}
                className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-500 hover:text-white transition-colors p-1 z-50"
              ><X size={20} /></button>

              <AnimatePresence mode="wait">
                {modalStep === 1 ? (
                  <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col justify-center overflow-hidden">
                    <div className="flex-none pt-2 pb-0">
                      <div className="text-center mb-2 md:mb-6 shrink-0">
                        <h3 className="text-lg md:text-2xl font-black tracking-[3px] text-white uppercase mb-1">Em qual área você atua?</h3>
                        <p className="text-gray-400 text-xs md:text-sm tracking-[1px]">Escolha a área que vamos analisar primeiro.</p>
                      </div>
                      <div className="overflow-y-auto px-1 overscroll-contain touch-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 w-full pb-4">
                          {sectors.map((sector) => (
                            <button
                              key={sector.id}
                              onClick={() => {
                                if (sector.id === 'outros') { setShowOtherInput(true); setSelectedSectorData(sector); }
                                else { setSelectedSectorData(sector); setModalStep(2); }
                              }}
                              className="w-full group relative flex flex-row sm:flex-col items-center gap-3 md:gap-2 p-3 bg-white/5 border border-white/10 rounded-xl hover:border-[#A020F0] transition-all duration-300 text-left sm:text-center h-auto justify-start sm:justify-center"
                            >
                              <div className="w-8 h-8 md:w-10 md:h-10 bg-black border border-[#A020F0]/30 rounded-full flex items-center justify-center group-hover:bg-[#A020F0]/10 transition-colors shrink-0">
                                <div className="scale-75 md:scale-90">{sector.icon}</div>
                              </div>
                              <div className="flex-1 flex flex-col justify-center w-full">
                                <h4 className="text-white text-xs md:text-sm font-bold tracking-[1px] md:tracking-[2px] uppercase mb-0.5 line-clamp-1">{sector.title}</h4>
                                <p className="text-gray-400 text-[8px] md:text-[9px] font-light leading-tight line-clamp-2 w-full">{sector.desc}</p>
                              </div>
                              <ChevronRight className="text-gray-600 group-hover:text-[#A020F0] transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:absolute sm:right-1 sm:top-1/2 sm:-translate-y-1/2" size={16} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    {showOtherInput && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex flex-col gap-2">
                        <input type="text" value={otherSector} onChange={(e) => setOtherSector(e.target.value)} placeholder="Qual é a sua área?"
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-base md:text-sm text-white focus:outline-none focus:border-[#A020F0] transition-colors placeholder:text-gray-600" autoFocus />
                        <button onClick={() => { if (otherSector.trim()) { setSelectedSectorData({ ...selectedSectorData, title: otherSector }); setModalStep(2); } }}
                          className="w-full bg-[#A020F0] hover:bg-[#A020F0]/80 text-white py-3 rounded-lg text-xs font-bold tracking-[1px] uppercase transition-all">Confirmar área</button>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full">
                    <div className="flex-none mb-2 md:mb-4">
                      <button onClick={() => setModalStep(1)} className="flex items-center gap-1 md:gap-2 text-[#A020F0] text-sm md:text-base font-bold uppercase tracking-[1px] md:tracking-[2px] hover:text-white transition-colors">
                        <ChevronLeft size={18} className="md:w-6 md:h-6" /> Voltar
                      </button>
                    </div>
                    <div className="flex-1 flex flex-col overflow-hidden pt-2">
                      <div className="text-center mb-4 md:mb-6 shrink-0">
                        <h3 className="text-xl md:text-3xl font-black tracking-[2px] md:tracking-[4px] text-white uppercase mb-1">Quase lá!</h3>
                        <div className="inline-block bg-[#A020F0]/10 border border-[#A020F0]/30 rounded px-3 py-1 mb-2">
                          <p className="text-[#A020F0] text-xs md:text-sm font-black tracking-[2px] uppercase">{selectedSectorData?.title}</p>
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto px-1 space-y-4 pb-20 w-full scrollbar-none [&::-webkit-scrollbar]:hidden" style={{ WebkitOverflowScrolling: 'touch' }} ref={formScrollRef}
                        onScroll={() => {
                          if (formScrollRef.current) {
                            const { scrollTop, scrollHeight, clientHeight } = formScrollRef.current;
                            setShowScrollHint(scrollHeight > clientHeight && scrollTop + clientHeight < scrollHeight - 20);
                          }
                        }}>
                        <div className="space-y-1">
                          <label className="text-xs md:text-sm text-[#A020F0] font-black tracking-[1px] md:tracking-[2px] uppercase">Nome</label>
                          <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Seu nome"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 md:px-5 md:py-4 text-base md:text-lg text-white focus:outline-none focus:border-[#A020F0] transition-colors placeholder:text-gray-600 h-12 md:h-14" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs md:text-sm text-[#A020F0] font-black tracking-[1px] md:tracking-[2px] uppercase">WhatsApp</label>
                            <input type="tel" required value={formData.whatsapp}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length > 11) value = value.slice(0, 11);
                                let formatted = value;
                                if (value.length > 2) formatted = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                                if (value.length > 7) formatted = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                                setFormData({ ...formData, whatsapp: formatted });
                              }}
                              placeholder="(00) 00000-0000"
                              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 md:px-5 md:py-4 text-base md:text-lg text-white focus:outline-none focus:border-[#A020F0] transition-colors placeholder:text-gray-600 h-12 md:h-14" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs md:text-sm text-[#A020F0] font-black tracking-[1px] md:tracking-[2px] uppercase">E-mail</label>
                            <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="seu@email.com"
                              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 md:px-5 md:py-4 text-base md:text-lg text-white focus:outline-none focus:border-[#A020F0] transition-colors placeholder:text-gray-600 h-12 md:h-14" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs md:text-sm text-[#A020F0] font-black tracking-[1px] md:tracking-[2px] uppercase">Site <span className="text-gray-500 font-light text-[8px] md:text-[10px]">(Opcional)</span></label>
                            <input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="www.site.com"
                              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 md:px-5 md:py-4 text-base md:text-lg text-white focus:outline-none focus:border-[#A020F0] transition-colors placeholder:text-gray-600 h-12 md:h-14" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs md:text-sm text-[#A020F0] font-black tracking-[1px] md:tracking-[2px] uppercase">Instagram <span className="text-gray-500 font-light text-[8px] md:text-[10px]">(Opcional)</span></label>
                            <input type="text" value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} placeholder="@usuario"
                              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 md:px-5 md:py-4 text-base md:text-lg text-white focus:outline-none focus:border-[#A020F0] transition-colors placeholder:text-gray-600 h-12 md:h-14" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs md:text-sm text-[#A020F0] font-black tracking-[1px] md:tracking-[2px] uppercase">Conte um pouco do seu negócio</label>
                          <textarea rows={2} value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} placeholder="Em poucas palavras..."
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 md:px-5 md:py-4 text-base md:text-lg text-white focus:outline-none focus:border-[#A020F0] transition-colors resize-none placeholder:text-gray-600" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-none mt-2 md:mt-4 relative">
                      <AnimatePresence>
                        {showScrollHint && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute -top-8 left-0 right-0 flex justify-center pointer-events-none">
                            <ChevronDown className="text-[#A020F0] animate-bounce" size={24} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="text-center mb-2 md:mb-4 px-2">
                        <p className="text-[#A020F0] text-xs md:text-sm font-bold tracking-[1px] uppercase animate-pulse">É só enviar a mensagem que vamos preparar no seu WhatsApp.</p>
                      </div>
                      <button
                        onClick={() => {
                          if (formData.name && formData.whatsapp && formData.email) {
                            fireConversion();
                            const msg = `Olá, equipe Marketelli! Aqui é ${formData.name}.\n\nGostaria de um diagnóstico para o meu negócio na área de ${selectedSectorData?.title || 'serviços'}.\n\nMeus dados:\n🏢 Área: ${selectedSectorData?.title || 'Não especificado'}\n✉️ E-mail: ${formData.email}\n📱 WhatsApp: ${formData.whatsapp}\n🌐 Site: ${formData.website || 'Não tenho'}\n📸 Instagram: ${formData.instagram || 'Não informado'}\n\n📊 Sobre o meu negócio:\n${formData.details || 'Conto os detalhes na conversa.'}\n\nFico no aguardo do contato. Obrigado(a)!`;
                            window.open(`https://wa.me/5561982062229?text=${encodeURIComponent(msg)}`, '_blank');
                            setIsModalOpen(false); setModalStep(1);
                            setFormData({ name: '', whatsapp: '', email: '', website: '', instagram: '', details: '' });
                          } else {
                            alert('Por favor, preencha os campos obrigatórios (Nome, WhatsApp e E-mail).');
                          }
                        }}
                        className="w-full bg-[#A020F0] hover:bg-[#A020F0]/80 text-white py-3 md:py-4 rounded-lg text-sm md:text-base font-black tracking-[2px] uppercase transition-all shadow-[0_0_20px_rgba(160,32,240,0.3)] hover:shadow-[0_0_30px_rgba(160,32,240,0.5)]"
                      >Quero meu diagnóstico</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BACKGROUND GLOBAL: AURORA + RUÍDO */}
      <div className="fixed inset-0 z-0 bg-[#050505] overflow-hidden pointer-events-none">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="absolute inset-0 grid-overlay opacity-[0.04]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
      </div>

      {/* HEADER */}
      <motion.nav
        style={{ backgroundColor: headerBg, backdropFilter: headerBlur, borderBottomColor: headerBorder }}
        className="fixed top-0 w-full px-4 md:px-6 py-3 md:py-4 flex justify-between items-center z-50 border-b border-b-transparent"
      >
        <div className="flex w-full justify-between items-center max-w-7xl mx-auto">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 md:gap-3 shrink-0" data-cursor="hover">
            <div className="relative">
              <div className="absolute inset-0 bg-[#A020F0]/20 blur-xl rounded-full animate-pulse" />
              <img src="/Marketellilogo.webp" alt="MARKETELLI Logo" fetchPriority="high" loading="eager" decoding="sync" className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10 animate-glow-pulse" />
            </div>
            <div className="flex flex-col items-start">
              <div className="relative group overflow-hidden">
                <span className="text-sm md:text-xl font-black tracking-[3px] md:tracking-[6px] text-white relative z-10 block">MARKETELLI</span>
                <span className="text-sm md:text-xl font-black tracking-[3px] md:tracking-[6px] text-[#A020F0] absolute inset-0 opacity-0 group-hover:opacity-70 group-hover:animate-glitch z-0">MARKETELLI</span>
              </div>
              <span className="text-[6px] md:text-[8px] tracking-[2px] md:tracking-[4px] text-[#A020F0] uppercase">Soluções • Resultados • Tecnologia</span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => goTo(link.id)} className="nav-link text-xs font-bold tracking-[2px] uppercase text-gray-300 hover:text-white transition-colors" data-cursor="hover">
                {link.label}
              </button>
            ))}
            <MagneticButton onClick={openModal}
              className="border border-[#A020F0]/50 px-7 py-2 rounded-full text-xs font-bold hover:bg-[#A020F0]/20 hover:border-[#A020F0] transition-colors duration-300 tracking-[2px] whitespace-nowrap text-white">
              Diagnóstico grátis
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(true)} className="lg:hidden text-white p-2 -mr-2" aria-label="Abrir menu">
            <Menu size={26} />
          </button>
        </div>
      </motion.nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-28 md:pt-24 pb-16 px-4 text-center z-10">
        <HeroCanvas />
        <div className="relative w-full max-w-5xl z-10">
          <div className="hero-anim inline-flex items-center gap-2 mb-6 md:mb-8 px-4 py-1.5 rounded-full border border-[#A020F0]/30 bg-[#A020F0]/5 backdrop-blur-sm">
            <Sparkles size={12} className="text-[#A020F0]" />
            <span className="text-[9px] md:text-[10px] tracking-[2px] md:tracking-[3px] uppercase text-gray-300 font-bold">Tecnologia que atende e vende 24 horas</span>
          </div>

          <h1 className="text-[2.5rem] leading-[1.05] sm:text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
            <span className="block overflow-hidden">
              <span className="hero-word inline-block text-white">Atendimento impecável.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block bg-gradient-to-r from-[#A020F0] via-[#D18CFF] to-[#A020F0] bg-clip-text text-transparent">Faturamento previsível.</span>
            </span>
          </h1>

          <p className="hero-anim text-[#A020F0] text-[10px] sm:text-sm md:text-base font-bold tracking-[2px] md:tracking-[4px] uppercase mb-6 md:mb-8 px-2">
            Sites, automação e IA para hotelaria, gastronomia e turismo
          </p>

          <p className="hero-anim max-w-2xl mx-auto text-gray-400 text-sm sm:text-base md:text-lg mb-8 md:mb-10 leading-relaxed font-light px-2 md:px-0">
            Criamos sistemas que atendem, reservam e vendem sozinhos — para você reduzir erros, ganhar tempo e aumentar o faturamento sem aumentar a equipe.
          </p>

          <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative group inline-block w-full sm:w-auto">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[120%] bg-gradient-to-r from-[#A020F0] via-fuchsia-500 to-[#A020F0] rounded-full opacity-50 blur-md group-hover:opacity-80 group-hover:blur-lg transition-all duration-500 animate-pulse" />
              <MagneticButton onClick={openModal}
                className="relative w-full sm:w-auto bg-white text-black font-black px-8 md:px-12 py-4 md:py-5 rounded-full tracking-[2px] md:tracking-[3px] hover:bg-[#A020F0] hover:text-white transition-colors duration-500 shadow-[0_0_30px_rgba(160,32,240,0.5)] text-sm md:text-base z-10 uppercase">
                Solicitar diagnóstico <ArrowUpRight size={18} />
              </MagneticButton>
            </div>
            <button onClick={() => goTo('setores')}
              className="text-xs md:text-sm tracking-[2px] uppercase text-gray-400 hover:text-white transition-colors flex items-center gap-2" data-cursor="hover">
              Ver soluções <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <div className="hero-anim absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <span className="text-[8px] tracking-[3px] uppercase">Role para ver</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#A020F0] to-transparent" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative z-10 border-y border-white/5 bg-black/30 backdrop-blur-sm py-4 overflow-hidden">
        <div className="marquee flex gap-8 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-8 text-lg md:text-2xl font-black uppercase tracking-[2px] text-white/20">
              {item} <span className="text-[#A020F0]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div data-reveal data-reveal-stagger className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <div key={i} className="bg-[#050505] p-6 md:p-10 text-center group hover:bg-[#A020F0]/5 transition-colors duration-500">
              <div className="text-3xl md:text-6xl font-black text-white mb-2 tracking-tighter">
                <CountUp end={s.end} suffix={s.suffix} />
              </div>
              <div className="text-[9px] md:text-xs tracking-[1px] md:tracking-[2px] uppercase text-gray-500 group-hover:text-[#A020F0] transition-colors leading-relaxed">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SETORES */}
      <section id="setores" className="py-16 md:py-24 px-4 md:px-6 relative z-10 max-w-7xl mx-auto scroll-mt-24">
        <div data-reveal className="text-center mb-12 md:mb-20">
          <span className="text-[#A020F0] text-[10px] md:text-xs font-bold tracking-[4px] uppercase">// O que fazemos</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-3 uppercase text-white">Soluções feitas para o seu setor</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {sectorCards.map((item, index) => (
            <div key={index} data-reveal data-cursor="hover">
              <TiltCard className="relative h-full p-6 md:p-8 bg-white/[0.03] backdrop-blur-xl border border-[#A020F0]/20 rounded-2xl overflow-hidden group hover:border-[#A020F0]/70 transition-colors duration-500">
                <div className="card-glow" />
                <div className="relative z-10">
                  <div className="mb-6 w-14 h-14 rounded-xl bg-[#A020F0]/10 border border-[#A020F0]/30 flex items-center justify-center text-[#D18CFF] group-hover:scale-110 group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-black mb-2 tracking-[1px] uppercase text-white">{item.title}</h3>
                  <p className="text-[#A020F0] font-bold text-[10px] md:text-xs tracking-[1px] md:tracking-[2px] mb-6 md:mb-8 uppercase">{item.subtitle}</p>
                  <ul className="space-y-3 md:space-y-4">
                    {item.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="text-[#A020F0] shrink-0 mt-1" size={14} />
                        <span className="text-gray-300 text-xs md:text-sm font-light leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section id="diferenciais" className="py-16 md:py-24 px-4 md:px-6 relative z-10 bg-black/40 border-y border-white/5 backdrop-blur-sm scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="text-center mb-12 md:mb-16">
            <span className="text-[#A020F0] text-[10px] md:text-xs font-bold tracking-[4px] uppercase">// Por que a Marketelli</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-3 uppercase text-white">Como fazemos a diferença</h2>
          </div>
          <div data-reveal data-reveal-stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {differentials.map((p, i) => (
              <div key={i} className="space-y-4 relative pl-6 border-l-2 border-[#A020F0]/40">
                <div className="flex items-center gap-3 text-[#A020F0]">
                  <span className="text-xs font-mono">0{i + 1}</span>
                  {p.icon}
                </div>
                <h3 className="text-lg md:text-xl font-black tracking-[1px] text-white uppercase">{p.title}</h3>
                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="flex justify-center mt-14">
            <div className="relative group inline-block">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[120%] bg-gradient-to-r from-[#A020F0] via-fuchsia-500 to-[#A020F0] rounded-full opacity-50 blur-md group-hover:opacity-80 transition-all duration-500 animate-pulse" />
              <MagneticButton onClick={openModal} className="relative bg-white text-black hover:bg-[#A020F0] hover:text-white px-8 py-4 rounded-full text-sm font-bold transition-colors duration-300 uppercase tracking-[2px] shadow-[0_0_30px_rgba(160,32,240,0.5)] z-10">
                Falar com a Marketelli <ArrowUpRight size={18} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPE */}
      <section id="equipe" className="py-16 md:py-24 px-4 md:px-6 relative z-10 overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 md:gap-16">
          <div data-reveal className="text-center space-y-3">
            <span className="text-[#A020F0] text-[10px] md:text-xs font-bold tracking-[4px] uppercase">// Quem somos</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">Quem cuida do seu projeto</h2>
            <p className="text-[#A020F0] text-[10px] md:text-xs font-bold tracking-[2px] uppercase">Os sócios e especialistas da Marketelli</p>
          </div>

          <div data-reveal data-reveal-stagger className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-4xl mx-auto">
            <PartnerImage src="/lucas.webp" alt="Lucas - Marketelli" name="LUCAS" role="Fundador & Estrategista" />
            <PartnerImage src="/monaliza.webp" alt="Monaliza - Marketelli" name="MONALIZA" role="Social Media, Web Design e Criação" />
            <PartnerImage src="/tony.webp" alt="Tony - Marketelli" name="TONY" role="IA & Programação" />
            <PartnerImage src="/Pedro.webp" alt="Pedro - Marketelli" name="PEDRO" role="Tráfego Pago" />
          </div>

          <div className="w-full max-w-4xl mx-auto space-y-6 md:space-y-8">
            <div data-reveal className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-xs md:text-sm">
              <div className="space-y-3 md:space-y-4">
                <h4 className="font-black text-white tracking-[1px] md:tracking-[2px] border-l-2 border-[#A020F0] pl-4 uppercase">A história do fundador</h4>
                <p className="text-gray-400 leading-relaxed font-light">
                  Comecei no operacional de lanchonetes e foodtrucks, onde a agilidade decide o lucro. Aprendi inglês por conta própria e passei para a gestão de hotéis de alto padrão.
                  <br /><br />
                  São mais de 13 anos vivendo essa rotina por dentro. Eu não só opero o negócio — domino os sistemas que o fazem funcionar (Desbravador e Bitz). Hoje, na Marketelli, entrego a mesma engenharia que usei para transformar operações manuais em negócios que vendem mais no digital.
                </p>
              </div>
              <div className="space-y-3 md:space-y-4">
                <h4 className="font-black text-white tracking-[1px] md:tracking-[2px] border-l-2 border-[#A020F0] pl-4 uppercase">Experiência de verdade</h4>
                <p className="text-gray-400 leading-relaxed font-light">
                  Conhecemos os principais sistemas de gestão do mercado. Não trabalhamos com teoria: unimos <span className="text-white font-bold">processos organizados a uma presença digital que realmente vende</span>.
                </p>
              </div>
            </div>

            <div data-reveal className="p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-[#A020F0]/30 rounded-2xl relative group overflow-hidden">
              <div className="absolute -top-10 -right-10 text-[#A020F0]/10"><Bot size={120} /></div>
              <h3 className="text-lg md:text-xl font-black text-white tracking-[1px] md:tracking-[2px] mb-4 uppercase relative z-10">O que nos <span className="animate-pulse-neon-text">diferencia</span></h3>
              <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base relative z-10">
                Diferente de agências que só conhecem a teoria, usamos inteligência artificial treinada para atender como o seu melhor funcionário — unindo marketing à realidade do seu negócio para vender 24 horas por dia.
              </p>
            </div>

            <div data-reveal className="flex justify-center">
              <MagneticButton onClick={openModal} className="bg-[#A020F0] hover:bg-[#A020F0]/80 text-white px-8 py-4 rounded-full text-sm font-bold transition-colors uppercase tracking-[1px] shadow-[0_0_30px_rgba(160,32,240,0.5)]">
                Falar com especialista <ArrowUpRight size={18} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="py-16 md:py-24 px-4 md:px-6 relative z-10 max-w-4xl mx-auto overflow-hidden scroll-mt-24">
        <div data-reveal className="text-center mb-12 md:mb-16">
          <span className="text-[#A020F0] text-[10px] md:text-xs font-bold tracking-[4px] uppercase">// Depoimentos</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-3 uppercase text-white">O que dizem nossos clientes</h2>
          <p className="text-[#A020F0] text-[10px] font-bold tracking-[2px] uppercase mt-2 animate-pulse">● histórias reais de quem já trabalha com a gente</p>
        </div>

        <div className="relative min-h-[260px] md:min-h-[210px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={activeComment} initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.97 }} transition={{ duration: 0.5, ease: "easeOut" }} className="w-full flex justify-center items-center group">
              <div className="w-full max-w-2xl bg-white/[0.03] backdrop-blur-md border border-[#A020F0]/30 p-6 md:p-8 rounded-2xl group-hover:border-[#A020F0]/60 transition-all duration-500 relative">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A020F0] to-[#D18CFF] flex items-center justify-center text-white text-xs font-black shrink-0">{liveComments[activeComment].avatar}</div>
                    <div>
                      <h4 className="text-white font-bold text-sm md:text-base tracking-[1px]">{liveComments[activeComment].author}</h4>
                      <p className="text-[10px] text-[#A020F0] font-medium uppercase tracking-[1px] mb-1">{liveComments[activeComment].role}</p>
                      <div className="flex gap-0.5">
                        {[...Array(liveComments[activeComment].rating)].map((_, i) => (<Star key={i} size={10} className="fill-[#FFD700] text-[#FFD700]" />))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] text-gray-500 font-mono">{liveComments[activeComment].time}</span>
                </div>
                <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-light italic">"{liveComments[activeComment].text}"</p>
                <div className="absolute bottom-0 left-0 h-0.5 bg-[#A020F0]/20 w-full overflow-hidden rounded-b-2xl">
                  <motion.div key={`bar-${activeComment}`} initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5, ease: "linear" }} className="h-full bg-[#A020F0]" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button onClick={() => setActiveComment((prev) => (prev - 1 + liveComments.length) % liveComments.length)} className="absolute -left-1 md:-left-12 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-[#A020F0] transition-colors" data-cursor="hover" aria-label="Anterior"><ChevronLeft size={20} /></button>
          <button onClick={() => setActiveComment((prev) => (prev + 1) % liveComments.length)} className="absolute -right-1 md:-right-12 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-[#A020F0] transition-colors" data-cursor="hover" aria-label="Próximo"><ChevronRight size={20} /></button>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative z-10 px-4 md:px-6 py-20 md:py-32">
        <div data-reveal className="max-w-5xl mx-auto text-center relative">
          <h2 className="text-[2.75rem] leading-[0.95] sm:text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8">
            <span className="text-white">Pronto para</span><br />
            <span className="bg-gradient-to-r from-[#A020F0] via-[#D18CFF] to-[#FFD700] bg-clip-text text-transparent">vender mais?</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10 font-light px-2">O seu atendimento já é bom. Vamos fazer o digital trabalhar a seu favor — com um diagnóstico gratuito, sem compromisso.</p>
          <div className="relative group inline-block w-full sm:w-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[130%] bg-gradient-to-r from-[#A020F0] via-fuchsia-500 to-[#A020F0] rounded-full opacity-50 blur-lg group-hover:opacity-90 transition-all duration-500 animate-pulse" />
            <MagneticButton onClick={openModal} className="relative w-full sm:w-auto bg-white text-black font-black px-10 md:px-16 py-5 md:py-6 rounded-full tracking-[3px] hover:bg-[#A020F0] hover:text-white transition-colors duration-500 shadow-[0_0_40px_rgba(160,32,240,0.6)] text-base md:text-lg z-10 uppercase">
              Começar agora <ArrowUpRight size={20} />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 md:py-14 px-4 md:px-6 border-t border-[#A020F0]/20 bg-black/50 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto">
          <div
            className="footer-word group relative text-center mb-10 overflow-hidden"
            data-cursor="hover"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
              e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
            }}
          >
            <span className="block text-[15vw] md:text-[10vw] leading-none font-black tracking-tighter text-white/[0.04] uppercase select-none">MARKETELLI</span>
            <span aria-hidden className="footer-word-glow block text-[15vw] md:text-[10vw] leading-none font-black tracking-tighter uppercase select-none">MARKETELLI</span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-3">
                <img src="/Marketellilogo.webp" alt="Logo" className="w-7 h-7 object-contain" />
                <span className="text-base md:text-lg font-black tracking-[3px] md:tracking-[5px] animate-pulse-neon-text uppercase">MARKETELLI</span>
              </div>
              <span className="text-[6px] md:text-[8px] tracking-[2px] md:tracking-[4px] text-[#A020F0] uppercase">Soluções • Resultados • Tecnologia</span>
              <div className="flex items-center gap-2 pt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-prism" />
                <span className="text-[8px] text-green-500 font-bold tracking-[1px] uppercase">Disponível agora</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <button onClick={() => setCurrentPage('policies')} className="text-[9px] text-[#FFD700] hover:text-white transition-colors uppercase tracking-[1px] font-bold" data-cursor="hover">Termos de Uso e Privacidade</button>
              <p className="text-[8px] tracking-[1px] text-gray-600 uppercase text-center">© 2026 MARKETELLI — Todos os direitos reservados</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={openModal} className="group w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-[0_2px_8px_rgba(34,197,94,0.3)] border border-white/20 hover:scale-110 transition-transform" data-cursor="hover" aria-label="WhatsApp"><MessageCircle size={16} className="text-white" /></button>
              <a href="mailto:atendimento@marketelli.com" className="group w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-[0_2px_8px_rgba(59,130,246,0.3)] border border-white/20 hover:scale-110 transition-transform" data-cursor="hover" aria-label="E-mail"><Mail size={16} className="text-white" /></a>
              <a href="https://instagram.com/marketelli_" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center shadow-[0_2px_8px_rgba(230,104,60,0.3)] border border-white/20 hover:scale-110 transition-transform" data-cursor="hover" aria-label="Instagram"><Instagram size={16} className="text-white" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketelliOfficial;
