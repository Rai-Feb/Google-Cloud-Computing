const express = require('express');
const app = express();
const path = require('path');
const os = require('os');

// Ganti ke port 3000 biar lebih aman dari permission error di Windows
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- DATABASE SEMENTARA ---
let users = [
    { username: 'admin', password: '123' }
];

// --- API LOGIN ---
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const userFound = users.find(u => u.username === username && u.password === password);
    if (userFound) {
        res.json({ success: true, message: "Login Berhasil!" });
    } else {
        res.status(401).json({ success: false, message: "Username/Password salah!" });
    }
});

// --- API REGISTER ---
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ success: false, message: "Isi semua data!" });
    
    const existingUser = users.find(u => u.username === username);
    if (existingUser) return res.status(400).json({ success: false, message: "Username sudah ada!" });

    users.push({ username, password });
    console.log(`User Baru: ${username}`);
    res.json({ success: true, message: "Akun dibuat!" });
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server berjalan di: http://localhost:${PORT}`);
});