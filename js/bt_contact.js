document.addEventListener("DOMContentLoaded", function () {
    if (!window.CD_contact || !window.CD_contact.CDN) {
      console.error("Error: Telegram bot configuration is missing.");
      alert("⚠ Configuration error: Telegram bot settings are missing.");
      return;
    }

    const TOKEN = window.CD_contact.CDN;
    const CHAT_ID = "586564605";
    const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    document.getElementById("form").addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            alert("⚠ Please fill in all required fields.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("⚠ Invalid email format.");
            return;
        }

        let telegramMessage = `<b>New message</b>\n`;
        telegramMessage += `<b>Name:</b> ${name}\n`;
        telegramMessage += `<b>Email:</b> ${email}\n`;
        telegramMessage += `<b>Subject:</b> ${subject}\n`;
        telegramMessage += `<b>Message:</b> ${message}\n`;

        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    parse_mode: "HTML",
                    text: telegramMessage
                })
            });

            const data = await response.json();

            if (data.ok) {
                alert("✅ Form submitted successfully!");
                document.getElementById("form").reset();
            } else {
                console.error("Telegram API Error:", data);
                alert("❌ Error sending message. Please check console for details.");
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("❌ Network error: " + error.message);
        }
    });
});