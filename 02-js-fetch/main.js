console.log("JS Fetch");

const category = document.querySelector("#category");
const display = document.querySelector("#joke-display");
const getJokeButton = document.querySelector("#get-joke");

getJokeButton.addEventListener("click", function () {
  // 1. SELECT A CATEGORY
  const selectedCategory = category.value;

  // 2. URL TO FETCH A JOKE FROM THE SELECTED CATEGORY
  const url = `https://api.chucknorris.io/jokes/random?category=${selectedCategory}`;

  console.log("🔜 Requesting a joke from a category.");
  console.log(selectedCategory);

  // 3. FETCH A RANDOM JOKE FROM THAT CATEGORY
  fetch(url)
    .then(function (response) {
      console.log("📢 Response received");
      console.log(response);

      return response.json();
    })
    .then(function (data) {
      console.log("✅ Joke data received.");
      console.log(data);

      // 4. DISPLAY THE JOKE
      display.textContent = data.value;
    });

  console.log("This is the end of the request. 🔚");
});
