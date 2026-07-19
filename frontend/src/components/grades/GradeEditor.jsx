import { getChecklistItems } from '../../utils/gradeChecklist';

export default function GradeEditor({
  student,
  year,
  grade,
  checklist,
  onChangeGrade,
  onToggleChecklist,
  onSave,
  isSaving,
}) {
  if (!student) {
    return (
      <div className="glass-card rounded-2xl p-10 text-center text-sm text-on-surface-variant h-full flex items-center justify-center">
        Pilih murid di sebelah kiri untuk mengisi nilai.
      </div>
    );
  }

  const items = getChecklistItems(grade);

  return (
    <div className="glass-card rounded-2xl p-6 space-y-5">
      <div>
        <p className="text-xs text-on-surface-variant">Nilai Rapor Tahun {year}</p>
        <h2 className="text-lg font-bold text-on-surface">{student.name}</h2>
        <p className="text-xs text-on-surface-variant">Kelas {student.kelas}</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-on-surface-variant mb-2">Nilai</p>
        <div className="flex gap-2">
          <button
            onClick={() => onChangeGrade('A')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              grade === 'A' ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface-variant'
            }`}
          >
            Nilai A
          </button>
          <button
            onClick={() => onChangeGrade('B')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              grade === 'B' ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-low text-on-surface-variant'
            }`}
          >
            Nilai B
          </button>
        </div>
      </div>

      {grade && (
        <div>
          <p className="text-xs font-semibold text-on-surface-variant mb-2">
            Checklist Nilai {grade} <span className="font-normal">(pilih satu atau lebih)</span>
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {items.map((item) => {
              const isChecked = checklist.includes(item);
              return (
                <label
                  key={item}
                  className={`flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl text-xs cursor-pointer transition-colors border ${
                    isChecked
                      ? 'bg-primary-container/50 border-primary/40 text-on-primary-container font-medium'
                      : 'bg-surface-container-low border-transparent text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleChecklist(item)}
                    className="mt-0.5 w-3.5 h-3.5 rounded accent-primary shrink-0"
                  />
                  <span>{item}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <button onClick={onSave} disabled={!grade || isSaving} className="btn-primary w-full disabled:opacity-60">
        {isSaving ? 'Menyimpan...' : 'Simpan Nilai'}
      </button>
    </div>
  );
}