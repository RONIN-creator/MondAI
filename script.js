
function sendMessage() {
    const tone = document.getElementById("toneSelect").value;
    const lang = document.getElementById("languageSelect").value;
    const voice = document.getElementById("voiceToggle").checked;
    const text = document.getElementById("inputText").value;

    let reply = `[${tone.toUpperCase()} | ${lang.toUpperCase()}] You said: ${text}`;
    document.getElementById("response").innerText = reply;

    if (voice) {
        const utterance = new SpeechSynthesisUtterance(reply);
        utterance.lang = lang;
        speechSynthesis.speak(utterance);
    }
}
