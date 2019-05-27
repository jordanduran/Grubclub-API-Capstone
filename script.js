"use strict";

const apiKey = "349663521c54290d738104ae169b3adf";

function findRest(searchInput) {
  fetch(`https://developers.zomato.com/api/v2.1/search?q=${searchInput}`, {
    headers: {
      "user-key": apiKey
    }
  })
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson));
}

function watchForm() {
  $("#js-form").submit(event => {
    event.preventDefault();
    let searchInput = $("#user-search").val();
    findRest(searchInput);
  });
}

function displayResults(responseJson) {
  console.log(responseJson);
  let restsHtml = "";
  for (let i = 0; i < responseJson.restaurants.length; i++) {
    let restHtml = `
            <h3>${responseJson.restaurants[i].restaurant.name}</h3>
            <address>${
              responseJson.restaurants[i].restaurant.location.address
            }</address>
            <p id="form-p">${responseJson.restaurants[i].restaurant.user_rating.votes} vote(s)</p>
            <h4>${responseJson.restaurants[i].restaurant.user_rating.rating_text}</h4>
            <a href="${
              responseJson.restaurants[i].restaurant.url
            }" id="form-a" target ="_blank">Click here for more details!</a>
            
        `;
    fetch(
      `https://developers.zomato.com/api/v2.1/restaurant?res_id=${
        responseJson.restaurants[i].restaurant.R.res_id
      }`,
      {
        headers: {
          "user-key": apiKey
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => console.log(responseJson));
    restsHtml += restHtml;
  }
  $("#results").html(restsHtml);
}

$(function() {
  console.log("App loaded! Waiting for submit!");
  watchForm();
});
