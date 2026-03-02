let lastTopic = null;

// Load reminders from storage
let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

const studentProfile = {
    name: "Otieno Jonathan Daniels",
    regNo: "24ZAD109298",
    course: "Diploma in Computer Science"
};

function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const message = input.value.trim();

    if (message === "") return;

    // User message
    const userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.innerText = message;
    chatBox.appendChild(userDiv);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    showTyping();

    setTimeout(() => {
        hideTyping();

        const botDiv = document.createElement("div");
        botDiv.className = "bot-message";
        botDiv.innerText = getResponse(message);
        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 900);
}

function getResponse(msg) {
    msg = msg.toLowerCase();

    /* GREETING */
    if (msg.includes("hi") || msg.includes("hello")) {
        lastTopic = "greeting";
        return "Hello 😊 I’m MIRROR. How can I help you today?";
    }

    /* REMINDERS */
    if (msg.includes("remind me")) {
        lastTopic = "reminder";
        const reminderText = msg.replace("remind me", "").trim();

        if (reminderText.length > 0) {
            reminders.push(reminderText);
            localStorage.setItem("reminders", JSON.stringify(reminders));
            return `⏰ Got it! I’ve saved the reminder to ${reminderText}.`;
        }
        return "⏰ What would you like me to remind you about?";
    }

    if (msg.includes("my reminders") || msg.includes("show reminders")) {
        if (reminders.length === 0) {
            return "📭 You don’t have any reminders yet.";
        }

        let list = "📌 Your reminders:\n";
        reminders.forEach((r, i) => {
            list += `${i + 1}. ${r}\n`;
        });
        return list;
    }

    /* ASSIGNMENTS */
    if (msg.includes("assignment")) {
        lastTopic = "assignment";
        return "📚 You have an assignment due this Friday.";
    }

    if (msg.includes("due") && lastTopic === "assignment") {
        return "⏰ The assignment is due Friday at 11:59 PM.";
    }

    /* CLASSES */
    if (msg.includes("class") || msg.includes("schedule")) {
        lastTopic = "schedule";
        return "🕘 Your next class is at 10:00 AM in Lecture Hall B.";
    }

    /* PROFILE */
    if (msg.includes("profile") || msg.includes("my details")) {
        lastTopic = "profile";
        return `👤 Name: ${studentProfile.name}
📘 Reg No: ${studentProfile.regNo}
🎓 Course: ${studentProfile.course}`;
    }

    /* FALLBACK (HUMAN FEEL) */
    const fallbackResponses = [
        "Hmm 🤔 could you rephrase that?",
        "I’m still learning — try asking differently 😊",
        "That’s interesting! Could you clarify?"
    ];

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

/* TYPING INDICATOR */
function showTyping() {
    document.getElementById("typingIndicator").style.display = "block";
}

function hideTyping() {
    document.getElementById("typingIndicator").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("userInput");
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
});
