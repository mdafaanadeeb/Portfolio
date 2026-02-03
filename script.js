const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.getElementById("year").textContent = new Date().getFullYear();

// Active link highlight on scroll
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
});

// Web3Forms Contact Form (WORKING)
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const sendBtn = document.getElementById("sendBtn");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  formNote.textContent = "Sending...";
  sendBtn.disabled = true;
  sendBtn.style.opacity = "0.7";

  const formData = new FormData(contactForm);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      formNote.textContent = "Message sent successfully ✅";
      contactForm.reset();
    } else {
      formNote.textContent = "Failed to send message ❌ Please try again.";
    }
  } catch (error) {
    formNote.textContent = "Error ❌ Please check your internet and try again.";
  }

  sendBtn.disabled = false;
  sendBtn.style.opacity = "1";
});