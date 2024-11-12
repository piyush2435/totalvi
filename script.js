window.onload = function () {
    const revealDate = new Date("December 4, 2024 00:00:00").getTime();

    const countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const distance = revealDate - now;

        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the countdown in the "timer" div
        document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        // If the countdown is over, display the video link
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById("countdown").style.display = "none";
            document.getElementById("video-link-section").style.display = "block";
        }
    }, 1000);
}
