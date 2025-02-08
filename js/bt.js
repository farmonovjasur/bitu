document.addEventListener("DOMContentLoaded", function () {
    // Ensure the Telegram bot configuration is loaded
    if (!window.CD || !window.CD.CDN) {
        console.error("Error: Telegram bot configuration is missing.");
        alert("⚠ Configuration error: Telegram bot settings are missing.");
        return;
    }

    const TELEGRAM_BOT_TOKEN = window.CD.CDN;
    const TELEGRAM_CHAT_ID = "586564605";
    const URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    document.getElementById("form").addEventListener("submit", async function (e) {
        e.preventDefault();

        // Collect form data
        const firstName = document.getElementById("fName").value.trim();
        const lastName = document.getElementById("lName").value.trim();
        const email = document.getElementById("email").value.trim();
        const degree = document.getElementById("select_degree").value;
        const country = document.getElementById("countrySelect").value;
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("user_message").value.trim();

        // Basic Validation
        if (!firstName || !lastName || !email || !degree || !country || !phone) {
            alert("⚠ Please fill in all required fields.");
            return;
        }

        if (!validateEmail(email)) {
            alert("⚠ Invalid email format.");
            return;
        }

        if (!validatePhone(phone)) {
            alert("⚠ Invalid phone number format.");
            return;
        }

        // Format message for Telegram
        let telegramMessage = `<b>New Form Submission</b>\n`;
        telegramMessage += `<b>Name:</b> ${firstName} ${lastName}\n`;
        telegramMessage += `<b>Email:</b> ${email}\n`;
        telegramMessage += `<b>Degree:</b> ${degree}\n`;
        telegramMessage += `<b>Country:</b> ${country}\n`;
        telegramMessage += `<b>Phone:</b> ${phone}\n`;
        if (message) telegramMessage += `<b>Message:</b> ${message}`;

        try {
            // Send request to Telegram
            const response = await fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
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

// Helper Functions
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^[0-9+ -]{7,15}$/.test(phone);
}
