const vocabBank = [
    { w: "Abandon", tr: "Tashlab ketmoq", ex: "Never abandon your dreams." },
    { w: "Accurate", tr: "Aniq, to'g'ri", ex: "Her calculation was completely accurate." },
    { w: "Achieve", tr: "Erishmoq", ex: "You can achieve anything with hard work." },
    { w: "Advantage", tr: "Ustunlik, foyda", ex: "Knowing English is a big advantage." },
    { w: "Analyze", tr: "Tahlil qilmoq", ex: "We need to analyze the math problem." },
    { w: "Ancient", tr: "Qadimiy", ex: "Samarkand is an ancient city." },
    { w: "Approach", tr: "Yondashuv, yaqinlashmoq", ex: "Try a different approach to solve this." },
    { w: "Appropriate", tr: "Munosib, mos", ex: "Choose the most appropriate answer." },
    { w: "Attempt", tr: "Urinish, harakat qilmoq", ex: "He passed the exam on his first attempt." },
    { w: "Available", tr: "Mavjud, bo'sh", ex: "The course is available online." },
    { w: "Benefit", tr: "Foyda, naf", ex: "Reading books has many benefits." },
    { w: "Calculate", tr: "Hisoblamoq", ex: "Calculate the area of the triangle." },
    { w: "Challenge", tr: "Qiyinchilik, chorlov", ex: "Every challenge makes you stronger." },
    { w: "Compare", tr: "Taqqoslamoq", ex: "Compare the two fractions." },
    { w: "Conclusion", tr: "Xulosa", ex: "What is your final conclusion?" },
    { w: "Confident", tr: "O'ziga ishongan", ex: "Be confident during the test." },
    { w: "Consequence", tr: "Oqibat, natija", ex: "Think about the consequences." },
    { w: "Constant", tr: "Doimiy, o'zgarmas", ex: "Pi (π) is a mathematical constant." },
    { w: "Contribute", tr: "Hissa qo'shmoq", ex: "Everyone should contribute to the team." },
    { w: "Crucial", tr: "Juda muhim, hal qiluvchi", ex: "Time management is crucial in exams." },
    { w: "Decrease", tr: "Kamaymoq", ex: "The price decreased by 20 percent." },
    { w: "Demonstrate", tr: "Ko'rsatmoq, isbotlamoq", ex: "Please demonstrate how you solved it." },
    { w: "Determine", tr: "Aniqlamoq", ex: "Determine the value of x." },
    { w: "Develop", tr: "Rivojlantirmoq", ex: "Practice helps you develop skills." },
    { w: "Difference", tr: "Farq, ayirma", ex: "Find the difference between 50 and 18." },
    { w: "Efficient", tr: "Samarali", ex: "Find the most efficient formula." },
    { w: "Emphasize", tr: "Ta'kidlamoq", ex: "The teacher emphasized the main rule." },
    { w: "Environment", tr: "Atrof-muhit", ex: "We must protect our environment." },
    { w: "Equation", tr: "Tenglama", ex: "Solve the quadratic equation." },
    { w: "Essential", tr: "Eng zarur, muhim", ex: "Vocabulary is essential for fluency." },
    { w: "Estimate", tr: "Taxminiy hisoblamoq", ex: "Estimate the sum before calculating." },
    { w: "Evidence", tr: "Dalil, isbot", ex: "There is clear evidence for this theorem." },
    { w: "Expand", tr: "Kengaytirmoq, qavsni ochmoq", ex: "Expand the expression (x + 2)²." },
    { w: "Factor", tr: "Ko'paytuvchi, omil", ex: "3 is a factor of 12." },
    { w: "Flexible", tr: "Moslashuvchan", ex: "Have a flexible study schedule." },
    { w: "Focus", tr: "Diqqatni jamlamoq", ex: "Focus on your goals every day." },
    { w: "Frequent", tr: "Tez-tez sodir bo'ladigan", ex: "Make frequent revisions." },
    { w: "Fundamental", tr: "Asosiy, tub", ex: "Learn the fundamental laws of algebra." },
    { w: "Generate", tr: "Yaratmoq, hosil qilmoq", ex: "The system generates random tests." },
    { w: "Gradually", tr: "Asta-sekin", ex: "Your English will improve gradually." },
    { w: "Identify", tr: "Aniqlamoq, tanimoq", ex: "Identify the prime numbers." },
    { w: "Improve", tr: "Yaxshilamoq", ex: "Daily practice improves memory." },
    { w: "Increase", tr: "Oshmoq, ko'paymoq", ex: "The number increased by 15%." },
    { w: "Independent", tr: "Mustaqil", ex: "Become an independent learner." },
    { w: "Influence", tr: "Ta'sir qilmoq", ex: "Good habits influence your future." },
    { w: "Opportunity", tr: "Imkoniyat", ex: "Don't miss this great opportunity." },
    { w: "Permanent", tr: "Doimiy", ex: "Hard work brings permanent success." },
    { w: "Predict", tr: "Bashorat qilmoq", ex: "Can you predict the next number?" },
    { w: "Significant", tr: "Ahamiyatli, sezilarli", ex: "She made significant progress." },
    { w: "Solution", tr: "Yechim", ex: "Every problem has a solution." }
];
function speakWord(word) {
    if ('speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance(word);
        msg.lang = 'en-US';
        msg.rate = 0.9;
        window.speechSynthesis.speak(msg);
    }
}

function loadVocabTab() {
    const curUser = JSON.parse(localStorage.getItem("edu_current_user") || '{}');
    if (!curUser.isPlus && !curUser.isAdmin) {
        document.getElementById("vocab-locked").classList.remove("hidden");
        document.getElementById("vocab-open").classList.add("hidden");
        return;
    }
    document.getElementById("vocab-locked").classList.add("hidden");
    document.getElementById("vocab-open").classList.remove("hidden");
    renderVocabList(vocabBank);
}

function renderVocabList(list) {
    document.getElementById("vocab-list").innerHTML = list.map(v => `
        <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center">
                <h3 style="color:#4f46e5">${v.w}</h3>
                <button class="btn btn-gray" style="padding:5px 10px;font-size:12px" onclick="speakWord('${v.w}')">🔊 Eshitish</button>
            </div>
            <p style="font-weight:700;margin:6px 0;color:#0f172a">${v.tr}</p>
            <p style="font-size:13px;color:#64748b;font-style:italic">"${v.ex}"</p>
        </div>
    `).join("");
}

function filterVocab() {
    const q = document.getElementById("s-vocab").value.toLowerCase();
    const filtered = vocabBank.filter(v => v.w.toLowerCase().includes(q) || v.tr.toLowerCase().includes(q));
    renderVocabList(filtered);
}

function openProfileModal() {
    const curUser = JSON.parse(localStorage.getItem("edu_current_user") || '{}');
    document.getElementById("modal-user-name").innerText = curUser.name || "O'quvchi";
    document.getElementById("modal-user-status").innerHTML = curUser.isAdmin ? "Status: 👑 Administrator" : (curUser.isPlus ? "Status: 💎 PLUS Tarif" : "Status: 🆓 Oddiy Tarif");

    const prev = document.getElementById("modal-avatar-preview");
    if (curUser.avatar) {
        prev.src = curUser.avatar;
        prev.classList.remove("hidden");
    } else {
        prev.classList.add("hidden");
    }

    const canUpload = curUser.isPlus || curUser.isAdmin;
    document.getElementById("avatar-upload-box").classList.toggle("hidden", !canUpload);
    document.getElementById("avatar-locked-msg").classList.toggle("hidden", canUpload);
    document.getElementById("profile-modal").classList.remove("hidden");
}

function closeProfileModal() {
    document.getElementById("profile-modal").classList.add("hidden");
}

function uploadUserAvatar(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = async function() {
            const canvas = document.createElement("canvas");
            canvas.width = 150;
            canvas.height = 150;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, 150, 150);
            const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);

            const curUser = JSON.parse(localStorage.getItem("edu_current_user") || '{}');
            curUser.avatar = compressedDataUrl;
            localStorage.setItem("edu_current_user", JSON.stringify(curUser));

            document.getElementById("modal-avatar-preview").src = compressedDataUrl;
            document.getElementById("modal-avatar-preview").classList.remove("hidden");
            document.getElementById("nav-avatar").src = compressedDataUrl;
            document.getElementById("nav-avatar").classList.remove("hidden");
            document.getElementById("nav-avatar-icon").classList.add("hidden");

            try {
                if (!curUser.isAdmin) {
                    const users = await sbFetch("users", "GET", null, `?login=eq.${curUser.login}`);
                    if (users && users.length > 0) {
                        await sbFetch("users", "PATCH", { avatar: compressedDataUrl }, `?id=eq.${users[0].id}`);
                    }
                }
                alert("✅ Profil rasmingiz muvaffaqiyatli saqlandi!");
            } catch (err) {
                alert("Rasm saqlashda xato: " + err.message);
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

let certQuestions = [];

function loadCertTab() {
    const curUser = JSON.parse(localStorage.getItem("edu_current_user") || '{}');
    if (!curUser.isPlus && !curUser.isAdmin) {
        document.getElementById("cert-locked").classList.remove("hidden");
        document.getElementById("cert-open").classList.add("hidden");
        return;
    }
    document.getElementById("cert-locked").classList.add("hidden");
    document.getElementById("cert-open").classList.remove("hidden");
}

function startCertExam() {
    const subj = document.getElementById("cert-subject").value;
    let pool = subj === "all" ? qBank : qBank.filter(x => x.c === subj);
    certQuestions = shuffle(pool).slice(0, 30).map(q => {
        let correct = q.o[q.a];
        let opts = shuffle(q.o);
        return { q: q.q, c: q.c, opts: opts, ans: opts.indexOf(correct) };
    });

    document.getElementById("cert-intro").classList.add("hidden");
    document.getElementById("cert-result-box").classList.add("hidden");
    document.getElementById("cert-exam-box").classList.remove("hidden");

    document.getElementById("cert-items").innerHTML = certQuestions.map((item, i) => `
        <div class="card" style="margin-bottom:14px">
            <span class="tag">${item.c === 'english' ? '🇬🇧 English' : '📐 Math'} • ${i + 1}/30</span>
            <h4>${item.q}</h4>
            ${item.opts.map((o, oi) => `<label class="opt"><input type="radio" name="cq${i}" value="${oi}"> ${o}</label>`).join('')}
        </div>
    `).join('');
}

function cancelCertExam() {
    document.getElementById("cert-exam-box").classList.add("hidden");
    document.getElementById("cert-intro").classList.remove("hidden");
}

async function finishCertExam() {
    let score = 0;
    certQuestions.forEach((item, i) => {
        let sel = document.querySelector(`input[name="cq${i}"]:checked`);
        if (sel && parseInt(sel.value) === item.ans) score++;
    });

    const pct = Math.round((score / certQuestions.length) * 100);
    const subjSelect = document.getElementById("cert-subject");
    const subjName = subjSelect.options[subjSelect.selectedIndex].text;
    const curUser = JSON.parse(localStorage.getItem("edu_current_user") || '{"name":"O\'quvchi","login":"guest"}');

    const record = {
        name: curUser.name, login: curUser.login, cat: "🎓 Sertifikat: " + subjName,
        score: `${score}/30`, pct: pct, correct_count: score,
        date: new Date().toLocaleString("uz-UZ", { dateStyle: "short", timeStyle: "short" })
    };
    try { await sbFetch("results", "POST", record); } catch (e) {}

    document.getElementById("cert-exam-box").classList.add("hidden");
    const resBox = document.getElementById("cert-result-box");
    resBox.classList.remove("hidden");

    const passed = pct >= 80;
    resBox.innerHTML = `
        <div class="card" style="text-align:center;padding:30px">
            <div style="font-size:48px;margin-bottom:10px">${passed ? '🎉' : '😔'}</div>
            <h2>${passed ? 'Tabriklaymiz! Imtihondan o\'tdingiz!' : 'Afsus, ball yetarli bo\'lmadi'}</h2>
            <p style="font-size:18px;margin:10px 0">Natijangiz: <b>${score} / 30 (${pct}%)</b></p>
            <p style="color:#64748b;margin-bottom:20px">${passed ? 'Siz rasmiy Sertifikat olish huquqini qo\'lga kiritdingiz!' : 'Sertifikat olish uchun kamida 80% (24 ta) to\'plashingiz kerak.'}</p>
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
                ${passed ? `<button class="btn" style="background:#f59e0b;color:#fff;font-size:15px" onclick="openOfficialCert('${curUser.name}', '${subjName}', ${pct})">🎓 Sertifikatni Ochish va Yuklash</button>` : ''}
                <button class="btn btn-primary" onclick="cancelCertExam();resBox.classList.add('hidden')">🔄 Qayta topshirish</button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

function openOfficialCert(name, subject, pct) {
    const curUser = JSON.parse(localStorage.getItem("edu_current_user") || '{}');
    const avatarHtml = curUser.avatar ? `<img src="${curUser.avatar}" style="width:90px;height:90px;border-radius:50%;object-fit:cover;border:3px solid #f59e0b;margin-bottom:10px">` : '';
    const w = window.open("", "_blank");
    w.document.write(`
        <div style="border:14px double #4f46e5;padding:45px;text-align:center;font-family:sans-serif;max-width:780px;margin:20px auto;background:linear-gradient(180deg,#fffbeb,#ffffff)">
            <h1 style="color:#4f46e5;font-size:38px;margin-bottom:6px">🎓 RASMIY SERTIFIKAT</h1>
            <p style="color:#64748b;font-size:15px;letter-spacing:1px">EDURIKAXXXXX PRO TA'LIM AKADEMIYASI</p>
            <hr style="margin:22px 0;border:1px solid #e2e8f0">
            ${avatarHtml}
            <p style="font-size:17px;color:#475569">Ushbu sertifikat egasi:</p>
            <h2 style="font-size:34px;color:#0f172a;margin:10px 0">${name}</h2>
            <p style="font-size:18px;line-height:1.6;max-width:600px;margin:0 auto"><b>${subject}</b> bo'yicha yakuniy imtihonda <b>${pct}%</b> natija qayd etib, bilimini muvaffaqiyatli tasdiqladi.</p>
            <p style="margin-top:35px;color:#64748b;font-size:14px">Berilgan sana: ${new Date().toLocaleDateString("uz-UZ")} • ID: #${Math.floor(100000 + Math.random() * 900000)}</p>
            <button onclick="window.print()" style="margin-top:25px;padding:12px 26px;background:#4f46e5;color:#fff;border:none;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer">🖨️ Chop etish / PDF saqlash</button>
        </div>
    `);
}
