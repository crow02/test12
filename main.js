document.getElementById('examForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const subject = document.getElementById('subject').value;
    const level = document.getElementById('level').value;
    const amount = document.getElementById('amount').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "กำลังสร้างข้อสอบ กรุณารอสักครู่...";

    // ใช้ Gemini 2.0 Flash API และ API Key ที่ให้มา
    const API_KEY = "AIzaSyAccW1TSXJ3Iw4cY3ugIkibnWN4rb8m9V0";
    const prompt = `สร้างข้อสอบวิชา${subject} สำหรับระดับ${level} จำนวน ${amount} ข้อ พร้อมตัวเลือกและเฉลย`;

    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
        const data = await response.json();
        if (data.candidates && data.candidates.length > 0) {
            resultDiv.innerHTML = `<pre>${data.candidates[0].content.parts[0].text}</pre>`;
        } else {
            resultDiv.innerHTML = "ไม่สามารถสร้างข้อสอบได้ กรุณาลองใหม่";
        }
    } catch (err) {
        resultDiv.innerHTML = "เกิดข้อผิดพลาด: " + err.message;
    }
});