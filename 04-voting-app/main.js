const apiKey = "aCsseKRnikY1LGoyVn5+pA==mAIPwmBlSbtKIiJE";
const services = ["netflix", "hbo", "disney", "skyshowtime"];

const votes = {
  netflix: 0,
  hbo: 0,
  disney: 0,
  skyshowtime: 0,
};

// Fetch current votes on page load
services.forEach((service) => {
  fetch(`https://api.api-ninjas.com/v1/counter?id=${service}`, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      votes[service] = data.value || 0;
      document.querySelector(`#votes-${service}`).textContent = votes[service];
    })
    .catch((err) => console.error(`Error fetching votes for ${service}:`, err));
});

// Create buttons and append them
const voteNetflix = document.querySelector("#netflix");
const voteHboMax = document.querySelector("#hbo");
const voteDisney = document.querySelector("#disney");
const voteSkyShowtime = document.querySelector("#skyshowtime");

// Create vote buttons using document.createElement
const buttonNetflix = document.createElement("button");
buttonNetflix.textContent = "Vote";
const buttonHboMax = document.createElement("button");
buttonHboMax.textContent = "Vote";
const buttonDisney = document.createElement("button");
buttonDisney.textContent = "Vote";
const buttonSkyShowtime = document.createElement("button");
buttonSkyShowtime.textContent = "Vote";

// Append the buttons to the respective divs using appendChild
voteNetflix.appendChild(buttonNetflix);
voteHboMax.appendChild(buttonHboMax);
voteDisney.appendChild(buttonDisney);
voteSkyShowtime.appendChild(buttonSkyShowtime);

// Add event listeners to the buttons
buttonNetflix.addEventListener("click", function () {
  voteForService("netflix", buttonNetflix);
});

buttonHboMax.addEventListener("click", function () {
  voteForService("hbo", buttonHboMax);
});

buttonDisney.addEventListener("click", function () {
  voteForService("disney", buttonDisney);
});

buttonSkyShowtime.addEventListener("click", function () {
  voteForService("skyshowtime", buttonSkyShowtime);
});

// Function to vote for each service
function voteForService(service, buttonElement) {
  fetch(`https://api.api-ninjas.com/v1/counter?id=${service}&hit=true`, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      votes[service] = data.value;
      document.querySelector(`#votes-${service}`).textContent = votes[service];
    })
    .catch((err) => console.error(`Error voting for ${service}:`, err));
}
