import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './js/bikeService';

function clearFields() {
  $('#location').val("");
  $('.showErrors').text("");
  $('#stats').html("");
}

function getStats(response2, location) {
  let percentage;
  percentage = response2.proximity /response2.stolen*100;
  $('#stats').append(`<h3>Stats for ${location}:</h3>`);
  $('#stats').append(`<ul>
    <li>non: ${response2.non}</li>
    <li>stolen: ${response2.stolen}</li>
  <li>proximity: ${response2.proximity}</li>
  <li>Your location represents ${percentage.toFixed(2)}% of all stolen bikes in the database</li>
  </ul>
  `);
}

function getElements(response) {
  $('.output').append("<h2>Stolen bikes in your search area</h2>");
  if (response.bikes) {
    for (let i = 0; i < 25; i++) {
      if (!response.bikes[i].description) {
        response.bikes[i].description = "No description listed.";
      }
      if (!response.bikes[i].large_img) {
        response.bikes[i].large_img = "https://via.placeholder.com/300";
      }



      $('.output').append(`
      <div class="col-sm-6">
        <div class="card m-2" id="bike-${i}">
          <img class="card-img-top" src="${response.bikes[i].large_img}" alt="bike image">
          <div class="card-body">
            <h5 class="card-title">${response.bikes[i].title}</h5>
            <p class="card-text">${response.bikes[i].description}</p>
            <a href="${response.bikes[i].url}" class="btn btn-primary">Details</a>
          </div>
        </div>
        </div>
        `)
    }
  } else {
    $('.showErrors').text(`There was an error: ${response.error}`);
    $('.showErrors').slideToggle();
  }
}

async function makeApiCall(location) {
  const response = await BikeService.getLocalBikes(location);
  getElements(response);
  const response2 = await BikeService.getStolenBikes(location);
  getStats(response2, location);
}


$(document).ready(function () {
  $('#submit').click(function () {
    let location = $('#location').val();
    clearFields();
    makeApiCall(location);
  });
});