const apiKey = "aCsseKRnikY1LGoyVn5+pA==mAIPwmBlSbtKIiJE";
const services = ["netflix", "hbo", "disney", "skyshowtime"];

const votes = {
  netflix: 0,
  hbo: 0,
  disney: 0,
  skyshowtime: 0,
};

// FETCH CURRENT VOTES ON PAGE LOAD
services.forEach((service) => {
  fetch(`https://api.api-ninjas.com/v1/counter?id=${service}&hit=true`, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      Accept: "application/json",
    },
  })
    // Add more error messages for handling different situations
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errData) => {
          const message = errData.error || "Unknown error";
          console.error(`API error ${response.status}: ${message}`);
          throw new Error(message);
        });
      }
      return response.json();
    })

    .then((data) => {
      votes[service] = data.value;
      document.querySelector(`#votes-${service}`).textContent = votes[service];
    })

    .catch((err) => {
      if (err instanceof TypeError) {
        console.error(
          `Network error: Could not reach the API for ${service} (server might be down).`
        );
      } else {
        console.error(`Error voting for ${service}: ${err.message}`);
      }
    });
});

// CREATE THE 'VOTE' BUTTONS
const voteNetflix = document.querySelector("#netflix");
const voteHboMax = document.querySelector("#hbo");
const voteDisney = document.querySelector("#disney");
const voteSkyShowtime = document.querySelector("#skyshowtime");

const buttonNetflix = document.createElement("button");
buttonNetflix.textContent = "Vote";
const buttonHboMax = document.createElement("button");
buttonHboMax.textContent = "Vote";
const buttonDisney = document.createElement("button");
buttonDisney.textContent = "Vote";
const buttonSkyShowtime = document.createElement("button");
buttonSkyShowtime.textContent = "Vote";

voteNetflix.appendChild(buttonNetflix);
voteHboMax.appendChild(buttonHboMax);
voteDisney.appendChild(buttonDisney);
voteSkyShowtime.appendChild(buttonSkyShowtime);

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

// FUNCTION TO VOTE FOR A SERVICE
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
