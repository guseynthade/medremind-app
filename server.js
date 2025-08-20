const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Sadə massiv (gələcəkdə Firebase olacaq)
let meds = [];

app.post('/api/meds', (req, res) => {
    meds.push(req.body);
    res.json({ success: true });
});

app.get('/api/meds/:userId', (req, res) => {
    const userMeds = meds.filter(m => m.userId === req.params.userId);
    res.json(userMeds);
});

app.get('/', (req, res) => {
    res.send('Server işləyir! 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda başladı`);
});
