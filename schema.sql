-- 建立用戶表
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT, 
    plan_name TEXT,
    expiry_date DATE,
    balance INTEGER DEFAULT 0
);

-- 插入測試資料
INSERT INTO users (username, password, plan_name, expiry_date) 
VALUES ('user_jack88', '123456', 'Netflix 4K 家庭團', '2026-03-16');
-- 建議增加的欄位
ALTER TABLE users ADD COLUMN last_payment_date DATE; -- 上次繳費時間
ALTER TABLE users ADD COLUMN next_billing_amount INTEGER DEFAULT 150; -- 下次續費金額
ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'active'; -- 帳號狀態 (active/expired)