window.onload = function () {
    const birthdayDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    let dailyRevealDate = new Date().getTime() + 1 * 60 * 1000; // For testing, each "day" lasts 1 minute.

    // Load previously revealed links from local storage
    loadRevealedLinks();

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
            const videoLink = `https://example.com/day${dayNumber}_video.mp4`;

            document.getElementById("dayLabel").innerText = `Day ${dayNumber} Surprise`;
            document.getElementById("videoLink").innerText = `Click here for Day ${dayNumber} Video!`;
            document.getElementById("videoLink").href = videoLink;

            // Add this link to the "All Surprise Links" section and local storage
            addLinkToAllLinks(dayNumber, videoLink);
            saveLinkToLocalStorage(dayNumber, videoLink);

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

// Function to add each new link to the "All Surprise Links" section
function addLinkToAllLinks(dayNumber, link) {
    const allLinksList = document.getElementById("all-links-list");

    // Create a new paragraph for each day's link
    const linkParagraph = document.createElement("p");
    linkParagraph.innerHTML = `<a href="${link}" target="_blank">Day ${dayNumber} Video</a>`;
    allLinksList.appendChild(linkParagraph);
}

// Save the revealed link to local storage
function saveLinkToLocalStorage(dayNumber, link) {
    let revealedLinks = JSON.parse(localStorage.getItem("revealedLinks")) || [];
    revealedLinks.push({ dayNumber, link });
    localStorage.setItem("revealedLinks", JSON.stringify(revealedLinks));
}

// Load all revealed links from local storage
function loadRevealedLinks() {
    const revealedLinks = JSON.parse(localStorage.getItem("revealedLinks")) || [];
    revealedLinks.forEach(linkInfo => {
        addLinkToAllLinks(linkInfo.dayNumber, linkInfo.link);
    });
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

