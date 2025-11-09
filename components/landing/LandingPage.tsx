
import React, { useState } from 'react';
import { View } from '../../types';
import Button from '../shared/Button';
import Card from '../shared/Card';
// FIX: Import CheckCircleIcon to resolve 'Cannot find name' errors.
import { Logo, MenuIcon, XIcon, ShieldIcon, ZapIcon, FileTextIcon, PenSquareIcon, CloudIcon, StarIcon, CheckCircleIcon } from '../icons';

interface LandingPageProps {
  onNavigate: (view: View) => void;
}

const Header: React.FC<LandingPageProps & { isScrolled: boolean }> = ({ onNavigate, isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Como Funciona', href: '#how-it-works' },
    { name: 'Vantagens', href: '#features' },
    { name: 'Planos', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];
  
  const headerClass = isScrolled 
    ? 'bg-white/80 backdrop-blur-sm shadow-md text-brand-dark' 
    : 'bg-transparent text-white';
  
  const linkClass = isScrolled ? 'hover:text-brand-primary' : 'hover:text-gray-200';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${headerClass}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={`font-medium ${linkClass} transition-colors`}>
              {link.name}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
             <button onClick={() => onNavigate(View.LOGIN)} className={`font-semibold ${linkClass}`}>
                Já sou cadastrado
            </button>
            <Button size="sm" onClick={() => onNavigate(View.REGISTER)}>
                Começar grátis
            </Button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg p-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-brand-dark text-center font-medium" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </a>
            ))}
            <Button variant="primary" size="md" className="w-full" onClick={() => { onNavigate(View.REGISTER); setIsMenuOpen(false); }}>
              Começar grátis
            </Button>
            <Button variant="outline" size="md" className="w-full" onClick={() => { onNavigate(View.LOGIN); setIsMenuOpen(false); }}>
              Já sou cadastrado
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <div className="bg-white font-sans text-brand-dark">
      <Header onNavigate={onNavigate} isScrolled={isScrolled} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-primary to-brand-secondary text-white pt-32 pb-20 md:pt-40 md:pb-28 text-center overflow-hidden">
        <div className="container mx-auto relative z-10 px-4">
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-4">
            Crie contratos profissionais em segundos
          </h1>
          <h2 className="font-sans text-lg md:text-xl max-w-3xl mx-auto font-light mb-8 text-indigo-100">
            A segurança que seu negócio precisa, sem burocracia. Gere, personalize e assine seus contratos online.
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" onClick={() => onNavigate(View.REGISTER)} className="bg-white text-brand-primary hover:bg-gray-100 shadow-lg">
              Gerar meu contrato grátis
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10" onClick={() => onNavigate(View.LOGIN)}>
              Já sou cadastrado
            </Button>
          </div>
          <p className="mt-8 text-sm text-indigo-200">Mais de 3.200 profissionais confiam na CriaContrato para proteger seus acordos.</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-brand-light">
        <div className="container mx-auto text-center px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-4">Como funciona o CriaContrato</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">Em apenas três etapas, você cria e envia contratos profissionais.</p>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 text-brand-secondary rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold font-display mb-6">1</div>
              <h3 className="text-xl font-bold mb-2">Escolha o tipo de contrato</h3>
              <p className="text-gray-600">Prestador, freelance, parceria, etc.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 text-brand-secondary rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold font-display mb-6">2</div>
              <h3 className="text-xl font-bold mb-2">Personalize as cláusulas</h3>
              <p className="text-gray-600">Edite com IA e adicione suas condições.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 text-brand-secondary rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold font-display mb-6">3</div>
              <h3 className="text-xl font-bold mb-2">Baixe ou assine digitalmente</h3>
              <p className="text-gray-600">Pronto para enviar ao cliente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto text-center px-4">
           <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-dark mb-16">Por que escolher o CriaContrato</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[{icon: <ShieldIcon className="h-8 w-8 text-brand-primary"/>, text: "Segurança Jurídica"}, {icon: <ZapIcon className="h-8 w-8 text-brand-primary"/>, text: "Rapidez e Praticidade"}, {icon: <FileTextIcon className="h-8 w-8 text-brand-primary"/>, text: "Modelos Revisados"}, {icon: <PenSquareIcon className="h-8 w-8 text-brand-primary"/>, text: "Assinatura Digital"}, {icon: <CloudIcon className="h-8 w-8 text-brand-primary"/>, text: "Backup na Nuvem"}].map(feature => (
              <div key={feature.text} className="flex flex-col items-center p-4 rounded-lg transition hover:bg-gray-50">
                <div className="bg-blue-100 p-4 rounded-full mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-center">{feature.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-brand-dark mb-12">O que dizem nossos usuários</h2>
          <div className="grid md:grid-cols-3 gap-8">
             <Card>
              <div className="flex text-yellow-400 mb-2"><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>
              <p className="text-gray-700 mb-4 italic">"Levava 2h pra montar um contrato. Agora levo 2 minutos."</p>
              <p className="font-bold">- Ana Lima, Designer</p>
            </Card>
            <Card>
              <div className="flex text-yellow-400 mb-2"><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>
              <p className="text-gray-700 mb-4 italic">"Passei a fechar contratos com mais confiança e profissionalismo."</p>
              <p className="font-bold">- Rafael Moreira, Consultor</p>
            </Card>
            <Card>
              <div className="flex text-yellow-400 mb-2"><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>
              <p className="text-gray-700 mb-4 italic">"Meus clientes elogiam o formato dos contratos. É lindo e rápido!"</p>
              <p className="font-bold">- Beatriz Costa, Fotógrafa</p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-brand-dark mb-4">Escolha seu plano e comece hoje</h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">Cancele quando quiser. Sem multas ou fidelidade.</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="flex flex-col">
              <h3 className="text-2xl font-bold text-brand-dark">Start</h3>
              <p className="font-display text-4xl font-bold my-4">R$29<span className="text-lg font-sans font-medium text-gray-500">/mês</span></p>
              <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Geração ilimitada</li>
                <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Marca d’água "CriaContrato"</li>
                <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Suporte por e-mail</li>
              </ul>
              <Button variant="outline" className="w-full" onClick={() => onNavigate(View.REGISTER)}>Começar agora</Button>
            </Card>
            <Card highlight className="flex flex-col bg-indigo-50 border-brand-secondary">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-brand-dark">Pro</h3>
                <span className="bg-brand-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">MAIS POPULAR</span>
              </div>
              <p className="font-display text-4xl font-bold my-4">R$59<span className="text-lg font-sans font-medium text-gray-500">/mês</span></p>
              <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Tudo do plano Start</li>
                <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Sem marca d'água</li>
                <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0" /> IA de cláusulas personalizada</li>
                <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Modelos premium</li>
              </ul>
              <Button variant="secondary" className="w-full" onClick={() => onNavigate(View.REGISTER)}>Assinar plano Pro</Button>
            </Card>
            <Card className="flex flex-col">
              <h3 className="text-2xl font-bold text-brand-dark">Business</h3>
              <p className="font-display text-4xl font-bold my-4">R$99<span className="text-lg font-sans font-medium text-gray-500">/mês</span></p>
               <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Tudo do plano Pro</li>
                <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Assinaturas digitais ilimitadas</li>
                <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Equipe com até 5 usuários</li>
                <li className="flex items-center"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0" /> Integração com Google Drive</li>
              </ul>
              <Button variant="outline" className="w-full" onClick={() => onNavigate(View.REGISTER)}>Assinar Business</Button>
            </Card>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-brand-light">
          <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-brand-dark mb-12">Dúvidas Frequentes</h2>
              <div className="space-y-4">
                  {[
                      { q: "Posso gerar contratos de qualquer tipo?", a: "Sim. Temos modelos para prestadores de serviço, freelancers, parcerias e muito mais, todos revisados por especialistas." },
                      { q: "Como funciona a assinatura digital?", a: "Você pode baixar o PDF e usar qualquer serviço de assinatura digital com validade jurídica, ou usar nossa integração nos planos Business." },
                      { q: "Preciso ser advogado para usar?", a: "Não! A plataforma foi feita para profissionais que precisam de segurança jurídica sem a complexidade." },
                      { q: "O primeiro contrato é realmente gratuito?", a: "Sim. Você pode gerar seu primeiro contrato gratuitamente para testar. Ele virá com a marca d'água da CriaContrato." },
                  ].map(faq => (
                      <details key={faq.q} className="bg-white p-4 rounded-lg shadow-sm cursor-pointer">
                          <summary className="font-semibold text-lg">{faq.q}</summary>
                          <p className="mt-2 text-gray-600">{faq.a}</p>
                      </details>
                  ))}
              </div>
          </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-brand-secondary to-brand-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 max-w-3xl mx-auto">Comece agora a proteger seus acordos com segurança e profissionalismo.</h2>
              <Button size="lg" className="bg-white text-brand-primary hover:bg-gray-100 shadow-lg" onClick={() => onNavigate(View.REGISTER)}>
                Gerar meu contrato agora — grátis
              </Button>
              <p className="mt-4 text-sm text-indigo-200">Crie, edite e assine em menos de 2 minutos. Sem complicação.</p>
          </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white">
        <div className="container mx-auto py-12 px-4 text-center">
          <Logo className="mx-auto mb-4" />
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 my-6 text-gray-300">
            <a href="#" className="hover:text-white">Início</a>
            <a href="#pricing" className="hover:text-white">Planos</a>
            <a href="#" className="hover:text-white">Termos de Uso</a>
            <a href="#" className="hover:text-white">Política de Privacidade</a>
            <a href="#" onClick={(e) => {e.preventDefault(); onNavigate(View.LOGIN)}} className="hover:text-white">Login</a>
          </div>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto mb-6">CriaContrato é o gerador de contratos online mais simples e confiável do Brasil. Ideal para freelancers, prestadores de serviço e pequenas empresas.</p>
          <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} CriaContrato.com.br — Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
