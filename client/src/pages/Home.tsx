import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Mail,
  Menu,
  MessageCircle,
  Search,
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
    href: "https://go.hotmart.com/S107541237F",
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
    href: "https://go.hotmart.com/T107544097M",
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
    href: "https://go.hotmart.com/U107546962B",
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
    href: "https://go.hotmart.com/F107560667W",
    message:
      "Olá! Quero saber mais sobre o e-book “10 Sucos Detox Exterminadores de Gordura”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
  },
  {
    tag: "LEITURA CRÍTICA",
    category: "FÉ, CULTURA E PENSAMENTO",
    title: "Guerra Cultural",
    description:
      "Uma leitura cristã e conservadora sobre marxismo cultural, Gramsci, comunismo, política e os conflitos que atravessam a cultura.",
    bullets: ["Entenda conceitos e conecte os pontos", "Guia rápido, mapa de leitura e perguntas de reflexão", "Acesso digital imediato pela Hotmart"],
    image: `${STORAGE}guerra-cultural-cover_b0b7f7ae.jpg`,
    imageClass: "portrait",
    panel: "charcoal",
    href: "https://go.hotmart.com/N107588055G",
    message:
      "Olá! Quero saber mais sobre o e-book “Guerra Cultural”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
    details: {
      subtitle: "Leia, entenda e reflita sobre as ideias que moldam o nosso tempo.",
      author: "Akiria Patrícia, William Fabian, Juliano Marçal, Cristovam E. Santo e Pablo Marçal",
      takeaways: ["Uma introdução organizada a marxismo cultural, gramscismo e hegemonia", "Conexões entre política, cultura, educação, mídia, família e religião", "Um ponto de partida para comparar fontes e formar sua própria opinião", "Capítulos sobre história, filosofia, instituições, fé e cultura"],
      chapters: ["Os filhos de Caim", "Gramsci: o estrategista", "Uma breve história do comunismo", "Como funciona o marxismo cultural", "O Estado e a cultura", "O idioma do politicamente correto"],
    },
  },
  {
    tag: "PARA PEQUENOS CORAÇÕES",
    category: "FÉ EM FAMÍLIA · INFÂNCIA",
    title: "Jesus Ama as Crianças",
    description:
      "Uma jornada de fé para viver em família, com histórias, imagens e atividades que transformam momentos simples em conversas sobre amor, cuidado e esperança.",
    bullets: ["32 páginas de descobertas", "Leitura guiada com atividades para conversar juntos", "Material para famílias, ministério infantil e educadores"],
    image: `${STORAGE}jesusbook-cover_09389533.jpg`,
    imageClass: "portrait",
    panel: "sunny",
    href: "https://go.hotmart.com/V107625668R",
    message:
      "Olá! Quero saber mais sobre o e-book “Jesus Ama as Crianças”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
    details: {
      subtitle: "Pequenas verdades. Grandes sementes para uma fé viva.",
      author: "DigitalQuintino",
      takeaways: ["Descobrir quem é Jesus e por que Ele ama as crianças", "Entender o valor da pureza, da confiança e da esperança", "Aprender que cuidar e proteger também são formas de amar", "Criar um momento especial de leitura e conexão em família"],
      chapters: ["Uma jornada de fé em família", "O amor de Jesus", "Histórias que viram conversa", "Atividades para viver a mensagem", "Pequenas verdades, grandes sementes"],
    },
  },
  {
    tag: "NOVO NA COLEÇÃO",
    category: "CASAMENTO, FÉ E CONEXÃO",
    title: "O Código Secreto da Mente Masculina",
    description:
      "Um guia cristão, prático e sensível para mulheres que desejam restaurar diálogo, confiança e parceria no casamento, com reflexões e passos possíveis para a vida real.",
    bullets: ["49 páginas de conteúdo educativo e devocional", "7 capítulos + plano de ação guiado para 30 dias", "Leitura digital com acesso imediato pela Hotmart"],
    image: `${STORAGE}codigo-mente-cover-01_4aebd8e5.jpg`,
    imageClass: "portrait",
    panel: "warm",
    href: "https://pay.hotmart.com/H107627067J",
    message:
      "Olá! Quero saber mais sobre o e-book “O Código Secreto da Mente Masculina”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
    details: {
      subtitle: "Um caminho de volta ao diálogo, à confiança e à parceria.",
      author: "DigitalQuintino",
      gallery: [`${STORAGE}hero-couple_96623ad4.png`, `${STORAGE}connection-detail_e71ac3d2.png`],
      takeaways: ["Compreender padrões de comunicação e conexão no casamento", "Reconhecer comportamentos que podem enfraquecer a relação", "Praticar conversas mais claras, respeitosas e construtivas", "Reacender cuidado e intimidade respeitando limites e consentimento", "Usar fé, limites e proteção como parte de uma relação saudável", "Aplicar um plano de prática progressivo ao longo de 30 dias"],
      chapters: ["A verdade sobre a crise conjugal", "Padrões de atenção e conexão", "Comportamentos que enfraquecem a relação", "Comunicação que aproxima", "O resgate da intimidade", "Fé, limites e proteção da relação", "Plano de ação de 30 dias"],
    },
  },
  {
    tag: "LEITURA PROVOCADORA",
    category: "CLAREZA, LIMITES E ESCOLHAS",
    title: "A Sutil Arte de Ligar o Foda-se",
    description:
      "Uma leitura direta para escolher melhor o que merece sua energia, estabelecer limites e reduzir o ruído das expectativas externas.",
    bullets: ["9 capítulos sobre escolhas e responsabilidade", "Reflexões sobre felicidade, fracasso e limites", "Leitura digital em português com acesso imediato"],
    image: `${STORAGE}ebook-cover_7ee154ca.jpg`,
    imageClass: "portrait",
    panel: "charcoal",
    href: "https://go.hotmart.com/U107657954K",
    message:
      "Olá! Quero saber mais sobre o e-book “A Sutil Arte de Ligar o Foda-se”. Vi na DigitalQuintino e gostaria de receber ajuda para finalizar meu pedido.",
    details: {
      subtitle: "Menos ruído. Mais clareza para escolher o que realmente importa.",
      author: "Mark Manson — confirme a licença de distribuição antes de publicar",
      gallery: [`${STORAGE}ebook-hero_4a3cfa35.jpg`],
      takeaways: ["Identificar o que é ruído e o que realmente merece sua atenção", "Escolher quais problemas valem seu esforço", "Estabelecer limites sem precisar agradar todo mundo", "Assumir responsabilidade sem culpa e sem drama", "Agir mesmo quando a certeza absoluta não apareceu"],
      chapters: ["Nem tente", "A felicidade é um problema", "Você não é especial", "O valor do sofrimento", "Você sempre faz escolhas", "Você está errado", "Fracassar é seguir em frente", "A importância de dizer não", "... e aí você morre"],
    },
  },
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
              {"gallery" in product.details && product.details.gallery && <div className="product-gallery">{product.details.gallery.map((image, index) => <img key={image} src={image} alt={`${product.title} — imagem editorial ${index + 1}`} />)}</div>}
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

function PopularShelf() {
  const popular = products.slice(0, 3);
  return (
    <section className="popular-section section-shell" aria-labelledby="popular-title">
      <div className="popular-heading">
        <div><span className="eyebrow">CURADORIA DA SEMANA</span><h2 id="popular-title">Os mais <em>populares.</em></h2></div>
        <p>Comece pelas leituras que mais despertam interesse na coleção — escolhidas para diferentes momentos da vida.</p>
      </div>
      <div className="popular-grid">
        {popular.map((product, index) => (
          <a className="popular-card" href="#colecao" key={product.title}>
            <span className="popular-rank">0{index + 1}</span>
            <div className={`popular-art ${product.panel}`}><img src={product.image} alt={`Capa de ${product.title}`} /></div>
            <div className="popular-info"><span className="eyebrow">{product.category}</span><strong>{product.title}</strong><span>Ver na coleção <ArrowRight size={13} /></span></div>
          </a>
        ))}
      </div>
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
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase("pt-BR");
  const filteredProducts = normalizedSearch
    ? products.filter((product) => [product.title, product.category, product.description, ...product.bullets].join(" ").toLocaleLowerCase("pt-BR").includes(normalizedSearch))
    : products;
  return (
    <main>
      <a className="skip-link" href="#colecao">Pular para a coleção</a>
      <div className="announcement">CONTEÚDO QUE CABE NA VIDA REAL <span>—</span> ACESSO DIGITAL IMEDIATO <span>·</span> COMPRA SEGURA</div>
      <header className="site-header" id="inicio">
        <a className="brand-link" href="#inicio"><Brand /></a>
        <nav className={menuOpen ? "open" : ""} aria-label="Navegação principal">
          <a href="#colecao" onClick={() => setMenuOpen(false)}>Coleção</a><a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a>
        </nav>
        <form className="header-search" role="search" onSubmit={(event) => event.preventDefault()}>
          <Search size={15} aria-hidden="true" />
          <input aria-label="Buscar e-book na coleção" type="search" placeholder="Buscar e-book" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
          {searchTerm && <button type="button" aria-label="Limpar busca" onClick={() => setSearchTerm("")}>×</button>}
        </form>
        <a className="header-contact" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={15} /> Falar com a gente</a>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="inicio-hero">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="hero-copy"><span className="eyebrow">LEITURAS QUE DEIXAM MARCAS BONITAS</span><h1>Um bom livro pode mudar o jeito de <em>viver o dia.</em></h1><p>Escolha uma leitura para cuidar da sua fé, da sua família ou do seu bem-estar. E-books práticos, profundos e feitos para acompanhar você.</p><div className="hero-actions"><a className="button button-dark" href="#colecao">Explorar a coleção <ArrowRight size={15} /></a><a className="text-link" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Tirar uma dúvida</a></div><div className="avatar-stack"><span className="avatar coral-avatar">J</span><span className="avatar gold-avatar">M</span><span className="avatar olive-avatar">A</span><span className="avatar forest-avatar">+</span><span>Leituras escolhidas por famílias reais</span></div></div>
        <HeroArt />
      </section>
      <PromiseStrip />
      <PopularShelf />

      <section className="collection section-shell" id="colecao">
        <SectionHeading eyebrow="A COLEÇÃO DIGITALQUINTINO" body="Dezesseis leituras para momentos diferentes. Você escolhe o tema, conhece a proposta e segue para a Hotmart quando estiver pronto.">Escolha a próxima <em>página.</em></SectionHeading>
        <div className="collection-toolbar"><span aria-live="polite">{normalizedSearch ? `${filteredProducts.length} resultado${filteredProducts.length === 1 ? "" : "s"} para “${searchTerm}”` : `${products.length} e-books para escolher`}</span>{normalizedSearch && <button type="button" onClick={() => setSearchTerm("")}>Limpar busca</button>}</div>
        {filteredProducts.length > 0 ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard product={product} key={product.title} />)}</div> : <div className="empty-results"><Search size={24} /><strong>Nenhum e-book encontrado</strong><p>Tente buscar por outro tema, título ou palavra-chave.</p><button className="button button-outline" type="button" onClick={() => setSearchTerm("")}>Ver toda a coleção</button></div>}
        <Testimonials />
      </section>

      <section className="featured-book section-shell" aria-labelledby="featured-book-title"><div className="featured-book-art"><img src={`${STORAGE}hero-couple_96623ad4.png`} alt="Casal representando diálogo e conexão no casamento" /></div><div className="featured-book-copy"><span className="eyebrow">DESTAQUE DA COLEÇÃO</span><h2 id="featured-book-title">O Código Secreto da <em>Mente Masculina.</em></h2><p>Um guia cristão, prático e sensível para mulheres que desejam restaurar diálogo, confiança e parceria no casamento.</p><div className="featured-book-meta"><span>49 páginas</span><span>7 capítulos</span><span>Plano de 30 dias</span></div><a className="button button-dark" href="https://pay.hotmart.com/H107627067J" target="_blank" rel="noreferrer">Conhecer o e-book <ArrowRight size={15} /></a></div></section>

      <section className="quote-section"><div className="quote-mark">“</div><blockquote>Livros não precisam gritar para transformar. Às vezes, basta uma página certa no momento certo.</blockquote><div className="quote-by"><span /> CURADORIA DIGITALQUINTINO</div></section>

      <section className="offer-section section-shell"><div className="offer-copy"><span className="eyebrow">SEU PRÓXIMO COMEÇO</span><h2>O que você quer cultivar <em>hoje?</em></h2><p>Selecione um dos e-books e siga para o checkout. Se preferir, envie uma mensagem — vamos ajudar você a escolher.</p><div className="hero-actions"><a className="button button-dark" href="https://go.hotmart.com/P107153571O" target="_blank" rel="noreferrer">Comprar “Ensinando a Criança a Orar” <ArrowRight size={15} /></a><a className="button button-outline" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={15} /> Pedir ajuda no WhatsApp</a></div></div><div className="offer-card"><span>MAIS ESCOLHIDO ESTA SEMANA</span><img src={`${STORAGE}mockup-orar_184c3bd6.png`} alt="Ensinando a Criança a Orar" /><strong>Ensinando a Criança a Orar</strong><small>Pagamento único · acesso vitalício</small></div></section>

      <LeadCapture />

      <section className="faq-section section-shell" id="duvidas"><SectionHeading centered eyebrow="TUDO BEM PERGUNTAR" body="Se ainda ficou alguma dúvida, fale com a gente pelo WhatsApp. A mensagem já vai com o resumo do e-book escolhido.">Dúvidas <em>frequentes.</em></SectionHeading><div className="faq-list"><details open><summary>Como recebo meu e-book após a compra? <ChevronDown size={18} /></summary><p>Após a confirmação do pagamento, a Hotmart envia o acesso para o seu e-mail. Você pode começar a ler imediatamente.</p></details><details><summary>Posso ler no celular ou tablet? <ChevronDown size={18} /></summary><p>Sim. Os arquivos são digitais e foram pensados para funcionar no celular, tablet, computador e leitores digitais.</p></details><details><summary>Existe alguma assinatura mensal? <ChevronDown size={18} /></summary><p>Não. O pagamento é único e o acesso ao material comprado é vitalício.</p></details><details><summary>Como funciona a garantia de 7 dias? <ChevronDown size={18} /></summary><p>Você tem 7 dias para conhecer o material. Se não fizer sentido para você, pode solicitar o reembolso dentro desse prazo.</p></details><details><summary>Preciso escolher um e-book específico agora? <ChevronDown size={18} /></summary><p>Não. Você pode explorar a coleção e conversar conosco antes de decidir.</p></details></div></section>

      <footer><div className="footer-brand"><a className="brand-link" href="#inicio"><Brand /></a><p>Leituras para viver com mais presença.</p></div><div className="footer-links"><a href="#colecao">Coleção</a><a href="#duvidas">Dúvidas</a><a href="/arquivos">Área de arquivos</a><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></div><div className="footer-legal">© 2026 DigitalQuintino · Conteúdo digital</div></footer>
      <a className="whatsapp-float" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"><MessageCircle size={24} /></a>
    </main>
  );
}
