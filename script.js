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

const modernHistoryQuotes = [
  "\"We are not makers of history. We are made by history.\" – Martin Luther King Jr.",
  "\"Injustice anywhere is a threat to justice everywhere.\" – Martin Luther King Jr.",
  "\"If you’re not ready to die for it, put the word ‘freedom’ out of your vocabulary.\" – Malcolm X",
  "\"The great masses of the people will more easily fall victims to a big lie than to a small one.\" – Adolf Hitler",
  "\"Power tends to corrupt, and absolute power corrupts absolutely.\" – Lord Acton",
  "\"Propaganda is not meant to fool the intelligentsia, but to provide them an excuse not to see.\" – Joseph Goebbels",
  "\"The only thing necessary for the triumph of evil is for good men to do nothing.\" – Edmund Burke",
  "\"Never in the field of human conflict was so much owed by so many to so few.\" – Winston Churchill",
  "\"I have nothing to offer but blood, toil, tears and sweat.\" – Winston Churchill",
  "\"Peace for our time.\" – Neville Chamberlain (1938)",
  "\"The victor will never be asked if he told the truth.\" – Adolf Hitler",
  "\"Let the people of Iran decide their own fate.\" – Mohammad Mossadegh",
  "\"We will export our revolution to the whole world.\" – Ayatollah Khomeini",
  "\"We are not afraid of economic sanctions or military intervention. We are not afraid of war.\" – Mahmoud Ahmadinejad",
  "\"History is a set of lies agreed upon.\" – Napoleon Bonaparte",
  "\"A generation which ignores history has no past and no future.\" – Robert Heinlein",
  "\"To understand the present, you have to understand the past.\" – Carl Sagan",
  "\"The past is not dead. It is not even past.\" – William Faulkner"
];

function displayRandomQuote() {
  const quoteElement = document.getElementById('quote');
  const randomIndex = Math.floor(Math.random() * modernHistoryQuotes.length);
  quoteElement.innerHTML = modernHistoryQuotes[randomIndex];
}

window.addEventListener('load', displayRandomQuote);

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



