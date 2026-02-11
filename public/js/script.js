// --- Floating Hearts Logic ---
const heartsContainer = document.querySelector(".hearts");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  // Randomize size and position
  const heartSize = 15 + Math.random() * 20;
  heart.style.width = heartSize + "px";
  heart.style.height = heartSize + "px";
  heart.style.left = Math.random() * 100 + "%";

  // Start slightly below the screen
  heart.style.bottom = "-50px";

  // Randomize float speed (between 3s and 7s)
  const duration = 3 + Math.random() * 4;
  heart.style.animationDuration = duration + "s";

  // Randomly pick color: yellow or white
  const colors = ["#FFD700", "#FFFFFF"];
  heart.style.background = colors[Math.floor(Math.random() * colors.length)];

  // Ensure pseudo-elements inherit color
  heart.style.setProperty("--heart-color", heart.style.background);

  heartsContainer.appendChild(heart);

  // Remove heart from DOM after animation
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// Generate a heart every 300ms
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
const bgMusic = document.getElementById("bg-music"); // <-- audio element

// --- No Button Logic (Escalation) ---
const answers_no = {
  english: [
    "No",
    "Bebo!! Are you sure?",
    "Are you really sure??",
    "My Kanmaniiiii, Please?",
    "Are you really really sure???",
    "Beboooooo..Think again?",
    "Don't believe in second chances?",
    "Why are you being so cold?",
    "Maybe we can talk about it?",
    "I am not going to ask again!",
    "Ok now this is hurting my feelings!",
    "You are now just being mean!",
    "Why are you doing this to me?",
    "Please give me a chance, Bebo!",
    "I am begging you to stop!",
    "Ok, let's just start over.."
  ]
};

let index = 0;
let size = 40;

noBtn.addEventListener("click", () => {
  // Update to 'no' gif
  banner.src = "./public/images/no.gif";

  // Cycle through text messages
  index = (index + 1) % answers_no.english.length;
  noBtn.textContent = answers_no.english[index];

  // Increase Yes button size with cap
  if (size < 200) {
    size += 15;
    yesBtn.style.height = size + "px";
    yesBtn.style.fontSize = (size / 4) + "px";
  }
});

// --- Transition: Page 1 to Page 2 ---
yesBtn.addEventListener("click", () => {
  page1.style.display = "none";
  page2.style.display = "flex";

  // Reset banner
  banner.src = "./public/images/yes.gif";

  // Play background music softly
 if (bgMusic) {
  bgMusic.volume = 0.3;
  bgMusic.play().catch(() => console.log("Autoplay blocked"));

  // Create floating music notes every 500ms
  const musicNoteInterval = setInterval(() => {
    const note = document.createElement("div");
    note.classList.add("music-note");
    note.textContent = "🎵";
    
    // Position relative to the letter
    const letterRect = letter.getBoundingClientRect();
    note.style.left = (letterRect.left + letterRect.width / 2) + "px";
    note.style.top = (letterRect.top + letterRect.height / 2) + "px";

    document.body.appendChild(note);

    // Remove note after animation
    setTimeout(() => {
      note.remove();
    }, 2000);
  }, 500);

  // Stop creating notes when leaving Page 2
  nextBtn.addEventListener("click", () => clearInterval(musicNoteInterval));
}

});

// --- Interaction: Opening the Envelope ---
envelope.addEventListener("click", () => {
  if (!letter.classList.contains("show")) {
    letter.classList.add("show");

    if (seal) {
      seal.style.opacity = "0";
      seal.style.pointerEvents = "none";
    }

    // Typing effect
    const letterText = document.getElementById("letter-text");
    const fullText = letterText.getAttribute("data-text");
    letterText.textContent = ""; // clear text first

    let i = 0;
    const typingSpeed = 30; // ms per character
    const typingInterval = setInterval(() => {
      letterText.textContent += fullText[i];
      i++;
      if (i >= fullText.length) clearInterval(typingInterval);
    }, typingSpeed);

    setTimeout(() => {
      nextBtn.style.display = "inline-block";
    }, 1000);
  }
});


// --- Transition: Page 2 to Page 3 ---
nextBtn.addEventListener("click", () => {
  page2.style.display = "none";
  page3.style.display = "flex";

  // Pause background music when leaving Page 2
  if (bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }
});
