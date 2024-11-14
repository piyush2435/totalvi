window.onload = function () {
    const birthdayDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    let dailyRevealDate = new Date().getTime() + 1 * 60 * 1000; // For testing, each "day" lasts 1 minute.

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = dailyRevealDate - now;

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = `${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById("countdown").style.display = "none";
            document.getElementById("surprise-section").style.display = "block";

            const dayNumber = 8 - daysUntilBirthday;
            document.getElementById("dayLabel").innerText = `Day ${dayNumber} Surprise`;
            document.getElementById("videoLink").innerText = `Click here for Day ${dayNumber} Video!`;
            document.getElementById("videoLink").href = `https://example.com/day${dayNumber}_video.mp4`;

            dailyRevealDate += 1 * 60 * 1000;
            daysUntilBirthday--;

            if (daysUntilBirthday < 0) {
                document.getElementById("surprise-section").style.display = "none";
                document.getElementById("birthday-section").style.display = "block";
            } else {
                setTimeout(() => {
                    document.getElementById("countdown").style.display = "block";
                    document.getElementById("surprise-section").style.display = "none";
                    countdownTimer = setInterval(updateCountdown, 1000);
                }, 10000);
            }
        }
    }

    let daysUntilBirthday = 7;
    let countdownTimer = setInterval(updateCountdown, 1000);
};

// Show the response form after clicking the video link
function showResponseForm() {
    document.getElementById("surprise-section").style.display = "none";
    document.getElementById("response-section").style.display = "block";
}

// Handle form submission
function submitResponse() {
    const message = document.getElementById("message").value;
    const photo = document.getElementById("photo").files[0];

    if (photo && message) {
        alert("Response submitted! Thank you for your message and photo.");
        
        document.getElementById("responseForm").reset();
        document.getElementById("response-section").style.display = "none";
        document.getElementById("countdown").style.display = "block";
    } else {
        alert("Please complete both fields.");
    }
}

