import StudentRow from './StudentRow';

export default function StudentClassGroup({
  kelas,
  students,
  activeTab,
  onEdit,
  onDelete,
  onChangeStatus,
}) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="px-5 py-3 bg-primary-container/50 border-b border-surface-container-highest">
        <h3 className="text-sm font-bold text-on-primary-container">
          Kelas {kelas}{' '}
          <span className="font-normal text-on-primary-container/70">
            ({students.length} murid)
          </span>
        </h3>
      </div>
      <div className="divide-y divide-surface-container-highest">
        {students.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
            activeTab={activeTab}
            onEdit={onEdit}
            onDelete={onDelete}
            onChangeStatus={onChangeStatus}
          />
        ))}
      </div>
    </div>
  );
}