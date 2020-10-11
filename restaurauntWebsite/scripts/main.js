
var divShown = "homeContainer";
var divToShow = "homeContainer";

function changeContents(divToShow) {
  document.getElementById(divShown).style.display = "none";
  document.getElementById(divToShow).style.display = "block";
  divShown= divToShow;
}
