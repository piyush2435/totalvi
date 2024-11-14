window.onload = function () {
    // Set the birthday date (7 minutes from now for testing)
    const birthdayDate = new Date().getTime() + 7 * 60 * 1000;
    let dailyRevealDate = new Date().getTime() + 1 * 60 * 1000; // Each "day" is 1 minute

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = dailyRevealDate - now;

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the countdown
        document.getElementById("timer").innerHTML = `${minutes}m ${seconds}s`;

        // If the countdown reaches zero
        if (distance < 0) {
            clearInterval(countdownTimer);

            // Display surprise section for today
            document.getElementById("countdown").style.display = "none";
            document.getElementById("surprise-section").style.display = "block";
            document.getElementById("videoLink").href = `https://example.com/video_day_${7 - daysUntilBirthday}.mp4`;

            // Reset for the next "day" (1 minute for testing)
            dailyRevealDate += 1 * 60 * 1000; // Add 1 minute
            daysUntilBirthday--;

            if (daysUntilBirthday < 0) {
                // Show final birthday message
                document.getElementById("surprise-section").style.display = "none";
                document.getElementById("birthday-section").style.display = "block";
            } else {
                // Re-enable countdown after showing today's surprise
                setTimeout(() => {
                    document.getElementById("countdown").style.display = "block";
                    document.getElementById("surprise-section").style.display = "none";
                    countdownTimer = setInterval(updateCountdown, 1000);
                }, 10000);  // Show surprise for 10 seconds before resetting
            }
        }
    }

    let daysUntilBirthday = 7;  // Total "days" until birthday (7 minutes for testing)
    let countdownTimer = setInterval(updateCountdown, 1000);
};


