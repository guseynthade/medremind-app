// Telegram WebApp API
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
} else {
    alert("Xəta: Telegram WebApp yüklənmədi");
}

// Dərman əlavə et
async function addMed() {
    const name = document.getElementById("medName").value.trim();
    const dose = document.getElementById("dose").value.trim();
    const time = document.getElementById("time").value;

    if (!name || !time) {
        alert("Zəhmət olmasa dərman adı və vaxt daxil edin");
        return;
    }

    const userId = tg.initDataUnsafe?.user?.id || "test123";
    const med = { name, dose, time, userId };

    try {
        const res = await fetch("https://medremind-server.onrender.com/api/meds", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(med),
        });

        if (res.ok) {
            alert("✅ Xatırlatma əlavə edildi!");
            document.getElementById("medName").value = "";
            document.getElementById("dose").value = "";
            document.getElementById("time").value = "";
            loadMeds(); // Siyahını yenilə
        } else {
            const errorText = await res.text();
            alert(`Server xətası: ${res.status} ${errorText}`);
        }
    } catch (err) {
        console.error("Fetch xətası:", err);
        alert("Bağlantıda xəta var. İnterneti yoxlayın.");
    }
}

// Dərmanları yüklə
async function loadMeds() {
    const userId = tg.initDataUnsafe?.user?.id || "test123";
    const list = document.getElementById("medList");

    try {
        const res = await fetch(`https://medremind-server.onrender.com/api/meds/${userId}`);
        if (res.ok) {
            const meds = await res.json();
            if (meds.length === 0) {
                list.innerHTML = "<p>Hələ xatırlatma yoxdur.</p>";
            } else {
                list.innerHTML = meds.map(m => 
                    `<div class="med"><b>${m.time}</b> | ${m.name} (${m.dose})</div>`
                ).join("");
            }
        } else {
            list.innerHTML = "<p>Xəta: Məlumat yüklənmədi</p>";
        }
    } catch (err) {
        list.innerHTML = "<p>Offline: Məlumat yüklənmədi</p>";
        console.error("Yükləmə xətası:", err);
    }
}

// Səhifə yükləndikdə siyahını göstər
document.addEventListener("DOMContentLoaded", loadMeds);
