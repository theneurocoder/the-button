import { data } from "./data.js";

import { calculateCompatibility, findBestMatch } from "./matching.js";

const theButtonLoginForm = document.getElementById("the-button-login-form");
const bestMatchDescription = document.getElementById("best-match-description");
const bestMatchPercentageContainer = document.getElementById(
  "best-match-percentage-container",
);
const bestMatchPercentageNumber = document.getElementById(
  "best-match-percentage-number",
);
const bestMatchPercentageBar = document.getElementById(
  "best-match-percentage-bar",
);
const bufferingPercentageContainer = document.getElementById(
  "buffering-percentage-container",
);
const bufferingPercentageNumber = document.getElementById(
  "buffering-percentage-number",
);
const bufferingPercentageBar = document.getElementById(
  "buffering-percentage-bar",
);

theButtonLoginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const loggedInEmail = document.getElementById("email").value;
  // Get all people and weights
  const people = data.people;
  const weights = data.weights;

  // Find person being matched
  const person = people.find((person) => person.email === loggedInEmail);

  theButtonLoginForm.classList.remove("displayed");
  bufferingPercentageContainer.classList.add("displayed");

  // Display buffering percentage as number and bar
  let bufferingNumber = 0;

  const bufferingInterval = setInterval(() => {
    if (bufferingNumber < 100) {
      bufferingNumber += 1;

      bufferingPercentageNumber.textContent = bufferingNumber;
      bufferingPercentageBar.style.width = bufferingNumber + "%";
    }

    // Display match after buffering is complete
    if (bufferingNumber === 100) {
      clearInterval(bufferingInterval);

      setTimeout(() => {
        bufferingPercentageContainer.classList.remove("displayed");
        bestMatchDescription.classList.add("displayed");
        if (person) {
          const bestMatch = findBestMatch(person, people, weights);

          // Add description of match
          bestMatchDescription.innerHTML = `<p>You have been matched with <strong>${bestMatch.first_name} ${bestMatch.last_name}</strong>!</p> ${bestMatch.first_name} is <strong>${bestMatch.religion}</strong> and votes <strong>${bestMatch.political_affiliation}</strong>.
${bestMatch.pronoun_subjective}${bestMatch.copula} <strong>${bestMatch.career}</strong>. ${bestMatch.pronoun_subjective} love${bestMatch.conjugation} <strong>${bestMatch.favourite_animal}</strong> and like${bestMatch.conjugation} to eat <strong>${bestMatch.favourite_food}</strong>. ${bestMatch.pronoun_possessive} favourite hobby is <strong>${bestMatch.hobby}</strong>.
${bestMatch.pronoun_subjective} love${bestMatch.conjugation} watching <strong>${bestMatch.favourite_movie_genre}</strong> movies and listening to <strong>${bestMatch.favourite_music_genre}</strong> music.
<p>${bestMatch.first_name} is an <strong>${bestMatch.personality_type}</strong> and a <strong>${bestMatch.sleep_pattern}</strong>. ${bestMatch.pronoun_subjective} need${bestMatch.conjugation} <strong>${bestMatch.stress_response}</strong> during times of stress. ${bestMatch.pronoun_subjective} work${bestMatch.conjugation} out <strong>${bestMatch.fitness_routine}</strong>, use${bestMatch.conjugation} social media <strong>${bestMatch.social_media_activity}</strong>, and like${bestMatch.conjugation} <strong>${bestMatch.sense_of_humour} humour</strong> and <strong>${bestMatch.travel_preference}</strong>.
</p><p>We’re positive that you’re going to fall in love with ${bestMatch.first_name}. Send ${bestMatch.pronoun_objective} a message at <strong>${bestMatch.phone}</strong> now!</p>`;

          bestMatchPercentageContainer.classList.add("displayed");

          // Add compatibility percentage number
          bestMatchPercentageNumber.textContent = bestMatch.compatibility;

          // Add compatibility percentage bar
          requestAnimationFrame(() => {
            bestMatchPercentageBar.style.width = bestMatch.compatibility + "%";
          });
        } else {
          // If user is not found, display notice
          bestMatchDescription.innerHTML = `<div id="person-not-found">Sorry, you <strong>do not exist</strong>!</div>`;
        }
      }, 1000);
    }
  }, 20);
});
