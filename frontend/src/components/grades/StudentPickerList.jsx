import { Search } from 'lucide-react';

export default function StudentPickerList({
  students,
  search,
  onSearchChange,
  selectedStudentId,
  onSelectStudent,
  gradedStudentIds,
}) {
  return (
    <div className="glass-card rounded-2xl p-4 h-full flex flex-col">
      <div className="relative mb-3">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
        <input
          type="text"
          placeholder="Cari murid..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-base pl-10 text-xs"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 -mx-1 px-1">
        {students.length === 0 ? (
          <p className="text-xs text-on-surface-variant text-center py-6">Tidak ada murid ditemukan.</p>
        ) : (
          students.map((student) => {
            const isSelected = student.id === selectedStudentId;
            const isGraded = gradedStudentIds.includes(student.id);
            return (
              <button
                key={student.id}
                onClick={() => onSelectStudent(student.id)}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left transition-colors ${
                  isSelected ? 'bg-primary-container text-on-primary-container' : 'hover:bg-primary/5 text-on-surface'
                }`}
              >
                <span className="min-w-0">
                  <span className="block text-xs font-semibold truncate">{student.name}</span>
                  <span className="block text-[10px] opacity-70">Kelas {student.kelas}</span>
                </span>
                {isGraded && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}