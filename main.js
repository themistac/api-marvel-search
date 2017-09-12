"use strict";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSuperhero(e) {
  let xmlhttp = new XMLHttpRequest();
  let superhero = document.getElementById('superhero').value;

  let url = 'https://gateway.marvel.com/v1/public/characters?nameStartsWith=' + superhero + '&ts=1504789273&apikey=96378d5ecc12e084d5fa869c01274af2&hash=aecfc07b87f3b3fbac0041ccee5cba60';

  e.preventDefault();

  xmlhttp.open("GET", url, true);

  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          let response = JSON.parse(xmlhttp.responseText);
          let output = '';

          let totalRecords = response.data.results.length;
          let randomSuperhero = getRandomInt(0, totalRecords - 1);

          let backgroundSuperheroPath = response.data.results[randomSuperhero].thumbnail.path;
          let backgroundSuperheroExtension = response.data.results[randomSuperhero].thumbnail.extension;
          let backgroundSuperheroImage = backgroundSuperheroPath + '.' + backgroundSuperheroExtension;
          // console.log(randomSuperhero);
          // console.log(backgroundSuperheroPath + '.' + backgroundSuperheroExtension);
          document.getElementById('blur').style.backgroundImage = 'url(' + backgroundSuperheroImage + ')';

          for (let i = 0; i < response.data.results.length; i++) {
            output += '<div class="card">';
            output += '<div class="image" style="background-image: url(' + response.data.results[i].thumbnail.path + '.' + response.data.results[i].thumbnail.extension + ');"></div>';
            output += '<h2><a href="' + response.data.results[i].urls[0].url + '">' + response.data.results[i].name + '</a></h2>';
            output += '<p>' + response.data.results[i].description + '</p>';
            output += '</div>';
          }
          document.getElementById('marvel').innerHTML = output;
      }
  };
  xmlhttp.send();

  return false;
}
