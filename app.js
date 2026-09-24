document.documentElement.classList.add("js");

// Keep the surfer loading screen up until the page and hero video are ready
const siteLoader = document.querySelector(".site-loader");
if (siteLoader) {
  const heroVideo = document.querySelector("video.hero-image");
  const pageLoaded = new Promise((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", resolve, { once: true });
  });
  const videoReady = new Promise((resolve) => {
    if (!heroVideo || heroVideo.readyState >= 4) return resolve();
    heroVideo.addEventListener("canplaythrough", resolve, { once: true });
    heroVideo.addEventListener("error", resolve, { once: true });
  });
  const minimumShow = new Promise((resolve) => setTimeout(resolve, 1500));
  const fallback = new Promise((resolve) => setTimeout(resolve, 10000));

  Promise.race([Promise.all([pageLoaded, videoReady, minimumShow]), fallback]).then(() => {
    document.body.classList.remove("is-loading");
    siteLoader.classList.add("is-done");
    setTimeout(() => siteLoader.remove(), 700);
  });
}

const experiences = {
  bugue: {
    title: "Buggy Tour",
    category: "ADVENTURE & NATURE",
    filter: "nature",
    duration: "4 hours",
    price: 600,
    image: "assets/activity-buggy.jpg",
    alt: "Buggy tour across beaches, rivers and dunes",
    description:
      "Praia do Forte is surrounded by beautiful beaches, rivers, dunes, coconut groves, historic sites, preserved areas and local communities. Discover the main local sights and lesser-known places along the way.",
    highlights: [
      "Route through beaches, rivers, dunes and coconut groves",
      "Main attractions plus lesser-known local spots",
      "Average duration of 4 hours",
      "Capacity: 3 people",
    ],
  },
  mangue: {
    title: "Mangue Seco",
    category: "ADVENTURE & NATURE",
    filter: "nature",
    duration: "Minimum 6 guests",
    price: 450,
    image: "assets/activity-mangue-seco.jpg",
    alt: "Palm trees, boats and river shore in Mangue Seco",
    description:
      "Visit Mangue Seco, famous for inspiring writer Jorge Amado to write the novel Tieta. An incredible excursion with a boat ride through the mangrove, dunes, deserted beaches and an authentic fishing village.",
    highlights: [
      "Includes transfer, boat ride and buggy ride",
      "Experience the dunes, the beach and the village",
      "Lunch is not included",
      "Bring water, sunscreen, sunglasses, a cap and light clothes for swimming and changing",
    ],
  },
  mergulho: {
    title: "Natural Pools Snorkeling",
    category: "SEA",
    filter: "sea",
    duration: "1 hour",
    price: 120,
    image: "assets/activity-snorkeling.jpg",
    alt: "Crystal-clear water in the natural pools of Praia do Forte",
    description:
      "Snorkel in the natural pools formed by huge coral reefs, with a maximum depth of three meters and crystal-clear water where you can observe many kinds of fish in different shapes and colors.",
    highlights: [
      "Duration: 1 hour",
      "Capacity: 15 people",
      "Includes equipment and underwater photos",
      "Bring sunscreen, light clothes for swimming and changing, sunglasses and a cap",
    ],
  },
  moqueca: {
    title: "Moqueca in the Village",
    category: "CULTURE & FLAVOR",
    filter: "local",
    duration: "Food experience",
    price: 130,
    image: "assets/activity-moqueca.jpg",
    alt: "Fresh ingredients for a Bahian moqueca",
    description:
      "An immersive food experience that reconnects visitors with the origin of ingredients. The journey moves from shopping to cooking and ends with an authentic homemade meal, far from the usual restaurant routine.",
    highlights: [
      "Ingredient shopping in the village",
      "Immersive Bahian cooking experience",
      "Authentic homemade meal",
      "Direct connection with where the food comes from",
    ],
  },
  zuca: {
    title: "Mestre Zuca's Backyard",
    category: "CULTURE & FLAVOR",
    filter: "local",
    duration: "Local experience",
    price: 350,
    image: "assets/activity-mestre-zuca.jpg",
    alt: "Visitors discovering a traditional local backyard",
    description:
      "An authentic experience where guests learn about family farming through flour production, discover a centuries-old artisanal fishing practice, taste local food prepared on site and learn curiosities about the region's fauna and flora.",
    highlights: [
      "Family farming and flour production",
      "Centuries-old artisanal fishing practice",
      "Tasting of food prepared on site",
      "Learning about herbs as alternative medicine",
    ],
  },
  salvador: {
    title: "City Tour Salvador",
    category: "CULTURE & FLAVOR",
    filter: "local",
    duration: "8 hours",
    price: 300,
    image: "assets/activity-salvador.jpg",
    alt: "Historic center of Salvador",
    description:
      "Explore the main sights of Brazil's first capital: Igreja do Bonfim, Forte Mont Serrat, Feira de Sao Joaquim, Mercado Modelo, Elevador Lacerda, Praca Municipal, Praca da Se, Terreiro de Jesus, Igreja e Convento Ordem Terceira de Sao Francisco, Fundacao Casa de Jorge Amado, Dique do Tororo, Farol da Barra and the waterfront.",
    highlights: [
      "Route through Salvador's main tourist attractions",
      "Capacity: 14 people",
      "Duration: 8 hours",
      "Departures on request",
    ],
  },
  baleias: {
    title: "Whale Watching",
    category: "SEA",
    filter: "sea",
    duration: "6 hours",
    price: 400,
    image: "assets/activity-whales.jpg",
    alt: "Boat trip for whale watching",
    description:
      "The experience starts with an approximately 40-minute talk about humpback whales, their biology, behavior and the importance of whale watching tourism as a conservation tool. Then guests board a schooner with IBJ technicians and a local guide for around 4 hours at sea.",
    highlights: [
      "Talk led by Instituto Baleia Jubarte",
      "Schooner trip with IBJ technicians and a local guide",
      "Chance to see humpback whales up close",
      "Includes talk, guide, water, fruit and savory biscuits",
    ],
  },
};

const experiencesPt = {
  bugue: {
    title: "Passeio de Buggy",
    category: "AVENTURA E NATUREZA",
    duration: "4 horas",
    alt: "Passeio de buggy por praias, rios e dunas",
    description:
      "Praia do Forte e cercada por praias, rios, dunas, coqueirais, locais historicos, areas preservadas e comunidades locais. Conheca os principais pontos da regiao e lugares menos obvios pelo caminho.",
    highlights: [
      "Rota por praias, rios, dunas e coqueirais",
      "Principais atracoes e recantos locais menos conhecidos",
      "Duracao media de 4 horas",
      "Capacidade: 3 pessoas",
    ],
  },
  mangue: {
    title: "Mangue Seco",
    category: "AVENTURA E NATUREZA",
    duration: "Minimo de 6 pessoas",
    alt: "Coqueiros, barcos e margem de rio em Mangue Seco",
    description:
      "Visite Mangue Seco, famoso por inspirar Jorge Amado no romance Tieta. Um passeio incrivel com barco pelo mangue, dunas, praias desertas e uma autentica vila de pescadores.",
    highlights: [
      "Inclui transfer, passeio de barco e passeio de buggy",
      "Experiencia pelas dunas, praia e vila",
      "Almoco nao incluido",
      "Leve agua, protetor solar, oculos, bone e roupa leve para banho e troca",
    ],
  },
  mergulho: {
    title: "Mergulho nas Piscinas Naturais",
    category: "MAR",
    duration: "1 hora",
    alt: "Agua cristalina nas piscinas naturais de Praia do Forte",
    description:
      "Mergulhe nas piscinas naturais formadas por grandes recifes de coral, com profundidade maxima de tres metros e agua cristalina para observar muitos tipos de peixes.",
    highlights: [
      "Duracao: 1 hora",
      "Capacidade: 15 pessoas",
      "Inclui equipamento e fotos subaquaticas",
      "Leve protetor solar, roupa leve para banho e troca, oculos e bone",
    ],
  },
  moqueca: {
    title: "Moqueca na Vila",
    category: "CULTURA E SABOR",
    duration: "Experiencia gastronomica",
    alt: "Ingredientes frescos para uma moqueca baiana",
    description:
      "Uma experiencia gastronomica imersiva que reconecta visitantes com a origem dos ingredientes. O percurso vai da compra ao preparo e termina com uma refeicao caseira autentica.",
    highlights: [
      "Compra dos ingredientes na vila",
      "Experiencia imersiva de cozinha baiana",
      "Refeicao caseira autentica",
      "Conexao direta com a origem da comida",
    ],
  },
  zuca: {
    title: "Quintal do Mestre Zuca",
    category: "CULTURA E SABOR",
    duration: "Experiencia local",
    alt: "Visitantes descobrindo um quintal tradicional local",
    description:
      "Uma experiencia autentica para conhecer a agricultura familiar pela producao de farinha, descobrir uma pesca artesanal centenaria, provar comida local e aprender curiosidades da fauna e flora.",
    highlights: [
      "Agricultura familiar e producao de farinha",
      "Pratica artesanal de pesca centenaria",
      "Degustacao de comida preparada no local",
      "Aprendizado sobre ervas como medicina alternativa",
    ],
  },
  salvador: {
    title: "City Tour Salvador",
    category: "CULTURA E SABOR",
    duration: "8 horas",
    alt: "Centro historico de Salvador",
    description:
      "Explore os principais pontos da primeira capital do Brasil: Igreja do Bonfim, Forte Mont Serrat, Feira de Sao Joaquim, Mercado Modelo, Elevador Lacerda, Praca Municipal, Praca da Se, Terreiro de Jesus, Igreja e Convento Ordem Terceira de Sao Francisco, Fundacao Casa de Jorge Amado, Dique do Tororo, Farol da Barra e a orla.",
    highlights: [
      "Roteiro pelos principais pontos turisticos de Salvador",
      "Capacidade: 14 pessoas",
      "Duracao: 8 horas",
      "Saidas sob consulta",
    ],
  },
  baleias: {
    title: "Observacao de Baleias",
    category: "MAR",
    duration: "6 horas",
    alt: "Passeio de barco para observacao de baleias",
    description:
      "A experiencia comeca com uma palestra de aproximadamente 40 minutos sobre baleias-jubarte, biologia, comportamento e a importancia do turismo de observacao como ferramenta de conservacao. Depois, os visitantes embarcam em uma escuna com tecnicos do IBJ e guia local.",
    highlights: [
      "Palestra conduzida pelo Instituto Baleia Jubarte",
      "Passeio de escuna com tecnicos do IBJ e guia local",
      "Chance de ver baleias-jubarte de perto",
      "Inclui palestra, guia, agua, frutas e biscoitos salgados",
    ],
  },
};

const uiCopy = {
  en: {
    catalogEyebrow: "Official catalog / 05",
    catalogTitle: "Bahia <em>experiences.</em>",
    catalogIntro:
      "Company catalog tours with nature, culture, sea and local flavor.",
    filters: {
      all: (count) => `All <span>${String(count).padStart(2, "0")}</span>`,
      sea: "Sea",
      local: "Culture & flavor",
      nature: "Adventure & nature",
    },
    explore: "Explore",
    person: " / person",
    dialogGroup: "Up to 8 people",
    bookingNext: "Continue",
    bookingFinish: "Finish demo",
    reviewLabels: {
      experience: "Experience",
      date: "Date",
      time: "Time",
      travelers: "Travelers",
      name: "Name",
      email: "Email",
      total: "Estimated total",
    },
    dateLocale: "en",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    languageLabel: "Change language to Portuguese",
    languageTitle: "Português",
  },
  pt: {
    catalogEyebrow: "Catalogo oficial / 05",
    catalogTitle: "Experiencias <em>na Bahia.</em>",
    catalogIntro:
      "Passeios do catalogo da empresa com natureza, cultura, mar e sabor local.",
    filters: {
      all: (count) => `Todos <span>${String(count).padStart(2, "0")}</span>`,
      sea: "Mar",
      local: "Cultura e sabor",
      nature: "Aventura e natureza",
    },
    explore: "Explorar",
    person: " / pessoa",
    dialogGroup: "Ate 8 pessoas",
    bookingNext: "Continuar",
    bookingFinish: "Finalizar demo",
    reviewLabels: {
      experience: "Experiencia",
      date: "Data",
      time: "Horario",
      travelers: "Viajantes",
      name: "Nome",
      email: "Email",
      total: "Total estimado",
    },
    dateLocale: "pt-BR",
    menuOpen: "Abrir menu",
    menuClose: "Fechar menu",
    languageLabel: "Idioma atual: portugues",
    languageTitle: "Portugues",
  },
};

let currentLanguage = "en";

function catalog() {
  if (currentLanguage === "en") return experiences;
  return Object.fromEntries(
    Object.entries(experiences).map(([id, experience]) => [
      id,
      { ...experience, ...experiencesPt[id] },
    ]),
  );
}

function copy() {
  return uiCopy[currentLanguage];
}

function formatBRL(value) {
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} BRL`;
}

function renderCatalog() {
  const activeExperiences = catalog();
  const activeCopy = copy();
  const heading = document.querySelector("#experiences .section-heading");
  heading.querySelector(".eyebrow").textContent = activeCopy.catalogEyebrow;
  heading.querySelector("h2").innerHTML = activeCopy.catalogTitle;
  heading.querySelector("p:last-child").textContent = activeCopy.catalogIntro;

  const filterLabels = {
    all: activeCopy.filters.all(Object.keys(activeExperiences).length),
    sea: activeCopy.filters.sea,
    local: activeCopy.filters.local,
    nature: activeCopy.filters.nature,
  };
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.innerHTML = filterLabels[button.dataset.filter];
  });

  const grid = document.getElementById("experience-grid");
  grid.replaceChildren(
    ...Object.entries(activeExperiences).map(([id, experience], index) => {
      const article = document.createElement("article");
      article.className = "experience-card reveal is-visible";
      article.dataset.category = experience.filter;
      article.dataset.id = id;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "card-hit";
      button.dataset.open = id;
      button.setAttribute("aria-label", `${activeCopy.explore} ${experience.title}`);

      button.innerHTML = `
        <span class="card-image-wrap">
          <img class="card-image" src="${experience.image}" alt="${experience.alt}" loading="lazy" />
        </span>
        <span class="card-content">
          <span class="card-topline">
            <span>${experience.category}</span>
            <span>${String(index + 1).padStart(2, "0")} / ${String(Object.keys(activeExperiences).length).padStart(2, "0")}</span>
          </span>
          <strong>${experience.title}</strong>
          <span class="card-description">${experience.description}</span>
          <span class="card-bottom">
            <span>${experience.duration.toUpperCase()} <b>•</b> ${formatBRL(experience.price)}</span>
            <span class="card-arrow" aria-hidden="true">↗</span>
          </span>
        </span>
      `;
      article.append(button);
      return article;
    }),
  );
}

renderCatalog();

let filters = [...document.querySelectorAll("[data-filter]")];
let cards = [...document.querySelectorAll(".experience-card")];
const experienceDialog = document.getElementById("experience-dialog");
const bookingDialog = document.getElementById("booking-dialog");
const bookingForm = document.getElementById("booking-form");
const bookingPages = [...document.querySelectorAll(".booking-page")];
const bookingSteps = [...document.querySelectorAll(".booking-steps li")];
let selectedExperience = catalog().bugue;
let bookingStep = 0;
let lastTrigger = null;

function todayISO(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function setFilter(category) {
  filters.forEach((button) => {
    const active = button.dataset.filter === category;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  let shown = 0;
  cards.forEach((card) => {
    const visible = category === "all" || card.dataset.category === category;
    card.hidden = !visible;
    if (visible) shown += 1;
  });
  document.getElementById("empty-results").hidden = shown > 0;
}

function bindCatalogInteractions() {
  filters = [...document.querySelectorAll("[data-filter]")];
  cards = [...document.querySelectorAll(".experience-card")];
  filters.forEach((button) =>
    button.addEventListener("click", () => setFilter(button.dataset.filter)),
  );
  document.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () =>
      openExperience(button.dataset.open, button),
    );
  });
}

bindCatalogInteractions();

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function setHTML(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = value;
}

function setOption(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

const staticCopyPt = [
  ["title", "Praia do Forte | Viaje como local"],
  ['meta[name="description"]', "Conheca Praia do Forte com experiencias guiadas por moradores, litoral selvagem e historias da Bahia."],
  [".brand span", "PRAIA DO FORTE<small>TURISMO</small>", "html"],
  ['.brand', "Praia do Forte, voltar ao inicio", "aria-label"],
  ['.main-nav a[href="#about"]', "Nossa historia"],
  ['.main-nav a[href="#experiences"]', "Experiencias"],
  ['.main-nav a[href="#discover"]', "Descubra a Bahia"],
  ['.main-nav a[href="#contact"]', "Contato"],
  [".whatsapp-cta", "Iniciar uma conversa no WhatsApp com Praia do Forte Turismo", "aria-label"],
  [".hero-image", "Uma enseada verde e praia na Bahia", "aria-label"],
  [".hero-meta span:first-child", "BAHIA, BRASIL"],
  [".hero-side-note", "UM ESCAPE DIFERENTE / 2026"],
  [".hero-eyebrow", "Com raizes aqui. Feito para voce."],
  ["#hero-title", "<span>Sinta o lugar.</span><em>Viva a historia.</em>", "html"],
  [".hero-subtitle", "Praia do Forte pelos olhos de quem chama este lugar de casa."],
  [".hero-edition", "<span>01</span><span> / 06</span><i></i>O LITORAL ESTA CHAMANDO", "html"],
  ['.search-field span', "Experiencia"],
  ['.search-field:nth-child(2) span', "Quando"],
  ['.search-field:nth-child(3) span', "Viajantes"],
  ["#search-category option[value='all']", "O que te move?"],
  ["#search-category option[value='sea']", "Mar"],
  ["#search-category option[value='local']", "Cultura e sabor"],
  ["#search-category option[value='nature']", "Aventura e natureza"],
  ["#search-date", "Data preferida", "aria-label"],
  ["#search-guests option[value='1']", "1 viajante"],
  ["#search-guests option[value='2']", "2 viajantes"],
  ["#search-guests option[value='3']", "3 viajantes"],
  ["#search-guests option[value='4']", "4 viajantes"],
  ["#search-guests option[value='5']", "5 viajantes"],
  ["#search-guests option[value='6']", "6 viajantes"],
  [".search-button", 'Encontre seu momento <span aria-hidden="true">↗</span>', "html"],
  [".scroll-cue", '<span class="scroll-cue-line"></span> ROLE PARA EXPLORAR', "html"],
  [".ticker-track", "PRAIA DO FORTE <span>✦</span> A BAHIA VIVE AQUI <span>✦</span> PRAIA DO FORTE <span>✦</span> A BAHIA VIVE AQUI <span>✦</span> PRAIA DO FORTE <span>✦</span> A BAHIA VIVE AQUI <span>✦</span>", "html"],
  [".intro-story .eyebrow", "Bem-vindo ao nosso canto do mundo / 01"],
  ["#intro-title", "Voce veio pela<br />vista.<br /><em>Fique pela sensacao.</em>", "html"],
  [".intro-copy", "Por aqui, as melhores historias sao contadas por quem as vive. Conectamos voce ao litoral, a cultura e a magia tranquila de Praia do Forte, um momento inesquecivel por vez."],
  [".intro-story .text-link", 'Conheca seu guia local <span aria-hidden="true">↗</span>', "html"],
  [".intro-gallery", "Cenas de Praia do Forte", "aria-label"],
  [".intro-photo-main img", "Enseada iluminada pelo sol em Praia do Forte", "alt"],
  [".intro-photo-small img", "Salvador historica e cultura baiana", "alt"],
  [".intro-photo-main figcaption", "01 / O LITORAL"],
  [".intro-photo-small figcaption", "02 / A VILA"],
  [".intro-stamp", "FEITO<br />DE<br />MOMENTOS <b>✦</b>", "html"],
  [".fabio-copy .eyebrow", "A pessoa por tras do lugar / 01"],
  ["#fabio-title", "Conheca <em>Fabio.</em>", "html"],
  [".fabio-copy > p:not(.eyebrow)", "Nascido e criado em Praia do Forte, Fabio conhece a vila de coracao e o mar por instinto. Seus lugares favoritos nao estao no mapa. Sao aqueles que voces descobrem juntos."],
  [".fabio-copy blockquote", "“Transformamos sua estadia em uma experiencia local e autentica.”"],
  [".fabio-copy .pill-link", 'Explore com Fabio <span aria-hidden="true">↗</span>', "html"],
  [".fabio-visual img", "Experiencia cultural local na Bahia", "alt"],
  [".image-note", "PESSOAS LOCAIS. HISTORIAS REAIS."],
  [".fabio-side-label", "AQUI, TODO MUNDO TEM UMA HISTORIA"],
  [".discover-copy .eyebrow", "Explore alem do cartao-postal / 02"],
  ["#discover-title", "Um pouco selvagem.<br /><em>Muito encantador.</em>", "html"],
  [".discover-copy > p:not(.eyebrow)", "Das aguas quentes do Atlantico ao pulso da vila, cada caminho leva a algum lugar que vale lembrar. Siga sua curiosidade. Nos cuidamos do resto."],
  [".discover-copy .button", 'Encontre sua experiencia <span aria-hidden="true">↗</span>', "html"],
  [".map-wrap img", "Mapa ilustrado das experiencias de Praia do Forte ao longo da costa", "alt"],
  [".map-caption", 'Sua proxima historia comeca aqui <span aria-hidden="true">↗</span>', "html"],
  [".tide-copy .eyebrow", "O litoral esta vivo / 03"],
  ["#tide-title", "O mar nunca e<br /><em>igual duas vezes.</em>", "html"],
  [".tide-copy > p:not(.eyebrow)", "Cada mare traz uma nova perspectiva. Desacelere, sinta o ritmo e deixe a Bahia surpreender voce."],
  ['[data-tide-mode="calm"]', "Calmo"],
  ['[data-tide-mode="wild"]', "Selvagem"],
  [".tide-modes", "Intensidade da mare", "aria-label"],
  ["#tide-pause", "Pausar animacao da mare", "aria-label"],
  ["#tide-pause", "Pausar animacao da mare", "title"],
  [".spirit-head .eyebrow", "O ritmo da Bahia / 04"],
  ["#spirit-title", "Venha como voce e.<br /><em>Saia um pouco diferente.</em>", "html"],
  [".spirit-item:nth-child(1) h3", "Ritmos locais"],
  [".spirit-item:nth-child(1) p", "Sinta o coracao de um lugar que nunca esquece suas raizes."],
  [".spirit-item:nth-child(2) h3", "Encontros selvagens"],
  [".spirit-item:nth-child(2) p", "Conheca a vida extraordinaria que chama este litoral de casa."],
  [".spirit-item:nth-child(3) h3", "Cultura viva"],
  [".spirit-item:nth-child(3) p", "Descubra historias e tradicoes passadas de uma geracao para a outra."],
  ["#empty-results", "Nenhuma experiencia corresponde a este filtro ainda."],
  [".feature-photo img", "Passeio de barco para observacao de baleias na Bahia", "alt"],
  [".feature-copy .eyebrow", "Um momento para lembrar"],
  ["#feature-title", "Quando o sol se poe,<br /><em>a historia comeca.</em>", "html"],
  [".feature-copy > p:not(.eyebrow)", "Comece com uma conversa local sobre conservacao e depois siga de barco com guias especialistas para uma experiencia de observacao de baleias moldada pelo mar."],
  [".feature-facts", "<span>06 HORAS</span><span>PASSEIO DE BARCO</span><span>GUIA ESPECIALISTA</span>", "html"],
  [".feature-copy .pill-link", 'Descubra a experiencia das baleias <span aria-hidden="true">↗</span>', "html"],
  [".last-word .eyebrow", "Ate nos encontrarmos na Bahia"],
  ["#last-word-title", "A melhor forma de conhecer um lugar<br />e <em>sentir-se em casa nele.</em>", "html"],
  [".last-word .button", 'Crie boas memorias <span aria-hidden="true">↗</span>', "html"],
  [".footer-logo", "PRAIA DO FORTE<small>TURISMO</small>", "html"],
  [".footer-brand p", "Passeios e experiencias autenticas na Bahia, feitos de forma local desde o comeco."],
  [".footer-main h3", "Explore"],
  [".footer-main div:nth-child(2) a:nth-of-type(1)", "Nossa historia"],
  [".footer-main div:nth-child(2) a:nth-of-type(2)", "Descubra a Bahia"],
  [".footer-main div:nth-child(2) a:nth-of-type(3)", "Experiencias"],
  [".footer-main div:nth-child(3) h3", "Contato"],
  [".footer-stamp span", "A BAHIA<br />CHAMA", "html"],
  [".footer-bottom > span:nth-child(2)", "VIAJE COM LEVEZA. SINTA PROFUNDAMENTE. DEIXE APENAS BOAS HISTORIAS."],
  [".footer-bottom a", "VOLTAR AO TOPO ↑"],
  [".ig-title", "Ultimas novidades"],
  [".ig-follow", 'Siga-nos no Instagram <span aria-hidden="true">↗</span>', "html"],
  [".ig-track", "Posts recentes do Instagram", "aria-label"],
  [".ig-prev", "Posts anteriores", "aria-label"],
  [".ig-next", "Proximos posts", "aria-label"],
  [".dialog-image-caption", "PRAIA DO FORTE / BAHIA"],
  ['[data-close="experience-dialog"]', "Fechar experiencia", "aria-label"],
  [".dialog-facts div:nth-child(1) span", "DURACAO"],
  [".dialog-facts div:nth-child(2) span", "TAMANHO DO GRUPO"],
  [".dialog-facts div:nth-child(2) strong", "Ate 8 pessoas"],
  [".dialog-facts div:nth-child(3) span", "PRECO"],
  [".dialog-body h3", "O que torna especial"],
  [".dialog-action span", "Pronto para ir mais fundo?"],
  ["#start-booking", 'Planejar esta experiencia <span aria-hidden="true">↗</span>', "html"],
  [".booking-header .eyebrow", "Sua proxima historia"],
  ["#booking-title", "Vamos fazer acontecer."],
  ['[data-close="booking-dialog"]', "Fechar reserva", "aria-label"],
  [".booking-steps", "Etapas da reserva", "aria-label"],
  [".booking-steps li:nth-child(1) span", "Data e viajantes"],
  [".booking-steps li:nth-child(2) span", "Seus dados"],
  [".booking-steps li:nth-child(3) span", "Revisao"],
  ['.booking-page[data-step="0"] h3', "Primeiro, os bons detalhes."],
  ['.booking-page[data-step="0"] p', "Escolha um dia e conte quem vem junto."],
  ['label:has(#booking-date)', "Data preferida"],
  ['label:has(#booking-time)', "Horario"],
  ['label:has(#booking-guests)', "Viajantes"],
  ['#booking-time option[value="09:00"]', "Manha · 09:00"],
  ['#booking-time option[value="14:00"]', "Tarde · 14:00"],
  ['#booking-time option[value="17:00"]', "Entardecer · 17:00"],
  ['.booking-page[data-step="1"] h3', "Quem vem conosco?"],
  ['.booking-page[data-step="1"] p', "Usaremos esses dados para preparar sua experiencia."],
  ['label:has(#booking-name)', "Nome completo"],
  ['label:has(#booking-email)', "Email"],
  ['label:has(#booking-phone)', "Telefone"],
  ["#booking-name", "Seu nome", "placeholder"],
  ['.booking-page[data-step="2"] h3', "Uma ultima olhada."],
  ['.booking-page[data-step="2"] p', "Revise seus dados antes de finalizar."],
  [".booking-disclaimer", "Esta e uma demonstracao do site. Nenhuma reserva e enviada e nenhum pagamento e realizado."],
  [".booking-success h3", "Sua historia na Bahia esta tomando forma."],
  [".booking-success p", "Esta demonstracao foi concluida. Seus dados nao foram enviados para lugar nenhum."],
  [".booking-success .button", 'Voltar a explorar <span aria-hidden="true">↗</span>', "html"],
  ["#booking-back", "Voltar"],
];

function readStaticValue(selector, mode) {
  if (selector === "title") return document.title;
  const element = document.querySelector(selector);
  if (!element) return "";
  if (mode === "html") return element.innerHTML;
  if (mode) return element.getAttribute(mode) || "";
  if (selector.startsWith("label:has(")) return element.firstChild.nodeValue;
  return element.textContent;
}

const staticCopyEn = staticCopyPt.map(([selector, , mode]) => [
  selector,
  readStaticValue(selector, mode),
  mode,
]);

function applyStaticCopy(items) {
  items.forEach(([selector, value, mode]) => {
    if (selector === "title") {
      document.title = value;
      return;
    }
    const element = document.querySelector(selector);
    if (!element) return;
    if (mode === "html") element.innerHTML = value;
    else if (mode) element.setAttribute(mode, value);
    else if (selector.startsWith("label:has(")) element.firstChild.nodeValue = value;
    else element.textContent = value;
  });
}

function setLanguage(language) {
  const activeFilter =
    document.querySelector(".filter-button.is-active")?.dataset.filter || "all";
  const selectedId =
    Object.keys(experiences).find(
      (id) =>
        experiences[id].price === selectedExperience?.price &&
        experiences[id].image === selectedExperience?.image,
    ) || "bugue";

  currentLanguage = language;
  document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  selectedExperience = catalog()[selectedId] || catalog().bugue;
  renderCatalog();
  bindCatalogInteractions();
  applyStaticCopy(language === "pt" ? staticCopyPt : staticCopyEn);
  setFilter(activeFilter);
  const languageButton = document.getElementById("language-toggle");
  languageButton.setAttribute(
    "aria-label",
    language === "pt" ? "Change language to English" : copy().languageLabel,
  );
  languageButton.setAttribute(
    "title",
    language === "pt" ? "English" : copy().languageTitle,
  );
  document
    .querySelector(".menu-toggle")
    .setAttribute("aria-label", copy().menuOpen);
  if (experienceDialog.open && selectedExperience) {
    openExperience(selectedId, lastTrigger);
  }
  showBookingStep(bookingStep);
}

function toggleLanguage() {
  setLanguage(currentLanguage === "pt" ? "en" : "pt");
}

document
  .getElementById("language-toggle")
  .addEventListener("click", toggleLanguage);

document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  setFilter(document.getElementById("search-category").value);
  document.getElementById("experiences").scrollIntoView({ behavior: "smooth" });
});

function openDialog(dialog, trigger) {
  lastTrigger = trigger || document.activeElement;
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

function closeDialog(dialog) {
  dialog.close();
  document.body.classList.toggle(
    "dialog-open",
    experienceDialog.open || bookingDialog.open,
  );
  lastTrigger?.focus();
}

function openExperience(id, trigger) {
  selectedExperience = catalog()[id];
  if (!selectedExperience) return;
  document.getElementById("dialog-image").src = selectedExperience.image;
  document.getElementById("dialog-image").alt = selectedExperience.alt;
  document.getElementById("dialog-category").textContent =
    selectedExperience.category;
  document.getElementById("dialog-title").textContent =
    selectedExperience.title;
  document.getElementById("dialog-description").textContent =
    selectedExperience.description;
  document.getElementById("dialog-duration").textContent =
    selectedExperience.duration;
  document.getElementById("dialog-price").textContent =
    `${formatBRL(selectedExperience.price)}${copy().person}`;
  const list = document.getElementById("dialog-highlights");
  list.replaceChildren(
    ...selectedExperience.highlights.map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    }),
  );
  if (!experienceDialog.open) openDialog(experienceDialog, trigger);
}

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () =>
    closeDialog(document.getElementById(button.dataset.close)),
  );
});

[experienceDialog, bookingDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
  dialog.addEventListener("close", () => {
    document.body.classList.toggle(
      "dialog-open",
      experienceDialog.open || bookingDialog.open,
    );
  });
});

function showBookingStep(index) {
  bookingStep = index;
  bookingPages.forEach((page, i) =>
    page.classList.toggle("is-current", i === index),
  );
  bookingSteps.forEach((step, i) =>
    step.classList.toggle("is-current", i === index),
  );
  document.getElementById("booking-actions").hidden = index === 3;
  document.getElementById("booking-back").hidden = index === 0;
  document.getElementById("booking-next").innerHTML =
    index === 2
      ? 'Finish demo <span aria-hidden="true">↗</span>'
      : 'Continue <span aria-hidden="true">↗</span>';
  bookingDialog.scrollTop = 0;
}

function startBooking(trigger) {
  const returnFocus = lastTrigger;
  if (experienceDialog.open) experienceDialog.close();
  bookingForm.reset();
  const chosenDate = document.getElementById("search-date").value;
  document.getElementById("booking-date").value = chosenDate || todayISO(7);
  document.getElementById("booking-guests").value =
    document.getElementById("search-guests").value;
  showBookingStep(0);
  openDialog(bookingDialog, returnFocus || trigger);
}

document
  .getElementById("start-booking")
  .addEventListener("click", (event) => startBooking(event.currentTarget));

function validStep(step) {
  const fields = [...bookingPages[step].querySelectorAll("input, select")];
  return fields.every((field) => field.reportValidity());
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function updateReview() {
  const rows = [
    ["Experience", selectedExperience.title],
    ["Date", formatDate(document.getElementById("booking-date").value)],
    [
      "Time",
      document.getElementById("booking-time").selectedOptions[0].textContent,
    ],
    ["Travelers", document.getElementById("booking-guests").value],
    ["Name", document.getElementById("booking-name").value],
    ["Email", document.getElementById("booking-email").value],
    [
      "Estimated total",
      formatBRL(
        selectedExperience.price *
          Number(document.getElementById("booking-guests").value),
      ),
    ],
  ];
document.getElementById("booking-review").replaceChildren(
    ...rows.map(([label, value], index) => {
      const row = document.createElement("div");
      row.className = `review-row${index === rows.length - 1 ? " total" : ""}`;
      const name = document.createElement("span");
      const detail = document.createElement("strong");
      name.textContent = label;
      detail.textContent = value;
      row.append(name, detail);
      return row;
    }),
  );
}

function showBookingStep(index) {
  bookingStep = index;
  bookingPages.forEach((page, i) =>
    page.classList.toggle("is-current", i === index),
  );
  bookingSteps.forEach((step, i) =>
    step.classList.toggle("is-current", i === index),
  );
  document.getElementById("booking-actions").hidden = index === 3;
  document.getElementById("booking-back").hidden = index === 0;
  document.getElementById("booking-next").innerHTML =
    index === 2
      ? `${copy().bookingFinish} <span aria-hidden="true">↗</span>`
      : `${copy().bookingNext} <span aria-hidden="true">↗</span>`;
  bookingDialog.scrollTop = 0;
}

function formatDate(value) {
  return new Intl.DateTimeFormat(copy().dateLocale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function updateReview() {
  const labels = copy().reviewLabels;
  const rows = [
    [labels.experience, selectedExperience.title],
    [labels.date, formatDate(document.getElementById("booking-date").value)],
    [
      labels.time,
      document.getElementById("booking-time").selectedOptions[0].textContent,
    ],
    [labels.travelers, document.getElementById("booking-guests").value],
    [labels.name, document.getElementById("booking-name").value],
    [labels.email, document.getElementById("booking-email").value],
    [
      labels.total,
      formatBRL(
        selectedExperience.price *
          Number(document.getElementById("booking-guests").value),
      ),
    ],
  ];
  document.getElementById("booking-review").replaceChildren(
    ...rows.map(([label, value], index) => {
      const row = document.createElement("div");
      row.className = `review-row${index === rows.length - 1 ? " total" : ""}`;
      const name = document.createElement("span");
      const detail = document.createElement("strong");
      name.textContent = label;
      detail.textContent = value;
      row.append(name, detail);
      return row;
    }),
  );
}

document.getElementById("booking-next").addEventListener("click", () => {
  if (bookingStep < 2 && !validStep(bookingStep)) return;
  if (bookingStep === 1) updateReview();
  showBookingStep(Math.min(bookingStep + 1, 3));
});
document
  .getElementById("booking-back")
  .addEventListener("click", () =>
    showBookingStep(Math.max(bookingStep - 1, 0)),
  );
bookingForm.addEventListener("submit", (event) => event.preventDefault());

const minDate = todayISO();
document.getElementById("search-date").min = minDate;
document.getElementById("booking-date").min = minDate;
document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("main-nav");
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute(
    "aria-label",
    expanded ? copy().menuOpen : copy().menuClose,
  );
  mainNav.classList.toggle("is-open", !expanded);
});
mainNav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", copy().menuOpen);
  }),
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
  );
  document.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
    observer.observe(element);
  });
} else {
  document
    .querySelectorAll(".reveal")
    .forEach((element) => element.classList.add("is-visible"));
}

const progress = document.querySelector(".scroll-progress");
let scrollQueued = false;
window.addEventListener(
  "scroll",
  () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      const available =
        document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${available > 0 ? window.scrollY / available : 0})`;
      scrollQueued = false;
    });
  },
  { passive: true },
);

// Instagram feed in the footer: arrow buttons and scroll progress
const igTrack = document.querySelector(".ig-track");
if (igTrack) {
  const igPrev = document.querySelector(".ig-prev");
  const igNext = document.querySelector(".ig-next");
  const igBar = document.querySelector(".ig-progress span");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cardStep = () => {
    const card = igTrack.querySelector(".ig-post");
    const gap = parseFloat(getComputedStyle(igTrack).columnGap) || 0;
    return card ? card.offsetWidth + gap : igTrack.clientWidth;
  };
  const updateFeed = () => {
    const max = igTrack.scrollWidth - igTrack.clientWidth;
    const visible = igTrack.clientWidth / igTrack.scrollWidth;
    const position = max > 0 ? igTrack.scrollLeft / max : 0;
    igBar.style.width = `${visible * 100}%`;
    igBar.style.marginLeft = `${position * (1 - visible) * 100}%`;
    igPrev.disabled = igTrack.scrollLeft <= 2;
    igNext.disabled = igTrack.scrollLeft >= max - 2;
  };
  const scrollFeed = (direction) =>
    igTrack.scrollBy({ left: direction * cardStep(), behavior: reduceMotion ? "auto" : "smooth" });

  igPrev.addEventListener("click", () => scrollFeed(-1));
  igNext.addEventListener("click", () => scrollFeed(1));
  igTrack.addEventListener("scroll", updateFeed, { passive: true });
  window.addEventListener("resize", updateFeed);
  updateFeed();
}
