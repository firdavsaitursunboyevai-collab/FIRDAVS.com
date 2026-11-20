const SUPABASE_URL = "https://supabase.com";
const SUPABASE_KEY = "sb_publishable_zpAfXMvyJgp8GEU3X7Jk1g_XRN2VS2V";

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const ADMIN_LOGIN = "admin";
const ADMIN_PASS = "admin123";

async function sbFetch(table, method = "GET", body = null, query = "") {
    if (method === "POST") {
        const { data, error } = await sb.from(table).insert([body]).select();
        if (error) throw new Error(error.message);
        return data;
    }
    if (method === "GET") {
        let q = sb.from(table).select("*");
        if (query.includes("login=eq.")) {
            const loginVal = query.split("login=eq.")[1].split("&")[0];
            q = q.eq("login", loginVal);
        }
        if (query.includes("pass=eq.")) {
            const passVal = query.split("pass=eq.")[1].split("&")[0];
            q = q.eq("pass", passVal);
        }
        if (query.includes("order=id.desc")) {
            q = q.order("id", { ascending: false });
        }
        const { data, error } = await q;
        if (error) throw new Error(error.message);
        return data;
    }
    if (method === "PATCH") {
        const idVal = query.split("id=eq.")[1];
        const { data, error } = await sb.from(table).update(body).eq("id", idVal);
        if (error) throw new Error(error.message);
        return data;
    }
}

function checkAuthSession() {
    const currentUser = JSON.parse(localStorage.getItem("edu_current_user") || "null");
    if (currentUser) {
        document.getElementById("auth-screen").classList.add("hidden");
        document.getElementById("app-screen").classList.remove("hidden");
        document.getElementById("uname").innerText = currentUser.name + (currentUser.isAdmin ? " (Admin)" : "");

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

async function handleAuth(e) {
    e.preventDefault();
    const btn = document.getElementById("auth-submit-btn");
    const login = document.getElementById("auth-login").value.trim().toLowerCase();
    const pass = document.getElementById("auth-pass").value.trim();
    const name = document.getElementById("auth-name").value.trim();

    if (!login || !pass) return alert("Login va parolni kiriting!");

    if (!isRegisterMode && login === ADMIN_LOGIN && pass === ADMIN_PASS) {
        localStorage.setItem("edu_current_user", JSON.stringify({ name: "Administrator", login: "admin", isAdmin: true }));
        checkAuthSession();
        return;
    }

    btn.disabled = true;
    btn.innerText = "Kutilmoqda...";

    try {
        if (isRegisterMode) {
            if (!name) { btn.disabled = false; btn.innerText = "Ro'yxatdan o'tish"; return alert("Ismingizni kiriting!"); }
            const existing = await sbFetch("users", "GET", null, `?login=eq.${login}`);
            if (login === ADMIN_LOGIN || (Array.isArray(existing) && existing.length > 0)) {
                btn.disabled = false; btn.innerText = "Ro'yxatdan o'tish";
                return alert("Bu login band! Boshqa login tanlang.");
            }
            const newUser = {
                name: name,
                login: login,
                pass: pass,
                visits: 1,
                joined: new Date().toLocaleString("uz-UZ", { dateStyle: "short", timeStyle: "short" })
            };
            await sbFetch("users", "POST", newUser);
            localStorage.setItem("edu_current_user", JSON.stringify({ name: newUser.name, login: newUser.login, isAdmin: false }));
            checkAuthSession();
        } else {
            const users = await sbFetch("users", "GET", null, `?login=eq.${login}&pass=eq.${pass}`);
            if (!Array.isArray(users) || users.length === 0) {
                btn.disabled = false; btn.innerText = "Kirish";
                return alert("Login yoki parol noto'g'ri!");
            }
            const found = users[0];
            await sbFetch("users", "PATCH", { visits: (found.visits || 1) + 1 }, `?id=eq.${found.id}`);
            localStorage.setItem("edu_current_user", JSON.stringify({ name: found.name, login: found.login, isAdmin: false }));
            checkAuthSession();
        }
    } catch (err) {
        alert("Xatolik: " + err.message);
    }
    btn.disabled = false;
    btn.innerText = isRegisterMode ? "Ro'yxatdan o'tish" : "Kirish";
}

function logoutUser() {
    if (confirm("Akkauntdan chiqmoqchimisiz?")) {
        localStorage.removeItem("edu_current_user");
        checkAuthSession();
    }
}

async function loadAdminPanel() {
    try {
        const users = await sbFetch("users", "GET", null, "?order=id.desc");
        const allResults = await sbFetch("results", "GET", null, "?order=id.desc");

        document.getElementById("adm-total-users").innerText = users.length;
        const totalVisits = users.reduce((sum, u) => sum + (u.visits || 1), 0);
        document.getElementById("adm-total-visits").innerText = totalVisits;
        document.getElementById("adm-total-tests").innerText = allResults.length;

        document.getElementById("adm-users-body").innerHTML = users.length
            ? users.map((u, i) => `
                <tr>
                    <td>${i + 1}</td>
                    <td><b>${u.name}</b></td>
                    <td><code>${u.login}</code></td>
                    <td>${u.visits || 1} marta</td>
                    <td>${u.joined}</td>
                </tr>`).join("")
            : '<tr><td colspan="5" style="text-align:center">Hozircha o\'quvchilar yo\'q</td></tr>';

        document.getElementById("adm-results-body").innerHTML = allResults.length
            ? allResults.map(r => `
                <tr>
                    <td><b>${r.name}</b> <small style="color:#64748b">(@${r.login})</small></td>
                    <td>${r.cat}</td>
                    <td><b>${r.score}</b></td>
                    <td><span style="color:${r.pct >= 70 ? '#10b981' : '#ef4444'};font-weight:700">${r.pct}%</span></td>
                    <td>${r.date}</td>
                </tr>`).join("")
            : '<tr><td colspan="5" style="text-align:center">Hozircha test natijalari yo\'q</td></tr>';
    } catch (e) {
        alert("Admin xatosi: " + e.message);
    }
}
