const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

/* MOBILE MENU */

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

/* YEAR */

document.getElementById("year").textContent =
  new Date().getFullYear();

/* ACTIVE NAVIGATION */

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const sectionTop = section.offsetTop - 200;

    if (window.scrollY >= sectionTop) {
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

/* CONTACT FORM */

const contactForm =
  document.getElementById("contactForm");

const formNote =
  document.getElementById("formNote");

const sendBtn =
  document.getElementById("sendBtn");

if (contactForm) {

  contactForm.addEventListener("submit",
  async (e) => {

    e.preventDefault();

    formNote.textContent = "Sending Message...";
    sendBtn.disabled = true;

    const formData =
      new FormData(contactForm);

    try {

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {

        formNote.innerHTML =
          "Message Sent Successfully ✅";

        contactForm.reset();

      } else {

        formNote.innerHTML =
          "Failed ❌ Try Again";

      }

    } catch (error) {

      formNote.innerHTML =
        "Network Error ❌";

    }

    sendBtn.disabled = false;

  });

}

/* 3D MOUSE EFFECT */

const cards =
  document.querySelectorAll(
    ".floating-card, .skill-box, .project-card"
  );

cards.forEach((card) => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY =
      ((x / rect.width) - 0.5) * 20;

    const rotateX =
      ((y / rect.height) - 0.5) * -20;

    card.style.transform =
      `perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)`;

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

  });

});