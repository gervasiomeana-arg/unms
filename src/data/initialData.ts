import { BlogPost, TestimonialMedia, Campaign, PushNotification, DonationRecord, SolidarityMessage, ImpactStat } from '../types';
import heroImage from '../assets/images/unms_hero_women_1788306077567.webp';
import weavingImage from '../assets/images/unms_cooperative_weaving_1788306089166.webp';
import healthImage from '../assets/images/unms_health_clinic_1788306102072.webp';
import educationImage from '../assets/images/unms_education_school_1788306112923.webp';
import advocacyImage from '../assets/images/unms_un_advocacy_1788306125550.webp';
import cultureImage from '../assets/images/unms_culture_tea_1788306136612.webp';

// Asset paths
export const IMAGES = {
  hero: heroImage,
  weaving: weavingImage,
  health: healthImage,
  education: educationImage,
  advocacy: advocacyImage,
  culture: cultureImage,
};

export const initialImpactStats: ImpactStat[] = [
  {
    id: 'stat-wilayas',
    value: '5',
    numericValue: 5,
    suffix: '',
    label: {
      es: 'Wilayas Autogestionadas',
      en: 'Self-Managed Wilayas',
      ar: 'ولايات ذاتية التسيير',
      fr: 'Wilayas Autogérées',
    },
    description: {
      es: 'Smara, El Aaiún, Auserd, Dajla y Bojador organizadas con comités de base.',
      en: 'Refugee camps organized and administered through women-led grassroots councils.',
      ar: 'مخيمات تديرها لجان نسائية قاعدية في الصحة والتعليم والتوزيع.',
      fr: 'Camps de réfugiés organisés et administrés par des comités de femmes.',
    },
    icon: 'Building2',
  },
  {
    id: 'stat-literacy',
    value: '95',
    numericValue: 95,
    suffix: '%',
    label: {
      es: 'Tasa de Alfabetización',
      en: 'Literacy Rate',
      ar: 'نسبة محو الأمية والتعليم',
      fr: 'Taux d’Alphabétisation',
    },
    description: {
      es: 'Superando la barrera del 5% inicial en 1975 gracias a la Escuela 27 de Febrero.',
      en: 'Elevated from under 5% in 1975 into universal literacy for boys and girls.',
      ar: 'ارتفعت من أقل من 5% عام 1975 إلى تعليم شبه شامل بفضل المعلمات.',
      fr: 'Passé de moins de 5% en 1975 à une alphabétisation quasi-universelle.',
    },
    icon: 'GraduationCap',
  },
  {
    id: 'stat-cooperatives',
    value: '120',
    numericValue: 120,
    suffix: '+',
    label: {
      es: 'Cooperativas Femeninas',
      en: 'Women Cooperatives',
      ar: 'تعاونية إنتاجية نسائية',
      fr: 'Coopératives Féminines',
    },
    description: {
      es: 'Producción de melhfas, orfebrería tradicional, huertos y centros de costura.',
      en: 'Textiles, traditional leathercrafts, desert horticulture, and solar crafts.',
      ar: 'ورشات خياطة الملاحف، المصوغات الفضية، الزراعة الصحراوية والحرف.',
      fr: 'Production textile, tannerie traditionnelle, maraîchage et maroquinerie.',
    },
    icon: 'Sparkles',
  },
  {
    id: 'stat-years',
    value: '50',
    numericValue: 50,
    suffix: '+',
    label: {
      es: 'Años de Resistencia Pacífica',
      en: 'Years of Peaceful Resistance',
      ar: 'عاماً من الصمود والكرامة',
      fr: 'Années de Résistance Pacifique',
    },
    description: {
      es: 'Liderando la preservación de la identidad nacional saharaui y la dignidad.',
      en: 'Preserving Sahrawi national identity, cultural memory, and democratic dignity.',
      ar: 'صون الهوية الوطنية والذاكرة التراثية والمرافعة الحقوقية الدولية.',
      fr: 'Préservation de l’identité nationale et plaidoyer pour l’autodétermination.',
    },
    icon: 'ShieldCheck',
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'story-escuela-27-febrero',
    title: {
      es: 'La Escuela de Formación 27 de Febrero: El Corazón Educativo de las Mujeres Saharauis',
      en: 'The 27th February Training School: The Educational Heart of Sahrawi Women',
      ar: 'مدرسة 27 فبراير للتكوين: القلب التعليمي والقيادي للمرأة الصحراوية',
      fr: 'L’École de Formation du 27 Février : Le Cœur Éducatif des Femmes Sahraouies',
    },
    summary: {
      es: 'Fundada en el desierto para erradicar el analfabetismo, este centro ha formado a más de 30.000 mujeres en liderazgo social, pedagogía, enfermería y gestión administrativa.',
      en: 'Founded in the open desert to eradicate illiteracy, this flagship center has trained over 30,000 women in social leadership, teaching, healthcare, and administrative governance.',
      ar: 'تأسست في قلب الصحراء للقضاء على الأمية، وخرجت أكثر من 30 ألف امرأة في مجالات القيادة المجتمعية والتعليم والتمريض والإدارة.',
      fr: 'Fondé en plein désert pour éradiquer l’analphabétisme, ce centre a formé plus de 30 000 femmes au leadership social, à la santé et à la gestion.',
    },
    content: {
      es: `En medio de la hamada de Tinduf, uno de los desiertos más inclementes del planeta, se levanta un faro de dignidad: la Escuela de Mujeres 27 de Febrero. Creada por la Unión Nacional de Mujeres Saharauis poco después del éxodo forzado de 1975, nació con un propósito audaz: asegurar que ninguna mujer saharaui quedara al margen del saber.

Durante décadas, miles de jóvenes y madres han aprendido no solo a leer y escribir en varios idiomas, sino también habilidades técnicas: mecánica, informática, gestión de proyectos humanitarios, telar tradicional y atención de emergencias sanitarias.

"Cuando construimos la escuela con nuestras propias manos y ladrillos de adobe secados al sol, sabíamos que estábamos cimentando la libertad de nuestro pueblo", relata Equipo editorial (ejemplo), veterana formadora.`,
      en: `In the middle of the Tindouf hamada, one of the harshest deserts on Earth, stands a beacon of dignity: the 27th February Women's School. Established by the National Union of Sahrawi Women shortly after the forced exodus of 1975, it was born with a bold purpose: to ensure that no Sahrawi woman would be left behind in education.

Over decades, thousands of young women and mothers have learned literacy, multiple languages, computing, healthcare assistance, traditional weaving, and community management.

"When we built the school with our own hands and sun-dried adobe bricks, we knew we were laying the foundation of our people's future," recalls Equipo editorial (ejemplo), a veteran educator.`,
      ar: `في وسط حمادة تندوف، يرتفع صرح الكرامة والتعليم: مدرسة 27 فبراير لتأهيل وتكوين النساء. أسسها الاتحاد الوطني للنساء الصحراويات عقب النزوح القسري عام 1975، بهدف أصيل: ألا تبقى أي امرأة صحراوية في عتمة الأمية.

على مدى عقود، تلقت آلاف الفتيات والأمهات تعليماً متعدد اللغات وتكويناً مهنياً في التمريض، الإعلام الآلي، النسيج التقليدي، وإدارة المشاريع الإنسانية.

وتقول فاطمة إبراهيم، إحدى المعلمات المؤسسات: "عندما بنينا المدرسة بأيدينا وبلبنات الطين المجففة تحت شمس الصحراء، كنا ندرك أننا نبني مستقبل شعبنا وحريته".`,
      fr: `Au cœur de la hamada de Tindouf se dresse un symbole de dignité : l’École des Femmes du 27 Février. Créée par l’UNMS après l’exode de 1975, elle avait pour mission d’éradiquer l’analphabétisme.

Des milliers de femmes y ont appris à lire, à écrire et se sont formées aux soins infirmiers, à l’informatique et à l’artisanat.

"Quand nous avons bâti l’école de nos propres mains avec des briques de terre séchées au soleil, nous savions que nous posions les fondations de notre liberté", témoigne Equipo editorial (ejemplo).`,
    },
    category: 'education',
    categoryLabel: {
      es: 'Educación y Liderazgo',
      en: 'Education & Leadership',
      ar: 'التعليم والقيادة',
      fr: 'Éducation & Leadership',
    },
    author: {
      name: 'Equipo editorial (ejemplo)',
      role: {
        es: 'Directora Pedagógica UNMS',
        en: 'UNMS Pedagogical Director',
        ar: 'المديرة التربوية بالاتحاد',
        fr: 'Directrice Pédagogique UNMS',
      },
    },
    date: '2026-08-15',
    readTime: '5',
    imageUrl: IMAGES.education,
    featured: true,
    tags: ['Escuela 27 de Febrero', 'Alfabetización', 'Liderazgo Femenino', 'Campamentos'],
    wilaya: 'Bojador',
    likes: 142,
    quote: {
      es: 'El saber no es un privilegio en el desierto; es el escudo más poderoso de nuestra identidad.',
      en: 'Knowledge is not a luxury in the desert; it is the strongest shield of our identity.',
      ar: 'العلم في الصحراء ليس ترفاً، بل هو أقوى درع لحماية هويتنا وكرامتنا.',
      fr: 'Le savoir n’est pas un privilège dans le désert, c’est le bouclier le plus puissant de notre identité.',
    },
  },
  {
    id: 'story-dispensarios-salud',
    title: {
      es: 'Guardias de la Vida: Las Médicas y Enfermeras que Sostienen la Salud Materna',
      en: 'Guardians of Life: The Doctors & Nurses Sustaining Maternal Health in the Sahara',
      ar: 'حارسات الحياة: الطبيبات والممرضات ودورهن في رعاية صحة الأمومة والطفولة',
      fr: 'Gardiennes de la Vie : Les Médecins et Infirmières Dédiées à la Santé Maternelle',
    },
    summary: {
      es: 'Conoce cómo los comités de salud de la UNMS gestionan dispensarios en las 5 wilayas, reduciendo la mortalidad materno-infantil a niveles históricos a pesar de la escasez de recursos.',
      en: 'Discover how UNMS health committees run community dispensaries across 5 refugee camps, lowering infant and maternal mortality through compassionate frontline care.',
      ar: 'تعرف على كيفية إدارة لجان الصحة بالاتحاد للمستوصفات في الولايات الخمس، وخفض معدلات وفيات الأمهات والأطفال رغم شح الموارد.',
      fr: 'Découvrez comment les comités de santé de l’UNMS gèrent les dispensaires dans les 5 wilayas pour protéger les mères et les nouveau-nés.',
    },
    content: {
      es: `En un entorno con temperaturas extremas que superan los 50°C en verano, la salud materno-infantil requiere una devoción incansable. Las enfermeras y promotoras de salud de la UNMS realizan visitas domiciliarias en cada jaima, controlando la nutrición de recién nacidos y administrando suplementos de hierro a mujeres gestantes.

A través de brigadas móviles de salud y convenios con organizaciones humanitarias internacionales, la UNMS garantiza que cada parto sea atendido con protocolos seguros y dignidad.`,
      en: `In an environment where summer temperatures exceed 50°C (122°F), maternal and infant health demands tireless commitment. UNMS nurses and community health workers conduct house-to-house visits across tent settlements, monitoring infant growth and providing iron supplements to expectant mothers.

Through mobile medical units and partnerships with international humanitarian NGOs, UNMS ensures every childbirth is received with clean clinical protocols and compassion.`,
      ar: `في بيئة قاسية تتجاوز فيها درجات الحرارة صيفاً 50 درجة مئوية، تتطلب صحة الأم والطفل إخلاصاً لا يعرف الكلل. تقوم الممرضات والمرشدات الصحيات بالاتحاد بزيارات ميدانية لكل خيمة ومنزل لتفقد نمو المواليد وتوزيع المكملات الغذائية على الحوامل.

ومن خلال الوحدات الصحية المتنقلة والتعاون مع المنظمات الدولية، يضمن الاتحاد رعاية كريمة لكل أم ومولود.`,
      fr: `Dans un environnement désertique où la température dépasse les 50°C en été, la santé maternelle exige un dévouement absolu. Les infirmières de l’UNMS effectuent des visites quotidiennes sous chaque tente pour le suivi nutritionnel.`,
    },
    category: 'health',
    categoryLabel: {
      es: 'Salud y Nutrición',
      en: 'Health & Nutrition',
      ar: 'الصحة والتغذية',
      fr: 'Santé & Nutrition',
    },
    author: {
      name: 'Equipo editorial (ejemplo)',
      role: {
        es: 'Coordinadora de Salud Materna UNMS',
        en: 'UNMS Maternal Health Coordinator',
        ar: 'منسقة صحة الأمومة والطفولة',
        fr: 'Coordinatrice Santé Maternelle UNMS',
      },
    },
    date: '2026-08-02',
    readTime: '4',
    imageUrl: IMAGES.health,
    featured: true,
    tags: ['Salud Comunitaria', 'Nutrición', 'Maternidad', 'Campamentos Refugiados'],
    wilaya: 'Smara',
    likes: 98,
    quote: {
      es: 'Cada niño que nace sano en este desierto es una victoria de la esperanza sobre la adversidad.',
      en: 'Every child born healthy in this desert is a victory of hope over hardship.',
      ar: 'كل طفل يولد معافى في هذه الصحراء هو انتصار للأمل على قسوة المعاناة.',
      fr: 'Chaque enfant qui naît en bonne santé dans ce désert est une victoire de l’espoir.',
    },
  },
  {
    id: 'story-cooperativas-textiles',
    title: {
      es: 'Tejiendo Autonomía: Las Cooperativas de Melhfas y Artesanía Tradicional',
      en: 'Weaving Autonomy: Melhfa Tailoring & Traditional Craft Cooperatives',
      ar: 'نسج الاستقلالية: تعاونيات خياطة الملحفة والحرف اليدوية التقليدية',
      fr: 'Tisser l’Autonomie : Les Coopératives de Melhfas et Artisanat Traditionnel',
    },
    summary: {
      es: 'Las mujeres artesanas combinan técnicas ancestrales con diseños contemporáneos, generando ingresos dignos y preservando el patrimonio textil del pueblo saharaui.',
      en: 'Sahrawi craftswomen blend ancestral weaving techniques with contemporary touches, creating sustainable livelihood and preserving heritage.',
      ar: 'تجمع الحرفيات الصحراويات بين تقنيات الأجداد واللمسات العصرية لتوفير دخل كريم وصون التراث النسيجي الأصيل.',
      fr: 'Les artisanes allient savoir-faire ancestral et création contemporaine pour générer des revenus dignes et préserver le patrimoine.',
    },
    content: {
      es: `La 'melhfa', el elegante tejido de cuatro metros con el que se envuelven las mujeres saharauis, es mucho más que una vestimenta: es una declaración de identidad, gracia y resistencia.

En los talleres de la UNMS en las wilayas de El Aaiún y Dajla, decenas de mujeres tiñen sedas, bordan motivos geométricos tradicionales y elaboran piezas de marroquinería en cuero de camello. Estas cooperativas financian directamente cajas de ahorro comunitarias para ayudar a familias en situación de vulnerabilidad extrema.`,
      en: `The 'melhfa', the graceful four-meter textile wrapped by Sahrawi women, is far more than a garment: it is a vibrant expression of identity, grace, and cultural resilience.

In UNMS workshops across El Aaiun and Dakhla camps, women dye fabrics, embroider traditional geometric motifs, and craft camel-leather goods. The cooperative profits directly fund mutual aid solidarity reserves for vulnerable families.`,
      ar: `'الملحفة'، ذلك الثوب الساحر بطول أربعة أمتار الذي ترتديه المرأة الصحراوية، هو عنوان للأصالة والأناقة والصمود.

في ورشات الاتحاد بولايات العيون والداخلة، تقوم النسوة بصباغة الأقمشة وتطريز الزخارف التقليدية وصناعة المنتجات الجلدية الفاخرة، وتوجيه العائدات لدعم الأسر المتعففة.`,
      fr: `La 'melhfa', élégant voile de quatre mètres porté par les femmes sahraouies, est bien plus qu’un vêtement : c’est un symbole fort d’identité et de grâce. Dans les ateliers de l’UNMS, les artisanes créent des pièces textiles uniques.`,
    },
    category: 'cooperative',
    categoryLabel: {
      es: 'Cooperativas y Artesanía',
      en: 'Cooperatives & Crafts',
      ar: 'التعاونيات والحرف',
      fr: 'Coopératives & Artisanat',
    },
    author: {
      name: 'Equipo editorial (ejemplo)',
      role: {
        es: 'Maestra Artesana de la Wilaya de Dajla',
        en: 'Master Artisan, Dakhla Camp',
        ar: 'معلمة حرفية بولاية الداخلة',
        fr: 'Maître Artisane, Camp de Dakhla',
      },
    },
    date: '2026-07-20',
    readTime: '6',
    imageUrl: IMAGES.weaving,
    featured: true,
    tags: ['Melhfa', 'Artesanía', 'Empoderamiento Económico', 'Cultura'],
    wilaya: 'Dajla',
    likes: 187,
    quote: {
      es: 'Cada hilo que cruzamos en el telar entrelaza la memoria de nuestras abuelas con los sueños de nuestras hijas.',
      en: 'Every thread we cross on the loom weaves the memory of our grandmothers with the dreams of our daughters.',
      ar: 'كل خيط ننسجه في النول يربط ذاكرة جداتنا بأحلام بناتنا ومستقبلهن.',
      fr: 'Chaque fil croisé sur le métier à tisser relie la mémoire de nos aïeules aux rêves de nos filles.',
    },
  },
  {
    id: 'story-derechos-humanos-ginebra',
    title: {
      es: 'La Voz de la Justicia en Ginebra: Delegación de la UNMS ante el Consejo de DDHH',
      en: 'Voice for Justice in Geneva: UNMS Delegation at the UN Human Rights Council',
      ar: 'صوت العدالة في جنيف: وفد الاتحاد الوطني للنساء الصحراويات أمام مجلس حقوق الإنسان',
      fr: 'La Voix de la Justice à Genève : Délégation de l’UNMS au Conseil des Droits de l’Homme',
    },
    summary: {
      es: 'Representantes de la UNMS denuncian la situación de las activistas saharauis en las zonas ocupadas y exigen la protección internacional de los recursos y derechos inalienables.',
      en: 'UNMS representatives present testimonies on the situation of Sahrawi female activists in occupied territories, demanding international human rights monitoring.',
      ar: 'قدمت ممثلات الاتحاد إحاطات حول واقع الناشطات الصحراويات بالمناطق المحتلة وطالبن بآليات حماية دولية لحقوق الإنسان.',
      fr: 'Les représentantes de l’UNMS témoignent à l’ONU de la situation des militantes sahraouies dans les territoires occupés.',
    },
    content: {
      es: `En la sede de las Naciones Unidas en Ginebra, la delegación de la UNMS elevó la voz en favor de las presas políticas saharauis y las defensoras del derecho a la libre autodeterminación.

Con informes documentados de violaciones cometidas contra mujeres activistas y testimonios de víctimas directas, la UNMS reafirma su compromiso inquebrantable con el derecho internacional y la justicia humanitaria.`,
      en: `At the United Nations headquarters in Geneva, the UNMS diplomatic delegation raised urgent awareness on Sahrawi female political prisoners and human rights defenders.

Presenting documented reports on human rights violations and testimonies from victims, UNMS reaffirms its steadfast commitment to international humanitarian law.`,
      ar: `في المقر الأممي بجنيف، رفعت ممثلات الاتحاد صوت المعتقلات والناشطات المدافعات عن حقوق الإنسان وتقرير المصير، مؤكدات على ضرورة احترام القانون الدولي الإنساني.`,
      fr: `Au Palais des Nations à Genève, l’UNMS a porté la voix des défenseuses des droits humains, plaidant pour le respect du droit international.`,
    },
    category: 'advocacy',
    categoryLabel: {
      es: 'Derechos Humanos y Diplomacia',
      en: 'Human Rights & Diplomacy',
      ar: 'حقوق الإنسان والدبلوماسية',
      fr: 'Droits Humains & Diplomatie',
    },
    author: {
      name: 'Equipo editorial (ejemplo)',
      role: {
        es: 'Secretaria de Relaciones Internacionales UNMS',
        en: 'UNMS International Relations Secretary',
        ar: 'مسؤولة العلاقات الدولية بالاتحاد',
        fr: 'Secrétaire aux Relations Internationales UNMS',
      },
    },
    date: '2026-06-28',
    readTime: '5',
    imageUrl: IMAGES.advocacy,
    featured: false,
    tags: ['ONU', 'Ginebra', 'Derechos Humanos', 'Incidencia'],
    wilaya: 'Diáspora / Ginebra',
    likes: 114,
    quote: {
      es: 'La paz auténtica solo florece sobre los cimientos de la justicia y la dignidad para todos los pueblos.',
      en: 'Genuine peace only flourishes upon foundations of justice and dignity for all peoples.',
      ar: 'السلام الحقيقي لا يزهر إلا على أسس العدالة والكرامة لجميع الشعوب.',
      fr: 'La paix véritable ne peut s’épanouir que sur le socle de la justice et de la dignité.',
    },
  },
  {
    id: 'story-ceremonia-te-cultura',
    title: {
      es: 'Los Tres Vasos del Té Saharaui: Filosofía, Hospitalidad y Memoria Oral',
      en: 'The Three Glasses of Sahrawi Tea: Philosophy, Hospitality & Oral Memory',
      ar: 'كؤوس الشاي الصحراوي الثلاثة: فلسفة الضيافة والذاكرة الشفوية في الخيمة',
      fr: 'Les Trois Verres du Thé Sahraoui : Philosophie, Hospitalité et Mémoire Orale',
    },
    summary: {
      es: 'El ritual del té preparado en la jaima por las mujeres saharauis es un espacio sagrado de diálogo, transmisión de poesía Hassaniya y toma de decisiones comunitarias.',
      en: 'The traditional tea ceremony prepared inside the desert khaima tent by Sahrawi women is a revered space for dialogue, poetry, and community decision-making.',
      ar: 'طقوس إعداد الشاي داخل الخيمة الصحراوية تعد فضاءً مقدساً للحوار والتلاقي ونقل الشعر الحساني وصنع القرار المجتمعي.',
      fr: 'Le rituel du thé sous la tente sahraouie est un espace sacré de dialogue, de transmission de la poésie et de convivialité.',
    },
    content: {
      es: `"El primer vaso es amargo como la vida; el segundo es dulce como el amor; el tercero es suave como la muerte." Este proverbio saharaui resume la liturgia del té con espuma espesa servido en pequeñas bandejas de latón.

Alrededor de las brasas, las abuelas transmiten cuentos y versos a las nuevas generaciones, manteniendo encendida la llama de una cultura milenaria que ninguna frontera puede borrar.`,
      en: `"The first glass is bitter like life; the second is sweet like love; the third is gentle like death." This Sahrawi proverb encapsulates the timeless tea ceremony served with rich foam.

Gathered around glowing embers inside the tent, grandmothers pass down oral epics, proverbs, and songs to younger generations.`,
      ar: `"الكأس الأول مر كالحياة، والثاني حلو كالحب، والثالث رقيق كالموت." يلخص هذا المثل الصحراوي حكمة إعداد الشاي ورغوته البيضاء.

حول موقد الجمر، تنقل الجدات والأمهات الحكايات والشعر الحساني للأجيال الصاعدة حفاظاً على التراث والهوية.`,
      fr: `"Le premier verre est amer comme la vie, le deuxième est doux comme l’amour, le troisième est suave comme la mort." Un rituel ancestral de mémoire et de partage.`,
    },
    category: 'culture',
    categoryLabel: {
      es: 'Cultura y Tradición',
      en: 'Culture & Tradition',
      ar: 'الثقافة والتراث',
      fr: 'Culture & Tradition',
    },
    author: {
      name: 'Equipo editorial (ejemplo)',
      role: {
        es: 'Poeta y Archivista de Memoria Oral UNMS',
        en: 'Poet & Oral Archive Curator UNMS',
        ar: 'شاعرة وحافظة التراث الشفوي',
        fr: 'Poétesse & Archiviste Orale UNMS',
      },
    },
    date: '2026-06-10',
    readTime: '4',
    imageUrl: IMAGES.culture,
    featured: false,
    tags: ['Cultura Saharaui', 'Tradición del Té', 'Poesía Hassaniya', 'Jaima'],
    wilaya: 'Auserd',
    likes: 165,
    quote: {
      es: 'Nuestra hospitalidad en medio de las dunas es la mayor prueba de nuestra infinita riqueza humana.',
      en: 'Our hospitality in the heart of the dunes is the greatest proof of our limitless human richness.',
      ar: 'كرم ضيافتنا في قلب الكثبان هو أعظم برهان على غنانا الإنساني اللامحدود.',
      fr: 'Notre hospitalité au milieu des dunes est la plus belle preuve de notre richesse humaine.',
    },
  },
];

export const initialTestimonials: TestimonialMedia[] = [
  {
    id: 'test-shweirif-liderazgo',
    type: 'video',
    title: {
      es: 'Construyendo una República en el Refugio: 50 Años de Gestión Femenina',
      en: 'Building a Republic in Exile: 50 Years of Women-Led Governance',
      ar: 'بناء المؤسسات في اللجوء: 50 عاماً من القيادة النسائية في المخيمات',
      fr: 'Bâtir une République en Exil : 50 Ans de Gouvernance Féminine',
    },
    speaker: 'Testimonio ilustrativo',
    speakerRole: {
      es: 'Secretaria General de la UNMS',
      en: 'Secretary General of UNMS',
      ar: 'الأمينة العامة للاتحاد الوطني للنساء الصحراويات',
      fr: 'Secrétaire Générale de l’UNMS',
    },
    location: 'Wilaya de Bojador',
    duration: '04:45',
    thumbnailUrl: IMAGES.hero,
    quote: {
      es: 'Cuando llegamos sin nada en 1975, las mujeres levantamos los primeros refugios, organizamos las escuelas y repartimos cada grano de alimento con justicia absoluta.',
      en: 'When we arrived with nothing in 1975, women built the first shelters, set up the schools, and distributed every grain of food with total equity.',
      ar: 'حين وصلنا بلا شيء عام 1975، شيدت النساء أولى الخيام ونظمن المدارس ووزعن كل حبة قمح بعدالة مطلقة.',
      fr: 'Quand nous sommes arrivées démunies en 1975, les femmes ont dressé les premiers abris et organisé les écoles avec une équité exemplaire.',
    },
    fullTranscript: {
      es: `Las mujeres saharauis no fuimos meras receptoras pasivas de ayuda humanitaria; nos convertimos en las arquitectas del estado saharaui en el exilio. Creamos una estructura democrática con comités de barrio, centros de salud preventiva y asambleas deliberativas en las que cada decisión se toma por consenso.

Hoy, más del 70% de los cargos docentes y sanitarios en los campamentos están desempeñados por mujeres con formación universitaria. Nuestro llamamiento al mundo es de solidaridad, pero sobre todo de respeto a la voluntad de un pueblo que nunca ha dejado de luchar pacíficamente por su libertad.`,
      en: `Sahrawi women were never passive recipients of aid; we became the architects of our society in exile. We established democratic grassroots councils, preventive clinics, and assemblies where decisions are made collaboratively.

Today, over 70% of teaching and healthcare roles in the camps are held by university-trained women. Our message to the world is one of solidarity and respect for our people's dignity.`,
      ar: `لم تكن المرأة الصحراوية مجرد متلقٍ للمساعدات، بل أصبحت مهندسة المجتمع في اللجوء. أسسنا اللجان الشعبية القاعدية والمراكز الصحية والجمعيات العامة التي تتخذ القرارات بالشورى والتعاون.

واليوم تشغل النساء أكثر من 70% من الوظائف التعليمية والصحية بالمخيمات، وتوجه رسالة تضامن وعزة إلى كل أحرار العالم.`,
      fr: `Les femmes sahraouies sont devenues les bâtisseuses de la société en exil. Aujourd’hui, plus de 70% des postes dans l’éducation et la santé sont occupés par des femmes.`,
    },
    date: '2026-08-10',
    tags: ['Liderazgo', 'Historia', 'Autogestión', 'Democracia'],
    featured: true,
  },
  {
    id: 'test-dra-salek-salud',
    type: 'video',
    title: {
      es: 'De la Tienda al Quirófano: La Vocación de Salvar Vidas en el Desierto',
      en: 'From Tent to Operating Room: Saving Lives in the Deep Desert',
      ar: 'من الخيمة إلى غرفة العمليات: رسالة إنقاذ الأرواح في عمق الصحراء',
      fr: 'De la Tente au Bloc Opératoire : Sauver des Vies dans le Désert',
    },
    speaker: 'Testimonio ilustrativo',
    speakerRole: {
      es: 'Especialista en Ginecología y Salud Materna en Campamentos',
      en: 'Gynecology & Maternal Health Specialist in Camps',
      ar: 'أخصائية طب النساء والتوليد بالمخيمات',
      fr: 'Spécialiste en Gynécologie et Santé Maternelle dans les Camps',
    },
    location: 'Hospital Central de Smara',
    duration: '03:30',
    thumbnailUrl: IMAGES.health,
    quote: {
      es: 'Estudié medicina en el extranjero gracias al apoyo de mi comunidad, y regresé al campamento para devolverle cada gota de esperanza a nuestras madres.',
      en: 'I studied medicine abroad through my community support, and I returned to the camps to give back hope to every mother and newborn.',
      ar: 'درست الطب في الخارج بفضل دعم مجتمعي، وعدت إلى المخيم لأكرس علمي في خدمة أمهاتنا وأطفالنا.',
      fr: 'J’ai étudié la médecine à l’étranger et suis revenue au camp pour servir nos mères et nouveau-nés.',
    },
    fullTranscript: {
      es: `Atendemos más de 200 partos mensuales en condiciones logísticas complejas. Con la ayuda de la UNMS y la cooperación médica internacional, hemos modernizado los sistemas de monitorización fetal y mantenemos cadenas de frío para vacunas pediátricas con energía solar.

El compromiso de las enfermeras saharauis es inigualable: no hay descanso cuando se trata de salvaguardar una vida naciente en el desierto.`,
      en: `We assist over 200 births every month despite challenging logistics. With UNMS and international medical solidarity, we have modernized fetal monitoring and maintain solar-powered vaccine cold chains.`,
      ar: `نشرف على أكثر من 200 ولادة شهرياً، وبفضل الاتحاد والتضامن الدولي طورنا أجهزة المراقبة وسلاسل التبريد المعتمدة على الطاقة الشمسية لحفظ اللقاحات.`,
      fr: `Nous accompagnons plus de 200 naissances par mois avec des équipements modernisés grâce à la solidarité internationale.`,
    },
    date: '2026-07-18',
    tags: ['Salud', 'Medicina', 'Maternidad', 'Cooperación'],
    featured: true,
  },
  {
    id: 'test-podcast-poesia-oral',
    type: 'audio',
    title: {
      es: 'Podcast: Cantos de Resistencia y Poesía de las Abuelas Saharauis',
      en: 'Podcast: Resistance Chants & Poetic Verses of Sahrawi Grandmothers',
      ar: 'بودكاست: أناشيد الصمود والشعر الحساني بأصوات الجدات الصحراويات',
      fr: 'Podcast : Chants de Résistance et Poésie des Grands-mères Sahraouies',
    },
    speaker: 'Colectivo cultural (ejemplo)',
    speakerRole: {
      es: 'Preservadoras del Canto Tradicional Haul',
      en: 'Custodians of Haul Traditional Sahrawi Chants',
      ar: 'حافظات موسيقى وتراث الهَوْل الصحراوي',
      fr: 'Gardiennes de la Musique Traditionnelle Haul',
    },
    location: 'Wilaya de El Aaiún',
    duration: '06:15',
    thumbnailUrl: IMAGES.culture,
    quote: {
      es: 'Nuestra música "Haul" y nuestros tambores "Tbal" son el latido que mantiene viva la memoria y el anhelo de libertad.',
      en: 'Our Haul music and Tbal drums are the heartbeat that keeps memory and freedom alive across generations.',
      ar: 'موسيقانا "الهَوْل" وطبول "التبال" هي النبض الحي الذي يخلد الذاكرة والتطلع للحرية.',
      fr: 'Notre musique Haul et nos tambours Tbal sont les battements qui gardent vivante notre mémoire.',
    },
    fullTranscript: {
      es: `Grabación histórica de cantos tradicionales interpretados en coro por las mujeres de la Wilaya de El Aaiún con el acompañamiento rítmico del 'Tbal'. Las letras narran el éxodo, el viaje a través de las dunas, el valor de las madres que cruzaron el desierto a pie protegiendo a sus hijos y la inquebrantable fe en el retorno a su tierra libre.`,
      en: `A historic recording of traditional songs performed by women of El Aaiun refugee camp with the rhythmic resonance of the Tbal drum. The lyrics recount the exodus across the dunes and the courage of mothers.`,
      ar: `تسجيل تاريخي لأناشيد التراث تؤديها نساء ولاية العيون بإيقاع طبل 'التبال'، تروي ملحمة النزوح وعبور الكثبان وصمود الأمهات في حماية أطفالهن.`,
      fr: `Enregistrement sonore des chants traditionnels interprétés par les femmes du camp de Laâyoune avec le rythme du Tbal.`,
    },
    date: '2026-06-05',
    tags: ['Podcast', 'Música Haul', 'Tbal', 'Tradición Oral'],
    featured: false,
  },
  {
    id: 'test-fotoensayo-cooperativas',
    type: 'photo_story',
    title: {
      es: 'Ensayo Fotográfico: Manos que Crean Futuro en los Talleres de Cuero y Telares',
      en: 'Photo Essay: Hands Creating the Future in Leather & Textile Guilds',
      ar: 'معرض وثائقي مصور: أيادٍ تصنع المستقبل في ورشات الجلد والنسيج',
      fr: 'Essai Photo : Des Mains qui Créent l’Avenir dans les Ateliers d’Artisanat',
    },
    speaker: 'Colectivo de Artesanas de la Wilaya de Smara',
    speakerRole: {
      es: 'Asociación de Mujeres Artesanas UNMS',
      en: 'UNMS Women Artisans Association',
      ar: 'جمعية الحرفيات بالاتحاد الوطني للنساء الصحراويات',
      fr: 'Association des Femmes Artisanes UNMS',
    },
    location: 'Wilaya de Smara',
    duration: '12 Fotografías en Alta Definición',
    thumbnailUrl: IMAGES.weaving,
    quote: {
      es: 'En cada bolso de cuero curtido al sol y en cada bordado de melhfa está grabada la belleza de nuestra tierra natal.',
      en: 'In every sun-tanned leather pouch and embroidered melhfa is engraved the timeless beauty of our homeland.',
      ar: 'في كل قطعة جلد طبيعي وكل تطريز على الملحفة، نحفر جمال أرضنا وتراثنا الخالد.',
      fr: 'Dans chaque création artisanale est gravée la beauté de notre terre.',
    },
    fullTranscript: {
      es: `Serie documental que retrata el minucioso proceso de trabajo en las cooperativas de la UNMS: desde el curtido con cortezas vegetales locales, pasando por el teñido natural de telas, hasta la comercialización solidaria en ferias internacionales de artesanía ética.`,
      en: `A photographic documentary showcasing the artisanal process in UNMS guilds: from natural vegetable tanning to intricate embroidery and fair-trade distribution.`,
      ar: `سلسلة وثائقية مصورة تستعرض مراحل العمل بالتعاونيات من الدباغة النباتية الطبيعية إلى التطريز والتسويق في معارض التضامن الدولي.`,
      fr: `Série documentaire illustrant le travail minutieux dans les coopératives de l’UNMS : tannage végétal, broderie et commerce équitable.`,
    },
    date: '2026-05-14',
    tags: ['Fotografía', 'Artesanía', 'Comercio Justo', 'Cultura'],
    featured: false,
  },
];

export const initialCampaigns: Campaign[] = [
  {
    id: 'camp-maternidad-2026',
    title: {
      es: 'Campaña Emergencia: Kits de Nutrición y Parto Seguro en Campamentos',
      en: 'Emergency Campaign: Maternal Nutrition & Safe Birth Kits in Camps',
      ar: 'حملة طوارئ: حقائب التغذية والولادة الآمنة في مخيمات اللاجئين',
      fr: 'Campagne d’Urgence : Kits de Nutrition et Accouchements Sécurisés',
    },
    description: {
      es: 'Garantizar suministros de hierro, ácido fólico y kits esterilizados para 1.500 mujeres embarazadas en las 5 wilayas saharauis durante los meses de verano.',
      en: 'Securing essential prenatal supplements, iron formulas, and sterilized delivery kits for 1,500 pregnant mothers across all 5 camps.',
      ar: 'تأمين المكملات الغذائية ومجموعات الولادة المعقمة لـ 1500 أم حامل في الولايات الخمس خلال فترة الصيف.',
      fr: 'Fourniture de compléments prénatals et kits stériles pour 1 500 femmes enceintes dans les 5 wilayas.',
    },
    hashtag: '#MaternidadSaharaui #SaludUNMS',
    targetGoalEUR: 25000,
    currentAmountEUR: 18450,
    supportersCount: 342,
    imageUrl: IMAGES.health,
    urgent: true,
    category: 'health',
    daysLeft: 14,
  },
  {
    id: 'camp-becas-escuela27',
    title: {
      es: 'Becas de Liderazgo y Alfabetización: Escuela 27 de Febrero',
      en: 'Leadership & Vocational Scholarships: 27th February School',
      ar: 'منح التعليم والتأهيل القيادي والمهني: مدرسة 27 فبراير',
      fr: 'Bourses de Leadership et Formation : École du 27 Février',
    },
    description: {
      es: 'Financia material didáctico, ordenadores y herramientas de taller para 300 jóvenes saharauis en su ciclo de formación profesional y gestión comunitaria.',
      en: 'Funding teaching books, computers, and workshop tools for 300 young Sahrawi women undergoing leadership and vocational degrees.',
      ar: 'تمويل الحقائب التعليمية وأجهزة الحاسوب والأدوات المهنية لـ 300 شابة صحراوية في برامج التدريب والإدارة.',
      fr: 'Financement de matériel pédagogique et informatique pour 300 jeunes femmes sahraouies.',
    },
    hashtag: '#EducacionParaVencer #MujeresSaharauis2026',
    targetGoalEUR: 30000,
    currentAmountEUR: 22800,
    supportersCount: 419,
    imageUrl: IMAGES.education,
    urgent: false,
    category: 'education',
    daysLeft: 28,
  },
  {
    id: 'camp-cooperativas-textiles',
    title: {
      es: 'Telar Solidario: Equipamiento Solar para Cooperativas de Mujeres',
      en: 'Solidarity Looms: Solar Equipment for Women’s Craft Guilds',
      ar: 'أنوال التضامن: تجهيز ورشات الحرفيات بالطاقة الشمسية المستدامة',
      fr: 'Métiers Solidaires : Équipements Solaires pour Coopératives Féminines',
    },
    description: {
      es: 'Instalación de paneles fotovoltaicos y máquinas de coser mecánicas para asegurar la producción continua de las cooperativas textiles en Smara y Dajla.',
      en: 'Installing photovoltaic solar panels and heavy-duty sewing equipment to power women textile cooperatives reliably.',
      ar: 'تركيب ألواح طاقة شمسية وآلات خياطة حديثة لضمان استمرارية إنتاج التعاونيات الحرفية في السمارة والداخلة.',
      fr: 'Installation de panneaux solaires et machines à coudre pour les ateliers textiles de Smara et Dakhla.',
    },
    hashtag: '#ArtesaniaSaharaui #AutonomiaFemenina',
    targetGoalEUR: 15000,
    currentAmountEUR: 11200,
    supportersCount: 215,
    imageUrl: IMAGES.weaving,
    urgent: false,
    category: 'cooperative',
    daysLeft: 35,
  },
];

export const initialPushNotifications: PushNotification[] = [
  {
    id: 'push-1',
    title: {
      es: 'Campaña Urgente: Kits de Salud Materna',
      en: 'Urgent Alert: Maternal Health Kits Campaign',
      ar: 'نداء عاجل: حملة حقائب صحة الأمومة والطفولة',
      fr: 'Alerte Urgente : Campagne Kits Santé Maternelle',
    },
    message: {
      es: '¡Hemos alcanzado el 74% de nuestro objetivo! Tu apoyo directo salva vidas en los campamentos de refugiados.',
      en: 'We reached 74% of our goal! Your direct solidarity saves lives in refugee camps.',
      ar: 'وصلنا إلى 74% من هدف الحملة! تضامنكم المباشر ينقذ الأرواح في مخيمات اللاجئين.',
      fr: 'Nous avons atteint 74% de notre objectif ! Votre solidarité sauve des vies.',
    },
    timestamp: 'Hace 2 horas',
    type: 'urgent',
    actionUrl: '#campanas-solidaridad',
    read: false,
  },
  {
    id: 'push-2',
    title: {
      es: 'Nueva Crónica: La Escuela 27 de Febrero',
      en: 'New Story: 27th February Leadership School',
      ar: 'تقرير جديد: مدرسة 27 فبراير ومسيرة التعليم',
      fr: 'Nouveau Récit : L’École du 27 Février',
    },
    message: {
      es: 'Descubre cómo las mujeres saharauis levantaron el centro educativo insigne del refugio.',
      en: 'Discover how Sahrawi women built the premier educational academy of the exile.',
      ar: 'تعرف على قصة بناء المعلمات الصحراويات لأكبر مدرسة تدريب في اللجوء.',
      fr: 'Découvrez comment les femmes sahraouies ont bâti cette école emblématique.',
    },
    timestamp: 'Ayer',
    type: 'news',
    actionUrl: '#historias-blog',
    read: true,
  },
  {
    id: 'push-3',
    title: {
      es: 'Webinar Internacional: Mujeres y Autodeterminación',
      en: 'International Webinar: Women & Self-Determination',
      ar: 'ندوة دولية عبر الإنترنت: المرأة وحق تقرير المصير',
      fr: 'Webinaire International : Femmes et Autodétermination',
    },
    message: {
      es: 'Conferencia virtual con delegadas de la UNMS y juristas internacionales este jueves a las 18:00 CET.',
      en: 'Virtual live panel with UNMS delegates and international jurists this Thursday at 18:00 CET.',
      ar: 'لقاء تفاعلي مباشر مع ممثلات الاتحاد وحقوقيين دوليين هذا الخميس الساعة 18:00 بتوقيت وسط أوروبا.',
      fr: 'Conférence en ligne avec les déléguées de l’UNMS ce jeudi à 18h00 CET.',
    },
    timestamp: 'Hace 3 días',
    type: 'event',
    actionUrl: '#campanas-solidaridad',
    read: true,
  },
];

export const initialDonations: DonationRecord[] = [];

export const initialSolidarityMessages: SolidarityMessage[] = [
  {
    id: 'msg-1',
    author: 'Mensaje ilustrativo 1',
    country: 'Comunidad internacional',
    message: 'El ejemplo de organización, dignidad y resistencia pacífica de las mujeres saharauis es una inspiración para el feminismo de todo el mundo. ¡Sahara Libre!',
    date: '2026-08-31',
    likes: 42,
  },
  {
    id: 'msg-2',
    author: 'Mensaje ilustrativo 2',
    country: 'Comunidad internacional',
    message: 'تحية إجلال وإكبار للمرأة الصحراوية الصامدة في مخيمات العزة والكرامة. أنتن فخر الأمة ورمز الشجاعة.',
    date: '2026-08-29',
    likes: 38,
  },
  {
    id: 'msg-3',
    author: 'Mensaje ilustrativo 3',
    country: 'Comunidad internacional',
    message: 'The resilience and democratic community management demonstrated by UNMS in Tindouf is an extraordinary global benchmark for human dignity.',
    date: '2026-08-26',
    likes: 29,
  },
  {
    id: 'msg-4',
    author: 'Mensaje ilustrativo 4',
    country: 'Comunidad internacional',
    message: 'Bravo pour votre travail admirable dans l’éducation et les soins de santé maternelle. Nous restons à vos côtés jusqu’à la liberté.',
    date: '2026-08-22',
    likes: 31,
  },
];
