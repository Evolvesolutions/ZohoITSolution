const techs = [
  { icon: '⚛️', name: 'React' },
  { icon: '🟢', name: 'Node.js' },
  { icon: '🐍', name: 'Python' },
  { icon: '☕', name: 'Java' },
  { icon: '🔷', name: 'TypeScript' },
  { icon: '☁️', name: 'AWS' },
  { icon: '🐳', name: 'Docker' },
  { icon: '🤖', name: 'TensorFlow' },
  { icon: '📱', name: 'React Native' },
  { icon: '🔥', name: 'Firebase' },
  { icon: '🗄️', name: 'MongoDB' },
  { icon: '📊', name: 'Data Science' },
  { icon: '🛡️', name: 'Cyber Security' },
  { icon: '⚡', name: 'DevOps' },
];

const doubled = [...techs, ...techs]; // for seamless loop

export default function Marquee() {
  return (
    <div className="relative py-6 bg-white/[0.02] border-y border-white/5 overflow-hidden">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0f172a, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #0f172a, transparent)' }} />

      <div className="flex gap-10 animate-marquee" style={{ width: 'max-content' }}>
        {doubled.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 text-slate-400 font-semibold text-sm whitespace-nowrap select-none"
          >
            <span className="text-xl">{t.icon}</span>
            <span>{t.name}</span>
            <span className="ml-3 text-slate-700">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
