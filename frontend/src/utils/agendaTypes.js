export const ACTIVITY_TYPES = [
  { value: 'Latihan Rutin', color: '#F48FB1' },
  { value: 'Gladi Bersih', color: '#F06292' },
  { value: 'Pentas Sekolah', color: '#E91E63' },
  { value: 'FLS3N', color: '#FF8A65' },
  { value: 'Perpisahan', color: '#FFB74D' },
  { value: 'Lomba', color: '#EF5350' },
  { value: 'Lainnya', color: '#BCAAA4' },
];

export function getActivityColor(type) {
  return ACTIVITY_TYPES.find((t) => t.value === type)?.color || '#BCAAA4';
}