// console.log("Script loaded successfully");

// document.querySelectorAll('.nav-item').forEach(link => {
//   link.addEventListener('click', function(e) {
//     e.preventDefault();
//     const targetId = this.getAttribute('href').substring(1);
//     const targetElement = document.getElementById(targetId);

//     if (targetElement) {
//       window.scrollTo({
//         top: targetElement.offsetTop - 70, // Adjust for fixed nav height
//         behavior: 'smooth'
//       });

//       if (targetId === 'test') {
//         // Highlight immediately after scroll
//         setTimeout(() => highlightCivilRightsHeading(), 500); // Delay slightly to match scroll
//       }

//       // Optional: update the hash manually to make back/forward buttons work
//       history.pushState(null, "", `#${targetId}`);
//       console.log(`Navigated to ${targetId}`);
//     }
//   });
// });

// function highlightCivilRightsHeading() {
//   const id = window.location.hash.substring(1);
//   if (id === "test") {
//     const section = document.getElementById(id);
//     const heading = section?.querySelector("h1");
//     if (heading) {
//       heading.classList.add("highlighted");
//       setTimeout(() => heading.classList.remove("highlighted"), 2000);
//     }
//   }
// }

// window.addEventListener("hashchange", highlightCivilRightsHeading);
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.topic-card').forEach(card => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  observer.observe(card);
});



