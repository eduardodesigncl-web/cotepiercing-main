import { SITE } from "@/lib/site";

export const faqs = [
  {
    question: "¿Dónde puedo hacerme un piercing profesional en Arica?",
    answer: `${SITE.name} ofrece piercing profesional en ${SITE.locality}. Cada servicio considera evaluación anatómica, joyería inicial y un protocolo de asepsia profesional. ${SITE.locationDisclosure}`,
  },
  {
    question: "¿Cuánto cuesta hacerse un piercing en Arica?",
    answer:
      "En Cotepiercing los servicios parten en $25.000 para perforaciones y varían según la zona y complejidad. Los cambios, retiros y evaluaciones tienen valores propios publicados en la página de precios.",
  },
  {
    question: "¿Todos los servicios incluyen joyería?",
    answer:
      "Sí. Los servicios de perforación incluyen joyería inicial seleccionada según la zona, anatomía y proceso de cicatrización.",
  },
  {
    question: "¿Qué es la evaluación anatómica previa?",
    answer:
      "Es la revisión de la zona antes de perforar para confirmar si el procedimiento es viable, dónde debe ubicarse y qué joyería corresponde. Algunos servicios requieren evaluación obligatoria.",
  },
  {
    question: "¿Cuánto tarda en cicatrizar un piercing?",
    answer:
      "Depende de la zona: un lóbulo suele tardar 2 a 3 meses, mientras algunos cartílagos y piercings corporales pueden tardar entre 6 y 12 meses.",
  },
  {
    question: "¿Qué hago si mi piercing está irritado o tiene un bultito?",
    answer:
      "No manipules la zona ni cambies la joya por tu cuenta. Puedes reservar una evaluación en Cotepiercing. Si presentas fiebre, dolor intenso, calor excesivo o secreción con mal olor, busca atención médica.",
  },
  {
    question: "¿Qué piercing conviene para una primera vez?",
    answer:
      "Lobe, nostril o un helix simple pueden ser opciones iniciales, pero la recomendación final depende de tu anatomía, rutina y preferencias.",
  },
  {
    question: "¿Trabajan con aguja o con pistola?",
    answer:
      "Cotepiercing trabaja con aguja estéril descartable y de un solo uso. No se realizan perforaciones con pistola.",
  },
  {
    question: "¿Cómo se reserva una hora?",
    answer:
      "La reserva se coordina por WhatsApp. Indica qué servicio te interesa y, cuando corresponda, envía una fotografía de la zona para recibir orientación previa.",
  },
  {
    question: "¿Cuáles son los cuidados básicos después de un piercing?",
    answer:
      "Limpia con solución salina estéril, evita tocar con las manos sin lavar y no gires ni retires la joyería durante la cicatrización. Cada zona puede requerir indicaciones adicionales.",
  },
] as const;
