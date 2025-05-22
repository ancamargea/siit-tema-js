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
  fetch(`https://api.api-ninjas.com/v1/counter?id=${service}`, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      Accept: "application/json",
    },
  })
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
        console.error(`Network error: Could not reach the API for ${service}.`);
      } else {
        console.error(`Error loading votes for ${service}: ${err.message}`);
      }
    });
});

// CREATE THE 'VOTE' BUTTONS
const voteNetflix = document.querySelector("#netflix");
const voteHboMax = document.querySelector("#hbo");
const voteDisney = document.querySelector("#disney");
const voteSkyShowtime = document.querySelector("#skyshowtime");

const buttonNetflix = document.createElement("button");
buttonNetflix.textContent = "Add Vote";
const buttonHboMax = document.createElement("button");
buttonHboMax.textContent = "Add Vote";
const buttonDisney = document.createElement("button");
buttonDisney.textContent = "Add Vote";
const buttonSkyShowtime = document.createElement("button");
buttonSkyShowtime.textContent = "Add Vote";

voteNetflix.appendChild(buttonNetflix);
voteHboMax.appendChild(buttonHboMax);
voteDisney.appendChild(buttonDisney);
voteSkyShowtime.appendChild(buttonSkyShowtime);

buttonNetflix.addEventListener("click", () =>
  voteForService("netflix", buttonNetflix)
);
buttonHboMax.addEventListener("click", () =>
  voteForService("hbo", buttonHboMax)
);
buttonDisney.addEventListener("click", () =>
  voteForService("disney", buttonDisney)
);
buttonSkyShowtime.addEventListener("click", () =>
  voteForService("skyshowtime", buttonSkyShowtime)
);

// FUNCTION TO VOTE FOR A SERVICE
function voteForService(service, buttonElement) {
  buttonElement.disabled = true;
  const originalText = buttonElement.textContent;
  buttonElement.textContent = "Voting...";

  fetch(`https://api.api-ninjas.com/v1/counter?id=${service}&hit=true`, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errData) => {
          const message = errData.error || "Unknown error";
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
      console.error(`Error voting for ${service}: ${err.message}`);
    })
    .finally(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = originalText;
    });
}
