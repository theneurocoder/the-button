// Function to calculate compatibility between user and all users in data
export function calculateCompatibility(person1, person2, weights) {
  let totalScore = 0;

  // Calculate maximum possible score
  const maxScore = Object.values(weights).reduce(
    (total, weight) => total + weight,
    0,
  );

  const qualities = Object.keys(weights);

  // Loop over qualities to calculate match score
  for (let i = 0; i < qualities.length; i++) {
    const quality = qualities[i];

    const value1 = person1[quality];
    const value2 = person2[quality];
    const weight = weights[quality];

    // Award points when values match
    if (value1 === value2) {
      totalScore += weight;
    }
  }

  // Convert score into a percentage with two decimal places
  const percentage = (totalScore / maxScore) * 100;
  return Number(percentage.toFixed(2));
}

// Function to find the person with the highest compatibility score
export function findBestMatch(person, people, weights) {
  let bestMatch = null;
  let highestScore = -1;

  for (let i = 0; i < people.length; i++) {
    const candidate = people[i];

    // Skip the person looking for a match
    if (candidate.email === person.email) {
      continue;
    }

    // Call calculateCompatibility function for each candidate
    const compatibility = calculateCompatibility(person, candidate, weights);

    // Compare each candidate and keep track of person with highest score
    if (compatibility > highestScore) {
      highestScore = compatibility;

      // Create bestMatch object with all qualities of the candidate plus a new property with compatibility store
      bestMatch = {
        ...candidate,
        compatibility: compatibility,
      };
    }
  }

  // If the best match has score below 90%, make it between 90% and 95%.
  if (bestMatch.compatibility < 90) {
    bestMatch.compatibility = (Math.random() * (95 - 90) + 90).toFixed(2);
  }
  return bestMatch;
}
