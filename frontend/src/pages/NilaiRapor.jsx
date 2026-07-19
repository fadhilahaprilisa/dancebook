import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import YearSelector from '../components/grades/YearSelector';
import StudentPickerList from '../components/grades/StudentPickerList';
import GradeEditor from '../components/grades/GradeEditor';
import GradeHistoryList from '../components/grades/GradeHistoryList';
import { getStudents } from '../services/studentService';
import {
  getGradeYears,
  getGradesByYear,
  getStudentGradeHistory,
  saveStudentGrade,
} from '../services/gradesService';

function currentYear() {
  return new Date().getFullYear();
}

export default function NilaiRaporPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [years, setYears] = useState([currentYear()]);
  const [selectedYear, setSelectedYear] = useState(currentYear());
  const [yearGrades, setYearGrades] = useState({});
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [grade, setGrade] = useState(null);
  const [checklist, setChecklist] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoadingGrades, setIsLoadingGrades] = useState(true);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getStudents().then(setStudents);
    getGradeYears().then((existingYears) => {
      setYears((prev) => {
        const merged = Array.from(new Set([...prev, ...existingYears]));
        return merged.sort((a, b) => b - a);
      });
    });
  }, []);

  useEffect(() => {
    setIsLoadingGrades(true);
    getGradesByYear(selectedYear).then((data) => {
      setYearGrades(data);
      setIsLoadingGrades(false);
    });
  }, [selectedYear]);

  useEffect(() => {
    if (!selectedStudentId) {
      setGrade(null);
      setChecklist([]);
      setHistory([]);
      return;
    }
    const existing = yearGrades[selectedStudentId];
    setGrade(existing?.grade || null);
    setChecklist(existing?.checklist || []);

    setIsLoadingHistory(true);
    getStudentGradeHistory(selectedStudentId).then((data) => {
      setHistory(data);
      setIsLoadingHistory(false);
    });
  }, [selectedStudentId, yearGrades]);

  const filteredStudents = useMemo(
    () => students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase())),
    [students, search]
  );

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || null;
  const gradedStudentIds = Object.keys(yearGrades);

  const handleAddYear = (year) => {
    setYears((prev) => Array.from(new Set([...prev, year])).sort((a, b) => b - a));
    setSelectedYear(year);
  };

  const handleChangeGrade = (newGrade) => {
    setGrade(newGrade);
    setChecklist([]); // checklist tidak otomatis tercentang saat ganti nilai
  };

  const handleToggleChecklist = (item) => {
    setChecklist((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  const handleSave = async () => {
    if (!selectedStudentId || !grade) return;
    setIsSaving(true);
    await saveStudentGrade(selectedYear, selectedStudentId, { grade, checklist });
    const updatedYearGrades = await getGradesByYear(selectedYear);
    setYearGrades(updatedYearGrades);
    const updatedHistory = await getStudentGradeHistory(selectedStudentId);
    setHistory(updatedHistory);
    setIsSaving(false);
    Swal.fire({
      icon: 'success',
      title: 'Nilai Tersimpan',
      text: `${selectedStudent?.name} — Tahun ${selectedYear}`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary tracking-tight">Nilai Rapor</h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Pilih tahun, pilih murid, lalu isi nilai dan checklist penilaian.
        </p>
      </div>

      <YearSelector years={years} selectedYear={selectedYear} onSelectYear={setSelectedYear} onAddYear={handleAddYear} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 h-[420px] lg:h-auto">
          <StudentPickerList
            students={filteredStudents}
            search={search}
            onSearchChange={setSearch}
            selectedStudentId={selectedStudentId}
            onSelectStudent={setSelectedStudentId}
            gradedStudentIds={gradedStudentIds}
          />
        </div>

        <div className="lg:col-span-8 space-y-6">
          {isLoadingGrades ? (
            <div className="h-64 bg-surface-container-highest rounded-2xl animate-pulse" />
          ) : (
            <GradeEditor
              student={selectedStudent}
              year={selectedYear}
              grade={grade}
              checklist={checklist}
              onChangeGrade={handleChangeGrade}
              onToggleChecklist={handleToggleChecklist}
              onSave={handleSave}
              isSaving={isSaving}
            />
          )}

          <GradeHistoryList student={selectedStudent} history={history} isLoading={isLoadingHistory} />
        </div>
      </div>
    </div>
  );
}