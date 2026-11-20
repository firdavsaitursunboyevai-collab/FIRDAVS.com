const engData=[
{t:"Grammar • 1",h:"To Be fe'li",d:"Hozirgi zamon shakllari (am, is, are).",f:"I am | He/She/It is | We/You/They are",full:"Ingliz tilida 'to be' fe'li gapda asosiy fe'l bo'lmaganda ishlatiladi. I bilan 'am', birlikda 'is', ko'plikda 'are' keladi.",ex:["I am a student. — Men o'quvchiman.","She is very smart. — U juda aqlli.","They are ready. — Ular tayyor."]},
{t:"Tenses • 2",h:"Present Simple & Continuous",d:"Doimiy va hozirgi davomiy zamon.",f:"V1(s/es)  |  am/is/are + V-ing",full:"Present Simple har kuni takrorlanadigan odatlar uchun, Present Continuous esa ayni damda sodir bo'layotgan harakatlar uchun ishlatiladi.",ex:["He works every day. — U har kuni ishlaydi.","Look! It is raining now. — Qarang! Hozir yomg'ir yog'yapti."]},
{t:"Tenses • 3",h:"Past Simple & Continuous",d:"O'tgan tugallangan va davomiy zamon.",f:"V2 (-ed)  |  was/were + V-ing",full:"Past Simple o'tgan zamonda tugallangan harakatni, Past Continuous esa o'tmishda ma'lum paytda davom etgan harakatni bildiradi.",ex:["I visited Samarkand yesterday. — Kecha Samarqandga bordim.","She was reading at 5 PM. — U soat 5 da o'qiyotgan edi."]},
{t:"Tenses • 4",h:"Present & Past Perfect",d:"Natijasi bog'liq o'tgan zamon.",f:"have/has + V3  |  had + V3",full:"Present Perfect natijasi hozir ko'rinib turgan harakatlarni ifodalaydi.",ex:["I have already finished. — Men tugatib bo'ldim.","She has never been to London. — U Londonda bo'lmagan."]},
{t:"Tenses • 5",h:"Future (Will vs Going to)",d:"Kelajak rejalari va qarorlar.",f:"will + V1  |  am/is/are going to + V1",full:"'Will' tezkor qarorlar uchun, 'be going to' esa oldindan rejalashtirilgan maqsadlar uchun qo'llaniladi.",ex:["I think it will rain. — Menimcha yomg'ir yog'adi.","I am going to study math. — Matematika o'qimoqchiman."]},
{t:"Grammar • 6",h:"Modal Fe'llar",d:"Qobiliyat, majburiyat, maslahat.",f:"Can, Must, Should, May + V1",full:"Modal fe'llardan keyin asosiy fe'l 'to' siz (V1) keladi.",ex:["You must wear a seatbelt. — Kamar taqishingiz shart.","You should practice daily. — Har kuni mashq qilishingiz kerak."]},
{t:"Grammar • 7",h:"Passive Voice (Majhul nisbat)",d:"Obyektga urg'u berilganda.",f:"To be + V3 (is written, was built)",full:"Harakatni kim bajargani noma'lum bo'lsa yoki harakat muhimroq bo'lsa Passive Voice ishlatiladi.",ex:["This book was written by Navoi. — Kitob Navoiy tomonidan yozilgan.","English is spoken everywhere. — Ingliz tili hamma joyda gaplashiladi."]},
{t:"Grammar • 8",h:"Conditionals (If gaplar)",d:"Shart ergash gaplar formulasi.",f:"If + Present Simple, will + V1",full:"1-tur shart ergash gaplar kelajakda amalga oshishi mumkin bo'lgan real shartlarni bildiradi.",ex:["If you study hard, you will pass. — Qattiq o'qisangiz, o'tasiz."]},
{t:"Grammar • 9",h:"Articles & Prepositions",d:"Artikllar va vaqt/joy predloglari.",f:"In (oy/yil), On (kun), At (soat)",full:"Vaqt predloglari: In (yil, oy), On (kun), At (soat).",ex:["I wake up at 7 o'clock.","My birthday is on Monday."]},
{t:"Vocab • 10",h:"Math English (SAT)",d:"Matematik atamalar ingliz tilida.",f:"Fraction (Kasr), Equation (Tenglama), Triangle (Uchburchak)",full:"Xalqaro imtihonlar uchun eng muhim matematik terminlar lug'ati.",ex:["Addition (+) — Qo'shish | Subtraction (-) — Ayirish","Multiplication (×) — Ko'paytirish | Division (÷) — Bo'lish"]}
];

const mathData=[
{t:"Arifmetika • 1",h:"EKUB va EKUK",d:"Bo'linish belgilari va karralilar.",f:"EKUB(a,b) × EKUK(a,b) = a × b",full:"EKUB — eng katta umumiy bo'luvchi. EKUK — eng kichik umumiy karrali.",ex:["EKUB(12, 18) = 6","EKUK(12, 18) = 36"]},
{t:"Kasrlar • 2",h:"Oddiy va O'nli kasrlar",d:"Kasrlarni qo'shish va bo'lish.",f:"a/b + c/d = (ad+bc)/bd",full:"Kasrlarni qo'shish uchun umumiy maxraj topiladi.",ex:["3/4 + 2/5 = 23/20 = 1.15"]},
{t:"Foiz • 3",h:"Foiz va Proporsiya",d:"Proporsiyaning asosiy xossasi.",f:"a:b = c:d  ⟹  ad = bc",full:"Proporsiyada chetki hadlar ko'paytmasi o'rta hadlar ko'paytmasiga teng.",ex:["200 ning 35% i = 70"]},
{t:"Algebra • 4",h:"Qisqa ko'paytirish",d:"Asosiy algebraik formulalar.",f:"(a±b)² = a²±2ab+b² | a²-b² = (a-b)(a+b)",full:"Algebraik ifodalarni soddalashtirish formulalari.",ex:["101² - 99² = 2 × 200 = 400"]},
{t:"Algebra • 5",h:"Daraja va Ildiz",d:"Daraja va kvadrat ildiz xossalari.",f:"aⁿ·aᵐ = aⁿ⁺ᵐ | √(ab) = √a·√b",full:"Asoslari bir xil darajalarni ko'paytirganda ko'rsatkichlar qo'shiladi.",ex:["2⁵ × 2³ = 2⁸ = 256"]},
{t:"Tenglama • 6",h:"Kvadrat tenglama",d:"Diskriminant va Viyet teoremasi.",f:"D = b²-4ac | x₁,₂ = (-b±√D)/2a",full:"ax² + bx + c = 0 tenglamani yechish formulasi.",ex:["x² - 5x + 6 = 0  ⟹  x₁ = 3, x₂ = 2"]},
{t:"Progressiya • 7",h:"Arifmetik & Geometrik",d:"n-hadni topish formulalari.",f:"aₙ = a₁+d(n-1) | bₙ = b₁·qⁿ⁻¹",full:"Sonli ketma-ketlik formulalari.",ex:["a₁ = 3, d = 4  ⟹  a₅ = 19"]},
{t:"Funksiya • 8",h:"Logarifm asoslari",d:"Logarifmning asosiy ayniyatlari.",f:"logₐ(xy) = logₐx + logₐy",full:"Logarifm xossalari.",ex:["log₂(32) = 5"]},
{t:"Geometriya • 9",h:"Uchburchak va Doira",d:"Pifagor teoremasi va yuzalar.",f:"a²+b² = c² | S(doira) = πR²",full:"To'g'ri burchakli uchburchak va aylana formulalari.",ex:["Katetlar 6 va 8 bo'lsa: c = 10"]},
{t:"Trigonometriya • 10",h:"Asosiy ayniyatlar",d:"Sinus, kosinus va tangens.",f:"sin²α + cos²α = 1 | tgα = sinα/cosα",full:"Asosiy trigonometrik ayniyatlar.",ex:["sin(30°) = 1/2 | cos(60°) = 1/2"]}
];
let curQ=[];

function openTab(id){
document.querySelectorAll('.tab').forEach(el=>el.classList.remove('active'));
document.getElementById(id).classList.add('active');
document.querySelectorAll('[data-t]').forEach(b=>b.classList.toggle('active',b.getAttribute('data-t')===id));
if(id==='results'||id==='home')loadStats();
if(id==='admin')loadAdminPanel();
window.scrollTo(0,0);
}

function render(){
document.getElementById('list-eng').innerHTML=engData.map((x,idx)=>`<div class="card item" data-s="${(x.h+x.d+x.f).toLowerCase()}"><div><span class="tag">${x.t}</span><h3>${x.h}</h3><p style="color:#475569;font-size:14px">${x.d}</p><div class="formula">${x.f}</div></div><button class="btn btn-outline" onclick="openLesson('english',${idx})">📖 Mavzuga kirish →</button></div>`).join('');
document.getElementById('list-math').innerHTML=mathData.map((x,idx)=>`<div class="card item" data-s="${(x.h+x.d+x.f).toLowerCase()}"><div><span class="tag">${x.t}</span><h3>${x.h}</h3><p style="color:#475569;font-size:14px">${x.d}</p><div class="formula">${x.f}</div></div><button class="btn btn-outline" onclick="openLesson('math',${idx})">📖 Mavzuga kirish →</button></div>`).join('');
}

function openLesson(type,idx){
const data=type==='english'?engData[idx]:mathData[idx];
const backTab=type==='english'?'english':'math';
document.getElementById('lesson-detail-content').innerHTML=`<button class="btn btn-gray" style="margin-bottom:16px" onclick="openTab('${backTab}')">← Ortga qaytish</button><div class="lesson-view"><span class="tag">${data.t}</span><h1 style="font-size:24px;margin-bottom:12px">${data.h}</h1><p style="font-size:16px;color:#334155;margin-bottom:16px">${data.full}</p><div class="formula" style="font-size:15px;padding:14px;margin-bottom:20px">${data.f}</div>${data.ex.map(e=>`<div class="example-box"><b>•</b> ${e}</div>`).join('')}<button class="btn btn-primary" style="margin-top:20px" onclick="openTab('quiz');document.getElementById('q-cat').value='${type}';startQuiz()">⚡ Shu fandan test ishlash</button></div>`;
openTab('lesson-detail');
}

function filter(type){
const v=document.getElementById('s-'+type).value.toLowerCase();
document.querySelectorAll('#list-'+type+' .item').forEach(c=>c.style.display=c.getAttribute('data-s').includes(v)?'block':'none');
}

function shuffle(arr){
let a=[...arr];
for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
return a;
}

function startQuiz(){
const cat=document.getElementById('q-cat').value;
const num=parseInt(document.getElementById('q-num').value);
let pool=cat==='all'?qBank:qBank.filter(x=>x.c===cat);
curQ=shuffle(pool).slice(0,Math.min(num,pool.length)).map(q=>{
let correct=q.o[q.a];
let opts=shuffle(q.o);
return{q:q.q,c:q.c,opts:opts,ans:opts.indexOf(correct)};
});
document.getElementById('q-setup').classList.add('hidden');
document.getElementById('q-res').classList.add('hidden');
document.getElementById('q-box').classList.remove('hidden');
document.getElementById('q-items').innerHTML=curQ.map((item,i)=>`<div class="card" style="margin-bottom:14px"><span class="tag">${item.c==='english'?'🇬🇧 English':'📐 Math'} • ${i+1}-savol</span><h4>${item.q}</h4>${item.opts.map((o,oi)=>`<label class="opt"><input type="radio" name="q${i}" value="${oi}"> ${o}</label>`).join('')}</div>`).join('');
}

function cancelQuiz(){
document.getElementById('q-box').classList.add('hidden');
document.getElementById('q-setup').classList.remove('hidden');
}

function finishQuiz(){
let score=0,review='';
curQ.forEach((item,i)=>{
let sel=document.querySelector(`input[name="q${i}"]:checked`);
let val=sel?parseInt(sel.value):-1;
let ok=val===item.ans;
if(ok)score++;
review+=`<div class="card" style="margin-bottom:10px;border-left:5px solid ${ok?'#10b981':'#ef4444'}"><b>${i+1}. ${item.q}</b><p style="font-size:14px;margin-top:4px">Sizning javob: <b>${val>-1?item.opts[val]:'Belgilanmagan'}</b> ${ok?'✅':'❌'}</p>${!ok?`<p style="color:#10b981;font-size:14px">To'g'ri javob: <b>${item.opts[item.ans]}</b></p>`:''}</div>`;
});
let pct=Math.round((score/curQ.length)*100);
let catSelect=document.getElementById('q-cat');
let catName=catSelect.options[catSelect.selectedIndex].text;
const curUser=JSON.parse(localStorage.getItem("edu_current_user")||'{"name":"O\'quvchi","login":"guest"}');

let allRes=getAllResults();
allRes.unshift({name:curUser.name,login:curUser.login,cat:catName,score:`${score}/${curQ.length}`,pct:pct,date:new Date().toLocaleString("uz-UZ",{dateStyle:"short",timeStyle:"short"})});
localStorage.setItem("edu_all_results",JSON.stringify(allRes));

document.getElementById('q-box').classList.add('hidden');
const resDiv=document.getElementById('q-res');
resDiv.classList.remove('hidden');
resDiv.innerHTML=`<div class="card" style="text-align:center;margin-bottom:18px"><h2>🎉 Natija: ${score} / ${curQ.length} (${pct}%)</h2><p style="color:#64748b;margin:8px 0 16px">Natijangiz saqlandi!</p><button class="btn btn-primary" onclick="cancelQuiz();resDiv.classList.add('hidden')">🔄 Yana test ishlash</button><button class="btn btn-green" onclick="openTab('results')">🏆 Natijalar jadvali</button></div>${review}`;
loadStats();
window.scrollTo(0,0);
}

function loadStats(){
const curUser=JSON.parse(localStorage.getItem("edu_current_user")||'null');
if(!curUser)return;
const myRes=getAllResults().filter(r=>r.login===curUser.login);
document.getElementById('st-count').innerText=myRes.length;
document.getElementById('st-avg').innerText=myRes.length?Math.round(myRes.reduce((a,b)=>a+b.pct,0)/myRes.length)+'%':'0%';
document.getElementById('res-body').innerHTML=myRes.length?myRes.map(x=>`<tr><td><b>${x.name}</b></td><td>${x.cat}</td><td><b>${x.score}</b></td><td><b>${x.pct}%</b></td><td>${x.date}</td></tr>`).join(''):'<tr><td colspan="5" style="text-align:center">Hozircha natijalaringiz yo\'q</td></tr>';
}

render();
checkAuthSession();
