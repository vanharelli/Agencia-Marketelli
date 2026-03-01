import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Hotel, Utensils, Instagram, Check, Mail, X, ChevronRight, Plus, ChevronLeft, Star, MessageCircle, Car } from 'lucide-react';
import { useState, useEffect } from 'react';
import LegalPolicies from './components/LegalPolicies';
import { useFrontendShield } from './hooks/useFrontendShield';

const MarketelliOfficial = () => {
  useFrontendShield();
  const [currentPage, setCurrentPage] = useState<'home' | 'policies'>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  const [modalStep, setModalStep] = useState(1); // 1: Seleção, 2: Formulário
  const [selectedSectorData, setSelectedSectorData] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    website: '',
    instagram: '',
    details: ''
  });
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherSector, setOtherSector] = useState('');
  const [activeComment, setActiveComment] = useState(0);
  const { scrollY } = useScroll();

  const liveComments = [
    { 
      text: "Eu perdia muita venda de passeio à noite. Com o sistema da Marketelli, acordei com 3 vouchers vendidos de madrugada. O sistema se pagou na primeira semana.", 
      author: "Juliana Martins",
      role: "Proprietária de Pousada",
      time: "há 2 min",
      avatar: "JM",
      rating: 5
    },
    { 
      text: "A gente tinha um problema sério com fila no check-in. O sistema deles resolveu isso de um jeito que a recepção agora consegue dar atenção de verdade pro hóspede, sem correria.", 
      author: "Ricardo Sanches",
      role: "Diretor de Resort",
      time: "há 12 min",
      avatar: "RS",
      rating: 5
    },
    { 
      text: "Reduzimos a dependência do Booking em 30%. O robô fecha a reserva, tira dúvidas e só passa para o humano na hora do pagamento.", 
      author: "Felipe Andrade",
      role: "Gerente Comercial",
      time: "há 45 min",
      avatar: "FA",
      rating: 5
    },
    { 
      text: "O sistema parece que lê a mente do cliente. Ele manda mensagem na hora certa e o pessoal volta mesmo. Nossa taxa de retorno nunca foi tão alta.", 
      author: "Larissa Viana",
      role: "Dona de Beach Club",
      time: "há 1 hora",
      avatar: "LV",
      rating: 5
    },
    { 
      text: "O cardápio digital estratégico aumentou nosso ticket médio em 20%. O sistema oferece adicionais e bebidas de forma muito mais eficiente que o garçom na correria.", 
      author: "Bianca Melo",
      role: "Dona de Restaurante",
      time: "há 2 horas",
      avatar: "BM",
      rating: 5
    },
    { 
      text: "Sempre quis atender o pessoal de fora, mas era difícil. Agora, com o site em várias línguas e o sistema de reserva deles, a gente recebe gringo toda semana e o faturamento subiu muito.", 
      author: "Gustavo Mendes",
      role: "Operador de Turismo",
      time: "há 3 horas",
      avatar: "GM",
      rating: 5
    },
    { 
      text: "O diferencial é que eles entendem a operação. Não é aquela agência que posta foto bonita mas não sabe o que é um hotel lotado ou um bar no sábado à noite.", 
      author: "Marcos Cordeiro",
      role: "CEO Grupo Gastronômico",
      time: "há 5 horas",
      avatar: "MC",
      rating: 5
    },
    { 
      text: "Agora eu sei exatamente o que sai e o que fica parado na cozinha. O sistema avisa tudo em tempo real e a gente parou de jogar dinheiro fora com desperdício.", 
      author: "Helena Souza",
      role: "Chef Executiva",
      time: "há 6 horas",
      avatar: "HS",
      rating: 5
    },
    { 
      text: "Eu precisava de algo rápido pro meu novo lançamento e eles entregaram tudo pronto. O pessoal já entra no site e sente que o negócio é de outro nível, valorizou muito o empreendimento.", 
      author: "Bruno Costa",
      role: "Investidor Imobiliário",
      time: "há 8 horas",
      avatar: "BC",
      rating: 5
    },
    { 
      text: "O visual que eles fizeram pra nossa marca mudou o nível do nosso público. Agora a gente atrai aquele cliente que não questiona preço, porque a apresentação passa muita confiança.", 
      author: "Sofia Rocha",
      role: "Marketing de Luxo",
      time: "há 10 horas",
      avatar: "SR",
      rating: 5
    },
    { 
      text: "Os cardápios estratégicos com engenharia de menu são fantásticos. Itens de alta margem agora são os mais vendidos. Lucro líquido subiu 15%.", 
      author: "André Torres",
      role: "Gerente de A&B",
      time: "há 14 horas",
      avatar: "AT",
      rating: 5
    },
    { 
      text: "O suporte 24h deles é real. Tivemos uma dúvida num sábado de feriado às 2h da manhã e fomos atendidos em minutos. Isso é parceria.", 
      author: "Patrícia Lima",
      role: "Proprietária de Boutique Hotel",
      time: "há 18 horas",
      avatar: "PL",
      rating: 5
    },
    { 
      text: "O que eu mais gosto é que o sistema não me deixa na mão. No sábado, que é o pico, ele aguenta tudo e ainda responde as dúvidas básicas dos clientes sozinho pelo WhatsApp.", 
      author: "Fábio Oliveira",
      role: "Dono de Rede de Pizzarias",
      time: "há 20 horas",
      avatar: "FO",
      rating: 5
    },
    { 
      text: "A gente não aparecia no Google. Agora, qualquer turista que procura pela região acha a gente de primeira. O movimento de clientes qualificados aumentou demais.", 
      author: "Carla Mendes",
      role: "Consultora de Viagens",
      time: "há 22 horas",
      avatar: "CM",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveComment((prev) => (prev + 1) % liveComments.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [liveComments.length]);
  
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );
  
  const blurValue = useTransform(scrollY, [0, 100], [0, 20]);
  const headerBlur = useTransform(blurValue, (v) => `blur(${v}px)`);

  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]
  );

  const headerOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const pointerEvents = useTransform(scrollY, [0, 50], ["none", "auto"]);

  const sectors = [
    { 
      id: 'hotelaria',
      title: 'HOTELARIA', 
      desc: 'Módulo de Soberania Hoteleira: Check-in Digital & Automação de Receita.',
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] to-[#A020F0] blur-sm opacity-50 rounded-full animate-pulse"></div>
          <Hotel className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] relative z-10" size={28}/> 
        </div>
      )
    },
    { 
      id: 'logistica',
      title: 'LOGÍSTICA', 
      desc: 'Gestão de frotas e roteirização inteligente para turismo.',
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] to-[#A020F0] blur-sm opacity-50 rounded-full animate-pulse"></div>
          <Car className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] relative z-10" size={28}/> 
        </div>
      )
    },
    { 
      id: 'gastronomia',
      title: 'GASTRONOMIA', 
      desc: 'Cardápios digitais e sistemas de delivery sem taxas.',
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] to-[#A020F0] blur-sm opacity-50 rounded-full animate-pulse"></div>
          <Utensils className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] relative z-10" size={28}/> 
        </div>
      )
    },
    { 
      id: 'outros',
      title: 'OUTROS', 
      desc: 'Soluções personalizadas para sua necessidade específica.',
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] to-[#A020F0] blur-sm opacity-50 rounded-full animate-pulse"></div>
          <Plus className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] relative z-10" size={28}/> 
        </div>
      )
    }
  ];

  if (currentPage === 'policies') {
    return <LegalPolicies onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#000000] text-[#E5E4E2] font-sans selection:bg-[#A020F0] selection:text-white overflow-x-hidden">
      
      {/* MODAL DE SELEÇÃO DE SETOR */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white/5 backdrop-blur-3xl border border-[#A020F0]/30 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(160,32,240,0.3)] max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            >
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setModalStep(1);
                  setShowOtherInput(false);
                }}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-500 hover:text-white transition-colors p-2"
              >
                <X size={24} />
              </button>

              <AnimatePresence mode="wait">
                {modalStep === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <div className="text-center mb-10">
                      <h3 className="text-2xl font-black tracking-[4px] text-white uppercase mb-2">Qual setor você atua?</h3>
                      <p className="text-gray-400 text-sm tracking-[1px]">Selecione o pilar que vamos transformar em ativo.</p>
                    </div>

                    <div className="flex justify-center flex-wrap gap-4">
                      {sectors.map((sector) => (
                        <button
                          key={sector.id}
                          onClick={() => {
                            if (sector.id === 'outros') {
                              setShowOtherInput(true);
                              setSelectedSectorData(sector);
                            } else {
                              setSelectedSectorData(sector);
                              setModalStep(2);
                            }
                          }}
                          className="w-full max-w-[280px] group relative flex flex-col items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:border-[#A020F0] transition-all duration-300 text-center animate-pulse-neon"
                        >
                          <div className="w-14 h-14 bg-black border border-[#A020F0]/30 rounded-full flex items-center justify-center group-hover:bg-[#A020F0]/10 transition-colors">
                            {sector.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white text-lg font-bold tracking-[2px] uppercase mb-2">{sector.title}</h4>
                            <p className="text-gray-400 text-xs font-light">{sector.desc}</p>
                          </div>
                          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-[#A020F0] transition-colors" size={18} />
                        </button>
                      ))}
                    </div>

                    {showOtherInput && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 flex flex-col gap-2"
                      >
                        <input 
                          type="text"
                          value={otherSector}
                          onChange={(e) => setOtherSector(e.target.value)}
                          placeholder="Qual é o seu setor?"
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-base md:text-sm text-white focus:outline-none focus:border-[#A020F0] transition-colors placeholder:text-gray-600"
                          autoFocus
                        />
                        <button 
                          onClick={() => {
                            if (otherSector.trim()) {
                              setSelectedSectorData({ ...selectedSectorData, title: otherSector });
                              setModalStep(2);
                            }
                          }}
                          className="w-full bg-[#A020F0] hover:bg-[#A020F0]/80 text-white py-3 rounded-lg text-xs font-bold tracking-[1px] uppercase transition-all"
                        >
                          Confirmar Setor
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <button 
                      onClick={() => setModalStep(1)}
                      className="flex items-center gap-2 text-[#A020F0] text-xs font-bold uppercase tracking-[2px] hover:text-white transition-colors mb-4"
                    >
                      <ChevronLeft size={16} /> Voltar
                    </button>

                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-black tracking-[4px] text-white uppercase mb-2">Quase lá!</h3>
                      <p className="text-gray-400 text-sm tracking-[1px]">
                        Setor selecionado: <span className="text-white font-bold">{selectedSectorData?.title}</span>
                      </p>
                      <p className="text-[#A020F0] text-[10px] font-bold tracking-[1px] mt-2 uppercase animate-pulse">
                        Após o preenchimento, você será direcionado para nossa análise de viabilidade via WhatsApp. Basta enviar a Mensagem automática gerada.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] text-[#A020F0] font-black tracking-[3px] uppercase">Nome Completo</label>
                        <input 
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Seu nome"
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-base md:text-sm text-white focus:outline-none focus:border-[#A020F0] transition-colors placeholder:text-gray-600"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] text-[#A020F0] font-black tracking-[3px] uppercase">WhatsApp</label>
                          <input 
                            type="tel"
                            required
                            value={formData.whatsapp}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, '');
                              if (value.length > 11) value = value.slice(0, 11);
                              
                              let formatted = value;
                              if (value.length > 2) {
                                formatted = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                              }
                              if (value.length > 7) {
                                formatted = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                              }
                              setFormData({...formData, whatsapp: formatted});
                            }}
                            placeholder="(00) 00000-0000"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-base md:text-sm text-white focus:outline-none focus:border-[#A020F0] transition-colors placeholder:text-gray-600"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] text-[#A020F0] font-black tracking-[3px] uppercase">E-mail</label>
                          <input 
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="seu@email.com"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-base md:text-sm text-white focus:outline-none focus:border-[#A020F0] transition-colors placeholder:text-gray-600"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] text-[#A020F0] font-black tracking-[3px] uppercase">Site da Empresa <span className="text-gray-500 font-light">(Opcional)</span></label>
                          <input 
                            type="url"
                            value={formData.website}
                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                            placeholder="www.suaempresa.com"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-base md:text-sm text-white focus:outline-none focus:border-[#A020F0] transition-colors placeholder:text-gray-600"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] text-[#A020F0] font-black tracking-[3px] uppercase">Instagram <span className="text-gray-500 font-light">(Opcional)</span></label>
                          <input 
                            type="text"
                            value={formData.instagram}
                            onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                            placeholder="@seuusuario"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-base md:text-sm text-white focus:outline-none focus:border-[#A020F0] transition-colors placeholder:text-gray-600"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] text-[#A020F0] font-black tracking-[3px] uppercase">Detalhes do Negócio</label>
                        <textarea 
                          rows={4}
                          value={formData.details}
                          onChange={(e) => setFormData({...formData, details: e.target.value})}
                          placeholder="conte-nos brevemente sobre seu negocio.."
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-base md:text-sm text-white focus:outline-none focus:border-[#A020F0] transition-colors resize-none placeholder:text-gray-600"
                        />
                      </div>

                      <button 
                        onClick={() => {
                          if (formData.name && formData.whatsapp && formData.email) {
                            const msg = `Olá Marketelli!\n\n*Solicitação de Análise de Viabilidade*\n\n● *Setor:* ${selectedSectorData?.title}\n● *Nome:* ${formData.name}\n● *WhatsApp:* ${formData.whatsapp}\n● *E-mail:* ${formData.email}\n● *Site:* ${formData.website || 'Não informado'}\n● *Instagram:* ${formData.instagram || 'Não informado'}\n\n*Sobre a Operação:*\n${formData.details || 'Não informado'}\n\n_Enviado via Ecossistema Marketelli_`;
                            window.open(`https://wa.me/5511910546124?text=${encodeURIComponent(msg)}`, '_blank');
                            setIsModalOpen(false);
                            setModalStep(1);
                            setFormData({ name: '', whatsapp: '', email: '', website: '', instagram: '', details: '' });
                          } else {
                            alert('Por favor, preencha os campos obrigatórios (Nome, WhatsApp e E-mail).');
                          }
                        }}
                        className="w-full bg-[#A020F0] hover:bg-[#A020F0]/80 text-white py-4 rounded-xl text-sm font-black tracking-[2px] uppercase transition-all shadow-[0_0_20px_rgba(160,32,240,0.3)] hover:shadow-[0_0_30px_rgba(160,32,240,0.5)]"
                      >
                        SOLICITAR ANÁLISE AGORA
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BACKGROUND ESTRATÉGICO: CYBER-RAIN & FROST GLASS */}
      <div className="fixed inset-0 z-0 bg-black overflow-hidden">
        {/* Vídeo de Fundo - Cyber City Rain */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110"
        >
          <source src="https://v.ftcdn.net/05/12/29/58/700_F_512295863_zz0dU3KROC8Ygbo9elHKySX6tXbiOYVl_ST.mp4" type="video/mp4" />
        </video>

        {/* Camada de Frost/Chuva - Efeito Vidro Congelado Intenso */}
        <div className="absolute inset-0 backdrop-blur-[20px] md:backdrop-blur-[40px] bg-black/60 md:bg-black/50"></div>
        
        {/* Textura de Ruído para simular granulação de chuva fina */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none"></div>
      </div>

      {/* HEADER: ALTA CONSULTORIA */}
      <motion.nav 
        style={{ 
          backgroundColor: headerBg,
          backdropFilter: headerBlur,
          borderBottomColor: headerBorder,
          opacity: headerOpacity,
          pointerEvents: pointerEvents
        }}
        className="fixed top-0 w-full p-4 md:p-6 flex justify-between items-center z-50 border-b"
      >
        <div className="flex w-full justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-[#A020F0]/20 blur-xl rounded-full animate-pulse"></div>
              <img 
                src="/Marketellilogo.png" 
                alt="MARKETELLI Logo" 
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10 animate-glow-pulse"
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="relative group overflow-hidden">
                <span className="text-lg md:text-2xl font-black tracking-[4px] md:tracking-[8px] text-white relative z-10 block">MARKETELLI</span>
                {/* Efeito Glitch Sutil no Hover ou Contínuo */}
                <span className="text-lg md:text-2xl font-black tracking-[4px] md:tracking-[8px] text-[#A020F0] absolute inset-0 opacity-0 group-hover:opacity-70 group-hover:animate-glitch z-0">MARKETELLI</span>
                <span className="text-lg md:text-2xl font-black tracking-[4px] md:tracking-[8px] text-[#A020F0] absolute inset-0 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-delayed z-0">MARKETELLI</span>
              </div>
              <span className="text-[6px] md:text-[8px] tracking-[2px] md:tracking-[4px] text-[#A020F0] uppercase text-center">Soluções • Resultados • Tecnologia</span>
            </div>
          </div>
          <button 
            onClick={() => {
              setModalStep(1);
              setIsModalOpen(true);
            }}
            className="border border-[#A020F0]/50 px-4 md:px-8 py-1.5 md:py-2 rounded-sm text-[10px] md:text-xs font-bold hover:bg-[#A020F0]/20 transition-all duration-500 tracking-[1px] md:tracking-[2px] whitespace-nowrap"
          >
            <span className="hidden sm:inline">CONSULTORIA DE ELITE</span>
            <span className="sm:hidden">Consultar</span>
          </button>
        </div>
      </motion.nav>

      {/* HERO SECTION: GOD MODE */}
      <section className="relative min-h-dvh flex flex-col items-center justify-center pt-24 md:pt-20 px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-5xl"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-[1.1] md:leading-none relative drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] uppercase">
            <span className="text-metallic-3d">CONSTRUÍMOS SEU <br/> IMPÉRIO DIGITAL.</span>
          </h1>
          
          <p className="text-[#A020F0] text-[10px] sm:text-sm md:text-lg font-bold tracking-[3px] md:tracking-[6px] uppercase mb-6 md:mb-8">
            Excelência no Serviço Físico • A Independência Financeira no Digital
          </p>

          <p className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base md:text-lg mb-8 md:mb-10 leading-relaxed font-light italic px-4 md:px-0">
            "Transformamos sua prestação de serviço em um ativo digital valorizado, utilizando sistemas automáticos que eliminam falhas humanas e protegem seu caixa."
          </p>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group inline-block"
          >
            {/* Neon Pulse Effect - Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[120%] bg-gradient-to-r from-[#A020F0] via-fuchsia-500 to-[#A020F0] rounded-sm opacity-50 blur-md group-hover:opacity-80 group-hover:blur-lg transition-all duration-500 animate-pulse"></div>
            
            <button 
              onClick={() => {
                setModalStep(1);
                setIsModalOpen(true);
              }}
              className="relative w-full sm:w-auto bg-white text-black font-black px-8 md:px-12 py-4 md:py-5 rounded-sm tracking-[2px] md:tracking-[3px] hover:bg-[#A020F0] hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(160,32,240,0.5)] text-sm md:text-base z-10"
            >
              SOLICITAR ANÁLISE
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* SEÇÃO: INTERVENÇÃO NOS SETORES */}
      <section className="py-16 md:py-24 px-4 md:px-6 relative z-10 max-w-7xl mx-auto">
        <h2 className="text-center text-xl md:text-3xl font-black tracking-[3px] md:tracking-[5px] mb-12 md:mb-20 uppercase border-b border-[#A020F0]/20 pb-4 inline-block mx-auto w-full">
          Onde Criamos seu Diferencial
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { 
              title: "HOTELARIA", 
              subtitle: "Padronização de Atendimento e Reserva Imediata.",
              points: [
                "Recepção Digital de Fluxo Contínuo.",
                "Protocolo de Sigilo e Proteção de Dados.",
                "O padrão de serviço dos melhores hotéis do mundo, agora automatizado e disponível na palma da mão do seu cliente.",
              ],
              icon: <Hotel className="text-[#E5E4E2] drop-shadow-[0_0_15px_rgba(160,32,240,0.6)]" size={32}/> 
            },
            { 
              title: "LOGÍSTICA E TURISMO", 
              subtitle: "Controle de agenda e disponibilidade de passeios.",
              points: [
                "Interface de triagem que envia o perfil do turista e o roteiro desejado para o WhatsApp da agência.",
                "Recuperação de carrinhos abandonados via WhatsApp IA.",
                "Geração e envio imediato do cartão de embarque após a confirmação da reserva."
              ],
              icon: <Car className="text-[#E5E4E2] drop-shadow-[0_0_15px_rgba(160,32,240,0.6)]" size={32}/> 
            },
            { 
              title: "GASTRONÔMICA", 
              subtitle: "Pedidos diretos e eliminação de taxas de aplicativos.",
              points: [
                "Canal de vendas próprio para eliminar comissões de plataformas de entrega (iFood).",
                "Interface de autoatendimento com sugestão de adicionais embutida no fluxo de compra.",
                "Sincronização de comandas para redução de tempo de espera e erros de anotação."
              ],
              icon: <Utensils className="text-[#E5E4E2] drop-shadow-[0_0_15px_rgba(160,32,240,0.6)]" size={32}/> 
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="relative p-6 md:p-8 bg-white/5 backdrop-blur-3xl border border-[#A020F0]/30 rounded-2xl overflow-hidden group hover:border-[#A020F0]/80 transition-all duration-500 animate-pulse-neon"
            >
              {/* Icon Header */}
              <div className="mb-6">
                {item.icon}
              </div>
              
              {/* Titles */}
              <h3 className="text-lg md:text-xl font-black mb-2 tracking-[1px] uppercase text-white">{item.title}</h3>
              <p className="text-[#A020F0] font-bold text-[10px] md:text-xs tracking-[1px] md:tracking-[2px] mb-6 md:mb-8 uppercase">{item.subtitle}</p>
              
              {/* Points */}
              <ul className="space-y-3 md:space-y-4">
                {item.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="text-[#A020F0] shrink-0 mt-1" size={14} />
                    <span className="text-gray-300 text-xs md:text-sm font-light leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#A020F0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEÇÃO: PROTOCOLOS DE ELITE (Diferencial Tático) */}
      <section className="py-16 md:py-24 px-4 md:px-6 relative z-10 bg-black/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-black tracking-[2px] text-white border-l-4 border-[#A020F0] pl-4">ENGENHARIA DE VENDAS</h3>
            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
              Substitua modelos genéricos por processos validados. Não fazemos barulho, instalamos sistemas que colocam <span className="text-white font-bold">dinheiro novo no caixa</span>.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-black tracking-[2px] text-white border-l-4 border-[#A020F0] pl-4">OPERAÇÃO 24H</h3>
            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
              Sua unidade física tem horário para fechar, mas a presença digital não. Atendemos parceiros de madrugada, transformando tempo ocioso em receita.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-black tracking-[2px] text-white border-l-4 border-[#A020F0] pl-4">ESPECIALISTAS DE CAMPO</h3>
            <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
              Controle de Ponta a Ponta. Mapeamos os gargalos operacionais da base da gastronomia à gestão hoteleira. Nossa tecnologia erradica erros de pedido em horários de pico e automatiza a recepção para maximizar o lucro por cliente.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <div className="relative group inline-block">
            {/* Neon Pulse Effect - Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[120%] bg-gradient-to-r from-[#A020F0] via-fuchsia-500 to-[#A020F0] rounded-sm opacity-50 blur-md group-hover:opacity-80 group-hover:blur-lg transition-all duration-500 animate-pulse"></div>
            
            <button 
              onClick={() => {
                setModalStep(1);
                setIsModalOpen(true);
              }}
              className="relative bg-white text-black hover:bg-[#A020F0] hover:text-white px-8 py-3 rounded-sm text-sm font-bold transition-all duration-300 uppercase tracking-[2px] shadow-[0_0_30px_rgba(160,32,240,0.5)] z-10"
            >
              Contratar Marketelli
            </button>
          </div>
        </div>
      </section>



      {/* SEÇÃO: A AUTORIDADE (SOBRE) */}
      <section className="py-16 md:py-24 px-4 md:px-6 relative z-10 bg-black/50 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 md:gap-16">
          {/* Título e Subtítulo no Topo */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-black tracking-[3px] md:tracking-[5px] text-white uppercase">Conselho de <span className="text-white">Estratégia e Tecnologia</span></h2>
            <p className="text-[#A020F0] text-[10px] md:text-xs font-bold tracking-[2px] md:tracking-[3px] uppercase">Os sócios por trás do resultado</p>
          </div>

          {/* Container de Imagens no Meio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-4xl mx-auto">
            {/* Imagem do Lucas */}
            <div className="w-full relative group flex flex-col items-center">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#A020F0]/20 to-[#A020F0]/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 group-hover:border-[#A020F0]/50 transition-colors duration-500">
                <img 
                  src="/lucas.png" 
                  alt="Lucas - Marketelli" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </div>
              <div className="mt-4 text-center z-10">
                <h4 className="text-white font-black tracking-[2px] text-sm uppercase">LUCAS</h4>
                <p className="text-[#A020F0] text-[10px] font-bold tracking-[1px] uppercase">Fundador & Estrategista</p>
              </div>
            </div>

            {/* Imagem da Monaliza */}
            <div className="w-full relative group flex flex-col items-center">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#A020F0]/20 to-[#A020F0]/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 group-hover:border-[#A020F0]/50 transition-colors duration-500">
                <img 
                  src="/monaliza.jpg" 
                  alt="Monaliza - Marketelli" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </div>
              <div className="mt-4 text-center z-10">
                <h4 className="text-white font-black tracking-[2px] text-sm uppercase">MONALIZA</h4>
                <p className="text-[#A020F0] text-[10px] font-bold tracking-[1px] uppercase">Social Media, Webdesigner e Criativos</p>
              </div>
            </div>

            {/* Imagem do Tony */}
            <div className="w-full relative group flex flex-col items-center">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#A020F0]/20 to-[#A020F0]/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 group-hover:border-[#A020F0]/50 transition-colors duration-500">
                <img 
                  src="/tony.webp" 
                  alt="Tony - Marketelli" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </div>
              <div className="mt-4 text-center z-10">
                <h4 className="text-white font-black tracking-[2px] text-sm uppercase">TONY</h4>
                <p className="text-[#A020F0] text-[10px] font-bold tracking-[1px] uppercase">IA & Programação</p>
              </div>
            </div>

            {/* Imagem do Pedro */}
            <div className="w-full relative group flex flex-col items-center">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#A020F0]/20 to-[#A020F0]/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 group-hover:border-[#A020F0]/50 transition-colors duration-500">
                <img 
                  src="/Pedro.webp" 
                  alt="Pedro - Marketelli" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </div>
              <div className="mt-4 text-center z-10">
                <h4 className="text-white font-black tracking-[2px] text-sm uppercase">PEDRO</h4>
                <p className="text-[#A020F0] text-[10px] font-bold tracking-[1px] uppercase">Tráfego Pago</p>
              </div>
            </div>
          </div>

          {/* Conteúdo Textual Abaixo das Imagens */}
          <div className="w-full max-w-4xl mx-auto space-y-6 md:space-y-8 text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-xs md:text-sm">
              <div className="space-y-3 md:space-y-4">
                <h4 className="font-black text-white tracking-[1px] md:tracking-[2px] border-l-2 border-[#A020F0] pl-4 uppercase text-center md:text-left">Sobre o Fundador</h4>
                <p className="text-gray-400 leading-relaxed font-light text-center md:text-left">
                  Comecei no operacional de lanchonetes e foodtrucks, onde a agilidade determina o lucro. Aprendi inglês por conta própria para dominar o setor e migrei para a gestão de hotéis de alto padrão.
                  <br /><br />
                  Com mais de 13 anos de experiência, não apenas opero o negócio, eu domino os sistemas que o fazem rodar (Desbravador e Bitz). Identifiquei que o mercado de turismo e hotelaria falha onde eu me especializei: na união entre processos que não erram e tecnologia que escala. Na Marketelli, eu entrego a engenharia que eu mesmo usei para transformar operações manuais em ativos digitais lucrativos.
                </p>
              </div>
              <div className="space-y-3 md:space-y-4">
                <h4 className="font-black text-white tracking-[1px] md:tracking-[2px] border-l-2 border-[#A020F0] pl-4 uppercase text-center md:text-left">Autoridade Consolidada</h4>
                <p className="text-gray-400 leading-relaxed font-light text-center md:text-left">
                  Dominamos os principais sistemas de gestão do mercado. Não trazemos teorias, trazemos a união entre <span className="text-white font-bold">processos organizados e excelência digital</span>.
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-white/5 backdrop-blur-3xl border border-[#A020F0]/30 rounded-xl relative group animate-pulse-neon mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#A020F0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-lg md:text-xl font-black text-white tracking-[1px] md:tracking-[2px] mb-4 uppercase">O Diferencial <span className="animate-pulse-neon-text">Marketelli</span></h3>
              <p className="text-gray-300 italic font-light leading-relaxed text-sm md:text-base">
                "Diferente de agências que só conhecem a teoria, nós operamos com o Ecossistema Marketelli: Agentes de IA treinados para agir como seus melhores funcionários, integrando marketing com a lógica real do seu negócio para vender 24h por dia."
              </p>
            </div>

            <div className="flex justify-center">
              <div className="relative group inline-block">
                {/* Neon Pulse Effect - Behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[120%] bg-gradient-to-r from-[#A020F0] via-fuchsia-500 to-[#A020F0] rounded-lg opacity-50 blur-md group-hover:opacity-80 group-hover:blur-lg transition-all duration-500 animate-pulse"></div>
                
                <button 
                  onClick={() => {
                    setModalStep(1);
                    setIsModalOpen(true);
                  }}
                  className="relative bg-[#A020F0] hover:bg-[#A020F0]/80 text-white px-8 py-3 rounded-lg text-sm font-bold transition-colors uppercase tracking-[1px] shadow-[0_0_30px_rgba(160,32,240,0.5)] z-10"
                >
                  Consultar Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: FEED DE OPERAÇÕES (COMENTÁRIOS VIVOS ROTATIVOS) */}
      <section className="py-16 md:py-24 px-4 md:px-6 relative z-10 max-w-4xl mx-auto overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-2xl font-black tracking-[4px] md:tracking-[6px] uppercase text-white mb-2">Clientes Satisfeitos</h2>
          <p className="text-[#A020F0] text-[10px] font-bold tracking-[2px] uppercase animate-pulse">● veja os Comentários</p>
        </div>

        <div className="relative min-h-[250px] md:min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeComment}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full flex justify-center items-center group"
            >
              {/* Balão de Comentário */}
              <div className="w-full max-w-2xl bg-white/[0.03] backdrop-blur-md border border-[#A020F0]/30 p-6 md:p-8 rounded-2xl group-hover:border-[#A020F0]/60 transition-all duration-500 relative animate-pulse-neon">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-white font-bold text-sm md:text-base tracking-[1px]">{liveComments[activeComment].author}</h4>
                    <p className="text-[10px] text-[#A020F0] font-medium uppercase tracking-[1px] mb-1">{liveComments[activeComment].role}</p>
                    <div className="flex gap-0.5">
                      {[...Array(liveComments[activeComment].rating)].map((_, i) => (
                        <Star key={i} size={10} className="fill-[#FFD700] text-[#FFD700]" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[9px] text-white font-mono">{liveComments[activeComment].time}</span>
                </div>
                <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-light italic">
                  "{liveComments[activeComment].text}"
                </p>
                
                {/* Indicador de progresso da rotatividade */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-[#A020F0]/30 w-full overflow-hidden">
                  <motion.div 
                    key={`bar-${activeComment}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-[#A020F0]"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controles Laterais Sutis */}
          <div className="absolute -left-2 md:-left-12 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            <button 
              onClick={() => setActiveComment((prev) => (prev - 1 + liveComments.length) % liveComments.length)}
              className="p-2 text-gray-600 hover:text-[#A020F0] transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
          <div className="absolute -right-2 md:-right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            <button 
              onClick={() => setActiveComment((prev) => (prev + 1) % liveComments.length)}
              className="p-2 text-gray-600 hover:text-[#A020F0] transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Paginação em Pontos */}
        <div className="flex justify-center gap-2 mt-12 opacity-0 pointer-events-none">
          {liveComments.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveComment(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeComment === i ? 'bg-[#A020F0] w-6' : 'bg-white/10'}`}
            />
          ))}
        </div>
      </section>

      {/* FOOTER: OPERAÇÃO GLOBAL */}
      <footer className="py-4 md:py-6 px-4 md:px-6 border-t border-[#A020F0]/20 bg-black/40 backdrop-blur-3xl relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Brand & Mission */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <p className="text-gray-500 text-[6px] md:text-[7px] tracking-[1px] md:tracking-[2px] leading-relaxed uppercase max-w-[180px]">
              Implementamos os sistemas que o mercado de elite exige: segurança absoluta, automação real e lucro previsível.
            </p>
          </div>

          {/* Center: Legal & Status */}
          <div className="flex flex-col items-center gap-4 pt-2 border-t md:border-t-0 border-white/5 w-full md:w-auto">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-3">
                <img src="/Marketellilogo.png" alt="Logo" className="w-6 h-6 object-contain" />
                <span className="text-base md:text-lg font-black tracking-[3px] md:tracking-[5px] animate-pulse-neon-text uppercase">MARKETELLI</span>
              </div>
              <span className="text-[5px] md:text-[6px] tracking-[2px] md:tracking-[4px] text-[#A020F0] uppercase">Soluções • Resultados • Tecnologia</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <button 
                onClick={() => setCurrentPage('policies')} 
                className="text-[8px] text-[#FFD700] hover:text-white transition-colors uppercase tracking-[1px] font-bold"
              >
                Termos de Uso / Privacidade
              </button>
              <p className="text-[8px] tracking-[1px] text-gray-600 uppercase text-center">© 2026 MARKETELLI | Direitos Reservados</p>
              
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[8px] text-green-500 font-bold tracking-[1px] uppercase">Sistemas Online</span>
                <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse-prism"></div>
              </div>
            </div>
          </div>

          {/* Contact & Status - Stacked on the right */}
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <button 
              onClick={() => {
                setModalStep(1);
                setIsModalOpen(true);
              }}
              className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300"
            >
              <span className="text-[10px] font-bold tracking-[1px] text-right">Whatsapp</span>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-[0_2px_8px_rgba(34,197,94,0.3)] border border-white/20">
                <MessageCircle size={11} className="text-white" />
              </div>
            </button>

            <a href="mailto:atendimento@marketelli.com" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300">
              <span className="text-[10px] font-bold tracking-[1px] text-right">E-mail</span>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-[0_2px_8px_rgba(59,130,246,0.3)] border border-white/20">
                <Mail size={11} className="text-white" />
              </div>
            </a>

            <a href="https://instagram.com/marktelli_" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300">
              <span className="text-[10px] font-bold tracking-[1px] text-right">Instagram</span>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center shadow-[0_2px_8px_rgba(230,104,60,0.3)] border border-white/20">
                <Instagram size={11} className="text-white" />
              </div>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketelliOfficial;