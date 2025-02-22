document.addEventListener("DOMContentLoaded", function () {
  if (!window.CD || !window.CD.CDN) {
    console.error("Error: Telegram bot configuration is missing.");
    alert("⚠ Configuration error: Telegram bot settings are missing.");
    return;
  }

  const TELEGRAM_BOT_TOKEN = window.CD.CDN;
  const TELEGRAM_CHAT_ID = "682736273";
  const URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const degreeSelect = document.getElementById("select_degree");
  const facultySelect = document.getElementById("select_faculty");

  // Faculty options for each degree
  const facultyOptions = {
    Bachelor: [
      "General medicine",
      "Dentistry",
      "Economics (by branches and sectors full-time)",
      "Economics (by branches and sectors part-time)",
      "60110500-Primary education (full-time)",
      "60110500-Primary education (part-time)",
      "70910101-Psychology by types of activities (full-time)",
      "70910101-Psychology by types of activities (part-time)",
      "60230100-Philology and language teaching (English language)",
      "60230100-Philology and language teaching (Russian language)",
      "60230100-Philology and language teaching (German language)",
      "60230100-Philology and language teaching (Uzbek language)",
    ],
    Master: [
      "70910212-Surgery (by faculties)",
      "70910214-Neurosurgery",
      "70910201-Obstetrician-gynaecology",
      "70910221-Traumatology and orthopedics",
      "70910101-Orthopedic dentistry",
      "70910101-Children's surgical dentistry",
      "70910101-Children's therapeutic dentistry",
      "70910101-Maxillofacial surgery",
      "70910101-Therapeutic dentistry",
      "70111401-Uzbek language and literature",
    ],
    "Residence of training": [
      "Otorhinolaryngology",
      "Urology",
      "Cardiology",
      "Neurology",
      "Pediatrics",
      "Pulmonology",
      "Therapy",
      "Obstetrics and Gynecology",
      "Surgery",
      "Oncology",
      "Children's dentistry",
      "Orthopedic stomatology",
      "Dietology",
      "Therapeutic dentistry",
      "Neonatology",
      "Radiology",
    ],
    "Language courses": [
      "English language course",
      "Russian language course",
      "Uzbek language course"
    ],
    "IT courses": [
      "Frontend course",
      "Backend course",
      "Microsoft office course"
    ],
    "Chinese traditional medicine": [
      "Acupuncture",
      "Moxibustion"
    ],
    "FMGE exam preparation": ["FMGE Exam Preparation"],
  };

  // Update faculty options based on selected degree
  degreeSelect.addEventListener("change", function () {
    const selectedDegree = degreeSelect.value;
    facultySelect.innerHTML = '<option value="">Choose faculty or courses</option>';

    if (selectedDegree && facultyOptions[selectedDegree]) {
      facultyOptions[selectedDegree].forEach((faculty) => {
        const option = document.createElement("option");
        option.value = faculty;
        option.textContent = faculty;
        facultySelect.appendChild(option);
      });
    }
  });

  // Form submission handler
  document.getElementById("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstName = document.getElementById("fName").value.trim();
    const lastName = document.getElementById("lName").value.trim();
    const email = document.getElementById("email").value.trim();
    const degree = degreeSelect.value;
    const faculty = facultySelect.value;
    const country = document.getElementById("countrySelect").value;
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("user_message").value.trim();

    // Validation
    if (!firstName || !lastName || !email || !degree || !faculty || !country || !phone) {
      alert("⚠ Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("⚠ Invalid email format.");
      return;
    }
    if (!/^[0-9+ -]{7,15}$/.test(phone)) {
      alert("⚠ Invalid phone number format.");
      return;
    }

    // Prepare Telegram message
    let telegramMessage = `<b>New Form Submission</b>\n`;
    telegramMessage += `<b>Name:</b> ${firstName} ${lastName}\n`;
    telegramMessage += `<b>Email:</b> ${email}\n`;
    telegramMessage += `<b>Degree:</b> ${degree}\n`;
    telegramMessage += `<b>Faculty:</b> ${faculty}\n`;
    telegramMessage += `<b>Country:</b> ${country}\n`;
    telegramMessage += `<b>Phone:</b> ${phone}\n`;
    if (message) telegramMessage += `<b>Message:</b> ${message}`;

    // Send message to Telegram
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          parse_mode: "HTML",
          text: telegramMessage,
        }),
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