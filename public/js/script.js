// --- Floating Hearts Logic ---
const heartsContainer = document.querySelector(".hearts");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  const heartSize = 15 + Math.random() * 20;
  heart.style.width = heartSize + "px";
  heart.style.height = heartSize + "px";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.bottom = "-50px";

  const duration = 3 + Math.random() * 4;
  heart.style.animationDuration = duration + "s";

  const colors = ["#FFD700", "#FFFFFF"];
  heart.style.background = colors[Math.floor(Math.random() * colors.length)];
  heart.style.setProperty("--heart-color", heart.style.background);

  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

setInterval(createHeart, 300);

// --- Page & Element Selectors ---
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const noBtn = document.getElementById("no-button");
const yesBtn = document.getElementById("yes-button");
const banner = document.getElementById("banner");
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const seal = document.getElementById("seal");
const nextBtn = document.getElementById("next-button");
const bgMusic = document.getElementById("bg-music");
const muteBtn = document.getElementById("mute-button"); // Mute button selector

let musicNoteInterval;
let isMuted = false;

// --- Mute Toggle Logic ---
muteBtn.addEventListener("click", () => {
  if (bgMusic) {
    isMuted = !isMuted;
    bgMusic.muted = isMuted; // Toggle the muted property
    muteBtn.textContent = isMuted ? "🔇" : "🔊"; // Update button icon
  }
});

// --- No Button Logic ---
const answers_no = {
  english: ["No", "Bebo!! Are you sure?", "Are you really sure??", "My Kanmaniiiii, Please?", "Are you really really sure???", "Beboooooo..Think again?", "Don't believe in second chances?", "Why are you being so cold?", "Maybe we can talk about it?", "I am not going to ask again!", "Ok now this is hurting my feelings!", "You are now just being mean!", "Why are you doing this to me?", "Please give me a chance, Bebo!", "I am begging you to stop!", "Ok, let's just start over.."]
};

let index = 0;
let size = 40;

noBtn.addEventListener("click", () => {
  banner.src = "./public/images/no.gif";
  index = (index + 1) % answers_no.english.length;
  noBtn.textContent = answers_no.english[index];

  if (size < 200) {
    size += 15;
    yesBtn.style.fontSize = (size / 4) + "px";
    yesBtn.style.padding = "14px 32px";
  }
});

// --- Transition: Page 1 to Page 2 ---
yesBtn.addEventListener("click", () => {
  page1.style.display = "none";
  page2.style.display = "flex";
  banner.src = "./public/images/yes.gif";
});

// --- Interaction: Opening the Envelope ---
envelope.addEventListener("click", () => {
  if (!letter.classList.contains("show")) {
    letter.classList.add("show");

    // Start music and notes only when envelope opens
    if (bgMusic) {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(() => console.log("Autoplay blocked"));

      musicNoteInterval = setInterval(() => {
        const note = document.createElement("div");
        note.classList.add("music-note");
        note.textContent = "🎵";

        const letterRect = letter.getBoundingClientRect();
        note.style.left = (letterRect.left + Math.random() * letterRect.width) + "px";
        note.style.top = (letterRect.top + letterRect.height / 2) + "px";

        document.body.appendChild(note);
        setTimeout(() => note.remove(), 2000);
      }, 500);
    }

    if (seal) {
      seal.style.opacity = "0";
      seal.style.pointerEvents = "none";
    }

    // --- Typing Effect with HTML Tag Support ---
    const letterText = document.getElementById("letter-text");
    const fullText = letterText.getAttribute("data-text");
    letterText.innerHTML = "";

    let i = 0;
    const typingInterval = setInterval(() => {
      if (fullText[i] === "<") {
        let tag = "";
        while (fullText[i] !== ">") {
          tag += fullText[i];
          i++;
        }
        tag += ">";
        letterText.innerHTML += tag;
        i++;
      } else {
        letterText.innerHTML += fullText[i];
        i++;
      }

      if (i >= fullText.length) {
        clearInterval(typingInterval);
        nextBtn.style.display = "inline-block";
      }
    }, 30);
  }
});

// --- Transition: Page 2 to Page 3 (Full Stop) ---
nextBtn.addEventListener("click", () => {
  if (musicNoteInterval) clearInterval(musicNoteInterval);
  
  // Stop and reset the music for a clean transition
  if (bgMusic) {
    bgMusic.pause(); // Explicitly pause playback
    bgMusic.currentTime = 0; // Reset track position
  }
  
  page2.style.display = "none";
  page3.style.display = "flex";
});