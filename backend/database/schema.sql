CREATE DATABASE IF NOT EXISTS dancebook
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE dancebook;

CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE students (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  kelas VARCHAR(10) NOT NULL COMMENT 'Format bebas, contoh: 1, 1A, 4B',
  status ENUM('aktif', 'lulus', 'keluar') NOT NULL DEFAULT 'aktif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_students_kelas (kelas),
  INDEX idx_students_status (status),
  INDEX idx_students_name (name)
) ENGINE=InnoDB;

CREATE TABLE attendances (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id INT UNSIGNED NOT NULL,
  date DATE NOT NULL,
  status ENUM('hadir', 'izin', 'sakit', 'alfa') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_attendances_student
    FOREIGN KEY (student_id) REFERENCES students(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY uq_attendance_student_date (student_id, date),
  INDEX idx_attendances_date (date)
) ENGINE=InnoDB;

CREATE TABLE grades (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  student_id INT UNSIGNED NOT NULL,
  year YEAR NOT NULL,
  grade ENUM('A', 'B') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_grades_student
    FOREIGN KEY (student_id) REFERENCES students(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY uq_grade_student_year (student_id, year),
  INDEX idx_grades_year (year)
) ENGINE=InnoDB;

CREATE TABLE grade_checklist_master (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  grade_type ENUM('A', 'B') NOT NULL,
  label VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_checklist_master_type (grade_type)
) ENGINE=InnoDB;

CREATE TABLE grade_checklist_selections (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  grade_id INT UNSIGNED NOT NULL,
  checklist_item_id INT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_selection_grade
    FOREIGN KEY (grade_id) REFERENCES grades(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_selection_checklist_item
    FOREIGN KEY (checklist_item_id) REFERENCES grade_checklist_master(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY uq_grade_checklist (grade_id, checklist_item_id)
) ENGINE=InnoDB;

CREATE TABLE documentations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT NULL,
  activity_date DATE NOT NULL,
  media_url VARCHAR(500) NOT NULL,
  media_type ENUM('foto', 'video') NOT NULL,
  cloudinary_public_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_documentations_date (activity_date),
  INDEX idx_documentations_type (media_type)
) ENGINE=InnoDB;

CREATE TABLE agendas (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  activity_type ENUM(
    'Latihan Rutin', 'Gladi Bersih', 'Pentas Sekolah',
    'FLS3N', 'Perpisahan', 'Lomba', 'Lainnya'
  ) NOT NULL,
  date DATE NOT NULL,
  start_time TIME NULL,
  end_time TIME NULL,
  location VARCHAR(200) NULL,
  description TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_agendas_date (date),
  INDEX idx_agendas_type (activity_type)
) ENGINE=InnoDB;

CREATE TABLE backups (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  file_name VARCHAR(255) NOT NULL,
  file_size BIGINT UNSIGNED NOT NULL COMMENT 'ukuran dalam bytes',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO grade_checklist_master (grade_type, label) VALUES
('A', 'Sangat luwes'),
('A', 'Hafal gerakan'),
('A', 'Sangat ekspresif'),
('A', 'Tepat tempo'),
('A', 'Sangat kompak'),
('A', 'Penuh percaya diri'),
('A', 'Sangat fokus'),
('A', 'Gerakan tegas'),
('A', 'Penjiwaan hebat'),
('A', 'Sangat ritmis'),
('B', 'Agak kaku (namun gerakan benar)'),
('B', 'Kadang lupa (namun bisa mengikuti)'),
('B', 'Kurang ekspresif (namun gerakan hafal)'),
('B', 'Kadang tertinggal (namun cepat menyesuaikan)'),
('B', 'Kurang kompak (namun sudah berusaha)'),
('B', 'Agak pemalu (namun tampil baik)'),
('B', 'Kurang fokus (namun hasil lumayan)'),
('B', 'Gerakan lembut (kebalikan dari tegas)'),
('B', 'Belum menjiwai (namun teknik aman)'),
('B', 'Kurang ritmis (namun tempo masuk)');
