document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-messge");

  const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e"; //env variables

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    // it may throw an error
    // server/database is always in another continent

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error(" City Not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    //unlock the display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
});

// Weather script placeholder (you can connect API in script2.js)
    // --- Chatbot functionality ---
    // const chatToggleBtn = document.getElementById("chat-toggle-btn");
    // const chatbot = document.getElementById("chatbot");
    // const chatInput = document.getElementById("chat-input");
    // const chatMessages = document.getElementById("chat-messages");
    // const sendBtn = document.getElementById("send-btn");

    // chatToggleBtn.addEventListener("click", () => {
    //   chatbot.classList.toggle("open");
    // });

    // function appendMessage(msg, sender) {
    //   const msgDiv = document.createElement("div");
    //   msgDiv.className = `chat-msg ${sender}-msg`;
    //   msgDiv.textContent = msg;
    //   chatMessages.appendChild(msgDiv);
    //   chatMessages.scrollTop = chatMessages.scrollHeight;
    // }

    // sendBtn.addEventListener("click", () => {
    //   const msg = chatInput.value.trim();
    //   if (msg === "") return;
    //   appendMessage(msg, "user");
    //   chatInput.value = "";

    //   setTimeout(() => {
    //     appendMessage("I'm just a demo bot. How can I help you?", "bot");
    //   }, 600);
    // });

    // chatInput.addEventListener("keypress", (e) => {
    //   if (e.key === "Enter") sendBtn.click();
    // });
