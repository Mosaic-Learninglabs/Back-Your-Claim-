const { useState, useEffect } = React;

const CHARTS = [
  {
    id: 1,
    title: { en: "Teen Social Media Use vs Happiness", es: "Uso de Redes Sociales vs Felicidad en Adolescentes" },
    question: { en: "Should schools teach students to limit their social media use?", es: "¿Deberían las escuelas enseñar a los estudiantes a limitar su uso de redes sociales?" },
    prompt: { en: "Use the data to argue YES or NO.", es: "Usa los datos para argumentar SÍ o NO." },
    data: { "0-1": 7.2, "1-2": 7.8, "2-3": 7.5, "3-4": 6.8, "4-5": 6.2, "5+": 5.4 },
    xLabel: { en: "Hours per Day", es: "Horas por Día" },
    yLabel: { en: "Happiness Score", es: "Puntuación de Felicidad" },
    type: "line",
    starters: {
      en: [
        "🎯 CLAIM: Schools should [YES/NO] teach limits on social media because...",
        "📊 EVIDENCE: The data shows that...",
        "📊 EVIDENCE: This proves that..."
      ],
      es: [
        "🎯 AFIRMACIÓN: Las escuelas [SÍ/NO] deberían enseñar límites en redes sociales porque...",
        "📊 EVIDENCIA: Los datos muestran que...",
        "📊 EVIDENCIA: Esto prueba que..."
      ]
    },
    words: {
      en: ["peaks at", "drops to", "highest score", "lowest score", "significantly lower", "optimal range", "decreases", "increases"],
      es: ["alcanza el máximo en", "cae a", "puntuación más alta", "puntuación más baja", "significativamente menor", "rango óptimo", "disminuye", "aumenta"]
    },
    hint: { en: "Where is happiness highest vs. lowest?", es: "¿Dónde está la felicidad más alta vs. más baja?" },
    checks: {
      en: ["Clear YES/NO", "Used scores", "Explained pattern"],
      es: ["SÍ/NO claro", "Usó puntuaciones", "Explicó el patrón"]
    }
  },
  {
    id: 2,
    title: { en: "School Start Times & Test Scores", es: "Horarios de Inicio Escolar y Puntajes de Exámenes" },
    question: { en: "Should school start at 8:30 AM or later?", es: "¿Debería la escuela comenzar a las 8:30 AM o más tarde?" },
    prompt: { en: "Use the data to argue YES or NO.", es: "Usa los datos para argumentar SÍ o NO." },
    data: { "7:00": 72, "7:30": 76, "8:00": 81, "8:30": 85, "9:00": 86 },
    xLabel: { en: "Start Time", es: "Hora de Inicio" },
    yLabel: { en: "Test Score", es: "Puntaje del Examen" },
    type: "bar",
    starters: {
      en: [
        "🎯 CLAIM: Schools should [YES/NO] start at 8:30 AM or later because...",
        "📊 EVIDENCE: The data shows that...",
        "📊 EVIDENCE: This means that..."
      ],
      es: [
        "🎯 AFIRMACIÓN: Las escuelas [SÍ/NO] deberían comenzar a las 8:30 AM o más tarde porque...",
        "📊 EVIDENCIA: Los datos muestran que...",
        "📊 EVIDENCIA: Esto significa que..."
      ]
    },
    words: {
      en: ["steadily increases", "improves by", "higher scores", "compared to", "much better", "significantly higher", "early morning", "later start"],
      es: ["aumenta constantemente", "mejora por", "puntajes más altos", "comparado con", "mucho mejor", "significativamente más alto", "temprano en la mañana", "inicio más tarde"]
    },
    hint: { en: "Compare earliest to latest - how big is the difference?", es: "Compara el más temprano con el más tardío - ¿qué tan grande es la diferencia?" },
    checks: {
      en: ["Clear position", "Cited scores", "Explained why"],
      es: ["Posición clara", "Citó puntajes", "Explicó por qué"]
    }
  },
  {
    id: 3,
    title: { en: "Homework Hours vs GPA", es: "Horas de Tarea vs Promedio Académico" },
    question: { en: "Should teachers reduce homework to lower stress?", es: "¿Deberían los maestros reducir la tarea para bajar el estrés?" },
    prompt: { en: "Use the data to argue YES or NO.", es: "Usa los datos para argumentar SÍ o NO." },
    data: { "0-2": 2.8, "3-5": 3.4, "6-8": 3.7, "9-11": 3.8, "12+": 3.6 },
    xLabel: { en: "Hours per Week", es: "Horas por Semana" },
    yLabel: { en: "GPA", es: "Promedio" },
    type: "line",
    starters: {
      en: [
        "🎯 CLAIM: Teachers should [YES/NO] reduce homework because...",
        "📊 EVIDENCE: According to the data...",
        "📊 EVIDENCE: This shows that..."
      ],
      es: [
        "🎯 AFIRMACIÓN: Los maestros [SÍ/NO] deberían reducir la tarea porque...",
        "📊 EVIDENCIA: Según los datos...",
        "📊 EVIDENCIA: Esto muestra que..."
      ]
    },
    words: {
      en: ["peaks at", "too much", "diminishing returns", "excessive homework", "sweet spot", "starts declining", "moderate amount", "becomes harmful"],
      es: ["alcanza el máximo en", "demasiado", "rendimientos decrecientes", "tarea excesiva", "punto ideal", "comienza a disminuir", "cantidad moderada", "se vuelve perjudicial"]
    },
    hint: { en: "GPA goes up but what about after 9-11 hours?", es: "El promedio sube pero ¿qué pasa después de 9-11 horas?" },
    checks: {
      en: ["Clear position", "Used data", "Mentioned wellbeing"],
      es: ["Posición clara", "Usó datos", "Mencionó bienestar"]
    }
  },
  {
    id: 4,
    title: { en: "Study Methods & Score Improvement", es: "Métodos de Estudio y Mejora en Puntajes" },
    question: { en: "Should teachers use practice tests or games?", es: "¿Deberían los maestros usar exámenes de práctica o juegos?" },
    prompt: { en: "Argue for PRACTICE TESTS or GAMES.", es: "Argumenta por EXÁMENES DE PRÁCTICA o JUEGOS." },
    data: { "Textbook": 8, "Videos": 12, "Practice": 18, "Groups": 15, "Games": 14 },
    xLabel: { en: "Study Method", es: "Método de Estudio" },
    yLabel: { en: "Points Improved", es: "Puntos de Mejora" },
    type: "bar",
    starters: {
      en: [
        "🎯 CLAIM: Teachers should use [PRACTICE TESTS/GAMES] because...",
        "📊 EVIDENCE: The chart shows that...",
        "📊 EVIDENCE: Compared to other methods..."
      ],
      es: [
        "🎯 AFIRMACIÓN: Los maestros deberían usar [EXÁMENES DE PRÁCTICA/JUEGOS] porque...",
        "📊 EVIDENCIA: La gráfica muestra que...",
        "📊 EVIDENCIA: Comparado con otros métodos..."
      ]
    },
    words: {
      en: ["most effective", "highest improvement", "clearly superior", "compared to", "much better", "active learning", "passive learning", "best results"],
      es: ["más efectivo", "mayor mejora", "claramente superior", "comparado con", "mucho mejor", "aprendizaje activo", "aprendizaje pasivo", "mejores resultados"]
    },
    hint: { en: "Best scores vs. what students enjoy?", es: "¿Mejores puntajes vs. lo que disfrutan los estudiantes?" },
    checks: {
      en: ["Clear choice", "Used numbers", "Explained why"],
      es: ["Elección clara", "Usó números", "Explicó por qué"]
    }
  },
  {
    id: 5,
    title: { en: "Reading Format & Comprehension", es: "Formato de Lectura y Comprensión" },
    question: { en: "Physical books or digital devices?", es: "¿Libros físicos o dispositivos digitales?" },
    prompt: { en: "Argue for PHYSICAL or DIGITAL.", es: "Argumenta por FÍSICOS o DIGITALES." },
    data: { "Books": 78, "E-Books": 72, "Audio": 68, "Articles": 65 },
    xLabel: { en: "Reading Format", es: "Formato de Lectura" },
    yLabel: { en: "Comprehension %", es: "Comprensión %" },
    type: "bar",
    starters: {
      en: [
        "🎯 CLAIM: Schools should invest in [PHYSICAL BOOKS/DIGITAL DEVICES] because...",
        "📊 EVIDENCE: Looking at the data...",
        "📊 EVIDENCE: This difference proves that..."
      ],
      es: [
        "🎯 AFIRMACIÓN: Las escuelas deberían invertir en [LIBROS FÍSICOS/DISPOSITIVOS DIGITALES] porque...",
        "📊 EVIDENCIA: Mirando los datos...",
        "📊 EVIDENCIA: Esta diferencia prueba que..."
      ]
    },
    words: {
      en: ["highest comprehension", "most effective", "clearly better", "compared to", "significant difference", "physical books", "digital reading", "percentage points"],
      es: ["mayor comprensión", "más efectivo", "claramente mejor", "comparado con", "diferencia significativa", "libros físicos", "lectura digital", "puntos porcentuales"]
    },
    hint: { en: "Best scores vs. cost?", es: "¿Mejores puntajes vs. costo?" },
    checks: {
      en: ["Clear choice", "Used scores", "Explained benefits"],
      es: ["Elección clara", "Usó puntajes", "Explicó beneficios"]
    }
  },
  {
    id: 6,
    title: { en: "Class Size & Performance", es: "Tamaño de Clase y Rendimiento" },
    question: { en: "Limit class sizes to 20 students or less?", es: "¿Limitar el tamaño de las clases a 20 estudiantes o menos?" },
    prompt: { en: "Use the data to argue YES or NO.", es: "Usa los datos para argumentar SÍ o NO." },
    data: { "15": 87, "20": 84, "25": 79, "30": 74, "35": 69 },
    xLabel: { en: "Students per Class", es: "Estudiantes por Clase" },
    yLabel: { en: "Performance Score", es: "Puntaje de Rendimiento" },
    type: "line",
    starters: {
      en: [
        "🎯 CLAIM: Schools should [YES/NO] limit class sizes to 20 or less because...",
        "📊 EVIDENCE: The graph shows that...",
        "📊 EVIDENCE: This pattern proves that..."
      ],
      es: [
        "🎯 AFIRMACIÓN: Las escuelas [SÍ/NO] deberían limitar el tamaño de las clases a 20 o menos porque...",
        "📊 EVIDENCIA: La gráfica muestra que...",
        "📊 EVIDENCIA: Este patrón prueba que..."
      ]
    },
    words: {
      en: ["dramatically decreases", "drops significantly", "much lower", "compared to", "individual attention", "smaller classes", "larger classes", "steep decline"],
      es: ["disminuye dramáticamente", "cae significativamente", "mucho más bajo", "comparado con", "atención individual", "clases más pequeñas", "clases más grandes", "caída pronunciada"]
    },
    hint: { en: "Where do scores drop the most?", es: "¿Dónde caen más los puntajes?" },
    checks: {
      en: ["YES/NO position", "Used scores", "Explained why"],
      es: ["Posición SÍ/NO", "Usó puntajes", "Explicó por qué"]
    }
  },
  {
    id: 7,
    title: { en: "ELL Study Methods", es: "Métodos de Estudio para Aprendices de Inglés" },
    question: { en: "Conversation practice or mixed methods for ELL?", es: "¿Práctica de conversación o métodos mixtos para estudiantes de inglés?" },
    prompt: { en: "Argue for CONVERSATION or MIXED.", es: "Argumenta por CONVERSACIÓN o MIXTOS." },
    data: { "Grammar": 15, "Talk": 28, "Reading": 22, "Apps": 18, "TV": 12, "Mixed": 32 },
    xLabel: { en: "Learning Method", es: "Método de Aprendizaje" },
    yLabel: { en: "Points Gained", es: "Puntos Ganados" },
    type: "bar",
    starters: {
      en: [
        "🎯 CLAIM: ELL students should use [CONVERSATION/MIXED METHODS] because...",
        "📊 EVIDENCE: The data shows that...",
        "📊 EVIDENCE: Compared to other methods..."
      ],
      es: [
        "🎯 AFIRMACIÓN: Los estudiantes de inglés deberían usar [CONVERSACIÓN/MÉTODOS MIXTOS] porque...",
        "📊 EVIDENCIA: Los datos muestran que...",
        "📊 EVIDENCIA: Comparado con otros métodos..."
      ]
    },
    words: {
      en: ["most effective", "highest gains", "clearly superior", "compared to", "mixed methods", "conversation practice", "language development", "best approach"],
      es: ["más efectivo", "mayores ganancias", "claramente superior", "comparado con", "métodos mixtos", "práctica de conversación", "desarrollo del lenguaje", "mejor enfoque"]
    },
    hint: { en: "Which gives biggest improvement?", es: "¿Cuál da la mayor mejora?" },
    checks: {
      en: ["Clear choice", "Used numbers", "Explained why"],
      es: ["Elección clara", "Usó números", "Explicó por qué"]
    }
  },
  {
    id: 8,
    title: { en: "Screen Time & Sleep", es: "Tiempo de Pantalla y Sueño" },
    question: { en: "Ban screens 1 hour before bed?", es: "¿Prohibir pantallas 1 hora antes de dormir?" },
    prompt: { en: "Use the data to argue YES or NO.", es: "Usa los datos para argumentar SÍ o NO." },
    data: { "0": 8.7, "15": 8.4, "30": 8.0, "60": 7.5, "90+": 6.8 },
    xLabel: { en: "Minutes Before Bed", es: "Minutos Antes de Dormir" },
    yLabel: { en: "Hours of Sleep", es: "Horas de Sueño" },
    type: "line",
    starters: {
      en: [
        "🎯 CLAIM: Families should [YES/NO] ban screens 1 hour before bed because...",
        "📊 EVIDENCE: The data shows that...",
        "📊 EVIDENCE: This proves that..."
      ],
      es: [
        "🎯 AFIRMACIÓN: Las familias [SÍ/NO] deberían prohibir pantallas 1 hora antes de dormir porque...",
        "📊 EVIDENCIA: Los datos muestran que...",
        "📊 EVIDENCIA: Esto prueba que..."
      ]
    },
    words: {
      en: ["dramatically impacts", "sleep quality", "significantly less", "compared to", "harmful effects", "blue light", "before bedtime", "noticeable difference"],
      es: ["impacta dramáticamente", "calidad del sueño", "significativamente menos", "comparado con", "efectos dañinos", "luz azul", "antes de dormir", "diferencia notable"]
    },
    hint: { en: "What's the biggest drop?", es: "¿Cuál es la caída más grande?" },
    checks: {
      en: ["YES/NO position", "Used sleep hours", "Made recommendation"],
      es: ["Posición SÍ/NO", "Usó horas de sueño", "Hizo recomendación"]
    }
  },
  {
    id: 9,
    title: { en: "After-School Programs", es: "Programas Después de Clases" },
    question: { en: "Spend on sports or academic programs?", es: "¿Gastar en deportes o programas académicos?" },
    prompt: { en: "Argue for SPORTS or ACADEMICS.", es: "Argumenta por DEPORTES o ACADÉMICOS." },
    data: { "Sports": 38, "Tutoring": 22, "Arts": 18, "Clubs": 15, "None": 28 },
    xLabel: { en: "Program Type", es: "Tipo de Programa" },
    yLabel: { en: "Participation %", es: "Participación %" },
    type: "bar",
    starters: {
      en: [
        "🎯 CLAIM: Schools should spend more on [SPORTS/ACADEMICS] because...",
        "📊 EVIDENCE: According to the chart...",
        "📊 EVIDENCE: This shows that..."
      ],
      es: [
        "🎯 AFIRMACIÓN: Las escuelas deberían gastar más en [DEPORTES/ACADÉMICOS] porque...",
        "📊 EVIDENCIA: Según la gráfica...",
        "📊 EVIDENCIA: Esto muestra que..."
      ]
    },
    words: {
      en: ["highest participation", "most popular", "student interest", "compared to", "clear preference", "academic support", "physical activity", "engagement levels"],
      es: ["mayor participación", "más popular", "interés estudiantil", "comparado con", "preferencia clara", "apoyo académico", "actividad física", "niveles de participación"]
    },
    hint: { en: "Most students vs. other benefits?", es: "¿Más estudiantes vs. otros beneficios?" },
    checks: {
      en: ["Clear choice", "Used participation %", "Explained benefits"],
      es: ["Elección clara", "Usó participación %", "Explicó beneficios"]
    }
  },
  {
    id: 10,
    title: { en: "School Lunch Choices", es: "Opciones de Almuerzo Escolar" },
    question: { en: "Popular foods or healthy foods?", es: "¿Comidas populares o comidas saludables?" },
    prompt: { en: "Argue for POPULAR or HEALTHY.", es: "Argumenta por POPULARES o SALUDABLES." },
    data: { "Pizza": 42, "Burgers": 28, "Salad": 8, "Chicken": 12, "Pasta": 18, "Ethnic": 6 },
    xLabel: { en: "Food Choice", es: "Opción de Comida" },
    yLabel: { en: "Student Choice %", es: "Elección Estudiantil %" },
    type: "bar",
    starters: {
      en: [
        "🎯 CLAIM: Schools should prioritize [POPULAR/HEALTHY] foods because...",
        "📊 EVIDENCE: The data shows that...",
        "📊 EVIDENCE: This means that..."
      ],
      es: [
        "🎯 AFIRMACIÓN: Las escuelas deberían priorizar comidas [POPULARES/SALUDABLES] porque...",
        "📊 EVIDENCIA: Los datos muestran que...",
        "📊 EVIDENCIA: Esto significa que..."
      ]
    },
    words: {
      en: ["most popular", "healthier options", "need balance", "compared to", "student preferences", "nutrition matters", "what students want", "huge difference"],
      es: ["más popular", "opciones más saludables", "necesitan balance", "comparado con", "preferencias estudiantiles", "nutrición importa", "lo que los estudiantes quieren", "diferencia enorme"]
    },
    hint: { en: "Most chosen vs. healthiest?", es: "¿Más elegido vs. más saludable?" },
    checks: {
      en: ["Clear position", "Used data", "Explained priority"],
      es: ["Posición clara", "Usó datos", "Explicó prioridad"]
    }
  }
];

const BarChart = ({ data, title, xLabel, yLabel, language = 'en' }) => {
  const values = Object.values(data);
  const entries = Object.entries(data);
  const max = Math.max(...values);
  const min = Math.min(...values);

  // Helper to get text in correct language
  const getText = (obj) => {
    if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
      return obj[language] || obj.en;
    }
    return obj;
  };

  // Calculate scale for maximum visual clarity for students
  // Goal: Make differences visually obvious while remaining accurate
  // Strategy: Tight scaling around data range so bars fill 60-95% of chart height
  const dataRange = max - min;

  // For small/percentage data (<=10), always start from 0 for context
  // For larger values: use tight scaling with 15% padding below and above
  const scaleMin = max <= 10 ? 0 : Math.max(0, Math.floor((min - dataRange * 0.15) / 10) * 10);
  const scaleMax = max <= 10 ? Math.ceil(max * 1.15) : Math.ceil((max + dataRange * 0.15) / 10) * 10;
  const range = scaleMax - scaleMin;

  return (
    <div className="w-full">
      <h4 className="text-lg font-bold text-center mb-6 text-cyan-200 px-2">{getText(title)}</h4>
      <div className="relative px-4 pb-2 pl-24">
        {/* Y-axis label */}
        <div className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-black text-cyan-200 whitespace-nowrap">
          {getText(yLabel)}
        </div>

        {/* Chart area */}
        <div className="flex items-end justify-around h-64 gap-3 pl-20 pr-4 pt-8 pb-2 border-l-4 border-b-4 border-cyan-400/70 rounded-bl-lg relative">
          {/* Y-axis grid lines with labels */}
          <div className="absolute left-20 right-4 top-8 bottom-16 pointer-events-none">
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const labelValue = Math.round(scaleMin + ratio * range);
              return (
                <div key={ratio} className="absolute left-0 right-0" style={{ bottom: `${ratio * 100}%` }}>
                  <div className="border-t border-gray-600/50"></div>
                  <div className="absolute -left-[4.25rem] -translate-y-1/2 text-sm text-gray-200 font-bold w-14 text-right">
                    {labelValue}
                  </div>
                </div>
              );
            })}
          </div>

          {entries.map(([label, value]) => {
            const heightPercent = ((value - scaleMin) / range) * 100;
            return (
              <div key={label} className="flex flex-col items-center flex-1 justify-end relative z-10" style={{ height: 'calc(100% - 4rem)' }}>
                {/* Bar */}
                <div
                  className="w-full rounded-t-xl shadow-lg transition-all duration-300 hover:opacity-90"
                  style={{
                    height: `${heightPercent}%`,
                    background: 'linear-gradient(to top, #06b6d4 0%, #8b5cf6 100%)',
                    minHeight: '4px',
                  }}
                />
                {/* X-axis label */}
                <div className="text-sm text-gray-100 mt-4 text-center w-full font-bold leading-tight px-1 absolute bottom-0" style={{ transform: 'translateY(2.75rem)' }}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>

        {/* X-axis label */}
        <div className="text-sm font-black text-cyan-200 text-center mt-6">
          {getText(xLabel)}
        </div>
      </div>
    </div>
  );
};

const LineChart = ({ data, title, xLabel, yLabel, language = 'en' }) => {
  const values = Object.values(data);
  const labels = Object.keys(data);
  const max = Math.max(...values);
  const min = Math.min(...values);

  // Helper to get text in correct language
  const getText = (obj) => {
    if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
      return obj[language] || obj.en;
    }
    return obj;
  };

  // Calculate scale for maximum visual clarity for students
  // Goal: Make differences visually obvious while remaining accurate
  // Strategy: Tight scaling around data range so line fills 60-95% of chart height
  const dataRange = max - min;

  // For small/percentage data (<=10), always start from 0 for context
  // For larger values: use tight scaling with 15% padding below and above
  const scaleMin = max <= 10 ? 0 : Math.max(0, Math.floor((min - dataRange * 0.15) / 10) * 10);
  const scaleMax = max <= 10 ? Math.ceil(max * 1.15) : Math.ceil((max + dataRange * 0.15) / 10) * 10;
  const range = scaleMax - scaleMin;

  // Add padding to show labels clearly - more space for larger labels
  const padding = { top: 40, right: 40, bottom: 80, left: 80 };
  const chartWidth = 400 - padding.left - padding.right;
  const chartHeight = 240 - padding.top - padding.bottom;

  return (
    <div className="w-full">
      <h4 className="text-lg font-bold text-center mb-6 text-cyan-200 px-2">{getText(title)}</h4>
      <div className="relative pl-2">
        {/* Y-axis label */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-black text-cyan-200 whitespace-nowrap">
          {getText(yLabel)}
        </div>

        <svg width="100%" height="280" viewBox="0 0 400 280" className="mx-auto">
          {/* Grid lines with Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const labelValue = (scaleMin + ratio * range).toFixed(1);
            return (
              <g key={ratio}>
                <line
                  x1={padding.left}
                  y1={padding.top + (1 - ratio) * chartHeight}
                  x2={padding.left + chartWidth}
                  y2={padding.top + (1 - ratio) * chartHeight}
                  stroke="#4b5563"
                  strokeWidth="1"
                  opacity="0.3"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 12}
                  y={padding.top + (1 - ratio) * chartHeight + 5}
                  textAnchor="end"
                  fill="#e5e7eb"
                  fontSize="13"
                  fontWeight="900"
                >
                  {labelValue}
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + chartHeight}
            stroke="#06b6d4"
            strokeWidth="3"
          />
          <line
            x1={padding.left}
            y1={padding.top + chartHeight}
            x2={padding.left + chartWidth}
            y2={padding.top + chartHeight}
            stroke="#06b6d4"
            strokeWidth="3"
          />

          {/* Line segments with gradient */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          {values.map((v, i) => {
            if (i === values.length - 1) return null;
            const x1 = padding.left + (i / (values.length - 1)) * chartWidth;
            const y1 = padding.top + (1 - (v - scaleMin) / range) * chartHeight;
            const x2 = padding.left + ((i + 1) / (values.length - 1)) * chartWidth;
            const y2 = padding.top + (1 - (values[i + 1] - scaleMin) / range) * chartHeight;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#lineGradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            );
          })}

          {/* Data points */}
          {values.map((v, i) => {
            const x = padding.left + (i / (values.length - 1)) * chartWidth;
            const y = padding.top + (1 - (v - scaleMin) / range) * chartHeight;
            return (
              <g key={i}>
                {/* Point */}
                <circle cx={x} cy={y} r="6" fill="#06b6d4" stroke="#fff" strokeWidth="3" />
                {/* Value label above point */}
                <text
                  x={x}
                  y={y - 14}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="13"
                  fontWeight="900"
                  className="drop-shadow-lg"
                >
                  {v}
                </text>
                {/* X-axis label */}
                <text
                  x={x}
                  y={padding.top + chartHeight + 25}
                  textAnchor="middle"
                  fill="#e5e7eb"
                  fontSize="12"
                  fontWeight="700"
                >
                  {labels[i]}
                </text>
              </g>
            );
          })}

          {/* X-axis label */}
          <text
            x="200"
            y="270"
            textAnchor="middle"
            fill="#a5f3fc"
            fontSize="14"
            fontWeight="900"
          >
            {getText(xLabel)}
          </text>
        </svg>
      </div>
    </div>
  );
};

// Screen transition wrapper with fade animation - MUST be outside App to prevent re-creation
const ScreenWrapper = ({ children, className = "" }) => (
  <div className={`animate-fadeIn ${className}`}>
    {children}
  </div>
);

// Navigation dropdown menu component - MUST be outside App to prevent re-creation
const NavigationMenu = ({ currentRound, onNavigate, screen, language, onToggleLanguage }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-800/90 backdrop-blur-xl border-2 border-cyan-400/70 rounded-xl px-4 py-3 text-white font-bold hover:scale-105 transition-all shadow-2xl flex items-center gap-2"
      >
        <span className="text-xl">☰</span>
        <span className="hidden sm:inline">{language === 'es' ? 'Menú' : 'Menu'}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-16 left-0 bg-slate-800/95 backdrop-blur-xl border-2 border-cyan-400/70 rounded-xl shadow-2xl overflow-hidden z-50 animate-slideDown">
            <div className="p-3 bg-cyan-600/30 border-b border-cyan-400/50">
              <div className="text-cyan-200 font-black text-sm">{language === 'es' ? 'NAVEGACIÓN' : 'NAVIGATION'}</div>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              <button
                onClick={() => { onToggleLanguage(); }}
                className="w-full px-4 py-3 text-left text-white hover:bg-purple-600/30 transition-all font-bold border-b border-slate-700/50 flex flex-col gap-1"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌐</span>
                  <span className="font-black">
                    {language === 'en' && 'English Only'}
                    {language === 'bilingual' && 'Bilingual (ELL)'}
                    {language === 'es' && 'Español'}
                  </span>
                </div>
                <div className="text-xs text-gray-400 pl-7">
                  {language === 'en' && 'Click to switch to Bilingual'}
                  {language === 'bilingual' && 'Haz clic para cambiar a Español'}
                  {language === 'es' && 'Haz clic para cambiar a English'}
                </div>
              </button>
              <button
                onClick={() => { onNavigate('home'); setIsOpen(false); }}
                className="w-full px-4 py-3 text-left text-white hover:bg-cyan-600/30 transition-all font-bold border-b border-slate-700/50 flex items-center gap-2"
              >
                <span className="text-lg">🏠</span>
                <span>{language === 'en' ? 'Home' : 'Inicio'}</span>
              </button>
              {screen !== 'mode' && screen !== 'setup' && (
                <>
                  <div className="px-4 py-2 text-xs font-black text-cyan-300 bg-slate-900/50">
                    {language === 'en' ? 'JUMP TO ROUND:' : 'IR A RONDA:'}
                  </div>
                  {CHARTS.map((chart, idx) => (
                    <button
                      key={chart.id}
                      onClick={() => { onNavigate('round', idx); setIsOpen(false); }}
                      className={`w-full px-4 py-3 text-left hover:bg-purple-600/30 transition-all border-b border-slate-700/50 flex items-center gap-3 ${
                        currentRound === idx ? 'bg-purple-600/40 text-cyan-300 font-black' : 'text-white font-bold'
                      }`}
                    >
                      <span className="text-base">{idx + 1}.</span>
                      <span className="text-sm flex-1">{chart.title[language] || chart.title.en}</span>
                      {currentRound === idx && <span className="text-cyan-300">←</span>}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function App() {
  // Initialize language from localStorage or default to English
  // Modes: 'en' (English only), 'bilingual' (Spanish support, English production), 'es' (Spanish only)
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('dataGameLanguage');
    return saved || 'en';
  });

  const [screen, setScreen] = useState('mode');
  const [mode, setMode] = useState(null);
  const [teamA, setTeamA] = useState({ p1: '', p2: '', score: 0 });
  const [teamB, setTeamB] = useState({ p1: '', p2: '', score: 0 });
  const [turn, setTurn] = useState('A');
  const [round, setRound] = useState(0);
  const [timer, setTimer] = useState(120);
  const [active, setActive] = useState(false);
  const [hint, setHint] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('dataGameLanguage', language);
  }, [language]);

  // Cycle through language modes: en → bilingual → es → en
  const toggleLanguage = () => {
    setLanguage(prev => {
      if (prev === 'en') return 'bilingual';
      if (prev === 'bilingual') return 'es';
      return 'en';
    });
  };

  // Translation helper function
  // In bilingual mode, shows Spanish for comprehension
  const t = (obj) => {
    if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
      if (language === 'bilingual') return obj.es || obj.en;
      return obj[language] || obj.en;
    }
    return obj;
  };

  const chart = CHARTS[round];
  const presenting = turn === 'A' ? teamA : teamB;
  const evaluating = turn === 'A' ? teamB : teamA;

  // Timer effect with audio alert at 0
  useEffect(() => {
    if (active && timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
    if (timer === 0 && active) {
      setActive(false);
      // Play simple beep sound (cross-browser compatible)
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  }, [active, timer]);

  useEffect(() => {
    if (showHint) {
      const t = setTimeout(() => setShowHint(false), 6000);
      return () => clearTimeout(t);
    }
  }, [showHint]);

  const startGame = () => {
    if (mode === '1v1' && teamA.p1 && teamB.p1) {
      setScreen('play');
      setTimer(120);
      setActive(true);
    } else if (mode === '2v2' && teamA.p1 && teamA.p2 && teamB.p1 && teamB.p2) {
      setScreen('play');
      setTimer(120);
      setActive(true);
    }
  };

  const score = (points) => {
    const penalty = hint ? Math.floor(points * 0.25) : 0;
    const total = Math.max(0, points - penalty);
    if (turn === 'A') {
      setTeamA({ ...teamA, score: teamA.score + total });
    } else {
      setTeamB({ ...teamB, score: teamB.score + total });
    }
    setScreen('end');
    setActive(false);
  };

  const next = () => {
    const newRound = round + 1;
    if (newRound >= 10) {
      setScreen('over');
    } else {
      setRound(newRound);
      setTurn(turn === 'A' ? 'B' : 'A');
      setTimer(120);
      setActive(true);
      setHint(false);
      setShowHint(false);
      setScreen('play');
    }
  };

  const reset = () => {
    setScreen('mode');
    setMode(null);
    setTeamA({ p1: '', p2: '', score: 0 });
    setTeamB({ p1: '', p2: '', score: 0 });
    setTurn('A');
    setRound(0);
    setTimer(120);
    setHint(false);
  };

  const handleNavigate = (type, roundIndex) => {
    if (type === 'home') {
      reset();
    } else if (type === 'round') {
      setRound(roundIndex);
      setTimer(120);
      setActive(false);
      setHint(false);
      setShowHint(false);
      setScreen('play');
    }
  };

  if (screen === 'mode') {
    return (
      <ScreenWrapper>
        <NavigationMenu currentRound={round} onNavigate={handleNavigate} screen={screen} language={language} onToggleLanguage={toggleLanguage} />
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8 flex items-center justify-center">
          <div className="max-w-4xl w-full text-center">
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300 mb-8 animate-slideDown">
              {language === 'en' ? 'Data Persuasion Challenge' : 'Desafío de Persuasión con Datos'}
            </h1>
            <p className="text-gray-200 text-xl mb-12 animate-slideDown" style={{ animationDelay: '0.1s' }}>
              {language === 'en' ? '🎤 Use data • 👂 Evaluate • 🏆 Win!' : '🎤 Usa datos • 👂 Evalúa • 🏆 Gana!'}
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <button
                onClick={() => { setMode('1v1'); setScreen('setup'); }}
                className="p-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl hover:scale-105 transition-all shadow-2xl animate-slideUp"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="text-7xl mb-4">🎯</div>
                <div className="text-4xl font-black text-white">1v1</div>
                <div className="text-white text-lg">{language === 'en' ? 'One per team' : 'Uno por equipo'}</div>
              </button>
              <button
                onClick={() => { setMode('2v2'); setScreen('setup'); }}
                className="p-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl hover:scale-105 transition-all shadow-2xl animate-slideUp"
                style={{ animationDelay: '0.3s' }}
              >
                <div className="text-7xl mb-4">👥</div>
                <div className="text-4xl font-black text-white">2v2</div>
                <div className="text-white text-lg">{language === 'en' ? 'Two per team' : 'Dos por equipo'}</div>
              </button>
            </div>
          </div>
        </div>
      </ScreenWrapper>
    );
  }

  if (screen === 'setup') {
    return (
      <ScreenWrapper>
        <NavigationMenu currentRound={round} onNavigate={handleNavigate} screen={screen} language={language} onToggleLanguage={toggleLanguage} />
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300 mb-8">
              {language === 'en' ? 'Setup Teams' : 'Configurar Equipos'}
            </h1>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-xl border-2 border-cyan-400/50 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-cyan-300 mb-6">{language === 'en' ? 'Team A' : 'Equipo A'}</h2>
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Player 1' : 'Jugador 1'}
                  value={teamA.p1}
                  onChange={(e) => setTeamA({...teamA, p1: e.target.value})}
                  className="w-full mb-4 px-5 py-3 bg-white/20 border-2 border-cyan-400/50 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-cyan-300 text-lg transition-all"
                />
                {mode === '2v2' && (
                  <input
                    type="text"
                    placeholder={language === 'en' ? 'Player 2' : 'Jugador 2'}
                    value={teamA.p2}
                    onChange={(e) => setTeamA({...teamA, p2: e.target.value})}
                    className="w-full px-5 py-3 bg-white/20 border-2 border-cyan-400/50 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-cyan-300 text-lg transition-all"
                  />
                )}
              </div>
              <div className="bg-white/10 backdrop-blur-xl border-2 border-pink-400/50 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-pink-300 mb-6">{language === 'en' ? 'Team B' : 'Equipo B'}</h2>
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Player 1' : 'Jugador 1'}
                  value={teamB.p1}
                  onChange={(e) => setTeamB({...teamB, p1: e.target.value})}
                  className="w-full mb-4 px-5 py-3 bg-white/20 border-2 border-pink-400/50 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-pink-300 text-lg transition-all"
                />
                {mode === '2v2' && (
                  <input
                    type="text"
                    placeholder={language === 'en' ? 'Player 2' : 'Jugador 2'}
                    value={teamB.p2}
                    onChange={(e) => setTeamB({...teamB, p2: e.target.value})}
                    className="w-full px-5 py-3 bg-white/20 border-2 border-pink-400/50 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-pink-300 text-lg transition-all"
                  />
                )}
              </div>
            </div>
            <div className="bg-yellow-500/20 backdrop-blur-xl border-2 border-yellow-400/50 rounded-3xl p-8 mb-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">📋 {language === 'es' ? 'Cómo Jugar' : 'How to Play'}</h3>
              <div className="space-y-2 text-white text-lg">
                {language === 'bilingual' ? (
                  <>
                    <p>• 🎤 Tomen turnos presentando argumentos <span className="text-yellow-300 font-black">(en inglés)</span></p>
                    <p>• ⏱️ 2 minutos para preparar</p>
                    <p>• 📢 Argumenta EN VOZ ALTA usando datos <span className="text-yellow-300 font-black">(en inglés)</span></p>
                    <p>• 👂 El otro equipo califica 1-4</p>
                    <p>• 💡 Las pistas cuestan 25%</p>
                    <p>• 🏆 10 rondas en total</p>
                    <p className="pt-2 border-t border-yellow-400/30 text-yellow-300 font-bold">
                      🎯 Instrucciones en español, pero HABLA en inglés!
                    </p>
                  </>
                ) : language === 'es' ? (
                  <>
                    <p>• 🎤 Tomen turnos presentando argumentos</p>
                    <p>• ⏱️ 2 minutos para preparar</p>
                    <p>• 📢 Argumenta EN VOZ ALTA usando datos</p>
                    <p>• 👂 El otro equipo califica 1-4</p>
                    <p>• 💡 Las pistas cuestan 25%</p>
                    <p>• 🏆 10 rondas en total</p>
                  </>
                ) : (
                  <>
                    <p>• 🎤 Take turns presenting arguments</p>
                    <p>• ⏱️ 2 minutes to prepare</p>
                    <p>• 📢 Argue OUT LOUD using data</p>
                    <p>• 👂 Other team scores 1-4</p>
                    <p>• 💡 Hints cost 25%</p>
                    <p>• 🏆 10 rounds total</p>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={startGame}
              disabled={mode === '1v1' ? (!teamA.p1 || !teamB.p1) : (!teamA.p1 || !teamA.p2 || !teamB.p1 || !teamB.p2)}
              className="w-full py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-black text-2xl rounded-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
            >
              {language === 'en' ? 'Start Game! →' : '¡Comenzar Juego! →'}
            </button>
          </div>
        </div>
      </ScreenWrapper>
    );
  }

  if (screen === 'play' && chart) {
    // Timer color and animation based on time remaining
    const timerClass = timer <= 10
      ? 'text-red-500 animate-timerPulse'
      : timer <= 30
        ? 'text-orange-400 animate-timerWarning'
        : 'text-cyan-400';

    return (
      <ScreenWrapper>
        <NavigationMenu currentRound={round} onNavigate={handleNavigate} screen={screen} language={language} onToggleLanguage={toggleLanguage} />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6">
          <div className="max-w-[1800px] mx-auto">

            {/* Top Bar */}
            <div className="bg-slate-800/70 backdrop-blur rounded-2xl p-4 md:p-6 mb-4 md:mb-6 flex justify-between items-center shadow-2xl">
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-400">{language === 'en' ? 'Team A' : 'Equipo A'}</div>
                <div className={`text-3xl md:text-4xl font-black ${turn === 'A' ? 'text-cyan-400' : 'text-white'}`}>
                  {teamA.score}
                </div>
              </div>
              <div className="text-center">
                <div className={`text-5xl md:text-7xl font-black ${timerClass} transition-colors`}>
                  {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-base md:text-lg text-gray-300 font-bold">{language === 'en' ? `Round ${round + 1}/10` : `Ronda ${round + 1}/10`}</div>
                {timer <= 30 && timer > 0 && (
                  <div className="text-sm text-orange-300 font-bold mt-1 animate-pulse">
                    {language === 'en' ? '⚠️ Time running out!' : '⚠️ ¡Se acaba el tiempo!'}
                  </div>
                )}
              </div>
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-400">{language === 'en' ? 'Team B' : 'Equipo B'}</div>
                <div className={`text-3xl md:text-4xl font-black ${turn === 'B' ? 'text-pink-400' : 'text-white'}`}>
                  {teamB.score}
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-xl border-3 border-yellow-400 rounded-3xl p-6 md:p-8 mb-4 md:mb-6 shadow-2xl">
              <div className="text-center">
                <div className="text-4xl md:text-5xl mb-4">🎯</div>
                <h2 className="text-2xl md:text-3xl font-black text-yellow-200 mb-3 md:mb-4">{t(chart.question)}</h2>
                <p className="text-xl md:text-2xl text-yellow-100 font-bold">{t(chart.prompt)}</p>
              </div>
            </div>

            {/* Roles */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              <div className={`${turn === 'A' ? 'bg-cyan-600/40 border-cyan-400' : 'bg-cyan-900/20 border-cyan-600'} border-3 rounded-2xl p-4 md:p-6 backdrop-blur shadow-xl transition-all`}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl mb-3">🎤</div>
                  <div className="text-xl md:text-2xl font-black text-cyan-200">{language === 'en' ? `PRESENTER${mode === '2v2' ? 'S' : ''}` : `PRESENTADOR${mode === '2v2' ? 'ES' : ''}`}</div>
                  <div className="text-lg md:text-xl text-white font-bold">{language === 'en' ? `Team ${turn}` : `Equipo ${turn}`}</div>
                  <div className="text-base md:text-lg text-cyan-100">
                    {mode === '1v1' ? presenting.p1 : `${presenting.p1} & ${presenting.p2}`}
                  </div>
                </div>
              </div>
              <div className={`${turn === 'B' ? 'bg-pink-600/40 border-pink-400' : 'bg-pink-900/20 border-pink-600'} border-3 rounded-2xl p-4 md:p-6 backdrop-blur shadow-xl transition-all`}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl mb-3">👂</div>
                  <div className="text-xl md:text-2xl font-black text-pink-200">{language === 'en' ? `LISTENER${mode === '2v2' ? 'S' : ''}` : `OYENTE${mode === '2v2' ? 'S' : ''}`}</div>
                  <div className="text-lg md:text-xl text-white font-bold">{language === 'en' ? `Team ${turn === 'A' ? 'B' : 'A'}` : `Equipo ${turn === 'A' ? 'B' : 'A'}`}</div>
                  <div className="text-base md:text-lg text-pink-100">
                    {mode === '1v1' ? evaluating.p1 : `${evaluating.p1} & ${evaluating.p2}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Split Layout - Stacks on mobile, side-by-side on desktop */}
            <div className="grid lg:grid-cols-2 gap-4 md:gap-6">

              {/* LEFT - Presenter */}
              <div className="space-y-4 md:space-y-6">
                <div className="bg-slate-800/70 backdrop-blur-xl border-2 border-cyan-400/50 rounded-2xl p-4 md:p-6 shadow-2xl">
                  {chart.type === 'bar' ? (
                    <BarChart data={chart.data} title={chart.title} xLabel={chart.xLabel} yLabel={chart.yLabel} language={language} />
                  ) : (
                    <LineChart data={chart.data} title={chart.title} xLabel={chart.xLabel} yLabel={chart.yLabel} language={language} />
                  )}
                  <button
                    onClick={() => { setHint(true); setShowHint(true); }}
                    disabled={hint}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 border-2 border-orange-300 rounded-xl text-white font-bold text-base md:text-lg hover:scale-105 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
                  >
                    {hint ? (language === 'en' ? '💡 Hint Used (-25%)' : '💡 Pista Usada (-25%)') : (language === 'en' ? '💡 Need a Hint?' : '💡 ¿Necesitas una Pista?')}
                  </button>
                  {showHint && (
                    <div className="mt-4 bg-orange-600/50 border-2 border-orange-300 rounded-xl p-4 animate-slideDown shadow-lg">
                      <div className="text-orange-200 text-sm font-bold mb-2">{language === 'en' ? '💡 HINT:' : '💡 PISTA:'}</div>
                      <div className="text-white text-base">{t(chart.hint)}</div>
                    </div>
                  )}
                </div>

                <div className="bg-blue-900/50 backdrop-blur-xl border-2 border-blue-400 rounded-2xl p-4 md:p-6 shadow-2xl">
                  <div className="text-center text-blue-200 font-black text-lg md:text-xl mb-2">
                    {language === 'es' ? '📝 PRESENTADORES: Usen en Orden' : '📝 PRESENTERS: Use in Order'}
                  </div>
                  <div className="text-center text-blue-100 text-sm mb-4 font-bold">
                    {language === 'bilingual' ? (
                      <span className="bg-yellow-500/30 px-3 py-1 rounded-lg border-2 border-yellow-400">
                        🎤 SAY IN ENGLISH • Di en inglés ⬇️
                      </span>
                    ) : language === 'es' ? 'Digan las 3 oraciones EN VOZ ALTA ⬇️' : 'Say all 3 sentences OUT LOUD ⬇️'}
                  </div>
                  <div className="space-y-3">
                    {language === 'bilingual' ? (
                      // Bilingual mode: Show both Spanish (to understand) and English (to speak)
                      chart.starters.en.map((enText, i) => (
                        <div key={i} className="bg-slate-800/80 rounded-xl p-3 text-sm md:text-base leading-relaxed">
                          <div className="flex gap-3 mb-2">
                            <div className="text-2xl font-black text-cyan-300 flex-shrink-0">{i + 1}.</div>
                            <div className="flex-1 text-yellow-200 italic text-xs">{chart.starters.es[i]}</div>
                          </div>
                          <div className="pl-10 text-white font-bold text-base border-l-4 border-yellow-400 ml-2">
                            🎤 {enText}
                          </div>
                        </div>
                      ))
                    ) : (
                      // English or Spanish only modes
                      t(chart.starters).map((s, i) => (
                        <div key={i} className="bg-slate-800/80 rounded-xl p-3 text-white text-sm md:text-base leading-relaxed flex gap-3">
                          <div className="text-2xl font-black text-cyan-300 flex-shrink-0">{i + 1}.</div>
                          <div className="flex-1">{s}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="bg-purple-900/50 backdrop-blur-xl border-2 border-purple-400 rounded-2xl p-4 md:p-6 shadow-2xl">
                  <div className="text-center text-purple-200 font-black text-lg md:text-xl mb-4">
                    {language === 'es' ? '📚 BANCO DE PALABRAS' : '📚 WORD BANK'}
                    {language === 'bilingual' && (
                      <div className="text-xs text-yellow-300 mt-1">🎤 Use these English words • Usa estas palabras en inglés</div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {language === 'bilingual' ? (
                      // Bilingual mode: English word with Spanish translation below
                      chart.words.en.map((enWord, i) => (
                        <div
                          key={i}
                          className="px-4 py-2 bg-purple-600/50 rounded-lg border border-purple-400/50 shadow-md flex flex-col items-center"
                        >
                          <div className="text-white text-sm font-bold">{enWord}</div>
                          <div className="text-yellow-200 text-xs italic">{chart.words.es[i]}</div>
                        </div>
                      ))
                    ) : (
                      // English or Spanish only modes
                      t(chart.words).map((w, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-purple-600/50 rounded-lg text-white text-sm font-bold border border-purple-400/50 shadow-md"
                        >
                          {w}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT - Evaluator */}
              <div className="space-y-4 md:space-y-6">
                <div className="bg-slate-800/70 backdrop-blur-xl border-2 border-pink-400/50 rounded-2xl p-4 md:p-6 shadow-2xl">
                  {chart.type === 'bar' ? (
                    <BarChart data={chart.data} title={chart.title} xLabel={chart.xLabel} yLabel={chart.yLabel} language={language} />
                  ) : (
                    <LineChart data={chart.data} title={chart.title} xLabel={chart.xLabel} yLabel={chart.yLabel} language={language} />
                  )}
                </div>

                <div className="bg-indigo-900/50 backdrop-blur-xl border-2 border-purple-400 rounded-2xl p-4 md:p-6 shadow-2xl">
                  <div className="text-center text-purple-200 font-black text-lg md:text-xl mb-4">{language === 'en' ? '✅ LISTENERS: Check For' : '✅ OYENTES: Verificar'}</div>
                  <div className="space-y-3">
                    {t(chart.checks).map((c, i) => (
                      <div key={i} className="flex items-start gap-3 bg-slate-800/80 rounded-xl p-3">
                        <div className="text-xl md:text-2xl">☑️</div>
                        <div className="text-white text-sm md:text-base flex-1 leading-relaxed">{c}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-pink-900/50 backdrop-blur-xl border-2 border-pink-400 rounded-2xl p-4 md:p-6 shadow-2xl">
                  <div className="text-center text-pink-200 font-black text-lg md:text-xl mb-5">{language === 'en' ? '🎯 Score Argument' : '🎯 Califica el Argumento'}</div>
                  <div className="grid grid-cols-4 gap-2 md:gap-3 mb-5">
                    <button
                      onClick={() => score(4)}
                      className="p-3 md:p-4 bg-gradient-to-br from-emerald-600 to-green-600 border-3 border-emerald-300 rounded-xl hover:scale-110 transition-all shadow-lg"
                    >
                      <div className="text-3xl md:text-4xl mb-2">🌟</div>
                      <div className="text-2xl md:text-3xl font-black text-emerald-100">4</div>
                      <div className="text-xs text-emerald-200 font-bold">{language === 'en' ? 'Great' : 'Genial'}</div>
                    </button>
                    <button
                      onClick={() => score(3)}
                      className="p-3 md:p-4 bg-gradient-to-br from-green-600 to-lime-600 border-3 border-green-300 rounded-xl hover:scale-110 transition-all shadow-lg"
                    >
                      <div className="text-3xl md:text-4xl mb-2">✅</div>
                      <div className="text-2xl md:text-3xl font-black text-green-100">3</div>
                      <div className="text-xs text-green-200 font-bold">{language === 'en' ? 'Good' : 'Bueno'}</div>
                    </button>
                    <button
                      onClick={() => score(2)}
                      className="p-3 md:p-4 bg-gradient-to-br from-yellow-600 to-amber-600 border-3 border-yellow-300 rounded-xl hover:scale-110 transition-all shadow-lg"
                    >
                      <div className="text-3xl md:text-4xl mb-2">👍</div>
                      <div className="text-2xl md:text-3xl font-black text-yellow-100">2</div>
                      <div className="text-xs text-yellow-200 font-bold">OK</div>
                    </button>
                    <button
                      onClick={() => score(1)}
                      className="p-3 md:p-4 bg-gradient-to-br from-orange-600 to-red-600 border-3 border-orange-300 rounded-xl hover:scale-110 transition-all shadow-lg"
                    >
                      <div className="text-3xl md:text-4xl mb-2">💭</div>
                      <div className="text-2xl md:text-3xl font-black text-orange-100">1</div>
                      <div className="text-xs text-orange-200 font-bold">{language === 'en' ? 'Retry' : 'Reintentar'}</div>
                    </button>
                  </div>
                  <div className="space-y-2 text-xs md:text-sm text-white/90 bg-slate-900/50 rounded-xl p-4">
                    {language === 'en' ? (
                      <>
                        <div>🌟 4 = Clear + evidence + why</div>
                        <div>✅ 3 = Claim + data + some explanation</div>
                        <div>👍 2 = Has claim OR data</div>
                        <div>💭 1 = Unclear or no data</div>
                      </>
                    ) : (
                      <>
                        <div>🌟 4 = Claro + evidencia + por qué</div>
                        <div>✅ 3 = Afirmación + datos + algo de explicación</div>
                        <div>👍 2 = Tiene afirmación O datos</div>
                        <div>💭 1 = Poco claro o sin datos</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScreenWrapper>
    );
  }

  if (screen === 'end') {
    return (
      <ScreenWrapper>
        <NavigationMenu currentRound={round} onNavigate={handleNavigate} screen={screen} language={language} onToggleLanguage={toggleLanguage} />
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8 flex items-center justify-center">
          <div className="max-w-3xl w-full">
            <div className="bg-white/10 backdrop-blur-xl border-2 border-yellow-400/50 rounded-3xl p-10 text-center shadow-2xl">
              <div className="text-7xl mb-6 animate-bounce">🏆</div>
              <h2 className="text-5xl font-black text-white mb-6">{language === 'en' ? 'Round Complete!' : '¡Ronda Completa!'}</h2>
              {hint && <div className="text-orange-300 mb-6 text-2xl font-bold">{language === 'en' ? '💡 Hint penalty (-25%)' : '💡 Penalización por pista (-25%)'}</div>}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className={`${turn === 'A' ? 'bg-cyan-600/50 border-cyan-300' : 'bg-cyan-900/30 border-cyan-500'} border-3 rounded-2xl p-6 backdrop-blur transition-all`}>
                  <div className="text-sm text-gray-300 font-bold mb-2">{language === 'en' ? 'Team A' : 'Equipo A'}</div>
                  <div className="text-5xl font-black text-white">{teamA.score}</div>
                </div>
                <div className={`${turn === 'B' ? 'bg-pink-600/50 border-pink-300' : 'bg-pink-900/30 border-pink-500'} border-3 rounded-2xl p-6 backdrop-blur transition-all`}>
                  <div className="text-sm text-gray-300 font-bold mb-2">{language === 'en' ? 'Team B' : 'Equipo B'}</div>
                  <div className="text-5xl font-black text-white">{teamB.score}</div>
                </div>
              </div>
              <button
                onClick={next}
                className="w-full py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-black text-2xl rounded-2xl hover:scale-105 transition-all shadow-2xl"
              >
                {language === 'en' ? 'Next Round →' : 'Siguiente Ronda →'}
              </button>
            </div>
          </div>
        </div>
      </ScreenWrapper>
    );
  }

  if (screen === 'over') {
    const winner = teamA.score > teamB.score ? 'A' : teamB.score > teamA.score ? 'B' : 'TIE';
    const winning = winner === 'A' ? teamA : winner === 'B' ? teamB : null;
    return (
      <ScreenWrapper>
        <NavigationMenu currentRound={round} onNavigate={handleNavigate} screen={screen} language={language} onToggleLanguage={toggleLanguage} />
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8 flex items-center justify-center">
          <div className="max-w-3xl w-full">
            <div className="bg-white/10 backdrop-blur-xl border-2 border-yellow-400/50 rounded-3xl p-10 text-center shadow-2xl">
              <div className="text-8xl mb-6 animate-bounce">🏆</div>
              <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 mb-6">
                {language === 'en' ? 'Game Over!' : '¡Juego Terminado!'}
              </h2>
              {winner === 'TIE' ? (
                <div className="text-3xl text-white mb-8 font-bold">{language === 'en' ? "🤝 It's a tie!" : '🤝 ¡Es un empate!'}</div>
              ) : (
                <>
                  <div className="text-4xl text-white mb-3 font-black">{language === 'en' ? `🎉 Team ${winner} Wins!` : `🎉 ¡Equipo ${winner} Gana!`}</div>
                  <div className="text-2xl text-gray-200 mb-8 font-bold">
                    {mode === '1v1' ? winning.p1 : `${winning.p1} & ${winning.p2}`} 🌟
                  </div>
                </>
              )}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-cyan-900/40 border-3 border-cyan-400 rounded-2xl p-8 backdrop-blur">
                  <div className="text-sm text-gray-300 font-bold mb-2">{language === 'en' ? 'Team A' : 'Equipo A'}</div>
                  <div className="text-6xl font-black text-white">{teamA.score}</div>
                </div>
                <div className="bg-pink-900/40 border-3 border-pink-400 rounded-2xl p-8 backdrop-blur">
                  <div className="text-sm text-gray-300 font-bold mb-2">{language === 'en' ? 'Team B' : 'Equipo B'}</div>
                  <div className="text-6xl font-black text-white">{teamB.score}</div>
                </div>
              </div>
              <button
                onClick={reset}
                className="w-full py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-black text-2xl rounded-2xl hover:scale-105 transition-all shadow-2xl"
              >
                {language === 'en' ? '🔄 Play Again' : '🔄 Jugar de Nuevo'}
              </button>
            </div>
          </div>
        </div>
      </ScreenWrapper>
    );
  }
}
