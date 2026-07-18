import { useState } from 'react';
import { MoreVertical, Pencil, Trash2, GraduationCap, LogOut, RotateCcw } from 'lucide-react';

const STATUS_LABEL = {
  aktif: 'Aktif',
  lulus: 'Lulus',
  keluar: 'Keluar',
};

const STATUS_STYLE = {
  aktif: 'bg-secondary-container/60 text-on-secondary-container',
  lulus: 'bg-primary-container text-on-primary-container',
  keluar: 'bg-surface-container-highest text-on-surface-variant',
};

export default function StudentRow({ student, activeTab, onEdit, onDelete, onChangeStatus }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-primary/5 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-xs font-bold shrink-0">
          {student.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-on-surface truncate">{student.name}</p>
          <span
            className={`inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[student.status]}`}
          >
            {STATUS_LABEL[student.status]}
          </span>
        </div>
      </div>

      <div className="relative shrink-0">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-2 rounded-full hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Menu aksi"
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-10 w-52 bg-white rounded-xl shadow-xl border border-surface-container-highest py-1.5 z-20">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(student);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-on-surface hover:bg-primary/5"
              >
                <Pencil className="w-3.5 h-3.5" /> Edit Data
              </button>

              {activeTab === 'aktif' ? (
                <>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onChangeStatus(student, 'lulus');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-on-surface hover:bg-primary/5"
                  >
                    <GraduationCap className="w-3.5 h-3.5" /> Tandai Lulus
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onChangeStatus(student, 'keluar');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-on-surface hover:bg-primary/5"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Tandai Keluar
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onChangeStatus(student, 'aktif');
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-on-surface hover:bg-primary/5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Aktifkan Kembali
                </button>
              )}

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(student);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-error hover:bg-error-container/40"
              >
                <Trash2 className="w-3.5 h-3.5" /> Hapus
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}