function toggleChat() {
    const chatBox = document.getElementById('chatBox');
    chatBox.classList.toggle('open');

    if (!chatBox.classList.contains('open')) {
        clearChat();
    }
}

function askQuestion(element) {
    const question = element.textContent;
    const existingAnswer = element.nextElementSibling;

    if (existingAnswer && existingAnswer.classList.contains('answer')) {
        existingAnswer.remove();
        return;
    }

    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question })
    })
        .then(response => response.json())
        .then(data => {
            const answer = document.createElement('div');
            answer.className = 'answer';
            answer.textContent = data.answer;
            element.insertAdjacentElement('afterend', answer);
            scrollToBottom();
        });
}

function sendCustomQuestion() {
    const input = document.getElementById('userQuestion');
    const question = input.value.trim();
    if (!question) return;

    const chatBody = document.getElementById('chatBody');

    const userMsg = document.createElement('div');
    userMsg.className = 'question dynamic';
    userMsg.textContent = question;
    chatBody.appendChild(userMsg);

    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question })
    })
        .then(res => res.json())
        .then(data => {
            const answer = document.createElement('div');
            answer.className = 'answer';
            answer.textContent = data.answer;
            chatBody.appendChild(answer);
            input.value = '';
            scrollToBottom();
        });
}

// تمرير لأسفل
function scrollToBottom() {
    const chatBody = document.getElementById('chatBody');
    chatBody.scrollTop = chatBody.scrollHeight;
}

// زر مسح الكل
function clearChat() {
    const chatBody = document.getElementById('chatBody');

    // حذف كل الإجابات
    const answers = chatBody.querySelectorAll('.answer');
    answers.forEach(el => el.remove());

    // حذف الأسئلة غير الثابتة فقط
    const dynamicQuestions = chatBody.querySelectorAll('.question.dynamic');
    dynamicQuestions.forEach(el => el.remove());
}
