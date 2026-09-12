import { FormEvent, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Heart,
  Mail,
  Menu,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";

const STORAGE = "/manus-storage/";
const whatsapp =
  "https://wa.me/5527995126041?text=Ol%C3%A1!%20Vim%20pela%20DigitalQuintino%20e%20gostaria%20de%20conhecer%20os%20e-books%20dispon%C3%ADveis.";

const products = [
  {
    tag: "NOVO NA COLEÇÃO",
    category: "RESPONSABILIDADE PESSOAL",
    title: "Vá cuidar da sua vida",
    description:
      "Um livro direto, provocador e sem anestesia para quem cansou de esperar a vida acontecer. Um convite para sair do ruído e assumir o comando da própria história.",
    bullets: ["31 confrontos para transformar consciência em atitude", "Exercícios práticos para recuperar foco e clareza", "Leitura digital em português com acesso imediato"],
    image: `${STORAGE}vacuidar-cover_c061caad.jpg`,
    imageClass: "portrait",
    panel: "midnight",
    href: "https://go.hotmart.com/E107584023H",
    message:
      "Olá! Quero saber mais sobre o e-book “Vá cuidar da sua vida”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
    details: {
      subtitle: "A frase que parece um corte. Mas pode ser o começo da sua liberdade.",
      author: "Pablo Marçal",
      takeaways: ["Identificar os padrões de autossabotagem", "Recuperar energia, foco e clareza para decidir", "Parar de gastar sua vida cuidando do que não é seu", "Transformar desconforto em combustível para agir", "Construir uma relação mais adulta com seus desejos", "Sair da espera e assumir o comando da própria história"],
      chapters: ["Onde tudo começou", "O seu maior inimigo", "A prosperidade é natural", "Bloqueios emocionais", "Seja o seu próprio coach", "A arte de ser ridículo", "Vá para a guerra!", "Máscara social", "O leme do navio", "O que fazer agora?"],
    },
  },
  {
    tag: "MAIS ACOLHEDOR",
    category: "GUIA PRÁTICO PARA PAIS",
    title: "Ensinando a Criança a Orar",
    description:
      "Um caminho simples, amoroso e possível para fazer da oração um momento especial na rotina da sua família.",
    bullets: ["Atividades para o dia a dia", "Orações simples para cada idade", "Acesso imediato e garantia de 7 dias"],
    image: `${STORAGE}mockup-orar_184c3bd6.png`,
    imageClass: "wide",
    panel: "sage",
    href: "https://go.hotmart.com/P107153571O",
    message:
      "Olá! Quero saber mais sobre o e-book “Ensinando a Criança a Orar”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
  },
  {
    tag: "OFERTA ESPECIAL",
    category: "SABEDORIA CRISTÃ ATEMPORAL",
    title: "A Paz do Diabo",
    description:
      "Descubra como reconhecer a falsa paz, fortalecer sua vigilância e descansar na paz que só Deus oferece.",
    bullets: ["6 capítulos transformadores", "Guia de estudo + plano de 30 dias", "Devocional e audiobook inclusos"],
    image: `${STORAGE}mockup-paz_704e55e2.png`,
    imageClass: "wide",
    panel: "olive",
    href: "https://go.hotmart.com/R106774018S",
    message:
      "Olá! Quero saber mais sobre o e-book “A Paz do Diabo”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
  },
  {
    tag: "NOVO NA COLEÇÃO",
    category: "ESTUDO BÍBLICO APLICADO",
    title: "Os 5 Princípios do Filho Pródigo",
    description:
      "Uma leitura profunda e prática de Lucas 15 para transformar culpa em consciência, distância em retorno e fé em um novo começo.",
    bullets: ["Leitura guiada de Lucas 15:11–32", "Perguntas para reflexão pessoal", "Aplicações práticas para decisões"],
    image: `${STORAGE}mockup-retorno_d41131de.png`,
    imageClass: "wide",
    panel: "sand",
    href: "https://go.hotmart.com/M107485063L",
    message:
      "Olá! Quero saber mais sobre o e-book “Os 5 Princípios do Filho Pródigo”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
  },
  {
    tag: "PARA COMEÇAR HOJE",
    category: "HÁBITOS NATURAIS E BEM-ESTAR",
    title: "Detox Perfeito",
    description:
      "Um guia direto para criar uma rotina mais leve, ativa e saudável com receitas e passos que cabem na vida real.",
    bullets: ["8 capítulos de desintoxicação natural", "Receitas fáceis e plano passo a passo", "Cupom DETOXAGORA: 15% OFF"],
    image: `${STORAGE}mockup-detox_7ccf51d0.png`,
    imageClass: "wide",
    panel: "cream",
    href: "https://go.hotmart.com/K106566519N",
    message:
      "Olá! Quero saber mais sobre o e-book “Detox Perfeito”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
  },
  {
    tag: "LEITURA REFLEXIVA",
    category: "LEITURA BÍBLICA E PENSAMENTO CRÍTICO",
    title: "A Bíblia que Você Não Leu",
    description:
      "Uma leitura para revisitar temas bíblicos com curiosidade, respeito e pensamento crítico, observando textos conhecidos por uma nova perspectiva.",
    bullets: ["Perguntas para olhar a Bíblia por outro ângulo", "Interpretações e reflexões com respeito", "Acesso digital imediato após a compra"],
    image: `${STORAGE}mockup-biblia-nao-leu_533d3dbd.jpg`,
    imageClass: "portrait",
    panel: "warm",
    href: "https://go.hotmart.com/U107490929E",
    message:
      "Olá! Quero saber mais sobre o e-book “A Bíblia que Você Não Leu”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
  },
  {
    tag: "NOVO COMEÇO",
    category: "JORNADA CRISTÃ DE TRANSFORMAÇÃO",
    title: "METANOIA",
    description:
      "Um caminho de 30 capítulos para sair do automático, reencontrar direção e caminhar com mais fé, propósito e esperança.",
    bullets: ["30 capítulos para caminhar no seu ritmo", "Reflexões sobre fé, propósito e esperança", "Leitura no celular, tablet ou computador"],
    image: `${STORAGE}mockup-metanoia_ed3ea7c7.jpg`,
    imageClass: "portrait",
    panel: "linen",
    href: "https://go.hotmart.com/X107511300K",
    message:
      "Olá! Quero saber mais sobre o e-book “METANOIA”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
  },
  {
    tag: "PARA SAIR DO AUTOMÁTICO",
    category: "CORAGEM POSSÍVEL E MOVIMENTO",
    title: "Antimedo",
    description:
      "Uma leitura direta para nomear o que paralisa, escolher um novo movimento e seguir em frente mesmo quando a segurança ainda não apareceu.",
    bullets: ["Reflexões objetivas sobre bloqueios emocionais", "Perguntas para escolher um novo passo", "Material digital em PDF com acesso imediato"],
    image: `${STORAGE}mockup-antimedo_412f13a4.jpg`,
    imageClass: "portrait",
    panel: "blue",
    href: "https://go.hotmart.com/B107533955S",
    message:
      "Olá! Quero saber mais sobre o e-book “Antimedo”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
  },
  {
    tag: "NOVO NA COLEÇÃO",
    category: "DESPERTAR E AUTOGOVERNO",
    title: "Sai do Caixão",
    description:
      "Um chamado para quebrar as regras dos zumbis, sair do automático e ativar os princípios do Criador.",
    bullets: ["26 princípios para ativar", "Leitura digital com acesso imediato", "Um mapa para voltar a viver"],
    image: `${STORAGE}saia-do-caixao-cover_638e7a05.svg`,
    imageClass: "portrait",
    panel: "dark-sage",
    href: "https://pay.hotmart.com/S107541237F",
    message:
      "Olá! Quero saber mais sobre o e-book “Sai do Caixão”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
  },
  {
    tag: "NOVO NA COLEÇÃO",
    category: "CONSCIÊNCIA, PROPÓSITO E PROSPERIDADE",
    title: "As 7 Leis Espirituais do Sucesso",
    description:
      "Um caminho de consciência, propósito e prosperidade para alinhar vida, escolhas e direção.",
    bullets: ["7 leis para uma vida mais consciente", "Reflexões sobre propósito e prosperidade", "Leitura digital com acesso imediato"],
    image: `${STORAGE}sete-capa_04872a83.jpg`,
    imageClass: "portrait",
    panel: "midnight",
    href: "https://pay.hotmart.com/T107544097M",
    message:
      "Olá! Quero saber mais sobre o e-book “As 7 Leis Espirituais do Sucesso”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
  },
  {
    tag: "NOVO NA COLEÇÃO",
    category: "LEITURA GUIADA · AUTOCONHECIMENTO",
    title: "Quebrando o Hábito de Ser Você Mesmo",
    description:
      "Uma jornada de reflexão sobre mente, cérebro, meditação e os padrões que moldam a sua experiência diária.",
    bullets: ["14 capítulos para explorar", "4 semanas de prática", "Um novo ponto de partida"],
    image: `${STORAGE}quebrando-o-habito-cover_771e133b.svg`,
    imageClass: "portrait",
    panel: "stone",
    href: "https://pay.hotmart.com/U107546962B",
    message:
      "Olá! Quero saber mais sobre o e-book “Quebrando o Hábito de Ser Você Mesmo”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
  },
  {
    tag: "NOVO NA COLEÇÃO",
    category: "HÁBITOS NATURAIS E BEM-ESTAR",
    title: "10 Sucos Detox Exterminadores de Gordura",
    description:
      "Um guia prático com 10 receitas de sucos detox para deixar sua rotina mais fresca, nutritiva e possível.",
    bullets: ["10 receitas detox variadas", "Preparo descomplicado para a vida real", "Acesso digital pela Hotmart"],
    image: `${STORAGE}10-sucos-detox-cover_05ce5628.svg`,
    imageClass: "portrait",
    panel: "green",
    href: "https://pay.hotmart.com/V107548340T",
    message:
      "Olá! Quero saber mais sobre o e-book “10 Sucos Detox Exterminadores de Gordura”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
  },
];

const readingNotes = [
  ["Vá cuidar da sua vida", "Um chamado para assumir o comando"],
  ["Ensinando a Criança a Orar", "Uma leitura para compartilhar em família"],
  ["A Paz do Diabo", "Reflexões para levar com você"],
  ["Os 5 Princípios do Filho Pródigo", "Um caminho de volta ao essencial"],
  ["Detox Perfeito", "Hábitos leves, onde você estiver"],
  ["A Bíblia que Você Não Leu", "Perguntas para olhar a fé com mais clareza"],
  ["METANOIA", "Um capítulo de cada vez"],
  ["Antimedo", "O próximo movimento começa agora"],
  ["Sai do Caixão", "26 princípios para ativar"],
  ["As 7 Leis Espirituais do Sucesso", "Consciência, propósito e prosperidade"],
  ["Quebrando o Hábito de Ser Você Mesmo", "Um novo ponto de partida"],
  ["10 Sucos Detox Exterminadores de Gordura", "Mais sabor, mais leveza, mais você"],
];

function Brand() {
  return (
    <span className="brand" aria-label="DigitalQuintino">
      <span className="brand-mark">D</span>
      <span>
        Digital<span>Quintino</span>
      </span>
    </span>
  );
}

function SectionHeading({ eyebrow, children, body, centered = false }: { eyebrow: string; children: React.ReactNode; body?: string; centered?: boolean }) {
  return (
    <div className={`section-heading ${centered ? "centered" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const contactHref = `${whatsapp}%20${encodeURIComponent(product.message)}`;
  return (
    <article className="product-card">
      <div className={`card-visual ${product.panel}`}>
        <span className="card-tag">{product.tag}</span>
        <img className={`card-cover ${product.imageClass}`} src={product.image} alt={`Mockup de ${product.title}`} />
      </div>
      <div className="card-body">
        <span className="eyebrow">{product.category}</span>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <ul className="card-list">
          {product.bullets.map((bullet) => (
            <li key={bullet}><Check size={13} /> {bullet}</li>
          ))}
        </ul>
        {"details" in product && product.details && (
          <details className="product-more">
            <summary>Ver conteúdo completo <ChevronDown size={14} /></summary>
            <div className="product-more-body">
              <p className="product-subtitle">{product.details.subtitle}</p>
              <p><strong>Autor:</strong> {product.details.author}</p>
              <span className="product-more-label">O que você leva</span>
              <ul>{product.details.takeaways.map((item) => <li key={item}><Check size={12} /> {item}</li>)}</ul>
              <span className="product-more-label">Capítulos</span>
              <ol>{product.details.chapters.map((chapter) => <li key={chapter}>{chapter}</li>)}</ol>
            </div>
          </details>
        )}
        <div className="card-bottom">
          <span className="micro-label">CONTEÚDO DIGITAL</span>
          <strong>Acesso <span>imediato pela Hotmart</span></strong>
          <div className="card-actions">
            <a className="button button-coral" href={product.href} target="_blank" rel="noreferrer">Conhecer o e-book <ArrowRight size={14} /></a>
            <a className="card-whatsapp" href={contactHref} target="_blank" rel="noreferrer"><MessageCircle size={14} /> Quero tirar uma dúvida sobre este livro</a>
          </div>
        </div>
      </div>
    </article>
  );
}

function PromiseStrip() {
  const promises = [
    [ShieldCheck, "Compra segura", "Pagamento protegido"],
    [Zap, "Acesso imediato", "Leia em qualquer dispositivo"],
    [Heart, "7 dias de garantia", "Você compra sem risco"],
    [Users, "Suporte próximo", "Fale direto pelo WhatsApp"],
  ] as const;
  return (
    <section className="promise-strip" aria-label="Benefícios">
      {promises.map(([Icon, title, text]) => (
        <div className="promise" key={title}><Icon size={18} /><div><strong>{title}</strong><span>{text}</span></div></div>
      ))}
    </section>
  );
}

function Testimonials() {
  return (
    <>
      <div className="testimonials-heading">
        <div><span className="eyebrow">Leituras que deixam marcas bonitas</span><h2>Quem lê, <em>compartilha.</em></h2></div>
        <p>Experiências de leitores que encontraram na coleção um ponto de partida para cuidar do que importa.</p>
      </div>
      <div className="testimonials-grid">
        <blockquote><div className="stars">★★★★★</div><p>“É simples, bonito e possível. A leitura entrou na nossa rotina sem pesar.”</p><footer><span className="testimonial-person coral-avatar">J</span><span><strong>Juliana M.</strong><small>leitora da coleção</small></span></footer></blockquote>
        <blockquote className="testimonial-highlight"><div className="stars">★★★★★</div><p>“Encontrei exatamente o tipo de conteúdo que eu precisava naquele momento.”</p><footer><span className="testimonial-person gold-avatar">M</span><span><strong>Marcos A.</strong><small>leitor da coleção</small></span></footer></blockquote>
        <blockquote><div className="stars">★★★★★</div><p>“A linguagem acolhe e, ao mesmo tempo, provoca mudanças práticas.”</p><footer><span className="testimonial-person olive-avatar">A</span><span><strong>Ana C.</strong><small>leitora da coleção</small></span></footer></blockquote>
      </div>
    </>
  );
}

function HeroArt() {
  return (
    <div className="hero-art" aria-label="Mockups dos e-books da coleção">
      <div className="hero-orb" />
      <span className="hero-note note-one">feito para você <Heart size={12} fill="currentColor" /></span>
      <div className="hero-book-back" aria-label="Mockup de A Paz do Diabo">
        <div className="book-cover hero-cover olive"><div className="cover-shine" /><div className="cover-top"><span>DigitalQuintino</span><span>e-book</span></div><small>sabedoria cristã atemporal</small><strong>A Paz do<br />Diabo</strong><i>Um guia para viver melhor</i></div>
      </div>
      <div className="hero-book-front" aria-label="Mockup de Ensinando a Criança a Orar">
        <div className="book-cover hero-cover coral"><div className="cover-shine" /><div className="cover-top"><span>DigitalQuintino</span><span>e-book</span></div><small>guia prático para pais</small><strong>Ensinando<br />a Criança a<br />Orar</strong><i>Um guia para viver melhor</i></div>
      </div>
      <span className="hero-note note-two">leitura com propósito <Sparkles size={12} /></span>
    </div>
  );
}

function LeadCapture() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <section className="lead-capture" id="digitalquintino-lead-capture">
      <div className="lead-capture-inner">
        <div className="lead-capture-copy"><span className="eyebrow">RECEBA NOVIDADES DA COLEÇÃO</span><h2>Uma leitura certa pode chegar no seu <em>momento.</em></h2><p>Deixe seu contato para receber novidades, lançamentos e conteúdos selecionados da DigitalQuintino.</p></div>
        <form className="lead-capture-form" onSubmit={submit}>
          <label htmlFor="lead-name">Seu nome</label><input required id="lead-name" placeholder="Como podemos chamar você?" type="text" />
          <label htmlFor="lead-email">Seu melhor e-mail</label><input required id="lead-email" placeholder="voce@email.com" type="email" />
          <button className="lead-capture-submit" type="submit">{sent ? "Contato recebido" : "Quero receber novidades"} <Mail size={15} /></button>
          <small className="lead-capture-privacy">Seus dados serão usados apenas para comunicação da DigitalQuintino.</small>
          {sent && <span className="lead-capture-status" role="status">Obrigado. Em breve você receberá novidades da coleção.</span>}
        </form>
      </div>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main>
      <a className="skip-link" href="#colecao">Pular para a coleção</a>
      <div className="announcement">CONTEÚDO QUE CABE NA VIDA REAL <span>—</span> ACESSO DIGITAL IMEDIATO <span>·</span> COMPRA SEGURA</div>
      <header className="site-header" id="inicio">
        <a className="brand-link" href="#inicio"><Brand /></a>
        <nav className={menuOpen ? "open" : ""} aria-label="Navegação principal">
          <a href="#colecao" onClick={() => setMenuOpen(false)}>Coleção</a><a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a><a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a>
        </nav>
        <a className="header-contact" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={15} /> Falar com a gente</a>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="inicio-hero">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="hero-copy"><span className="eyebrow">LEITURAS QUE DEIXAM MARCAS BONITAS</span><h1>Um bom livro pode mudar o jeito de <em>viver o dia.</em></h1><p>Escolha uma leitura para cuidar da sua fé, da sua família ou do seu bem-estar. E-books práticos, profundos e feitos para acompanhar você.</p><div className="hero-actions"><a className="button button-dark" href="#colecao">Explorar a coleção <ArrowRight size={15} /></a><a className="text-link" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Tirar uma dúvida</a></div><div className="avatar-stack"><span className="avatar coral-avatar">J</span><span className="avatar gold-avatar">M</span><span className="avatar olive-avatar">A</span><span className="avatar forest-avatar">+</span><span>Leituras escolhidas por famílias reais</span></div></div>
        <HeroArt />
      </section>
      <PromiseStrip />

      <section className="collection section-shell" id="colecao">
        <SectionHeading eyebrow="A COLEÇÃO DIGITALQUINTINO" body="Doze leituras para momentos diferentes. Você escolhe o tema, conhece a proposta e segue para a Hotmart quando estiver pronto.">Escolha a próxima <em>página.</em></SectionHeading>
        <div className="product-grid">{products.map((product) => <ProductCard product={product} key={product.title} />)}</div>
        <Testimonials />
      </section>

      <section className="reading-section">
        <div className="section-shell reading-shell"><SectionHeading eyebrow="ACESSO QUE ACOMPANHA VOCÊ" body="Seja no tablet durante uma pausa ou no celular a caminho de casa, seus e-books estão sempre por perto — prontos para o seu próximo momento de inspiração.">Leia onde <em>estiver.</em></SectionHeading><div className="reading-grid">{readingNotes.map(([title, note], index) => <div className="reading-item" key={title}><span className="reading-number">0{index + 1}</span><div><strong>{title}</strong><span>{note}</span></div><BookOpen size={20} /></div>)}</div></div>
      </section>

      <section className="feature-section" id="como-funciona"><div className="feature-image"><div><span>UM INTERVALO TAMBÉM É PRODUTIVIDADE</span><strong>Abra espaço para o que importa.</strong></div></div><div className="feature-copy"><span className="eyebrow">MAIS QUE UM DOWNLOAD</span><h2>Leituras para acompanhar suas <em>fases.</em></h2><p>Na DigitalQuintino, cada e-book nasce de uma pergunta que muita gente carrega em silêncio. Por isso, você encontra conteúdo claro, acolhedor e aplicável — sem complicação e sem promessas vazias.</p><div className="steps"><div><span>01</span><strong>Escolha o tema que conversa com você agora.</strong></div><div><span>02</span><strong>Compre pela Hotmart em poucos passos.</strong></div><div><span>03</span><strong>Receba o acesso e comece no seu ritmo.</strong></div></div><a className="text-link dark-link" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Fale com a DigitalQuintino <ArrowRight size={14} /></a></div></section>

      <section className="quote-section"><div className="quote-mark">“</div><blockquote>Livros não precisam gritar para transformar. Às vezes, basta uma página certa no momento certo.</blockquote><div className="quote-by"><span /> CURADORIA DIGITALQUINTINO</div></section>

      <section className="offer-section section-shell"><div className="offer-copy"><span className="eyebrow">SEU PRÓXIMO COMEÇO</span><h2>O que você quer cultivar <em>hoje?</em></h2><p>Selecione um dos e-books e siga para o checkout. Se preferir, envie uma mensagem — vamos ajudar você a escolher.</p><div className="hero-actions"><a className="button button-dark" href="https://go.hotmart.com/P107153571O" target="_blank" rel="noreferrer">Comprar “Ensinando a Criança a Orar” <ArrowRight size={15} /></a><a className="button button-outline" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={15} /> Pedir ajuda no WhatsApp</a></div></div><div className="offer-card"><span>MAIS ESCOLHIDO ESTA SEMANA</span><img src={`${STORAGE}mockup-orar_184c3bd6.png`} alt="Ensinando a Criança a Orar" /><strong>Ensinando a Criança a Orar</strong><small>Pagamento único · acesso vitalício</small></div></section>

      <LeadCapture />

      <section className="faq-section section-shell" id="duvidas"><SectionHeading centered eyebrow="TUDO BEM PERGUNTAR" body="Se ainda ficou alguma dúvida, fale com a gente pelo WhatsApp. A mensagem já vai com o resumo do e-book escolhido.">Dúvidas <em>frequentes.</em></SectionHeading><div className="faq-list"><details open><summary>Como recebo meu e-book após a compra? <ChevronDown size={18} /></summary><p>Após a confirmação do pagamento, a Hotmart envia o acesso para o seu e-mail. Você pode começar a ler imediatamente.</p></details><details><summary>Posso ler no celular ou tablet? <ChevronDown size={18} /></summary><p>Sim. Os arquivos são digitais e foram pensados para funcionar no celular, tablet, computador e leitores digitais.</p></details><details><summary>Existe alguma assinatura mensal? <ChevronDown size={18} /></summary><p>Não. O pagamento é único e o acesso ao material comprado é vitalício.</p></details><details><summary>Como funciona a garantia de 7 dias? <ChevronDown size={18} /></summary><p>Você tem 7 dias para conhecer o material. Se não fizer sentido para você, pode solicitar o reembolso dentro desse prazo.</p></details><details><summary>Preciso escolher um e-book específico agora? <ChevronDown size={18} /></summary><p>Não. Você pode explorar a coleção e conversar conosco antes de decidir.</p></details></div></section>

      <footer><div className="footer-brand"><a className="brand-link" href="#inicio"><Brand /></a><p>Leituras para viver com mais presença.</p></div><div className="footer-links"><a href="#colecao">Coleção</a><a href="#como-funciona">Sobre</a><a href="#duvidas">Dúvidas</a><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div><div className="footer-legal">© 2026 DigitalQuintino · Conteúdo digital</div></footer>
      <a className="whatsapp-float" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"><MessageCircle size={24} /></a>
    </main>
  );
}
