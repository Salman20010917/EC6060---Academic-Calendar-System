-- ============================================================
-- Department Calendar System — MySQL Schema
-- Database: department_calendar
-- ============================================================

CREATE DATABASE IF NOT EXISTS department_calendar;
USE department_calendar;

-- ============================================================
-- 1. USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  first_name    VARCHAR(100)  DEFAULT NULL,
  last_name     VARCHAR(100)  DEFAULT NULL,
  email         VARCHAR(150)  NOT NULL UNIQUE,
  password      VARCHAR(255)  DEFAULT NULL,          -- NULL until account is activated
  role          ENUM('ADMIN','HOD','LECTURER','INSTRUCTOR','TECHNICAL_OFFICER','STUDENT')
                              NOT NULL DEFAULT 'STUDENT',
  department    VARCHAR(150)  DEFAULT NULL,
  is_active     TINYINT(1)    NOT NULL DEFAULT 0,
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 2. EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
  event_id       INT AUTO_INCREMENT PRIMARY KEY,
  title          VARCHAR(255)  NOT NULL,
  description    TEXT          DEFAULT NULL,
  event_type     VARCHAR(100)  DEFAULT NULL,
  start_datetime DATETIME      NOT NULL,
  end_datetime   DATETIME      NOT NULL,
  location       VARCHAR(255)  DEFAULT NULL,
  status         ENUM('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  created_by     INT           NOT NULL,
  created_at     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_events_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- 3. APPROVAL STATUS
-- ============================================================
CREATE TABLE IF NOT EXISTS approval_status (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  event_id   INT           NOT NULL UNIQUE,
  status     ENUM('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  reason     TEXT          DEFAULT NULL,
  updated_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_approval_event FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
);

-- ============================================================
-- 4. NOTIFICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  notification_id   INT AUTO_INCREMENT PRIMARY KEY,
  event_id          INT           NOT NULL,
  user_id           INT           NOT NULL,
  message           TEXT          NOT NULL,
  notification_type ENUM('APPROVAL_REQUEST','APPROVED','REJECTED') NOT NULL,
  sent_at           DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_read           TINYINT(1)    NOT NULL DEFAULT 0,
  CONSTRAINT fk_notif_event FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
  CONSTRAINT fk_notif_user  FOREIGN KEY (user_id)  REFERENCES users(id)         ON DELETE CASCADE
);

-- ============================================================
-- 5. PASSWORD RESET TOKENS
-- ============================================================
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT          NOT NULL,
  token      VARCHAR(64)  NOT NULL UNIQUE,
  expiry     DATETIME     NOT NULL,
  CONSTRAINT fk_prt_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- 6. TODO ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS todo_items (
  todo_id     INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT           NOT NULL,
  title       VARCHAR(255)  NOT NULL,
  description TEXT          DEFAULT NULL,
  due_date    DATE          DEFAULT NULL,
  is_done     TINYINT(1)    NOT NULL DEFAULT 0,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_todo_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================================
-- SEED DATA — run `node seed.js` in the backend folder instead
-- of inserting passwords here, so bcrypt hashes are correct.
-- ============================================================
