
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const input = document.getElementById("inp");
    const msgs = document.getElementById("msgs");
    const toggleBtn = document.getElementById("chatbotToggle");
    const container = document.getElementById("chatbotContainer");
    const closeBtn = document.getElementById("chatbotClose");

    // Toggle Chatbot Container
    if (toggleBtn && container && closeBtn) {
        toggleBtn.addEventListener("click", () => {
            container.classList.toggle("active");
            if (container.classList.contains("active")) {
                input.focus();
            }
        });

        closeBtn.addEventListener("click", () => {
            container.classList.remove("active");
        });
    }

    if (!form || !input || !msgs) {
        console.error("Chatbot elements not found.");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const text = input.value.trim();
        if (!text) return;

        // Append User Message bubble
        msgs.innerHTML += `<div class="user-msg"><b>You:</b> ${text}</div>`;
        input.value = "";
        msgs.scrollTop = msgs.scrollHeight;

        try {
            const res = await fetch("/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text })
            });

            const data = await res.json();
            // Append Bot Message bubble
            const replyText = data.reply || data.error || "No response received";
            msgs.innerHTML += `<div class="bot-msg"><b>Bot:</b> ${replyText}</div>`;
            msgs.scrollTop = msgs.scrollHeight;

        } catch (err) {
            msgs.innerHTML += `<div class="bot-msg" style="border-color: var(--color-danger); color: #fca5a5;"><b>Error:</b> Could not reach server.</div>`;
            msgs.scrollTop = msgs.scrollHeight;
        }
    });
});
