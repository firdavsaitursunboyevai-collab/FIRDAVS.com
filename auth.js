var SUPABASE_URL = "https://" + "hpvxopflazxzfftlheim" + ".supabase.co";
var SUPABASE_KEY = "sb_publishable_zpAfXMvyJgp8GEU3X7Jk1g_XRN2VS2V";

var ADMIN_LOGIN = "admin";
var ADMIN_PASS = "admin123";

async function sbFetch(table, method = "GET", body = null, query = "") {
    var client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    if (method === "POST") {
        const { data, error } = await client.from(table).insert([body]).select();
        if (error) throw new Error(error.message);
        return data;
    }
    if (method === "GET") {
        let q = client.from(table).select("*");
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
        const { data, error } = await client.from(table).update(body).eq("id", idVal);
        if (error) throw new Error(error.message);
        return data;
    }
}

// 🟢 Har 25 soniyada foydalanuvchi saytda ONLAYN ekanligini bazaga yozib turish
let onlineHeartbeat = null;
function startOnlineTracker(login) {
    if (onlineHeartbeat) clearInterval(onlineHeartbeat);
    const ping = async () => {
        try {
            const users = await sbFetch("users", "GET", null, `?login=eq.${login}`);
            if (users && users.length > 0) {
                await sbFetch("users", "PATCH", { last_seen: Date.now() }, `?id=eq.${users[0].id}`);
            }
        } catch (e) {}
    };
    ping();
    onlineHeartbeat = setInterval(ping, 25000);
}

async function checkAuthSession() {
    let currentUser = JSON.parse(localStorage.getItem("edu_current_user") || "null");
    if (currentUser) {
        if (!currentUser.isAdmin) {
            startOnlineTracker(currentUser.login);
            try {
                const fresh = await sbFetch("users", "GET", null, `?login=eq.${currentUser.login}`);
                if (fresh && fresh.length > 0) {
                    currentUser.isPlus = !!fresh[0].is_plus;
                    localStorage.setItem("edu_current_user", JSON.stringify(currentUser));
                }
            } catch (e) {}
        } else {
            currentUser.isPlus = true;
        }

        document.getElementById("auth-screen").classList.add("hidden");
        document.getElementById("app-screen").classList.remove("hidden");

        const plusBadge = currentUser.isPlus ? ' <span style="background:#f59e0b;color:#fff;padding:2px 6px;border-radius:6px;font-size:10px">💎 PLUS</span>' : '';
        document.getElementById("uname").innerHTML = currentUser.name + (currentUser.isAdmin ? " (Admin)" : "") + plusBadge;

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
        localStorage.setItem("edu_current_user", JSON.stringify({ name: "Administrator", login: "admin", isAdmin: true, isPlus: true }));
        checkAuthSession();
        return;
    }

    btn.disabled = true;
    btn.innerText = "Kutilmoqda...";

    try {
        if (isRegisterMode) {
            if (!name) { btn.disabled = false; btn.innerText = "Ro'yxatdan o'tish"; return alert("Ismingizni kiriting!"); }
            const existing = await sbFetch("users", "GET", null, `?login=eq.${login}`);
            if (login === ADMIN_LOGIN || existing.length > 0) {
                btn.disabled = false; btn.innerText = "Ro'yxatdan o'tish";
                return alert("Bu login band!");
            }
            const newUser = {
                name: name, login: login, pass: pass, visits: 1, is_plus: false, last_seen: Date.now(),
                joined: new Date().toLocaleString("uz-UZ", { dateStyle: "short", timeStyle: "short" })
            };
            await sbFetch("users", "POST", newUser);
            localStorage.setItem("edu_current_user", JSON.stringify({ name: newUser.name, login: newUser.login, isAdmin: false, isPlus: false }));
            checkAuthSession();
        } else {
            const users = await sbFetch("users", "GET", null, `?login=eq.${login}&pass=eq.${pass}`);
            if (!users || users.length === 0) {
                btn.disabled = false; btn.innerText = "Kirish";
                return alert("Login yoki parol noto'g'ri!");
            }
            const found = users[0];
            await sbFetch("users", "PATCH", { visits: (found.visits || 1) + 1, last_seen: Date.now() }, `?id=eq.${found.id}`);
            localStorage.setItem("edu_current_user", JSON.stringify({ name: found.name, login: found.login, isAdmin: false, isPlus: !!found.is_plus }));
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
        if (onlineHeartbeat) clearInterval(onlineHeartbeat);
        localStorage.removeItem("edu_current_user");
        checkAuthSession();
    }
}

async function toggleUserPlus(userId, currentStatus) {
    await sbFetch("users", "PATCH", { is_plus: !currentStatus }, `?id=eq.${userId}`);
    loadAdminPanel();
}

// 👑 ADMIN PANEL: BARCHA OLDIN KIRGANLAR + ONLAYN ODAMLAR + TEST NATIJALARI
async function loadAdminPanel() {
    try {
        const users = await sbFetch("users", "GET", null, "?order=id.desc");
        const allResults = await sbFetch("results", "GET", null, "?order=id.desc");
        const now = Date.now();

        // Oxirgi 60 soniya ichida faol bo'lganlarni ONLAYN deb hisoblash
        let onlineCount = 0;
        users.forEach(u => {
            if (u.last_seen && (now - u.last_seen) < 60000) onlineCount++;
        });

        document.getElementById("adm-total-users").innerText = users.length;
        document.getElementById("adm-total-visits").innerHTML = `${onlineCount} <small style="font-size:14px;color:#10b981">🟢 Onlayn</small>`;
        document.getElementById("adm-total-tests").innerText = allResults.length;

        document.getElementById("adm-users-body").innerHTML = users.length
            ? users.map((u, i) => {
                const isOnline = u.last_seen && (now - u.last_seen) < 60000;
                const statusBadge = isOnline
                    ? '<span style="background:#dcfce7;color:#15803d;padding:3px 8px;border-radius:12px;font-size:11px;font-weight:700">🟢 Onlayn</span>'
                    : `<span style="color:#64748b;font-size:12px">⚪ Oflayn (${u.joined || ''})</span>`;

                return `
                <tr>
                    <td>${i + 1}</td>
                    <td><b>${u.name}</b> ${u.is_plus ? '💎' : ''}<br>${statusBadge}</td>
                    <td><code>${u.login}</code></td>
                    <td>${u.visits || 1} marta</td>
                    <td>
                        <button class="btn" style="padding:6px 10px;font-size:12px;background:${u.is_plus ? '#10b981' : '#e2e8f0'};color:${u.is_plus ? '#fff' : '#0f172a'}" onclick="toggleUserPlus(${u.id}, ${!!u.is_plus})">
                            ${u.is_plus ? '💎 PLUS (Faol)' : '🆓 PLUS berish'}
                        </button>
                    </td>
                </tr>`;
            }).join("")
            : '<tr><td colspan="5" style="text-align:center">Hozircha ro\'yxatdan o\'tgan o\'quvchilar yo\'q</td></tr>';

        document.getElementById("adm-results-body").innerHTML = allResults.length
            ? allResults.map(r => `
                <tr>
                    <td><b>${r.name}</b> <small>(@${r.login})</small></td>
                    <td>${r.cat}</td>
                    <td><b>${r.score}</b></td>
                    <td><span style="color:${r.pct >= 70 ? '#10b981' : '#ef4444'};font-weight:700">${r.pct}%</span></td>
                    <td>${r.date}</td>
                </tr>`).join("")
            : '<tr><td colspan="5" style="text-align:center">Hozircha test natijalari yo\'q</td></tr>';
    } catch (e) {
        alert("Admin yuklash xatosi: " + e.message);
    }
}
