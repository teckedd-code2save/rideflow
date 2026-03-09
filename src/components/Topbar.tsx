import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Bell } from 'lucide-react';

interface Props { title: string }

export default function Topbar({ title }: Props) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 border-b border-border bg-bg/80 backdrop-blur-sm">
      <h1 className="font-display font-bold text-lg">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-success/10 border border-success/25 rounded-full px-3 py-1 text-[11px] text-success tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          LIVE
        </div>
        <div className="text-xs text-muted tracking-wide font-mono">
          {format(time, 'HH:mm:ss')}
        </div>
        <button className="relative p-2 rounded-lg hover:bg-surface2 transition-colors text-muted hover:text-white">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent3" />
        </button>
      </div>
    </header>
  );
}
