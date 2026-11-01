/* ════════════════════════════════════════════════════════════════
   content.mjs — every word on the site, in one place.
   Edit here, run `node build.mjs`, get three static pages.

   de  = Schweizer Hochdeutsch (Swiss Standard German).
         No ß anywhere — always ss. Helvetisms used deliberately:
         Offerte (not Angebot), innert (not innerhalb),
         Unterlagen, Fachkräfte, Impressum.
   fr  = business French for Suisse romande.
   ════════════════════════════════════════════════════════════════ */

export const LOCALES = ['en', 'de', 'fr'];

export const LANG_NAMES = { en: 'English', de: 'Deutsch', fr: 'Français' };

/* where each locale lives, relative to site root */
export const PATHS = { en: '', de: 'de/', fr: 'fr/' };

export const CONTENT = {

/* ══════════════════════════════ ENGLISH ══════════════════════════════ */
en: {
  htmlLang: 'en',
  dir: 'ltr',
  title: 'Pumpolino — Systems That Move',
  metaDesc: 'Pumpolino builds the operating layer for things that must not be lost track of: field service on industrial pumps, provenance on works of art, and the records that outlive both.',
  ogTitle: 'Pumpolino — Systems That Move',
  ogDesc: 'Precision in how information, responsibility and time are managed. Process intelligence, art provenance, industrial asset custody.',
  jsonDesc: 'Pumpolino builds the operating layer for industrial process intelligence, art provenance and long-term asset custody.',
  skip: 'Skip to content',
  menu: 'Menu',
  langLabel: 'Language',
  nav: { thesis:'Thesis', practice:'Practice', products:'Products', pumps:'Pumps & Art', contact:'Contact' },

  hero: {
    eyebrow: 'For a world full of flow',
    h1: 'Systems that move.<br><em>Water, information, decisions.</em>',
    lede: 'Pumpolino builds the operating layer for things that must not be lost track of — field service on industrial pumps, provenance on works of art, and the records that outlive both.',
    cta1: 'Explore ServiceFlow →',
    cta2: 'Read the thesis',
  },

  thesis: {
    lab: '01 — The argument',
    h2: 'A pump and a painting ask for the <em>same discipline.</em>',
    p: [
      'At first glance, industrial systems and cultural assets seem unrelated. One is driven by engineering, the other by meaning and context. Yet both rely on the same thing: <strong>precision in how information, responsibility and time are managed.</strong>',
      'Long-term value is never accidental. It is built through structured documentation, clear histories, and consistent standards of handling. Whether the asset is a centrifugal pump running eleven months a year or a canvas that has changed hands four times since 1931, the underlying logic does not move.',
      'These two fields define our foundation not because they are similar on the surface, but because they reveal the same operational truth beneath it — systems that preserve value, coordinate expertise, and create continuity over time.',
    ],
    side: [
      ['Practice', 'Process intelligence<br>Art provenance<br>Industrial asset custody'],
      ['Method', 'Central data management<br>Proactive scheduling<br>Resource coordination'],
      ['Based', 'Switzerland'],
      ['Reply time', 'Personally, within 2 days<br>No templates, no automation'],
    ],
  },

  practice: {
    lab: '02 — Practice',
    h2: 'Three domains, one method.',
    lede: 'Each carries a different tempo. The work does not.',
    tiles: [
      { href:'#products', canvas:'f-lam', regime:'Laminar', regimeVar:'--laminar',
        h3:'Process &amp; Intelligence', kind:'Consulting · Data · AI',
        p:'We work where <strong>complexity asks for calm.</strong> Deep technical expertise in industrial processes, joined to modern data architecture and applied intelligence.',
        li:['ServiceFlow — service operations','FlowSales — sales intelligence'], go:'Enter →' },
      { href:'#pumps', canvas:'f-tur', regime:'Turbulent', regimeVar:'--turb-text',
        h3:'Industrial Pumps &amp; Art', kind:'Form finds function',
        p:'Where engineering meets custody. The same discipline of documentation, precision and long-term value management, applied to machines and to objects.',
        li:['Asset lifecycle documentation','Expert deployment &amp; logistics'], go:'Read the case →' },
      { href:'#contact', canvas:'f-sed', regime:'Sedimenting', regimeVar:'--trans',
        h3:'Art &amp; Provenance', kind:'Museums · Collections · Exhibition',
        p:'We work where <strong>meaning asks for discretion.</strong> Objects of significance, accompanied through acquisition, placement and exhibition — handled with patience.',
        li:['Provenance research','Collection documentation'], go:'Enquire →' },
    ],
  },

  products: {
    lab: '03 — Products',
    h2: 'Software that turns experience into structure.',
    lede: 'Two systems, both built on the same idea: knowledge that was scattered across teams and documents becomes a single, reliable source of truth.',
    productWord: 'Product',
    items: [
      {
        name:'Pumpolino ServiceFlow', sub:'Software · Service · Automation', circuit:true,
        lead:'Moving from reactive service to controlled operations. ServiceFlow transforms efficiency into structure, bringing service history, scheduling and resource allocation into a single, transparent system.',
        feats:[
          ['Central Data Management','All service history and product customisations are unified in one place. Knowledge that was scattered across teams and documents becomes a single, reliable source of truth — accessible and consistent over time.'],
          ['Automation','Well-designed systems do not react, they anticipate. Service intervals are tracked automatically and technicians are notified before issues arise, shifting the operating mode from reactive to proactive.'],
          ['Resource Planning','Specialists, spare parts and logistics are coordinated with accuracy. The right expertise is available exactly when needed, reducing operational friction and keeping service delivery consistent.'],
        ],
        steps:['Analysis — processes defined, features identified','Configuration &amp; migration into existing workflows','Phased rollout with user training'],
      },
      {
        name:'Pumpolino FlowSales', sub:'Software · Sales · Intelligence', circuit:false,
        lead:'Structuring decisions before they are made. FlowSales turns experience into reproducible outcomes, transforming project knowledge into structured sales intelligence that supports every stage of the sales process.',
        feats:[
          ['Digital Twin','Every project is captured in full: documents, certifications, configurations and sensor data centralised into a structured record. Institutional knowledge becomes searchable, comparable, and available at the moment it is needed.'],
          ['Sales Enablement','Relevant references and comparable projects surface at the right moment. Conversion improves because proposals are grounded in demonstrated experience rather than general capability.'],
          ['Quotation Support','Semi-automated offers are generated from existing configurations and project data. Teams spend less time rebuilding proposals and more time on the decisions that require genuine expertise.'],
        ],
        steps:['Data structuring — project and reference data organised','System configuration — sales processes mapped','Gradual rollout with optimisation'],
      },
    ],
  },

  pumps: {
    lab: '04 — Industrial pumps &amp; art',
    h2: 'A shared language of <em>precision.</em>',
    p: [
      'Complex environments require precise allocation of time, expertise and responsibility. Planning follows clear structures that ensure continuity and reduce operational friction — and that is as true of a shutdown window as of an exhibition install.',
      'Every asset is treated according to its importance and condition. Defined processes ensure careful handling, continuity of knowledge, and a consistent standard of care throughout its lifecycle.',
      'Data becomes valuable when it actively supports decisions. Information and processes are connected, enabling better timing, clearer priorities and more informed actions. A single platform creates transparency across all levels of the organisation.',
    ],
    side: [
      ['Applies to','Centrifugal &amp; positive-displacement pumps<br>Seals, bearings, drive trains<br>Works on paper, canvas, sculpture<br>Loans &amp; long-term deposits'],
      ['Produces','Unified service history<br>Condition &amp; origin records<br>Scheduled intervention windows<br>Auditable chain of custody'],
    ],
  },

  contact: {
    lab: '05 — Contact',
    h2: 'Write to us.',
    f: {
      name:'Name', namePh:'Your name',
      email:'E-mail', emailPh:'you@example.com',
      subject:'Subject', subjectPh:'What is this about?',
      message:'Message', messagePh:'Tell us what you need.',
      hp:'Leave this field empty',
      consent:'I agree that the details above may be stored and used to answer my enquiry. They will not be used for anything else.',
      send:'Send message →',
    },
    note:'<b>We reply personally.</b><br>No templates, no automation.<br><br>Whether the question is a fleet of pumps across three sites or a single work with an incomplete history, the answer comes from a person who has read it.<br><br><b>pumpolino.com</b>',
  },

  footer: { legal:'Legal Notice', tag:'for a world full of flow' },

  /* strings the canvas engine and form need at runtime */
  js: {
    stages: ['Intake','Schedule','Dispatch'],
    modeOn:'Engage proactive mode', modeOff:'Return to reactive',
    stateReactive:'Reactive — work orders queue at each stage',
    stateProactive:'Proactive — intervals tracked, backlog drained',
    send:'Send message →', sending:'Sending …',
    errEmail:'Please enter an e-mail address we can reply to.',
    errSubject:'Please add a subject so we know what this is about.',
    errMessage:'Please add a message.',
    errConsent:'Please tick the box so we may store your details to reply.',
    localPreview:'<strong>Local preview.</strong><br>The form validated correctly. Sending is disabled when the page is opened from disk — it will post to Web3Forms once the site is deployed.',
    sendOk:'<strong>Thank you.</strong><br>Your message has been received. We will be in touch shortly.',
    sendErr:'Something went wrong sending that. Please try again, or write to us directly.',
  },
},

/* ══════════════════════ DEUTSCH (Schweizer Hochdeutsch) ══════════════════════ */
de: {
  htmlLang: 'de-CH',
  dir: 'ltr',
  title: 'Pumpolino — Systeme, die bewegen',
  metaDesc: 'Pumpolino baut die Betriebsebene für alles, was nicht aus dem Blick geraten darf: Service an Industriepumpen, Provenienz von Kunstwerken und die Aufzeichnungen, die beide überdauern.',
  ogTitle: 'Pumpolino — Systeme, die bewegen',
  ogDesc: 'Präzision im Umgang mit Information, Verantwortung und Zeit. Prozessintelligenz, Kunstprovenienz, industrielle Anlagenbetreuung.',
  jsonDesc: 'Pumpolino baut die Betriebsebene für industrielle Prozessintelligenz, Kunstprovenienz und langfristige Anlagenbetreuung.',
  skip: 'Zum Inhalt springen',
  menu: 'Menü',
  langLabel: 'Sprache',
  nav: { thesis:'These', practice:'Tätigkeit', products:'Produkte', pumps:'Pumpen &amp; Kunst', contact:'Kontakt' },

  hero: {
    eyebrow: 'Für eine Welt im Fluss',
    h1: 'Systeme, die bewegen.<br><em>Wasser, Information, Entscheidungen.</em>',
    lede: 'Pumpolino baut die Betriebsebene für alles, was nicht aus dem Blick geraten darf: Service an Industriepumpen, Provenienz von Kunstwerken und die Aufzeichnungen, die beide überdauern.',
    cta1: 'ServiceFlow entdecken →',
    cta2: 'Zur These',
  },

  thesis: {
    lab: '01 — Die These',
    h2: 'Eine Pumpe und ein Gemälde verlangen <em>dieselbe Disziplin.</em>',
    p: [
      'Auf den ersten Blick haben industrielle Systeme und Kulturgüter nichts miteinander zu tun. Das eine folgt der Technik, das andere der Bedeutung und dem Kontext. Und doch beruhen beide auf demselben: auf <strong>Präzision im Umgang mit Information, Verantwortung und Zeit.</strong>',
      'Langfristiger Wert entsteht nie zufällig. Er entsteht durch strukturierte Dokumentation, lückenlose Historien und verlässliche Standards im Umgang. Ob es sich um eine Kreiselpumpe handelt, die elf Monate im Jahr läuft, oder um eine Leinwand, die seit 1931 viermal den Besitzer gewechselt hat — die zugrunde liegende Logik bleibt dieselbe.',
      'Diese beiden Felder bilden unser Fundament nicht, weil sie sich an der Oberfläche ähneln, sondern weil darunter dieselbe operative Wahrheit zum Vorschein kommt: Systeme, die Wert bewahren, Fachwissen koordinieren und Kontinuität über die Zeit schaffen.',
    ],
    side: [
      ['Tätigkeit', 'Prozessintelligenz<br>Kunstprovenienz<br>Industrielle Anlagenbetreuung'],
      ['Methode', 'Zentrale Datenhaltung<br>Vorausschauende Planung<br>Ressourcenkoordination'],
      ['Standort', 'Schweiz'],
      ['Antwortzeit', 'Persönlich, innert zwei Tagen<br>Keine Vorlagen, keine Automatisierung'],
    ],
  },

  practice: {
    lab: '02 — Tätigkeitsfelder',
    h2: 'Drei Bereiche, eine Methode.',
    lede: 'Jeder hat sein eigenes Tempo. Die Arbeit nicht.',
    tiles: [
      { href:'#products', canvas:'f-lam', regime:'Laminar', regimeVar:'--laminar',
        h3:'Prozess &amp; Intelligenz', kind:'Beratung · Daten · KI',
        p:'Wir arbeiten dort, wo <strong>Komplexität Ruhe verlangt.</strong> Tiefe technische Erfahrung in industriellen Prozessen, verbunden mit moderner Datenarchitektur und angewandter Intelligenz.',
        li:['ServiceFlow — Serviceabwicklung','FlowSales — Vertriebsintelligenz'], go:'Eintreten →' },
      { href:'#pumps', canvas:'f-tur', regime:'Turbulent', regimeVar:'--turb-text',
        h3:'Industriepumpen &amp; Kunst', kind:'Form findet Funktion',
        p:'Wo Technik auf Obhut trifft. Dieselbe Disziplin aus Dokumentation, Präzision und langfristiger Werterhaltung — angewandt auf Maschinen wie auf Objekte.',
        li:['Dokumentation über den Lebenszyklus','Einsatz von Fachkräften &amp; Logistik'], go:'Weiterlesen →' },
      { href:'#contact', canvas:'f-sed', regime:'Sedimentierend', regimeVar:'--trans',
        h3:'Kunst &amp; Provenienz', kind:'Museen · Sammlungen · Ausstellung',
        p:'Wir arbeiten dort, wo <strong>Bedeutung Diskretion verlangt.</strong> Objekte von Bedeutung, begleitet durch Erwerb, Platzierung und Ausstellung — mit Geduld behandelt.',
        li:['Provenienzforschung','Sammlungsdokumentation'], go:'Anfragen →' },
    ],
  },

  products: {
    lab: '03 — Produkte',
    h2: 'Software, die Erfahrung in Struktur überführt.',
    lede: 'Zwei Systeme, beide auf derselben Idee gebaut: Wissen, das über Teams und Dokumente verstreut war, wird zu einer einzigen, verlässlichen Quelle.',
    productWord: 'Produkt',
    items: [
      {
        name:'Pumpolino ServiceFlow', sub:'Software · Service · Automatisierung', circuit:true,
        lead:'Vom reaktiven Service zum kontrollierten Betrieb. ServiceFlow überführt Effizienz in Struktur und bringt Servicehistorie, Terminplanung und Ressourcenzuteilung in ein einziges, transparentes System.',
        feats:[
          ['Zentrale Datenhaltung','Sämtliche Servicehistorie und Produktanpassungen liegen an einem Ort. Wissen, das über Teams und Dokumente verstreut war, wird zu einer einzigen, verlässlichen Quelle — zugänglich und über die Jahre konsistent.'],
          ['Automatisierung','Gut gebaute Systeme reagieren nicht, sie antizipieren. Serviceintervalle werden automatisch überwacht und Technikerinnen und Techniker informiert, bevor ein Problem entsteht. Der Betriebsmodus wechselt von reaktiv zu proaktiv.'],
          ['Einsatzplanung','Fachkräfte, Ersatzteile und Logistik werden präzise koordiniert. Das richtige Know-how steht genau dann bereit, wenn es gebraucht wird — weniger Reibung im Betrieb, gleichbleibende Servicequalität.'],
        ],
        steps:['Analyse — Prozesse definiert, Funktionen bestimmt','Konfiguration &amp; Migration in bestehende Abläufe','Schrittweiser Rollout mit Schulung'],
      },
      {
        name:'Pumpolino FlowSales', sub:'Software · Vertrieb · Intelligenz', circuit:false,
        lead:'Entscheidungen strukturieren, bevor sie fallen. FlowSales macht Erfahrung reproduzierbar und überführt Projektwissen in strukturierte Vertriebsintelligenz, die jede Phase des Verkaufsprozesses stützt.',
        feats:[
          ['Digitaler Zwilling','Jedes Projekt wird vollständig erfasst: Unterlagen, Zertifikate, Konfigurationen und Sensordaten fliessen in einen strukturierten Datensatz. Firmenwissen wird durchsuchbar, vergleichbar und genau dann verfügbar, wenn es gebraucht wird.'],
          ['Vertriebsunterstützung','Passende Referenzen und vergleichbare Projekte erscheinen im richtigen Moment. Die Abschlussquote steigt, weil Offerten auf belegter Erfahrung beruhen und nicht auf allgemeiner Leistungsfähigkeit.'],
          ['Offertenerstellung','Teilautomatisierte Offerten entstehen aus bestehenden Konfigurationen und Projektdaten. Teams bauen Angebote nicht immer wieder neu auf, sondern widmen sich den Entscheidungen, die echtes Fachwissen verlangen.'],
        ],
        steps:['Datenstrukturierung — Projekt- und Referenzdaten geordnet','Systemkonfiguration — Vertriebsprozesse abgebildet','Schrittweiser Rollout mit Optimierung'],
      },
    ],
  },

  pumps: {
    lab: '04 — Industriepumpen &amp; Kunst',
    h2: 'Eine gemeinsame Sprache der <em>Präzision.</em>',
    p: [
      'Komplexe Umgebungen verlangen die präzise Zuteilung von Zeit, Fachwissen und Verantwortung. Planung folgt klaren Strukturen, die Kontinuität sichern und Reibung im Betrieb verringern — beim Revisionsfenster ebenso wie beim Aufbau einer Ausstellung.',
      'Jedes Objekt wird nach seiner Bedeutung und seinem Zustand behandelt. Definierte Abläufe sichern sorgfältige Handhabung, durchgehendes Wissen und einen gleichbleibenden Standard der Betreuung über den gesamten Lebenszyklus.',
      'Daten werden wertvoll, wenn sie Entscheidungen aktiv stützen. Information und Abläufe sind verbunden: besseres Timing, klarere Prioritäten, fundierteres Handeln. Eine einzige Plattform schafft Transparenz über alle Ebenen der Organisation.',
    ],
    side: [
      ['Gilt für','Kreisel- und Verdrängerpumpen<br>Dichtungen, Lager, Antriebsstränge<br>Werke auf Papier, Leinwand, Skulptur<br>Leihgaben &amp; Dauerdepots'],
      ['Ergibt','Einheitliche Servicehistorie<br>Zustands- und Herkunftsnachweise<br>Geplante Eingriffsfenster<br>Prüfbare Eigentumskette'],
    ],
  },

  contact: {
    lab: '05 — Kontakt',
    h2: 'Schreiben Sie uns.',
    f: {
      name:'Name', namePh:'Ihr Name',
      email:'E-Mail', emailPh:'sie@beispiel.ch',
      subject:'Betreff', subjectPh:'Worum geht es?',
      message:'Nachricht', messagePh:'Sagen Sie uns, was Sie brauchen.',
      hp:'Dieses Feld bitte leer lassen',
      consent:'Ich bin einverstanden, dass die obigen Angaben gespeichert und zur Beantwortung meiner Anfrage verwendet werden. Sie werden für nichts anderes genutzt.',
      send:'Nachricht senden →',
    },
    note:'<b>Wir antworten persönlich.</b><br>Keine Vorlagen, keine Automatisierung.<br><br>Ob die Frage eine Pumpenflotte über drei Standorte betrifft oder ein einzelnes Werk mit lückenhafter Geschichte — die Antwort kommt von einem Menschen, der sie gelesen hat.<br><br><b>pumpolino.com</b>',
  },

  footer: { legal:'Impressum', tag:'für eine Welt im Fluss' },

  js: {
    stages: ['Eingang','Planung','Einsatz'],
    modeOn:'Proaktiven Modus aktivieren', modeOff:'Zurück zu reaktiv',
    stateReactive:'Reaktiv — Aufträge stauen sich an jeder Station',
    stateProactive:'Proaktiv — Intervalle überwacht, Rückstau abgebaut',
    send:'Nachricht senden →', sending:'Wird gesendet …',
    errEmail:'Bitte geben Sie eine E-Mail-Adresse an, an die wir antworten können.',
    errSubject:'Bitte ergänzen Sie einen Betreff, damit wir wissen, worum es geht.',
    errMessage:'Bitte ergänzen Sie eine Nachricht.',
    errConsent:'Bitte kreuzen Sie das Feld an, damit wir Ihre Angaben zur Beantwortung speichern dürfen.',
    localPreview:'<strong>Lokale Vorschau.</strong><br>Das Formular wurde korrekt geprüft. Der Versand ist deaktiviert, solange die Seite von der Festplatte geöffnet wird — auf dem Server geht sie an Web3Forms.',
    sendOk:'<strong>Danke.</strong><br>Ihre Nachricht ist eingegangen. Wir melden uns in Kürze.',
    sendErr:'Beim Senden ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt.',
  },
},

/* ══════════════════════════════ FRANÇAIS ══════════════════════════════ */
fr: {
  htmlLang: 'fr-CH',
  dir: 'ltr',
  title: 'Pumpolino — Des systèmes qui font circuler',
  metaDesc: "Pumpolino construit la couche opérationnelle de ce qui ne doit pas être perdu de vue : le service sur les pompes industrielles, la provenance des œuvres d'art et les archives qui leur survivent.",
  ogTitle: 'Pumpolino — Des systèmes qui font circuler',
  ogDesc: "La précision dans la gestion de l'information, de la responsabilité et du temps. Intelligence de processus, provenance d'œuvres, gestion d'actifs industriels.",
  jsonDesc: "Pumpolino construit la couche opérationnelle de l'intelligence de processus industriels, de la provenance d'œuvres et de la gestion d'actifs à long terme.",
  skip: 'Aller au contenu',
  menu: 'Menu',
  langLabel: 'Langue',
  nav: { thesis:'Thèse', practice:'Domaines', products:'Produits', pumps:'Pompes &amp; Art', contact:'Contact' },

  hero: {
    eyebrow: 'Pour un monde en mouvement',
    h1: 'Des systèmes qui font circuler.<br><em>L’eau, l’information, les décisions.</em>',
    lede: "Pumpolino construit la couche opérationnelle de ce qui ne doit pas être perdu de vue : le service sur les pompes industrielles, la provenance des œuvres d’art, et les archives qui leur survivent.",
    cta1: 'Découvrir ServiceFlow →',
    cta2: 'Lire la thèse',
  },

  thesis: {
    lab: '01 — La thèse',
    h2: 'Une pompe et un tableau exigent <em>la même discipline.</em>',
    p: [
      "À première vue, les systèmes industriels et les biens culturels n’ont rien en commun. L’un relève de l’ingénierie, l’autre du sens et du contexte. Pourtant, tous deux reposent sur la même chose : <strong>la précision dans la gestion de l’information, de la responsabilité et du temps.</strong>",
      "La valeur durable n’est jamais accidentelle. Elle se construit par une documentation structurée, des historiques sans lacune et des standards de manipulation constants. Qu’il s’agisse d’une pompe centrifuge qui tourne onze mois par an ou d’une toile qui a changé de mains quatre fois depuis 1931, la logique sous-jacente ne bouge pas.",
      "Ces deux domaines forment notre fondement non parce qu’ils se ressemblent en surface, mais parce qu’ils révèlent la même vérité opérationnelle en dessous : des systèmes qui préservent la valeur, coordonnent l’expertise et créent de la continuité dans le temps.",
    ],
    side: [
      ['Domaines', "Intelligence de processus<br>Provenance d’œuvres<br>Gestion d’actifs industriels"],
      ['Méthode', 'Données centralisées<br>Planification anticipée<br>Coordination des ressources'],
      ['Siège', 'Suisse'],
      ['Délai de réponse', 'Personnellement, sous deux jours<br>Aucun modèle, aucune automatisation'],
    ],
  },

  practice: {
    lab: '02 — Domaines',
    h2: 'Trois domaines, une méthode.',
    lede: 'Chacun a son tempo. Le travail, non.',
    tiles: [
      { href:'#products', canvas:'f-lam', regime:'Laminaire', regimeVar:'--laminar',
        h3:'Processus &amp; Intelligence', kind:'Conseil · Données · IA',
        p:"Nous travaillons là où <strong>la complexité appelle le calme.</strong> Une expertise technique approfondie des procédés industriels, associée à une architecture de données moderne et à l’intelligence appliquée.",
        li:['ServiceFlow — gestion du service','FlowSales — intelligence commerciale'], go:'Entrer →' },
      { href:'#pumps', canvas:'f-tur', regime:'Turbulent', regimeVar:'--turb-text',
        h3:'Pompes industrielles &amp; Art', kind:'La forme trouve la fonction',
        p:"Là où l’ingénierie rencontre la garde. La même discipline de documentation, de précision et de gestion de la valeur à long terme, appliquée aux machines comme aux objets.",
        li:['Documentation du cycle de vie',"Déploiement d’experts &amp; logistique"], go:'Lire la suite →' },
      { href:'#contact', canvas:'f-sed', regime:'Sédimentation', regimeVar:'--trans',
        h3:'Art &amp; Provenance', kind:'Musées · Collections · Exposition',
        p:"Nous travaillons là où <strong>le sens appelle la discrétion.</strong> Des objets qui comptent, accompagnés de l’acquisition à l’exposition — traités avec patience.",
        li:['Recherche de provenance','Documentation de collection'], go:'Nous écrire →' },
    ],
  },

  products: {
    lab: '03 — Produits',
    h2: "Un logiciel qui transforme l’expérience en structure.",
    lede: 'Deux systèmes bâtis sur la même idée : le savoir dispersé entre les équipes et les documents devient une source unique et fiable.',
    productWord: 'Produit',
    items: [
      {
        name:'Pumpolino ServiceFlow', sub:'Logiciel · Service · Automatisation', circuit:true,
        lead:"Du service réactif à l’exploitation maîtrisée. ServiceFlow transforme l’efficacité en structure et réunit l’historique de service, la planification et l’affectation des ressources dans un système unique et transparent.",
        feats:[
          ['Données centralisées',"Tout l’historique de service et les adaptations produit tiennent en un seul endroit. Le savoir dispersé entre les équipes et les documents devient une source unique et fiable — accessible et cohérente dans la durée."],
          ['Automatisation',"Un système bien conçu n’attend pas, il anticipe. Les intervalles de service sont suivis automatiquement et les techniciens sont avertis avant que le problème n’apparaisse : le mode d’exploitation passe de réactif à proactif."],
          ['Planification des ressources','Spécialistes, pièces de rechange et logistique sont coordonnés avec précision. La bonne compétence est disponible au bon moment, ce qui réduit les frictions et maintient la qualité du service.'],
        ],
        steps:['Analyse — processus définis, fonctions identifiées','Configuration &amp; migration dans les flux existants','Déploiement progressif avec formation'],
      },
      {
        name:'Pumpolino FlowSales', sub:'Logiciel · Vente · Intelligence', circuit:false,
        lead:"Structurer les décisions avant qu’elles ne se prennent. FlowSales rend l’expérience reproductible et transforme le savoir de projet en intelligence commerciale structurée, utile à chaque étape de la vente.",
        feats:[
          ['Jumeau numérique',"Chaque projet est saisi intégralement : documents, certifications, configurations et données capteurs réunis en un dossier structuré. Le savoir de l’entreprise devient consultable, comparable et disponible au moment voulu."],
          ['Appui à la vente',"Les références pertinentes et les projets comparables remontent au bon moment. Le taux de conversion progresse parce que les offres s’appuient sur une expérience démontrée plutôt que sur des capacités générales."],
          ["Aide à l’offre","Des offres semi-automatisées sont générées à partir des configurations et des données de projet existantes. Les équipes cessent de tout reconstruire et se consacrent aux décisions qui demandent une vraie expertise."],
        ],
        steps:['Structuration — données de projet et de référence organisées','Configuration — processus de vente cartographiés','Déploiement progressif avec optimisation'],
      },
    ],
  },

  pumps: {
    lab: '04 — Pompes industrielles &amp; art',
    h2: 'Un langage commun de <em>la précision.</em>',
    p: [
      "Les environnements complexes exigent une allocation précise du temps, de l’expertise et de la responsabilité. La planification suit des structures claires qui assurent la continuité et réduisent les frictions — lors d’un arrêt technique comme lors d’un montage d’exposition.",
      "Chaque bien est traité selon son importance et son état. Des procédures définies garantissent une manipulation soigneuse, la continuité du savoir et un standard de soin constant sur tout le cycle de vie.",
      "Les données prennent de la valeur lorsqu’elles soutiennent activement les décisions. Information et processus sont reliés : meilleur timing, priorités plus claires, actions mieux informées. Une plateforme unique crée de la transparence à tous les niveaux de l’organisation.",
    ],
    side: [
      ["S’applique à","Pompes centrifuges et volumétriques<br>Garnitures, paliers, chaînes cinématiques<br>Œuvres sur papier, toile, sculpture<br>Prêts &amp; dépôts de longue durée"],
      ['Produit',"Historique de service unifié<br>Constats d’état et de provenance<br>Fenêtres d’intervention planifiées<br>Chaîne de garde vérifiable"],
    ],
  },

  contact: {
    lab: '05 — Contact',
    h2: 'Écrivez-nous.',
    f: {
      name:'Nom', namePh:'Votre nom',
      email:'E-mail', emailPh:'vous@exemple.ch',
      subject:'Objet', subjectPh:"De quoi s’agit-il ?",
      message:'Message', messagePh:'Dites-nous ce dont vous avez besoin.',
      hp:'Laissez ce champ vide',
      consent:"J’accepte que les informations ci-dessus soient conservées et utilisées pour répondre à ma demande. Elles ne serviront à rien d’autre.",
      send:'Envoyer le message →',
    },
    note:"<b>Nous répondons personnellement.</b><br>Aucun modèle, aucune automatisation.<br><br>Qu’il s’agisse d’un parc de pompes réparti sur trois sites ou d’une seule œuvre à l’historique incomplet, la réponse vient d’une personne qui l’a lue.<br><br><b>pumpolino.com</b>",
  },

  footer: { legal:'Mentions légales', tag:'pour un monde en mouvement' },

  js: {
    stages: ['Réception','Planification','Envoi'],
    modeOn:'Activer le mode proactif', modeOff:'Revenir au mode réactif',
    stateReactive:'Réactif — les ordres s’accumulent à chaque poste',
    stateProactive:'Proactif — intervalles suivis, file résorbée',
    send:'Envoyer le message →', sending:'Envoi …',
    errEmail:"Merci d’indiquer une adresse e-mail à laquelle nous pouvons répondre.",
    errSubject:"Merci d’ajouter un objet, afin que nous sachions de quoi il s’agit.",
    errMessage:"Merci d’ajouter un message.",
    errConsent:'Merci de cocher la case pour que nous puissions conserver vos informations le temps de répondre.',
    localPreview:"<strong>Aperçu local.</strong><br>Le formulaire a été validé correctement. L’envoi est désactivé tant que la page est ouverte depuis le disque — il partira vers Web3Forms une fois le site en ligne.",
    sendOk:'<strong>Merci.</strong><br>Votre message nous est parvenu. Nous revenons vers vous sous peu.',
    sendErr:"L’envoi a échoué. Merci de réessayer ou de nous écrire directement.",
  },
},

};
