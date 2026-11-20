// ==========================================
// LOGIN, SESSION VA ADMIN STATISTIKA TIZIMI
// ==========================================
const ADMIN_LOGIN = "admin";
const ADMIN_PASS = "admin123";

function getUsers() {
    return JSON.parse(localStorage.getItem("edu_users") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("edu_users", JSON.stringify(users));
}

function getAllResults() {
    return JSON.parse(localStorage.getItem("edu_all_results") || "[]");
}

// Sahifa ochilganda foydalanuvchi avval kirganmi yo'qmi tekshirish
function checkAuthSession() {
    const currentUser = JSON.parse(localStorage.getItem("edu_current_user") || "null");
    if (currentUser) {
        document.getElementById("auth-screen").classList.add("hidden");
        document.getElementById("app-screen").classList.remove("hidden");
        document.getElementById("uname").innerText = currentUser.name + (currentUser.isAdmin ? " (Admin)" : "");

        // Agar Admin bo'lsa, Admin tugmalarini ko'rsatish
        document.querySelectorAll(".admin-only").forEach(el => {
            el.classList.toggle("hidden", !currentUser.isAdmin);
        });

        loadStats();
        if (currentUser.isAdmin) loadAdminPanel();
    } else {
        document.getElementById("auth-screen").classList.remove("hidden");
        document.getElementById("app-screen").classList.add("hidden");
    }
}

// Login va Ro'yxatdan o'tish oynasini almashtirish
let isRegisterMode = false;
function toggleAuthMode() {
    isRegisterMode = !isRegisterMode;
    document.getElementById("auth-title").innerText = isRegisterMode ? "📝 Ro'yxatdan o'tish" : "🔐 Tizimga kirish";
    document.getElementById("auth-name-group").classList.toggle("hidden", !isRegisterMode);
    document.getElementById("auth-submit-btn").innerText = isRegisterMode ? "Ro'yxatdan o'tish" : "Kirish";
    document.getElementById("auth-switch-text").innerHTML = isRegisterMode
        ? 'Akkauntingiz bormi? <b style="color:#4f46e5;cursor:pointer" onclick="toggleAuthMode()">Kirish</b>'
        : 'Akkauntingiz yo\'qmi? <b style="color:#4f46e5;cursor:pointer" onclick="toggleAuthMode()">Ro\'yxatdan o\'ting</b>';
}

// Kirish yoki Ro'yxatdan o'tish tugmasi bosilganda
function handleAuth(e) {
    e.preventDefault();
    const login = document.getElementById("auth-login").value.trim().toLowerCase();
    const pass = document.getElementById("auth-pass").value.trim();
    const name = document.getElementById("auth-name").value.trim();

    if (!login || !pass) return alert("Login va parolni kiriting!");

    // 1. ADMIN TEKSHIRUVI
    if (!isRegisterMode && login === ADMIN_LOGIN && pass === ADMIN_PASS) {
        const adminSession = { name: "Administrator", login: "admin", isAdmin: true };
        localStorage.setItem("edu_current_user", JSON.stringify(adminSession));
        checkAuthSession();
        return;
    }

    let users = getUsers();

    if (isRegisterMode) {
        if (!name) return alert("Ismingizni kiriting!");
        if (login === ADMIN_LOGIN || users.some(u => u.login === login)) {
            return alert("Bu login band! Boshqa login tanlang.");
        }
        const newUser = {
            name: name,
            login: login,
            pass: pass,
            joined: new Date().toLocaleString("uz-UZ", { dateStyle: "short", timeStyle: "short" }),
            visits: 1
        };
        users.push(newUser);
        saveUsers(users);
        localStorage.setItem("edu_current_user", JSON.stringify({ name: newUser.name, login: newUser.login, isAdmin: false }));
        checkAuthSession();
    } else {
        const found = users.find(u => u.login === login && u.pass === pass);
        if (!found) {
            return alert("Login yoki parol noto'g'ri! Yangi bo'lsangiz 'Ro'yxatdan o'ting' tugmasini bosing.");
        }
        // Kirishlar sonini oshirish
        found.visits = (found.visits || 1) + 1;
        found.lastVisit = new Date().toLocaleString("uz-UZ", { dateStyle: "short", timeStyle: "short" });
        saveUsers(users);

        localStorage.setItem("edu_current_user", JSON.stringify({ name: found.name, login: found.login, isAdmin: false }));
        checkAuthSession();
    }
}

// Tizimdan chiqish (Logout)
function logoutUser() {
    if (confirm("Akkauntdan chiqmoqchimisiz?")) {
        localStorage.removeItem("edu_current_user");
        checkAuthSession();
    }
}

// Admin Panel ma'lumotlarini yuklash
function loadAdminPanel() {
    const users = getUsers();
    const allResults = getAllResults();

    document.getElementById("adm-total-users").innerText = users.length;
    const totalVisits = users.reduce((sum, u) => sum + (u.visits || 1), 0);
    document.getElementById("adm-total-visits").innerText = totalVisits;
    document.getElementById("adm-total-tests").innerText = allResults.length;

    // Foydalanuvchilar ro'yxati
    const usersBody = document.getElementById("adm-users-body");
    usersBody.innerHTML = users.length
        ? users.map((u, i) => `
            <tr>
                <td>${i + 1}</td>
                <td><b>${u.name}</b></td>
                <td><code>${u.login}</code></td>
                <td>${u.visits || 1} marta</td>
                <td>${u.joined}</td>
            </tr>`).join("")
        : '<tr><td colspan="5" style="text-align:center">Hozircha ro\'yxatdan o\'tgan o\'quvchilar yo\'q</td></tr>';

    // Barcha odamlarning test natijalari
    const resBody = document.getElementById("adm-results-body");
    resBody.innerHTML = allResults.length
        ? allResults.map(r => `
            <tr>
                <td><b>${r.name}</b> <small style="color:#64748b">(@${r.login})</small></td>
                <td>${r.cat}</td>
                <td><b>${r.score}</b></td>
                <td><span style="color:${r.pct >= 70 ? '#10b981' : '#ef4444'};font-weight:700">${r.pct}%</span></td>
                <td>${r.date}</td>
            </tr>`).join("")
        : '<tr><td colspan="5" style="text-align:center">Hozircha hech kim test ishlamagan</td></tr>';
}
