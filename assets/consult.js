/* Private Client Inquiry — multi-step form (client side).
   Scoring happens only on the server (netlify/functions/inquiry.mjs). */
(function(){
const I18N={
en:{eyebrow:"Private & confidential",title:"Private Client Inquiry",sub:"Every exceptional journey begins with a private conversation.",intro:"Share a few details so we can understand your needs and respond appropriately.",
steps:["Service","Your plans","Timing","Your details"],next:"Continue",back:"Back",submit:"Submit Private Inquiry",sending:"Sending…",stepOf:"Step {n} of {t}",
q_service:"What service are you interested in?",
svc:{realestate:["Real Estate Investment","Residential, villas, off-plan and portfolios"],advisory:["Financial & Tax Services","Setup, tax, governance and growth"],medical:["Medical & Aesthetic Concierge","Coordinated care with licensed clinics"],travel:["Luxury Travel & Lifestyle","Stays, experiences and VIP services"],other:["Other Private Services","Tell us what you have in mind"]},
q:{realestate:{budget:"What is your approximate investment budget?",property:"What type of property are you interested in?"},advisory:{support:"What type of support are you looking for?",profile:"What best describes your business?",size:"Approximate size of your business"},medical:{procedure:"What type of procedure or service are you considering?",budget:"What is your estimated budget for the visit?"},travel:{experience:"What type of experience are you interested in?",budget:"What is your approximate total trip budget?"},other:{requirements:"Please briefly describe your requirements.",budget_text:"Approximate budget"}},
o:{realestate:{budget:{lt1m:"Below AED 1 million","1-3m":"AED 1–3 million","3-5m":"AED 3–5 million","5-10m":"AED 5–10 million","10m+":"AED 10 million+",undecided:"Not decided yet"},property:{residential:"Residential property",villa:"Luxury villa",commercial:"Commercial property",offplan:"Off-plan investment",portfolio:"Investment portfolio",unsure:"Not sure yet"}},
advisory:{support:{setup:"Business setup & structuring",transformation:"Financial advisory & transformation",tax:"Tax advisory & compliance",governance:"Governance & risk management",opportunities:"Investment & business opportunities",other:"Other"},profile:{owner:"Business owner / founder",investor:"Investor",executive:"Corporate executive",family:"Family business representative",entrepreneur:"Entrepreneur / startup founder",other:"Other"},size:{startup:"Startup / pre-revenue",lt5m:"Below AED 5M annual revenue","5-20m":"AED 5–20M","20-100m":"AED 20–100M","100m+":"AED 100M+",undisclosed:"Prefer not to disclose"}},
medical:{procedure:{cosmetic:"Cosmetic surgery",dental:"Dental & smile design",dermatology:"Dermatology & skin",hair:"Hair restoration",wellness:"Wellness & aesthetic treatments",other:"Other / private consultation"},budget:{lt15k:"Below AED 15,000","15-30k":"AED 15,000–30,000","30-60k":"AED 30,000–60,000","60k+":"AED 60,000+",private:"Prefer to discuss privately"}},
travel:{experience:{accommodation:"Luxury accommodation",experiences:"Private Dubai experiences",vip:"VIP concierge services",executive:"Executive business travel",bespoke:"Bespoke travel planning",other:"Other"},budget:{lt20k:"Below AED 20,000","20-50k":"AED 20,000–50,000","50-100k":"AED 50,000–100,000","100k+":"AED 100,000+",private:"Prefer to discuss privately"}}},
optional:"Optional",medNote:"Please don't share medical history or records here — we'll discuss details privately with you.",
q_timeline:"When are you planning to proceed?",tl:{immediately:"Immediately","3m":"Within 3 months","6m":"Within 6 months",exploring:"Currently exploring options"},
q_notes:"Anything else we should know?",notesPh:"A few words on your goals or preferences",
f_name:"Full name",f_prof:"Profession / business activity",profPh:"e.g. Business Owner, Investor, Executive",f_country:"Country of residence",f_email:"Email address",f_phone:"Phone / WhatsApp",f_method:"Preferred contact",m:{email:"Email",phone:"Phone",whatsapp:"WhatsApp"},
privacy:"Your inquiry is treated confidentially and used to assess and respond to your request.",consentA:"I agree to the processing of my information as described in the",consentB:"Privacy Policy",
err:{choose:"Please choose an option.",text:"Please add a short description.",name:"Please enter your name.",email:"Please enter a valid email.",phone:"Please enter a valid phone number.",country:"Please enter your country.",consent:"Please confirm your consent.",server:"We couldn't send your inquiry just now. Please try again, or reach us directly below.",rate:"Too many attempts. Please wait a few minutes, or reach us directly below."},
okT:"Thank you — your inquiry is with us.",okD:"We'll review it personally and contact you within one business day.",okWa:"Continue on WhatsApp",okHome:"Back to home",
fbT:"Your inquiry is ready",fbD:"Online sending isn't available in this preview. You can send it directly:",fbWa:"Send via WhatsApp",fbMail:"Send via email",direct:"Prefer to talk now?"},
ar:{eyebrow:"خاص وسرّي",title:"طلب عميل خاص",sub:"كل رحلة استثنائية تبدأ بحديث خاص.",intro:"شاركنا بعض التفاصيل لنفهم احتياجاتك ونرد عليك بما يناسبك.",
steps:["الخدمة","خططك","التوقيت","بياناتك"],next:"متابعة",back:"رجوع",submit:"أرسل الطلب الخاص",sending:"جارٍ الإرسال…",stepOf:"الخطوة {n} من {t}",
q_service:"ما الخدمة التي تهمّك؟",
svc:{realestate:["الاستثمار العقاري","سكني، فلل، على الخارطة، ومحافظ"],advisory:["الخدمات المالية والضريبية","التأسيس والضرائب والحوكمة والنمو"],medical:["الكونسيرج الطبي والتجميلي","تنسيق مع عيادات مرخّصة"],travel:["السفر الفاخر وأسلوب الحياة","إقامة وتجارب وخدمات كبار الشخصيات"],other:["خدمات خاصة أخرى","أخبرنا بما تفكر فيه"]},
q:{realestate:{budget:"ما ميزانيتك الاستثمارية التقريبية؟",property:"ما نوع العقار الذي يهمّك؟"},advisory:{support:"ما نوع الدعم الذي تبحث عنه؟",profile:"ما الوصف الأقرب لنشاطك؟",size:"الحجم التقريبي لنشاطك"},medical:{procedure:"ما الإجراء أو الخدمة التي تفكر فيها؟",budget:"ما ميزانيتك التقديرية للزيارة؟"},travel:{experience:"ما نوع التجربة التي تهمّك؟",budget:"ما الميزانية التقريبية للرحلة؟"},other:{requirements:"صف احتياجاتك باختصار.",budget_text:"الميزانية التقريبية"}},
o:{realestate:{budget:{lt1m:"أقل من مليون درهم","1-3m":"1–3 ملايين درهم","3-5m":"3–5 ملايين درهم","5-10m":"5–10 ملايين درهم","10m+":"أكثر من 10 ملايين درهم",undecided:"لم أحدد بعد"},property:{residential:"عقار سكني",villa:"فيلا فاخرة",commercial:"عقار تجاري",offplan:"استثمار على الخارطة",portfolio:"محفظة استثمارية",unsure:"لست متأكدًا بعد"}},
advisory:{support:{setup:"تأسيس الأعمال وهيكلتها",transformation:"استشارات مالية وتحوّل",tax:"استشارات ضريبية وامتثال",governance:"الحوكمة وإدارة المخاطر",opportunities:"فرص الاستثمار والأعمال",other:"أخرى"},profile:{owner:"صاحب عمل / مؤسس",investor:"مستثمر",executive:"مسؤول تنفيذي",family:"ممثل شركة عائلية",entrepreneur:"رائد أعمال / شركة ناشئة",other:"أخرى"},size:{startup:"ناشئة / قبل الإيرادات",lt5m:"إيرادات أقل من 5 ملايين درهم","5-20m":"5–20 مليون درهم","20-100m":"20–100 مليون درهم","100m+":"أكثر من 100 مليون درهم",undisclosed:"أفضّل عدم الإفصاح"}},
medical:{procedure:{cosmetic:"جراحة تجميلية",dental:"طب الأسنان وتصميم الابتسامة",dermatology:"الجلدية والبشرة",hair:"زراعة الشعر",wellness:"علاجات العافية والتجميل",other:"أخرى / استشارة خاصة"},budget:{lt15k:"أقل من 15,000 درهم","15-30k":"15,000–30,000 درهم","30-60k":"30,000–60,000 درهم","60k+":"أكثر من 60,000 درهم",private:"أفضّل مناقشتها على انفراد"}},
travel:{experience:{accommodation:"إقامة فاخرة",experiences:"تجارب خاصة في دبي",vip:"خدمات كبار الشخصيات",executive:"سفر أعمال للتنفيذيين",bespoke:"تخطيط رحلات حسب الطلب",other:"أخرى"},budget:{lt20k:"أقل من 20,000 درهم","20-50k":"20,000–50,000 درهم","50-100k":"50,000–100,000 درهم","100k+":"أكثر من 100,000 درهم",private:"أفضّل مناقشتها على انفراد"}}},
optional:"اختياري",medNote:"لا تشارك هنا تاريخك الطبي أو سجلاتك، فسنناقش التفاصيل معك على انفراد.",
q_timeline:"متى تخطط للبدء؟",tl:{immediately:"فورًا","3m":"خلال 3 أشهر","6m":"خلال 6 أشهر",exploring:"أستكشف الخيارات حاليًا"},
q_notes:"هل هناك ما تودّ إضافته؟",notesPh:"كلمات قليلة عن أهدافك أو تفضيلاتك",
f_name:"الاسم الكامل",f_prof:"المهنة / النشاط",profPh:"مثال: صاحب عمل، مستثمر، مسؤول تنفيذي",f_country:"بلد الإقامة",f_email:"البريد الإلكتروني",f_phone:"الهاتف / واتساب",f_method:"وسيلة التواصل المفضّلة",m:{email:"البريد",phone:"الهاتف",whatsapp:"واتساب"},
privacy:"نتعامل مع طلبك بسرّية تامة، ونستخدمه فقط لدراسته والرد عليه.",consentA:"أوافق على معالجة بياناتي وفق",consentB:"سياسة الخصوصية",
err:{choose:"يرجى اختيار أحد الخيارات.",text:"يرجى إضافة وصف قصير.",name:"يرجى إدخال اسمك.",email:"يرجى إدخال بريد إلكتروني صحيح.",phone:"يرجى إدخال رقم هاتف صحيح.",country:"يرجى إدخال بلدك.",consent:"يرجى تأكيد موافقتك.",server:"تعذّر إرسال طلبك الآن. حاول مجددًا أو تواصل معنا مباشرة أدناه.",rate:"محاولات كثيرة. انتظر بضع دقائق أو تواصل معنا مباشرة أدناه."},
okT:"شكرًا لك، وصلنا طلبك.",okD:"سنراجعه شخصيًا ونتواصل معك خلال يوم عمل واحد.",okWa:"المتابعة عبر واتساب",okHome:"العودة إلى الرئيسية",
fbT:"طلبك جاهز",fbD:"الإرسال الإلكتروني غير متاح في هذه المعاينة. يمكنك إرساله مباشرة:",fbWa:"إرسال عبر واتساب",fbMail:"إرسال عبر البريد",direct:"تفضّل الحديث الآن؟"},
fr:{eyebrow:"Privé et confidentiel",title:"Demande client privée",sub:"Chaque parcours d'exception commence par une conversation privée.",intro:"Partagez quelques informations afin que nous comprenions vos besoins et vous répondions au mieux.",
steps:["Service","Vos projets","Calendrier","Coordonnées"],next:"Continuer",back:"Retour",submit:"Envoyer la demande privée",sending:"Envoi…",stepOf:"Étape {n} sur {t}",
q_service:"Quel service vous intéresse ?",
svc:{realestate:["Investissement immobilier","Résidentiel, villas, sur plan, portefeuilles"],advisory:["Services financiers et fiscaux","Création, fiscalité, gouvernance, croissance"],medical:["Conciergerie médicale et esthétique","Soins coordonnés avec des cliniques agréées"],travel:["Voyages et art de vivre","Séjours, expériences et services VIP"],other:["Autres services privés","Dites-nous ce que vous envisagez"]},
q:{realestate:{budget:"Quel est votre budget d'investissement approximatif ?",property:"Quel type de bien recherchez-vous ?"},advisory:{support:"De quel accompagnement avez-vous besoin ?",profile:"Qu'est-ce qui décrit le mieux votre activité ?",size:"Taille approximative de votre entreprise"},medical:{procedure:"Quel soin ou service envisagez-vous ?",budget:"Quel budget prévoyez-vous pour la visite ?"},travel:{experience:"Quel type d'expérience recherchez-vous ?",budget:"Budget total approximatif du séjour"},other:{requirements:"Décrivez brièvement votre besoin.",budget_text:"Budget approximatif"}},
o:{realestate:{budget:{lt1m:"Moins de 1 M AED","1-3m":"1 à 3 M AED","3-5m":"3 à 5 M AED","5-10m":"5 à 10 M AED","10m+":"Plus de 10 M AED",undecided:"Pas encore défini"},property:{residential:"Résidentiel",villa:"Villa de prestige",commercial:"Commercial",offplan:"Sur plan",portfolio:"Portefeuille d'investissement",unsure:"Pas encore décidé"}},
advisory:{support:{setup:"Création et structuration",transformation:"Conseil financier et transformation",tax:"Fiscalité et conformité",governance:"Gouvernance et risques",opportunities:"Opportunités d'investissement",other:"Autre"},profile:{owner:"Dirigeant / fondateur",investor:"Investisseur",executive:"Cadre dirigeant",family:"Entreprise familiale",entrepreneur:"Entrepreneur / start-up",other:"Autre"},size:{startup:"Start-up / pré-revenus",lt5m:"Moins de 5 M AED de CA","5-20m":"5 à 20 M AED","20-100m":"20 à 100 M AED","100m+":"Plus de 100 M AED",undisclosed:"Je préfère ne pas le préciser"}},
medical:{procedure:{cosmetic:"Chirurgie esthétique",dental:"Dentaire et sourire",dermatology:"Dermatologie et peau",hair:"Greffe de cheveux",wellness:"Bien-être et soins esthétiques",other:"Autre / consultation privée"},budget:{lt15k:"Moins de 15 000 AED","15-30k":"15 000 à 30 000 AED","30-60k":"30 000 à 60 000 AED","60k+":"Plus de 60 000 AED",private:"À discuter en privé"}},
travel:{experience:{accommodation:"Hébergement de luxe",experiences:"Expériences privées à Dubaï",vip:"Conciergerie VIP",executive:"Voyage d'affaires",bespoke:"Voyage sur mesure",other:"Autre"},budget:{lt20k:"Moins de 20 000 AED","20-50k":"20 000 à 50 000 AED","50-100k":"50 000 à 100 000 AED","100k+":"Plus de 100 000 AED",private:"À discuter en privé"}}},
optional:"Facultatif",medNote:"Merci de ne pas partager d'antécédents ou de dossiers médicaux ici : nous en parlerons en privé.",
q_timeline:"Quand souhaitez-vous avancer ?",tl:{immediately:"Immédiatement","3m":"Sous 3 mois","6m":"Sous 6 mois",exploring:"J'explore les options"},
q_notes:"Autre chose à nous dire ?",notesPh:"Quelques mots sur vos objectifs ou préférences",
f_name:"Nom complet",f_prof:"Profession / activité",profPh:"ex. dirigeant, investisseur, cadre",f_country:"Pays de résidence",f_email:"E-mail",f_phone:"Téléphone / WhatsApp",f_method:"Contact préféré",m:{email:"E-mail",phone:"Téléphone",whatsapp:"WhatsApp"},
privacy:"Votre demande est traitée en toute confidentialité et utilisée pour l'étudier et y répondre.",consentA:"J'accepte le traitement de mes données selon la",consentB:"politique de confidentialité",
err:{choose:"Veuillez choisir une option.",text:"Ajoutez une courte description.",name:"Indiquez votre nom.",email:"Indiquez un e-mail valide.",phone:"Indiquez un numéro valide.",country:"Indiquez votre pays.",consent:"Veuillez confirmer votre accord.",server:"L'envoi a échoué. Réessayez, ou contactez-nous directement ci-dessous.",rate:"Trop de tentatives. Patientez quelques minutes, ou contactez-nous ci-dessous."},
okT:"Merci, votre demande nous est parvenue.",okD:"Nous l'étudions personnellement et revenons vers vous sous un jour ouvré.",okWa:"Poursuivre sur WhatsApp",okHome:"Retour à l'accueil",
fbT:"Votre demande est prête",fbD:"L'envoi en ligne n'est pas disponible dans cet aperçu. Envoyez-la directement :",fbWa:"Envoyer par WhatsApp",fbMail:"Envoyer par e-mail",direct:"Envie d'en parler maintenant ?"},
nl:{eyebrow:"Privé en vertrouwelijk",title:"Aanvraag privécliënt",sub:"Elk uitzonderlijk traject begint met een persoonlijk gesprek.",intro:"Deel enkele gegevens zodat we uw noden begrijpen en gepast kunnen antwoorden.",
steps:["Dienst","Uw plannen","Timing","Uw gegevens"],next:"Verder",back:"Terug",submit:"Privéaanvraag versturen",sending:"Bezig met versturen…",stepOf:"Stap {n} van {t}",
q_service:"In welke dienst bent u geïnteresseerd?",
svc:{realestate:["Vastgoedinvesteringen","Residentieel, villa's, op plan, portefeuilles"],advisory:["Financiële en fiscale diensten","Oprichting, fiscaliteit, governance, groei"],medical:["Medische en esthetische concierge","Gecoördineerde zorg bij erkende klinieken"],travel:["Luxereizen en lifestyle","Verblijf, belevingen en VIP-diensten"],other:["Andere privédiensten","Vertel ons wat u voor ogen hebt"]},
q:{realestate:{budget:"Wat is uw geschatte investeringsbudget?",property:"Welk type vastgoed zoekt u?"},advisory:{support:"Welke ondersteuning zoekt u?",profile:"Wat omschrijft uw activiteit het best?",size:"Geschatte omvang van uw onderneming"},medical:{procedure:"Welke behandeling of dienst overweegt u?",budget:"Wat is uw geschatte budget voor het bezoek?"},travel:{experience:"Welke beleving zoekt u?",budget:"Geschat totaalbudget voor de reis"},other:{requirements:"Beschrijf kort wat u nodig hebt.",budget_text:"Geschat budget"}},
o:{realestate:{budget:{lt1m:"Minder dan 1 mln AED","1-3m":"1–3 mln AED","3-5m":"3–5 mln AED","5-10m":"5–10 mln AED","10m+":"Meer dan 10 mln AED",undecided:"Nog niet bepaald"},property:{residential:"Residentieel",villa:"Luxevilla",commercial:"Commercieel",offplan:"Op plan",portfolio:"Investeringsportefeuille",unsure:"Nog niet zeker"}},
advisory:{support:{setup:"Oprichting en structurering",transformation:"Financieel advies en transformatie",tax:"Fiscaal advies en compliance",governance:"Governance en risicobeheer",opportunities:"Investerings- en zakenkansen",other:"Andere"},profile:{owner:"Zaakvoerder / oprichter",investor:"Investeerder",executive:"Leidinggevende",family:"Familiebedrijf",entrepreneur:"Ondernemer / start-up",other:"Andere"},size:{startup:"Start-up / nog geen omzet",lt5m:"Minder dan 5 mln AED omzet","5-20m":"5–20 mln AED","20-100m":"20–100 mln AED","100m+":"Meer dan 100 mln AED",undisclosed:"Liever niet vermelden"}},
medical:{procedure:{cosmetic:"Esthetische chirurgie",dental:"Tandzorg en smile design",dermatology:"Dermatologie en huid",hair:"Haartransplantatie",wellness:"Wellness en esthetische behandelingen",other:"Andere / privéconsultatie"},budget:{lt15k:"Minder dan 15.000 AED","15-30k":"15.000–30.000 AED","30-60k":"30.000–60.000 AED","60k+":"Meer dan 60.000 AED",private:"Liever persoonlijk bespreken"}},
travel:{experience:{accommodation:"Luxeverblijf",experiences:"Privébelevingen in Dubai",vip:"VIP-conciergediensten",executive:"Zakenreizen",bespoke:"Reis op maat",other:"Andere"},budget:{lt20k:"Minder dan 20.000 AED","20-50k":"20.000–50.000 AED","50-100k":"50.000–100.000 AED","100k+":"Meer dan 100.000 AED",private:"Liever persoonlijk bespreken"}}},
optional:"Optioneel",medNote:"Deel hier geen medische voorgeschiedenis of dossiers; we bespreken dat persoonlijk met u.",
q_timeline:"Wanneer wilt u van start gaan?",tl:{immediately:"Meteen","3m":"Binnen 3 maanden","6m":"Binnen 6 maanden",exploring:"Ik verken de mogelijkheden"},
q_notes:"Nog iets dat we moeten weten?",notesPh:"Enkele woorden over uw doelen of voorkeuren",
f_name:"Volledige naam",f_prof:"Beroep / activiteit",profPh:"bv. zaakvoerder, investeerder, leidinggevende",f_country:"Land van verblijf",f_email:"E-mailadres",f_phone:"Telefoon / WhatsApp",f_method:"Gewenste contactwijze",m:{email:"E-mail",phone:"Telefoon",whatsapp:"WhatsApp"},
privacy:"Uw aanvraag wordt vertrouwelijk behandeld en enkel gebruikt om ze te beoordelen en te beantwoorden.",consentA:"Ik ga akkoord met de verwerking van mijn gegevens volgens het",consentB:"privacybeleid",
err:{choose:"Kies een optie.",text:"Voeg een korte beschrijving toe.",name:"Vul uw naam in.",email:"Vul een geldig e-mailadres in.",phone:"Vul een geldig nummer in.",country:"Vul uw land in.",consent:"Bevestig uw toestemming.",server:"Versturen lukte niet. Probeer opnieuw, of neem hieronder rechtstreeks contact op.",rate:"Te veel pogingen. Wacht enkele minuten, of neem hieronder contact op."},
okT:"Dank u, we hebben uw aanvraag ontvangen.",okD:"We bekijken ze persoonlijk en nemen binnen één werkdag contact met u op.",okWa:"Verder via WhatsApp",okHome:"Terug naar home",
fbT:"Uw aanvraag is klaar",fbD:"Online versturen werkt niet in deze preview. U kunt ze rechtstreeks versturen:",fbWa:"Versturen via WhatsApp",fbMail:"Versturen via e-mail",direct:"Liever meteen praten?"},
sv:{eyebrow:"Privat och konfidentiellt",title:"Förfrågan för privatkunder",sub:"Varje exceptionell resa börjar med ett privat samtal.",intro:"Dela några uppgifter så att vi förstår dina behov och kan svara på rätt sätt.",
steps:["Tjänst","Dina planer","Tidpunkt","Dina uppgifter"],next:"Fortsätt",back:"Tillbaka",submit:"Skicka privat förfrågan",sending:"Skickar…",stepOf:"Steg {n} av {t}",
q_service:"Vilken tjänst är du intresserad av?",
svc:{realestate:["Fastighetsinvesteringar","Bostäder, villor, nyproduktion, portföljer"],advisory:["Finansiella tjänster och skattetjänster","Etablering, skatt, styrning, tillväxt"],medical:["Medicinsk och estetisk concierge","Samordnad vård hos licensierade kliniker"],travel:["Lyxresor och livsstil","Boende, upplevelser och VIP-tjänster"],other:["Andra privata tjänster","Berätta vad du har i åtanke"]},
q:{realestate:{budget:"Vilken är din ungefärliga investeringsbudget?",property:"Vilken typ av fastighet söker du?"},advisory:{support:"Vilket stöd söker du?",profile:"Vad beskriver din verksamhet bäst?",size:"Verksamhetens ungefärliga storlek"},medical:{procedure:"Vilken behandling eller tjänst överväger du?",budget:"Vilken är din ungefärliga budget för besöket?"},travel:{experience:"Vilken typ av upplevelse söker du?",budget:"Ungefärlig total budget för resan"},other:{requirements:"Beskriv kort vad du behöver.",budget_text:"Ungefärlig budget"}},
o:{realestate:{budget:{lt1m:"Under 1 mn AED","1-3m":"1–3 mn AED","3-5m":"3–5 mn AED","5-10m":"5–10 mn AED","10m+":"Över 10 mn AED",undecided:"Inte bestämt än"},property:{residential:"Bostad",villa:"Lyxvilla",commercial:"Kommersiell fastighet",offplan:"Nyproduktion (off-plan)",portfolio:"Investeringsportfölj",unsure:"Inte säker än"}},
advisory:{support:{setup:"Etablering och struktur",transformation:"Finansiell rådgivning och omställning",tax:"Skatterådgivning och efterlevnad",governance:"Styrning och riskhantering",opportunities:"Investerings- och affärsmöjligheter",other:"Annat"},profile:{owner:"Företagare / grundare",investor:"Investerare",executive:"Företagsledare",family:"Familjeföretag",entrepreneur:"Entreprenör / startup",other:"Annat"},size:{startup:"Startup / före intäkter",lt5m:"Under 5 mn AED i omsättning","5-20m":"5–20 mn AED","20-100m":"20–100 mn AED","100m+":"Över 100 mn AED",undisclosed:"Vill helst inte uppge"}},
medical:{procedure:{cosmetic:"Estetisk kirurgi",dental:"Tandvård och smile design",dermatology:"Hud och dermatologi",hair:"Hårtransplantation",wellness:"Välbefinnande och estetiska behandlingar",other:"Annat / privat konsultation"},budget:{lt15k:"Under 15 000 AED","15-30k":"15 000–30 000 AED","30-60k":"30 000–60 000 AED","60k+":"Över 60 000 AED",private:"Diskuteras hellre privat"}},
travel:{experience:{accommodation:"Lyxboende",experiences:"Privata upplevelser i Dubai",vip:"VIP-concierge",executive:"Affärsresor",bespoke:"Skräddarsydd resa",other:"Annat"},budget:{lt20k:"Under 20 000 AED","20-50k":"20 000–50 000 AED","50-100k":"50 000–100 000 AED","100k+":"Över 100 000 AED",private:"Diskuteras hellre privat"}}},
optional:"Valfritt",medNote:"Dela inte sjukdomshistorik eller journaler här – vi tar detaljerna privat med dig.",
q_timeline:"När planerar du att gå vidare?",tl:{immediately:"Omedelbart","3m":"Inom 3 månader","6m":"Inom 6 månader",exploring:"Utforskar alternativ"},
q_notes:"Något mer vi bör veta?",notesPh:"Några ord om dina mål eller önskemål",
f_name:"Fullständigt namn",f_prof:"Yrke / verksamhet",profPh:"t.ex. företagare, investerare, chef",f_country:"Bosättningsland",f_email:"E-post",f_phone:"Telefon / WhatsApp",f_method:"Önskat kontaktsätt",m:{email:"E-post",phone:"Telefon",whatsapp:"WhatsApp"},
privacy:"Din förfrågan behandlas konfidentiellt och används för att bedöma och besvara den.",consentA:"Jag godkänner behandlingen av mina uppgifter enligt",consentB:"integritetspolicyn",
err:{choose:"Välj ett alternativ.",text:"Lägg till en kort beskrivning.",name:"Ange ditt namn.",email:"Ange en giltig e-post.",phone:"Ange ett giltigt nummer.",country:"Ange ditt land.",consent:"Bekräfta ditt samtycke.",server:"Det gick inte att skicka just nu. Försök igen, eller kontakta oss direkt nedan.",rate:"För många försök. Vänta några minuter, eller kontakta oss nedan."},
okT:"Tack – vi har tagit emot din förfrågan.",okD:"Vi går igenom den personligen och hör av oss inom en arbetsdag.",okWa:"Fortsätt på WhatsApp",okHome:"Till startsidan",
fbT:"Din förfrågan är klar",fbD:"Onlineinskick fungerar inte i förhandsvisningen. Du kan skicka den direkt:",fbWa:"Skicka via WhatsApp",fbMail:"Skicka via e-post",direct:"Vill du hellre prata nu?"}
};

const SVC_ICON={realestate:"tower",advisory:"chart",medical:"med",travel:"plane",other:"star"};
const FIELDS={realestate:["budget","property"],advisory:["support","profile","size"],medical:["procedure","budget"],travel:["experience","budget"],other:["requirements","budget_text"]};
const OPTIONAL={advisory:["size"],other:["budget_text"]};
function start(){
const st={step:1,service:"",answers:{},timeline:"",start:Date.now(),sent:false};
const root=document.getElementById("pci");if(!root)return;
const L=()=>I18N[(document.documentElement.lang||"en").slice(0,2)]||I18N.en;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const q=s=>root.querySelector(s);
const icon=k=>{try{return typeof ico==="function"?ico(k,22):""}catch(e){return ""}};

function opts(name,map,sel){return `<div class="pc-opts" role="radiogroup">${Object.entries(map).map(([v,l])=>`<label class="pc-opt"><input type="radio" name="${name}" value="${esc(v)}"${sel===v?" checked":""}><span>${esc(l)}</span></label>`).join("")}</div>`}
function field(id,label,type,opt,ph,val,auto){const t=L();return `<div class="pc-field"><label for="${id}">${esc(label)}${opt?` <em>${esc(t.optional)}</em>`:" <i aria-hidden=\"true\">*</i>"}</label><input id="${id}" name="${id}" type="${type}" ${ph?`placeholder="${esc(ph)}"`:""} value="${esc(val||"")}" ${auto?`autocomplete="${auto}"`:""}><p class="pc-err" data-for="${id}"></p></div>`}

function render(){
  const t=L();
  root.querySelector(".pc-head").innerHTML=`<span class="eyebrow">${esc(t.eyebrow)}</span><h1 class="pc-title">${esc(t.title)}</h1><p class="pc-sub">${esc(t.sub)}</p><p class="pc-intro">${esc(t.intro)}</p>`;
  if(st.sent)return;
  const prog=t.steps.map((s,i)=>`<li class="${i+1<st.step?"done":i+1===st.step?"cur":""}"><span>${i+1}</span><b>${esc(s)}</b></li>`).join("");
  q(".pc-prog").innerHTML=`<p class="pc-stepof">${esc(t.stepOf.replace("{n}",st.step).replace("{t}",4))}</p><ol>${prog}</ol><div class="pc-bar"><i style="width:${(st.step-1)/3*100}%"></i></div>`;
  let h="";
  if(st.step===1){
    h=`<fieldset><legend class="pc-q">${esc(t.q_service)}</legend><div class="pc-cards" role="radiogroup">${Object.entries(t.svc).map(([k,[a,b]])=>`<label class="pc-card"><input type="radio" name="service" value="${k}"${st.service===k?" checked":""}><span class="ic">${icon(SVC_ICON[k])}</span><span><b>${esc(a)}</b><small>${esc(b)}</small></span></label>`).join("")}</div><p class="pc-err" data-for="service"></p></fieldset>`;
  } else if(st.step===2){
    const s=st.service;
    if(s==="other"){
      h=`<div class="pc-field"><label for="requirements" class="pc-q">${esc(t.q.other.requirements)}</label><textarea id="requirements" rows="4" maxlength="600">${esc(st.answers.requirements||"")}</textarea><p class="pc-err" data-for="requirements"></p></div>`+field("budget_text",t.q.other.budget_text,"text",true,"",st.answers.budget_text);
    } else {
      h=FIELDS[s].map(f=>`<fieldset><legend class="pc-q">${esc(t.q[s][f])}${(OPTIONAL[s]||[]).includes(f)?` <em>${esc(t.optional)}</em>`:""}</legend>${opts(f,t.o[s][f],st.answers[f])}<p class="pc-err" data-for="${f}"></p></fieldset>`).join("");
      if(s==="medical")h+=`<p class="pc-note">${esc(t.medNote)}</p>`;
    }
  } else if(st.step===3){
    h=`<fieldset><legend class="pc-q">${esc(t.q_timeline)}</legend>${opts("timeline",t.tl,st.timeline)}<p class="pc-err" data-for="timeline"></p></fieldset><div class="pc-field"><label for="notes" class="pc-q">${esc(t.q_notes)} <em>${esc(t.optional)}</em></label><textarea id="notes" rows="3" maxlength="800" placeholder="${esc(t.notesPh)}">${esc(st.notes||"")}</textarea></div>`;
  } else {
    const c=st.contact||{};
    h=`<div class="pc-grid">${field("name",t.f_name,"text",false,"",c.name,"name")}${field("profession",t.f_prof,"text",true,t.profPh,c.profession,"organization-title")}${field("country",t.f_country,"text",false,"",c.country,"country-name")}${field("email",t.f_email,"email",false,"",c.email,"email")}${field("phone",t.f_phone,"tel",false,"+971 …",c.phone,"tel")}</div>
    <fieldset><legend class="pc-q pc-q-sm">${esc(t.f_method)}</legend>${opts("contact_method",t.m,c.contact_method||"email")}</fieldset>
    <p class="pc-privacy">${esc(t.privacy)}</p>
    <label class="pc-consent"><input type="checkbox" id="consent"${c.consent?" checked":""}><span>${esc(t.consentA)} <a href="privacy.html" target="_blank" rel="noopener">${esc(t.consentB)}</a>.</span></label><p class="pc-err" data-for="consent"></p>
    <div class="pc-hp" aria-hidden="true"><label>Website<input type="text" id="website" tabindex="-1" autocomplete="off"></label></div>`;
  }
  q(".pc-body").innerHTML=`<div class="pc-step">${h}</div>`;
  q(".pc-nav").innerHTML=`${st.step>1?`<button type="button" class="pc-back">${esc(t.back)}</button>`:"<span></span>"}<button type="${st.step===4?"submit":"button"}" class="btn btn-blush pc-next">${esc(st.step===4?t.submit:t.next)} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>`;
  q(".pc-msg").innerHTML="";
}

function collect(){
  if(st.step===1){const r=q('input[name=service]:checked');if(r&&r.value!==st.service){st.service=r.value;st.answers={}}}
  if(st.step===2){for(const f of FIELDS[st.service]){const el=q(`#${f}`);if(el){st.answers[f]=el.value.trim();continue}const r=q(`input[name="${f}"]:checked`);st.answers[f]=r?r.value:(st.answers[f]||"")}}
  if(st.step===3){const r=q('input[name=timeline]:checked');st.timeline=r?r.value:"";st.notes=(q("#notes")||{}).value||""}
  if(st.step===4){const g=id=>(q("#"+id)||{}).value?.trim()||"";st.contact={name:g("name"),profession:g("profession"),country:g("country"),email:g("email"),phone:g("phone"),contact_method:(q('input[name=contact_method]:checked')||{}).value||"email",consent:!!(q("#consent")||{}).checked}}
}
function err(id,msg){const e=q(`.pc-err[data-for="${id}"]`);if(e){e.textContent=msg;const inp=q("#"+id);if(inp)inp.setAttribute("aria-invalid","true")}}
function validate(){
  const t=L();let ok=true;root.querySelectorAll(".pc-err").forEach(e=>e.textContent="");root.querySelectorAll("[aria-invalid]").forEach(e=>e.removeAttribute("aria-invalid"));
  if(st.step===1&&!st.service){err("service",t.err.choose);ok=false}
  if(st.step===2){for(const f of FIELDS[st.service]){if((OPTIONAL[st.service]||[]).includes(f))continue;const v=st.answers[f];if(!v){err(f,f==="requirements"?t.err.text:t.err.choose);ok=false}else if(f==="requirements"&&v.length<10){err(f,t.err.text);ok=false}}}
  if(st.step===3&&!st.timeline){err("timeline",t.err.choose);ok=false}
  if(st.step===4){const c=st.contact;if(c.name.length<2){err("name",t.err.name);ok=false}if(!c.country){err("country",t.err.country);ok=false}if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email)){err("email",t.err.email);ok=false}if(c.phone.replace(/\D/g,"").length<7){err("phone",t.err.phone);ok=false}if(!c.consent){err("consent",t.err.consent);ok=false}}
  if(!ok){const f=q(".pc-err:not(:empty)");const target=f&&(f.closest(".pc-field")?.querySelector("input,textarea")||f.parentElement.querySelector("input"));if(target)target.focus({preventScroll:false})}
  return ok;
}
function go(n){st.step=n;render();const card=q(".pc-card-wrap");card.classList.remove("pc-in");void card.offsetWidth;card.classList.add("pc-in");const top=root.getBoundingClientRect().top+scrollY-90;if(scrollY>top)scrollTo({top,behavior:"smooth"});const first=q(".pc-step input,.pc-step textarea");if(first&&st.step>1)setTimeout(()=>first.focus({preventScroll:true}),60)}

function summary(){
  const t=I18N.en,s=st.service,lines=[`Private Client Inquiry — ${t.svc[s][0]}`];
  for(const f of FIELDS[s]){const v=st.answers[f];if(!v)continue;lines.push(`${(t.q[s][f]||f).replace(/\?$/,"")}: ${t.o[s]?.[f]?.[v]||v}`)}
  lines.push(`Timeline: ${t.tl[st.timeline]}`);if(st.notes)lines.push(`Notes: ${st.notes}`);
  const c=st.contact;lines.push(`Name: ${c.name}`);if(c.profession)lines.push(`Profession: ${c.profession}`);lines.push(`Country: ${c.country}`,`Email: ${c.email}`,`Phone: ${c.phone}`);
  return lines.join("\n");
}
function cfg(){return window.SAB_CONFIG||{whatsapp:"",email:""}}
function directLinks(withSummary){const c=cfg(),t=L(),body=withSummary?summary():"";const wa=`https://wa.me/${c.whatsapp}${body?`?text=${encodeURIComponent(body)}`:""}`;const ml=`mailto:${c.email}?subject=${encodeURIComponent("Private Client Inquiry")}${body?`&body=${encodeURIComponent(body)}`:""}`;return `<div class="pc-direct"><a class="btn btn-blush" href="${wa}" target="_blank" rel="noopener">${esc(t.fbWa)}</a><a class="btn btn-line" href="${ml}">${esc(t.fbMail)}</a></div>`}
function isLive(){return typeof window.SAB_isLive==="function"?window.SAB_isLive():false}

async function submit(){
  const t=L(),btn=q(".pc-next");
  const payload={service:st.service,answers:st.answers,timeline:st.timeline,notes:st.notes||"",...st.contact,language:(document.documentElement.lang||"en").slice(0,2),website:(q("#website")||{}).value||"",elapsed_ms:Date.now()-st.start};
  if(!isLive()){showDone(false);return}
  btn.disabled=true;btn.textContent=t.sending;
  try{
    const r=await fetch("/.netlify/functions/inquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    if(r.ok){showDone(true);return}
    const msg=r.status===429?t.err.rate:t.err.server;
    q(".pc-msg").innerHTML=`<p class="pc-alert">${esc(msg)}</p>${directLinks(true)}`;
  }catch(e){q(".pc-msg").innerHTML=`<p class="pc-alert">${esc(t.err.server)}</p>${directLinks(true)}`}
  btn.disabled=false;btn.innerHTML=esc(t.submit);
}
function showDone(sent){
  const t=L(),c=cfg();st.sent=true;
  q(".pc-prog").innerHTML="";q(".pc-nav").innerHTML="";q(".pc-msg").innerHTML="";
  if(sent){
    const waText=encodeURIComponent(`Hello, I have just sent a private client inquiry (${I18N.en.svc[st.service][0]}). — ${st.contact.name}`);
    q(".pc-body").innerHTML=`<div class="pc-done"><span class="pc-check" aria-hidden="true"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12.5l4.2 4.2L19 7"/></svg></span><h2>${esc(t.okT)}</h2><p>${esc(t.okD)}</p><div class="pc-direct"><a class="btn btn-blush" href="https://wa.me/${c.whatsapp}?text=${waText}" target="_blank" rel="noopener">${esc(t.okWa)}</a><a class="btn btn-line" href="index.html">${esc(t.okHome)}</a></div></div>`;
  } else {
    q(".pc-body").innerHTML=`<div class="pc-done"><h2>${esc(t.fbT)}</h2><p>${esc(t.fbD)}</p>${directLinks(true)}</div>`;
  }
  q(".pc-done").setAttribute("tabindex","-1");q(".pc-done").focus({preventScroll:true});scrollTo({top:Math.max(0,root.getBoundingClientRect().top+scrollY-90),behavior:"smooth"});
}

root.addEventListener("click",e=>{
  if(e.target.closest(".pc-back")){collect();go(st.step-1);return}
  if(e.target.closest(".pc-next")&&st.step<4){e.preventDefault();collect();if(validate())go(st.step===1&&st.skipTo?st.step+1:st.step+1)}
});
root.addEventListener("change",e=>{if(e.target.name==="service"){collect();const er=q('.pc-err[data-for="service"]');if(er)er.textContent=""}});
root.querySelector("form").addEventListener("submit",e=>{e.preventDefault();if(st.step!==4)return;collect();if(validate())submit()});

// preselect from ?s=service
const pre=new URLSearchParams(location.search).get("s");
if(pre&&I18N.en.svc[pre]){st.service=pre;st.step=2}
render();
document.addEventListener("sab:lang",()=>{if(!st.sent){collect();render()}else{const t=L();root.querySelector(".pc-head").innerHTML=`<span class="eyebrow">${esc(t.eyebrow)}</span><h1 class="pc-title">${esc(t.title)}</h1><p class="pc-sub">${esc(t.sub)}</p><p class="pc-intro">${esc(t.intro)}</p>`}});
}
if(window.SAB_READY)start();else document.addEventListener("sab:ready",start,{once:true});
})();
