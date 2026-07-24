const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');
const backupModel = require('../models/backupModel');
const ApiError = require('../utils/ApiError');

const BACKUP_DIR = path.join(__dirname, '..', '..', 'uploads', 'backups');
const TABLES = [
  'users', 'students', 'attendances', 'grades',
  'grade_checklist_master', 'grade_checklist_selections',
  'documentations', 'agendas',
];

function escapeSQLValue(value) {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'number') return value;
  if (value instanceof Date) return `'${value.toISOString().slice(0, 19).replace('T', ' ')}'`;
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "''")}'`;
}

async function generateDumpContent() {
  let content = `-- DanceBook Database Backup\n-- Dibuat otomatis: ${new Date().toISOString()}\n\n`;
  content += 'SET FOREIGN_KEY_CHECKS=0;\n\n';

  for (const table of TABLES) {
    const [rows] = await pool.query(`SELECT * FROM \`${table}\``);
    content += `-- Data untuk tabel \`${table}\`\n`;
    if (rows.length === 0) {
      content += `-- (kosong)\n\n`;
      continue;
    }
    const columns = Object.keys(rows[0]);
    rows.forEach((row) => {
      const values = columns.map((col) => escapeSQLValue(row[col])).join(', ');
      content += `INSERT INTO \`${table}\` (${columns.map((c) => `\`${c}\``).join(', ')}) VALUES (${values});\n`;
    });
    content += '\n';
  }

  content += 'SET FOREIGN_KEY_CHECKS=1;\n';
  return content;
}

async function createBackup() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  const dumpContent = await generateDumpContent();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `dancebook_backup_${timestamp}.sql`;
  const filePath = path.join(BACKUP_DIR, fileName);

  fs.writeFileSync(filePath, dumpContent, 'utf-8');
  const fileSize = fs.statSync(filePath).size;

  return backupModel.create({ fileName, fileSize });
}

async function getBackupHistory() {
  return backupModel.findAll();
}

async function getBackupFilePath(id) {
  const backup = await backupModel.findById(id);
  if (!backup) throw new ApiError(404, 'Backup tidak ditemukan');
  const filePath = path.join(BACKUP_DIR, backup.file_name);
  if (!fs.existsSync(filePath)) throw new ApiError(404, 'File backup tidak ditemukan di server');
  return { filePath, fileName: backup.file_name };
}

async function deleteBackup(id) {
  const backup = await backupModel.findById(id);
  if (!backup) throw new ApiError(404, 'Backup tidak ditemukan');
  const filePath = path.join(BACKUP_DIR, backup.file_name);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  await backupModel.remove(id);
}

module.exports = { createBackup, getBackupHistory, getBackupFilePath, deleteBackup };
