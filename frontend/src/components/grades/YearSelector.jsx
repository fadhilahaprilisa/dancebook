import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function YearSelector({ years, selectedYear, onSelectYear, onAddYear }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newYear, setNewYear] = useState(String(new Date().getFullYear()));

  const handleAdd = () => {
    const yearNum = Number(newYear);
    if (yearNum && !years.includes(yearNum)) {
      onAddYear(yearNum);
    }
    setShowAdd(false);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onSelectYear(year)}
          className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
            selectedYear === year
              ? 'bg-primary text-on-primary shadow-sm'
              : 'bg-surface-container-low text-on-surface-variant hover:text-primary'
          }`}
        >
          {year}
        </button>
      ))}

      {showAdd ? (
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
            className="w-20 input-base py-1.5 text-xs"
          />
          <button onClick={handleAdd} className="text-xs font-bold text-primary px-2">
            OK
          </button>
          <button onClick={() => setShowAdd(false)} className="text-xs text-on-surface-variant px-1">
            Batal
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="w-8 h-8 rounded-full bg-primary-container/60 text-primary flex items-center justify-center hover:bg-primary-container transition-colors"
          aria-label="Tambah tahun"
        >
          <Plus className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}