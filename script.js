const res = await fetch("https://medremind-server.onrender.com/api/meds", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(med),
});
