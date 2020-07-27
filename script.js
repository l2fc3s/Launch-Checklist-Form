window.addEventListener("load", function () {
  let form = document.querySelector("form");

  let pilotNameInput = document.querySelector("input[name= pilotName]");
  let copilotNameInput = document.querySelector("input[name= copilotName]");
  let fuelLevelInput = document.querySelector("input[name= fuelLevel]");
  let cargoMassInput = document.querySelector("input[name= cargoMass]");

  let faultyItems = document.getElementById("faultyItems");

  let fuelStatus = document.getElementById("fuelStatus");
  let launchStatus = document.getElementById("launchStatus");
  let cargoStatus = document.getElementById("cargoStatus");
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");

  //Fetching Planetary Data JSON!!
  // see open tabs for reference including github studio
  let missionTarget = document.getElementById("missionTarget");

  fetch("https://handlers.education.launchcode.org/static/planets.json")
    .then((response) => response.json())
    .then((data) => {
      let index = Math.floor(Math.random() * data.length);
      console.log(data);
      missionTarget.innerHTML += `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${data[index].name}</li>
            <li>Diameter: ${data[index].diameter}</li>
            <li>Star: ${data[index].star}</li>
            <li>Distance from Earth: ${data[index].distance}</li>
            <li>Number of Moons: ${data[index].moons}</li>
         </ol>
         <img src="${data[index].image}">         
         `;
    });

  // The pilot and co-pilot names should be strings and the fuel level and cargo mass should be numbers.

  form.addEventListener("submit", function (event) {
    //launch ready check
    if (fuelLevelInput.value >= 10000 && cargoMassInput.value <= 10000) {
      launchStatus.innerHTML = "Shuttle is ready for launch!";
      launchStatus.style.color = "green";
      faultyItems.style.visibility = "hidden";
      event.preventDefault();
    }

    //basic validator & data type validator
    if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" ||cargoMassInput.value === ""
    ) {
      alert("All fields are required!");
      launchStatus.innerHTML = "Awaiting Information Before Launch";
      launchStatus.style.color = "black";
      faultyItems.style.visibility = "hidden";
      event.preventDefault();
    } else if (!isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value)) {
      alert("Please enter a valid Pilot or Co-pilot name");
      launchStatus.innerHTML = "Awaiting Information Before Launch";
      launchStatus.style.color = "black";
      event.preventDefault();
    } else if (isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)) {
      alert("Please enter a valid number for Fuel Level or Cargo Mass");
      launchStatus.innerHTML = "Awaiting Information Before Launch";
      launchStatus.style.color = "black";
      faultyItems.style.visibility = "hidden";
      event.preventDefault();
    }

    // Using template literals, update pilotStatus and copilotStatus to include name.
    pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;

    //Fuel Level and cargo mass safety check.
    if (fuelLevelInput.value < 10000) {
      faultyItems.style.visibility = "visible";
      fuelStatus.innerHTML = "Not enough fuel for the journey.";
      launchStatus.innerHTML = "Shuttle not ready for launch!";
      launchStatus.style.color = "red";
      event.preventDefault();
        if(fuelLevelInput.value === "") {
          launchStatus.innerHTML = "Awaiting Information   Before Launch";
          launchStatus.style.color = "black";
          faultyItems.style.visibility = "hidden";
        }
    } else { // this line is faulty
      fuelStatus.innerHTML = "Fuel level high enough for launch";
      event.preventDefault();
    }

    if (cargoMassInput.value > 10000) {
      faultyItems.style.visibility = "visible";
      cargoStatus.innerHTML =
        "There is too much mass for the shuttle to take off";
      launchStatus.innerHTML = "Shuttle not ready for launch!";
      launchStatus.style.color = "red";
      event.preventDefault();
    } else if(cargoMassInput.value === "") {
      launchStatus.innerHTML = "Awaiting Information   Before Launch";
      launchStatus.style.color = "black";
      faultyItems.style.visibility = "hidden";
    } else if(isNaN(cargoMassInput.value)) {
      launchStatus.innerHTML = "Awaiting Information   Before Launch";
      launchStatus.style.color = "black";
      faultyItems.style.visibility = "hidden";
    } else {
      cargoStatus.innerHTML = "Cargo mass low enough for launch.";
      event.preventDefault();
    }
    
    if(pilotNameInput.value === "" || isNaN(pilotNameInput.value) === false) {
      launchStatus.innerHTML = "Awaiting Information   Before Launch";
      launchStatus.style.color = "black";
      faultyItems.style.visibility = "hidden";
    } else if (copilotNameInput.value === "" || isNaN(copilotNameInput.value) === false) {
      launchStatus.innerHTML = "Awaiting Information   Before Launch";
      launchStatus.style.color = "black";
      faultyItems.style.visibility = "hidden";
    }

  });
});
