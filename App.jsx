const { useState, useEffect } = React;

const CHARTS = [
  {
    id: 1,
    title: "Teen Social Media Use vs Happiness",
    question: "Should schools teach students to limit their social media use?",
    prompt: "Use the data to argue YES or NO.",
    data: { "0-1": 7.2, "1-2": 7.8, "2-3": 7.5, "3-4": 6.8, "4-5": 6.2, "5+": 5.4 },
    xLabel: "Hours per Day",
    yLabel: "Happiness Score",
    type: "line",
    starters: [
      "🎯 CLAIM: Schools should [YES/NO] teach limits on social media because...",
      "📊 EVIDENCE: The data shows that...",
      "📊 EVIDENCE: This proves that..."
    ],
    words: ["peaks at", "drops to", "highest score", "lowest score", "significantly lower", "optimal range", "decreases", "increases"],
    hint: "Where is happiness highest vs. lowest?",
    checks: ["Clear YES/NO", "Used scores", "Explained pattern"]
  },
  {
    id: 2,
    title: "School Start Times & Test Scores",
    question: "Should school start at 8:30 AM or later?",
    prompt: "Use the data to argue YES or NO.",
    data: { "7:00": 72, "7:30": 76, "8:00": 81, "8:30": 85, "9:00": 86 },
    xLabel: "Start Time",
    yLabel: "Test Score",
    type: "bar",
    starters: [
      "🎯 CLAIM: Schools should [YES/NO] start at 8:30 AM or later because...",
      "📊 EVIDENCE: The data shows that...",
      "📊 EVIDENCE: This means that..."
    ],
    words: ["steadily increases", "improves by", "higher scores", "compared to", "much better", "significantly higher", "early morning", "later start"],
    hint: "Compare earliest to latest - how big is the difference?",
    checks: ["Clear position", "Cited scores", "Explained why"]
  },
  {
    id: 3,
    title: "Homework Hours vs GPA",
    question: "Should teachers reduce homework to lower stress?",
    prompt: "Use the data to argue YES or NO.",
    data: { "0-2": 2.8, "3-5": 3.4, "6-8": 3.7, "9-11": 3.8, "12+": 3.6 },
    xLabel: "Hours per Week",
    yLabel: "GPA",
    type: "line",
    starters: [
      "🎯 CLAIM: Teachers should [YES/NO] reduce homework because...",
      "📊 EVIDENCE: According to the data...",
      "📊 EVIDENCE: This shows that..."
    ],
    words: ["peaks at", "too much", "diminishing returns", "excessive homework", "sweet spot", "starts declining", "moderate amount", "becomes harmful"],
    hint: "GPA goes up but what about after 9-11 hours?",
    checks: ["Clear position", "Used data", "Mentioned wellbeing"]
  },
  {
    id: 4,
    title: "Study Methods & Score Improvement",
    question: "Should teachers use practice tests or games?",
    prompt: "Argue for PRACTICE TESTS or GAMES.",
    data: { "Textbook": 8, "Videos": 12, "Practice": 18, "Groups": 15, "Games": 14 },
    xLabel: "Study Method",
    yLabel: "Points Improved",
    type: "bar",
    starters: [
      "🎯 CLAIM: Teachers should use [PRACTICE TESTS/GAMES] because...",
      "📊 EVIDENCE: The chart shows that...",
      "📊 EVIDENCE: Compared to other methods..."
    ],
    words: ["most effective", "highest improvement", "clearly superior", "compared to", "much better", "active learning", "passive learning", "best results"],
    hint: "Best scores vs. what students enjoy?",
    checks: ["Clear choice", "Used numbers", "Explained why"]
  },
  {
    id: 5,
    title: "Reading Format & Comprehension",
    question: "Physical books or digital devices?",
    prompt: "Argue for PHYSICAL or DIGITAL.",
    data: { "Books": 78, "E-Books": 72, "Audio": 68, "Articles": 65 },
    xLabel: "Reading Format",
    yLabel: "Comprehension %",
    type: "bar",
    starters: [
      "🎯 CLAIM: Schools should invest in [PHYSICAL BOOKS/DIGITAL DEVICES] because...",
      "📊 EVIDENCE: Looking at the data...",
      "📊 EVIDENCE: This difference proves that..."
    ],
    words: ["highest comprehension", "most effective", "clearly better", "compared to", "significant difference", "physical books", "digital reading", "percentage points"],
    hint: "Best scores vs. cost?",
    checks: ["Clear choice", "Used scores", "Explained benefits"]
  },
  {
    id: 6,
    title: "Class Size & Performance",
    question: "Limit class sizes to 20 students or less?",
    prompt: "Use the data to argue YES or NO.",
    data: { "15": 87, "20": 84, "25": 79, "30": 74, "35": 69 },
    xLabel: "Students per Class",
    yLabel: "Performance Score",
    type: "line",
    starters: [
      "🎯 CLAIM: Schools should [YES/NO] limit class sizes to 20 or less because...",
      "📊 EVIDENCE: The graph shows that...",
      "📊 EVIDENCE: This pattern proves that..."
    ],
    words: ["dramatically decreases", "drops significantly", "much lower", "compared to", "individual attention", "smaller classes", "larger classes", "steep decline"],
    hint: "Where do scores drop the most?",
    checks: ["YES/NO position", "Used scores", "Explained why"]
  },
  {
    id: 7,
    title: "ELL Study Methods",
    question: "Conversation practice or mixed methods for ELL?",
    prompt: "Argue for CONVERSATION or MIXED.",
    data: { "Grammar": 15, "Talk": 28, "Reading": 22, "Apps": 18, "TV": 12, "Mixed": 32 },
    xLabel: "Learning Method",
    yLabel: "Points Gained",
    type: "bar",
    starters: [
      "🎯 CLAIM: ELL students should use [CONVERSATION/MIXED METHODS] because...",
      "📊 EVIDENCE: The data shows that...",
      "📊 EVIDENCE: Compared to other methods..."
    ],
    words: ["most effective", "highest gains", "clearly superior", "compared to", "mixed methods", "conversation practice", "language development", "best approach"],
    hint: "Which gives biggest improvement?",
    checks: ["Clear choice", "Used numbers", "Explained why"]
  },
  {
    id: 8,
    title: "Screen Time & Sleep",
    question: "Ban screens 1 hour before bed?",
    prompt: "Use the data to argue YES or NO.",
    data: { "0": 8.7, "15": 8.4, "30": 8.0, "60": 7.5, "90+": 6.8 },
    xLabel: "Minutes Before Bed",
    yLabel: "Hours of Sleep",
    type: "line",
    starters: [
      "🎯 CLAIM: Families should [YES/NO] ban screens 1 hour before bed because...",
      "📊 EVIDENCE: The data shows that...",
      "📊 EVIDENCE: This proves that..."
    ],
    words: ["dramatically impacts", "sleep quality", "significantly less", "compared to", "harmful effects", "blue light", "before bedtime", "noticeable difference"],
    hint: "What's the biggest drop?",
    checks: ["YES/NO position", "Used sleep hours", "Made recommendation"]
  },
  {
    id: 9,
    title: "After-School Programs",
    question: "Spend on sports or academic programs?",
    prompt: "Argue for SPORTS or ACADEMICS.",
    data: { "Sports": 38, "Tutoring": 22, "Arts": 18, "Clubs": 15, "None": 28 },
    xLabel: "Program Type",
    yLabel: "Participation %",
    type: "bar",
    starters: [
      "🎯 CLAIM: Schools should spend more on [SPORTS/ACADEMICS] because...",
      "📊 EVIDENCE: According to the chart...",
      "📊 EVIDENCE: This shows that..."
    ],
    words: ["highest participation", "most popular", "student interest", "compared to", "clear preference", "academic support", "physical activity", "engagement levels"],
    hint: "Most students vs. other benefits?",
    checks: ["Clear choice", "Used participation %", "Explained benefits"]
  },
  {
    id: 10,
    title: "School Lunch Choices",
    question: "Popular foods or healthy foods?",
    prompt: "Argue for POPULAR or HEALTHY.",
    data: { "Pizza": 42, "Burgers": 28, "Salad": 8, "Chicken": 12, "Pasta": 18, "Ethnic": 6 },
    xLabel: "Food Choice",
    yLabel: "Student Choice %",
    type: "bar",
    starters: [
      "🎯 CLAIM: Schools should prioritize [POPULAR/HEALTHY] foods because...",
      "📊 EVIDENCE: The data shows that...",
      "📊 EVIDENCE: This means that..."
    ],
    words: ["most popular", "healthier options", "need balance", "compared to", "student preferences", "nutrition matters", "what students want", "huge difference"],
    hint: "Most chosen vs. healthiest?",
    checks: ["Clear position", "Used data", "Explained priority"]
  }
];

const BarChart = ({ data, title, xLabel, yLabel }) => {
  const values = Object.values(data);
  const entries = Object.entries(data);
  const max = Math.max(...values);
  const min = Math.min(...values);

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
      <h4 className="text-lg font-bold text-center mb-6 text-cyan-200 px-2">{title}</h4>
      <div className="relative px-4 pb-2 pl-20">
        {/* Y-axis label */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-black text-cyan-200 whitespace-nowrap">
          {yLabel}
        </div>

        {/* Chart area */}
        <div className="flex items-end justify-around h-64 gap-3 pl-16 pr-4 pt-8 pb-2 border-l-4 border-b-4 border-cyan-400/70 rounded-bl-lg relative">
          {/* Y-axis grid lines with labels */}
          <div className="absolute left-16 right-4 top-8 bottom-14 pointer-events-none">
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const labelValue = Math.round(scaleMin + ratio * range);
              return (
                <div key={ratio} className="absolute left-0 right-0" style={{ bottom: `${ratio * 100}%` }}>
                  <div className="border-t border-gray-600/50"></div>
                  <div className="absolute -left-[3.5rem] -translate-y-1/2 text-sm text-gray-200 font-bold w-12 text-right">
                    {labelValue}
                  </div>
                </div>
              );
            })}
          </div>

          {entries.map(([label, value]) => {
            const heightPercent = ((value - scaleMin) / range) * 100;
            return (
              <div key={label} className="flex flex-col items-center flex-1 justify-end relative z-10" style={{ height: 'calc(100% - 3.5rem)' }}>
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
                <div className="text-sm text-gray-100 mt-3 text-center w-full font-bold leading-tight px-1 absolute bottom-0" style={{ transform: 'translateY(2.5rem)' }}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>

        {/* X-axis label */}
        <div className="text-sm font-black text-cyan-200 text-center mt-4">
          {xLabel}
        </div>
      </div>
    </div>
  );
};

const LineChart = ({ data, title, xLabel, yLabel }) => {
  const values = Object.values(data);
  const labels = Object.keys(data);
  const max = Math.max(...values);
  const min = Math.min(...values);

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
  const padding = { top: 40, right: 40, bottom: 70, left: 75 };
  const chartWidth = 400 - padding.left - padding.right;
  const chartHeight = 240 - padding.top - padding.bottom;

  return (
    <div className="w-full">
      <h4 className="text-lg font-bold text-center mb-6 text-cyan-200 px-2">{title}</h4>
      <div className="relative pl-4">
        {/* Y-axis label */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-black text-cyan-200 whitespace-nowrap">
          {yLabel}
        </div>

        <svg width="100%" height="260" viewBox="0 0 400 260" className="mx-auto">
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
                  y={padding.top + chartHeight + 20}
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
            y="255"
            textAnchor="middle"
            fill="#a5f3fc"
            fontSize="14"
            fontWeight="900"
          >
            {xLabel}
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
const NavigationMenu = ({ currentRound, onNavigate, screen }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-800/90 backdrop-blur-xl border-2 border-cyan-400/70 rounded-xl px-4 py-3 text-white font-bold hover:scale-105 transition-all shadow-2xl flex items-center gap-2"
      >
        <span className="text-xl">☰</span>
        <span className="hidden sm:inline">Menu</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-16 left-0 bg-slate-800/95 backdrop-blur-xl border-2 border-cyan-400/70 rounded-xl shadow-2xl overflow-hidden z-50 animate-slideDown">
            <div className="p-3 bg-cyan-600/30 border-b border-cyan-400/50">
              <div className="text-cyan-200 font-black text-sm">NAVIGATION</div>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              <button
                onClick={() => { onNavigate('home'); setIsOpen(false); }}
                className="w-full px-4 py-3 text-left text-white hover:bg-cyan-600/30 transition-all font-bold border-b border-slate-700/50 flex items-center gap-2"
              >
                <span className="text-lg">🏠</span>
                <span>Home</span>
              </button>
              {screen !== 'mode' && screen !== 'setup' && (
                <>
                  <div className="px-4 py-2 text-xs font-black text-cyan-300 bg-slate-900/50">
                    JUMP TO ROUND:
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
                      <span className="text-sm flex-1">{chart.title}</span>
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
        <NavigationMenu currentRound={round} onNavigate={handleNavigate} screen={screen} />
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8 flex items-center justify-center">
          <div className="max-w-4xl w-full text-center">
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300 mb-8 animate-slideDown">
              Data Persuasion Challenge
            </h1>
            <p className="text-gray-200 text-xl mb-12 animate-slideDown" style={{ animationDelay: '0.1s' }}>
              🎤 Use data • 👂 Evaluate • 🏆 Win!
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <button
                onClick={() => { setMode('1v1'); setScreen('setup'); }}
                className="p-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl hover:scale-105 transition-all shadow-2xl animate-slideUp"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="text-7xl mb-4">🎯</div>
                <div className="text-4xl font-black text-white">1v1</div>
                <div className="text-white text-lg">One per team</div>
              </button>
              <button
                onClick={() => { setMode('2v2'); setScreen('setup'); }}
                className="p-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl hover:scale-105 transition-all shadow-2xl animate-slideUp"
                style={{ animationDelay: '0.3s' }}
              >
                <div className="text-7xl mb-4">👥</div>
                <div className="text-4xl font-black text-white">2v2</div>
                <div className="text-white text-lg">Two per team</div>
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
        <NavigationMenu currentRound={round} onNavigate={handleNavigate} screen={screen} />
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300 mb-8">
              Setup Teams
            </h1>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-xl border-2 border-cyan-400/50 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-cyan-300 mb-6">Team A</h2>
                <input
                  type="text"
                  placeholder="Player 1"
                  value={teamA.p1}
                  onChange={(e) => setTeamA({...teamA, p1: e.target.value})}
                  className="w-full mb-4 px-5 py-3 bg-white/20 border-2 border-cyan-400/50 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-cyan-300 text-lg transition-all"
                />
                {mode === '2v2' && (
                  <input
                    type="text"
                    placeholder="Player 2"
                    value={teamA.p2}
                    onChange={(e) => setTeamA({...teamA, p2: e.target.value})}
                    className="w-full px-5 py-3 bg-white/20 border-2 border-cyan-400/50 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-cyan-300 text-lg transition-all"
                  />
                )}
              </div>
              <div className="bg-white/10 backdrop-blur-xl border-2 border-pink-400/50 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold text-pink-300 mb-6">Team B</h2>
                <input
                  type="text"
                  placeholder="Player 1"
                  value={teamB.p1}
                  onChange={(e) => setTeamB({...teamB, p1: e.target.value})}
                  className="w-full mb-4 px-5 py-3 bg-white/20 border-2 border-pink-400/50 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-pink-300 text-lg transition-all"
                />
                {mode === '2v2' && (
                  <input
                    type="text"
                    placeholder="Player 2"
                    value={teamB.p2}
                    onChange={(e) => setTeamB({...teamB, p2: e.target.value})}
                    className="w-full px-5 py-3 bg-white/20 border-2 border-pink-400/50 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-pink-300 text-lg transition-all"
                  />
                )}
              </div>
            </div>
            <div className="bg-yellow-500/20 backdrop-blur-xl border-2 border-yellow-400/50 rounded-3xl p-8 mb-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">📋 How to Play</h3>
              <div className="space-y-2 text-white text-lg">
                <p>• 🎤 Take turns presenting arguments</p>
                <p>• ⏱️ 2 minutes to prepare</p>
                <p>• 📢 Argue OUT LOUD using data</p>
                <p>• 👂 Other team scores 1-4</p>
                <p>• 💡 Hints cost 25%</p>
                <p>• 🏆 10 rounds total</p>
              </div>
            </div>
            <button
              onClick={startGame}
              disabled={mode === '1v1' ? (!teamA.p1 || !teamB.p1) : (!teamA.p1 || !teamA.p2 || !teamB.p1 || !teamB.p2)}
              className="w-full py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-black text-2xl rounded-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
            >
              Start Game! →
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
        <NavigationMenu currentRound={round} onNavigate={handleNavigate} screen={screen} />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6">
          <div className="max-w-[1800px] mx-auto">

            {/* Top Bar */}
            <div className="bg-slate-800/70 backdrop-blur rounded-2xl p-4 md:p-6 mb-4 md:mb-6 flex justify-between items-center shadow-2xl">
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-400">Team A</div>
                <div className={`text-3xl md:text-4xl font-black ${turn === 'A' ? 'text-cyan-400' : 'text-white'}`}>
                  {teamA.score}
                </div>
              </div>
              <div className="text-center">
                <div className={`text-5xl md:text-7xl font-black ${timerClass} transition-colors`}>
                  {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-base md:text-lg text-gray-300 font-bold">Round {round + 1}/10</div>
                {timer <= 30 && timer > 0 && (
                  <div className="text-sm text-orange-300 font-bold mt-1 animate-pulse">
                    ⚠️ Time running out!
                  </div>
                )}
              </div>
              <div className="text-center">
                <div className="text-xs md:text-sm text-gray-400">Team B</div>
                <div className={`text-3xl md:text-4xl font-black ${turn === 'B' ? 'text-pink-400' : 'text-white'}`}>
                  {teamB.score}
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-xl border-3 border-yellow-400 rounded-3xl p-6 md:p-8 mb-4 md:mb-6 shadow-2xl">
              <div className="text-center">
                <div className="text-4xl md:text-5xl mb-4">🎯</div>
                <h2 className="text-2xl md:text-3xl font-black text-yellow-200 mb-3 md:mb-4">{chart.question}</h2>
                <p className="text-xl md:text-2xl text-yellow-100 font-bold">{chart.prompt}</p>
              </div>
            </div>

            {/* Roles */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              <div className={`${turn === 'A' ? 'bg-cyan-600/40 border-cyan-400' : 'bg-cyan-900/20 border-cyan-600'} border-3 rounded-2xl p-4 md:p-6 backdrop-blur shadow-xl transition-all`}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl mb-3">🎤</div>
                  <div className="text-xl md:text-2xl font-black text-cyan-200">PRESENTER{mode === '2v2' ? 'S' : ''}</div>
                  <div className="text-lg md:text-xl text-white font-bold">Team {turn}</div>
                  <div className="text-base md:text-lg text-cyan-100">
                    {mode === '1v1' ? presenting.p1 : `${presenting.p1} & ${presenting.p2}`}
                  </div>
                </div>
              </div>
              <div className={`${turn === 'B' ? 'bg-pink-600/40 border-pink-400' : 'bg-pink-900/20 border-pink-600'} border-3 rounded-2xl p-4 md:p-6 backdrop-blur shadow-xl transition-all`}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl mb-3">👂</div>
                  <div className="text-xl md:text-2xl font-black text-pink-200">LISTENER{mode === '2v2' ? 'S' : ''}</div>
                  <div className="text-lg md:text-xl text-white font-bold">Team {turn === 'A' ? 'B' : 'A'}</div>
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
                    <BarChart data={chart.data} title={chart.title} xLabel={chart.xLabel} yLabel={chart.yLabel} />
                  ) : (
                    <LineChart data={chart.data} title={chart.title} xLabel={chart.xLabel} yLabel={chart.yLabel} />
                  )}
                  <button
                    onClick={() => { setHint(true); setShowHint(true); }}
                    disabled={hint}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 border-2 border-orange-300 rounded-xl text-white font-bold text-base md:text-lg hover:scale-105 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
                  >
                    {hint ? '💡 Hint Used (-25%)' : '💡 Need a Hint?'}
                  </button>
                  {showHint && (
                    <div className="mt-4 bg-orange-600/50 border-2 border-orange-300 rounded-xl p-4 animate-slideDown shadow-lg">
                      <div className="text-orange-200 text-sm font-bold mb-2">💡 HINT:</div>
                      <div className="text-white text-base">{chart.hint}</div>
                    </div>
                  )}
                </div>

                <div className="bg-blue-900/50 backdrop-blur-xl border-2 border-blue-400 rounded-2xl p-4 md:p-6 shadow-2xl">
                  <div className="text-center text-blue-200 font-black text-lg md:text-xl mb-2">📝 PRESENTERS: Use in Order</div>
                  <div className="text-center text-blue-100 text-sm mb-4 font-bold">Say all 3 sentences OUT LOUD ⬇️</div>
                  <div className="space-y-3">
                    {chart.starters.map((s, i) => (
                      <div key={i} className="bg-slate-800/80 rounded-xl p-3 text-white text-sm md:text-base leading-relaxed flex gap-3">
                        <div className="text-2xl font-black text-cyan-300 flex-shrink-0">{i + 1}.</div>
                        <div className="flex-1">{s}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-900/50 backdrop-blur-xl border-2 border-purple-400 rounded-2xl p-4 md:p-6 shadow-2xl">
                  <div className="text-center text-purple-200 font-black text-lg md:text-xl mb-4">📚 WORD BANK</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {chart.words.map((w, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-purple-600/50 rounded-lg text-white text-sm font-bold border border-purple-400/50 shadow-md"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT - Evaluator */}
              <div className="space-y-4 md:space-y-6">
                <div className="bg-slate-800/70 backdrop-blur-xl border-2 border-pink-400/50 rounded-2xl p-4 md:p-6 shadow-2xl">
                  {chart.type === 'bar' ? (
                    <BarChart data={chart.data} title={chart.title} xLabel={chart.xLabel} yLabel={chart.yLabel} />
                  ) : (
                    <LineChart data={chart.data} title={chart.title} xLabel={chart.xLabel} yLabel={chart.yLabel} />
                  )}
                </div>

                <div className="bg-indigo-900/50 backdrop-blur-xl border-2 border-purple-400 rounded-2xl p-4 md:p-6 shadow-2xl">
                  <div className="text-center text-purple-200 font-black text-lg md:text-xl mb-4">✅ LISTENERS: Check For</div>
                  <div className="space-y-3">
                    {chart.checks.map((c, i) => (
                      <div key={i} className="flex items-start gap-3 bg-slate-800/80 rounded-xl p-3">
                        <div className="text-xl md:text-2xl">☑️</div>
                        <div className="text-white text-sm md:text-base flex-1 leading-relaxed">{c}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-pink-900/50 backdrop-blur-xl border-2 border-pink-400 rounded-2xl p-4 md:p-6 shadow-2xl">
                  <div className="text-center text-pink-200 font-black text-lg md:text-xl mb-5">🎯 Score Argument</div>
                  <div className="grid grid-cols-4 gap-2 md:gap-3 mb-5">
                    <button
                      onClick={() => score(4)}
                      className="p-3 md:p-4 bg-gradient-to-br from-emerald-600 to-green-600 border-3 border-emerald-300 rounded-xl hover:scale-110 transition-all shadow-lg"
                    >
                      <div className="text-3xl md:text-4xl mb-2">🌟</div>
                      <div className="text-2xl md:text-3xl font-black text-emerald-100">4</div>
                      <div className="text-xs text-emerald-200 font-bold">Great</div>
                    </button>
                    <button
                      onClick={() => score(3)}
                      className="p-3 md:p-4 bg-gradient-to-br from-green-600 to-lime-600 border-3 border-green-300 rounded-xl hover:scale-110 transition-all shadow-lg"
                    >
                      <div className="text-3xl md:text-4xl mb-2">✅</div>
                      <div className="text-2xl md:text-3xl font-black text-green-100">3</div>
                      <div className="text-xs text-green-200 font-bold">Good</div>
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
                      <div className="text-xs text-orange-200 font-bold">Retry</div>
                    </button>
                  </div>
                  <div className="space-y-2 text-xs md:text-sm text-white/90 bg-slate-900/50 rounded-xl p-4">
                    <div>🌟 4 = Clear + evidence + why</div>
                    <div>✅ 3 = Claim + data + some explanation</div>
                    <div>👍 2 = Has claim OR data</div>
                    <div>💭 1 = Unclear or no data</div>
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
        <NavigationMenu currentRound={round} onNavigate={handleNavigate} screen={screen} />
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8 flex items-center justify-center">
          <div className="max-w-3xl w-full">
            <div className="bg-white/10 backdrop-blur-xl border-2 border-yellow-400/50 rounded-3xl p-10 text-center shadow-2xl">
              <div className="text-7xl mb-6 animate-bounce">🏆</div>
              <h2 className="text-5xl font-black text-white mb-6">Round Complete!</h2>
              {hint && <div className="text-orange-300 mb-6 text-2xl font-bold">💡 Hint penalty (-25%)</div>}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className={`${turn === 'A' ? 'bg-cyan-600/50 border-cyan-300' : 'bg-cyan-900/30 border-cyan-500'} border-3 rounded-2xl p-6 backdrop-blur transition-all`}>
                  <div className="text-sm text-gray-300 font-bold mb-2">Team A</div>
                  <div className="text-5xl font-black text-white">{teamA.score}</div>
                </div>
                <div className={`${turn === 'B' ? 'bg-pink-600/50 border-pink-300' : 'bg-pink-900/30 border-pink-500'} border-3 rounded-2xl p-6 backdrop-blur transition-all`}>
                  <div className="text-sm text-gray-300 font-bold mb-2">Team B</div>
                  <div className="text-5xl font-black text-white">{teamB.score}</div>
                </div>
              </div>
              <button
                onClick={next}
                className="w-full py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-black text-2xl rounded-2xl hover:scale-105 transition-all shadow-2xl"
              >
                Next Round →
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
        <NavigationMenu currentRound={round} onNavigate={handleNavigate} screen={screen} />
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8 flex items-center justify-center">
          <div className="max-w-3xl w-full">
            <div className="bg-white/10 backdrop-blur-xl border-2 border-yellow-400/50 rounded-3xl p-10 text-center shadow-2xl">
              <div className="text-8xl mb-6 animate-bounce">🏆</div>
              <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 mb-6">
                Game Over!
              </h2>
              {winner === 'TIE' ? (
                <div className="text-3xl text-white mb-8 font-bold">🤝 It's a tie!</div>
              ) : (
                <>
                  <div className="text-4xl text-white mb-3 font-black">🎉 Team {winner} Wins!</div>
                  <div className="text-2xl text-gray-200 mb-8 font-bold">
                    {mode === '1v1' ? winning.p1 : `${winning.p1} & ${winning.p2}`} 🌟
                  </div>
                </>
              )}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-cyan-900/40 border-3 border-cyan-400 rounded-2xl p-8 backdrop-blur">
                  <div className="text-sm text-gray-300 font-bold mb-2">Team A</div>
                  <div className="text-6xl font-black text-white">{teamA.score}</div>
                </div>
                <div className="bg-pink-900/40 border-3 border-pink-400 rounded-2xl p-8 backdrop-blur">
                  <div className="text-sm text-gray-300 font-bold mb-2">Team B</div>
                  <div className="text-6xl font-black text-white">{teamB.score}</div>
                </div>
              </div>
              <button
                onClick={reset}
                className="w-full py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-black text-2xl rounded-2xl hover:scale-105 transition-all shadow-2xl"
              >
                🔄 Play Again
              </button>
            </div>
          </div>
        </div>
      </ScreenWrapper>
    );
  }
}
