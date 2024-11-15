window.onload = function () {
    const birthdayDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    let dailyRevealDate = new Date().getTime() + 1 * 60 * 1000; // For testing, each "day" lasts 1 minute.

    // Load previously revealed videos from local storage
    loadRevealedVideos();

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
            document.getElementById("videoPlayer").style.display = "block";

            const dayNumber = 8 - daysUntilBirthday;
            const videoSource = `videos/day${dayNumber}_video.mp4`;

            document.getElementById("dayLabel").innerText = `Day ${dayNumber} Surprise`;
            document.getElementById("videoSource").src = videoSource;
            document.getElementById("videoPlayer").load();

            // Add this video to the "All Surprise Videos" section and local storage
            addVideoToAllVideos(dayNumber, videoSource);
            saveVideoToLocalStorage(dayNumber, videoSource);

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

// Function to add each new video to the "All Surprise Videos" section
function addVideoToAllVideos(dayNumber, videoSource) {
    const allVideosList = document.getElementById("all-videos-list");

    const videoElement = document.createElement("video");
    videoElement.width = 320;
    videoElement.height = 180;
    videoElement.controls = true;

    const sourceElement = document.createElement("source");
    sourceElement.src = videoSource;
    sourceElement.type = "video/mp4";

    videoElement.appendChild(sourceElement);

    const videoLabel = document.createElement("p");
    videoLabel.innerText = `Day ${dayNumber} Video`;
    allVideosList.appendChild(videoLabel);
    allVideosList.appendChild(videoElement);
}

// Save the revealed video to local storage
function saveVideoToLocalStorage(dayNumber, videoSource) {
    let revealedVideos = JSON.parse(localStorage.getItem("revealedVideos")) || [];
    revealedVideos.push({ dayNumber, videoSource });
    localStorage.setItem("revealedVideos", JSON.stringify(revealedVideos));
}

// Load all revealed videos from local storage
function loadRevealedVideos() {
    const revealedVideos = JSON.parse(localStorage.getItem("revealedVideos")) || [];
    revealedVideos.forEach(videoInfo => {
        addVideoToAllVideos(videoInfo.dayNumber, videoInfo.videoSource);
    });
}
