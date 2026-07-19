export const CHECKLIST_A = [
  'Sangat luwes',
  'Hafal gerakan',
  'Sangat ekspresif',
  'Tepat tempo',
  'Sangat kompak',
  'Penuh percaya diri',
  'Sangat fokus',
  'Gerakan tegas',
  'Penjiwaan hebat',
  'Sangat ritmis',
];

export const CHECKLIST_B = [
  'Agak kaku (namun gerakan benar)',
  'Kadang lupa (namun bisa mengikuti)',
  'Kurang ekspresif (namun gerakan hafal)',
  'Kadang tertinggal (namun cepat menyesuaikan)',
  'Kurang kompak (namun sudah berusaha)',
  'Agak pemalu (namun tampil baik)',
  'Kurang fokus (namun hasil lumayan)',
  'Gerakan lembut (kebalikan dari tegas)',
  'Belum menjiwai (namun teknik aman)',
  'Kurang ritmis (namun tempo masuk)',
];

export function getChecklistItems(grade) {
  return grade === 'A' ? CHECKLIST_A : CHECKLIST_B;
}