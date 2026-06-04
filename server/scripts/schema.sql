-- ============================================================
-- F&V Legal Solutions — MySQL Schema
-- Database: fv_legal_db
-- Run this in MySQL Workbench to create/update all tables
-- ============================================================

USE fv_legal_db;

-- ─── CONSULTATIONS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS consultations (
    id               INT AUTO_INCREMENT PRIMARY KEY,
    name             VARCHAR(200)   NOT NULL,
    email            VARCHAR(200)   NOT NULL,
    phone            VARCHAR(20)    DEFAULT NULL,
    practice_area    VARCHAR(100)   NOT NULL DEFAULT 'Corporate Law',
    consultation_mode ENUM('online','in-person') NOT NULL DEFAULT 'online',
    description      TEXT           NOT NULL,
    status           ENUM('pending','confirmed','completed','cancelled') DEFAULT 'pending',
    payment_status   ENUM('unpaid','paid','failed','refunded')          DEFAULT 'unpaid',
    amount           INT            DEFAULT 250000,   -- ₹2,500 in paise
    razorpay_order_id   VARCHAR(100) DEFAULT NULL,
    razorpay_payment_id VARCHAR(100) DEFAULT NULL,
    created_at       DATETIME       NOT NULL,
    updated_at       DATETIME       NOT NULL,
    INDEX idx_email (email),
    INDEX idx_payment_status (payment_status),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── CONTACTS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(200) NOT NULL,
    email      VARCHAR(200) NOT NULL,
    subject    VARCHAR(300) DEFAULT 'General Inquiry',
    message    TEXT         NOT NULL,
    `read`     TINYINT(1)   DEFAULT 0,
    created_at DATETIME     NOT NULL,
    updated_at DATETIME     NOT NULL,
    INDEX idx_email (email),
    INDEX idx_read (`read`),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── PAYMENTS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
    id                   INT AUTO_INCREMENT PRIMARY KEY,
    consultation_id      INT          NOT NULL,
    razorpay_order_id    VARCHAR(100) NOT NULL,
    razorpay_payment_id  VARCHAR(100) DEFAULT NULL,
    razorpay_signature   TEXT         DEFAULT NULL,
    amount               INT          NOT NULL,
    currency             VARCHAR(10)  DEFAULT 'INR',
    status               ENUM('created','captured','failed','refunded') DEFAULT 'created',
    created_at           DATETIME     NOT NULL,
    updated_at           DATETIME     NOT NULL,
    INDEX idx_consultation (consultation_id),
    INDEX idx_order (razorpay_order_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── VERIFY ─────────────────────────────────────────────────
SELECT 
    TABLE_NAME AS `Table`,
    TABLE_ROWS AS `Rows (approx)`,
    ROUND(DATA_LENGTH / 1024, 2) AS `Size (KB)`
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'fv_legal_db'
ORDER BY TABLE_NAME;
