window.onload = function () {
    // Set the birthday date
    const birthdayDate = new Date("December 4, 2024 00:00:00").getTime();
    let dailyRevealDate = new Date(birthdayDate - 7 * 24 * 60 * 60 * 1000).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = dailyRevealDate - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the countdown
        document.getElementById("timer").innerHTML = `${hours}h ${minutes}m ${seconds}s`;

        // If the countdown reaches zero
        if (distance < 0) {
            clearInterval(countdownTimer);

            // Display surprise section for today
            document.getElementById("countdown").style.display = "none";
            document.getElementById("surprise-section").style.display = "block";
            document.getElementById("videoLink").href = `https://example.com/video_day_${7 - daysUntilBirthday}.mp4`;

            // Reset for the next day after showing the surprise
            dailyRevealDate += 24 * 60 * 60 * 1000;  // Add 24 hours
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

    let daysUntilBirthday = 7;
    let countdownTimer = setInterval(updateCountdown, 1000);
};

