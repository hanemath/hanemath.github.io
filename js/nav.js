document.addEventListener("DOMContentLoaded", function() {
  
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();
 
  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status !== 200) return;
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });
        document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
          elm.addEventListener("click", function(event) {
            const sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }
  let page = window.location.hash.substr(1);
  if (page === "") page = "home";
  loadPage(page);
  
  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        var content = document.querySelector("#body-content");

        if (page === "home") {
          loadAllMatch();
        } else if (page === "teams") {
          loadAllTeams();
        } else if (page === "saved-teams") {
          getSavedTeams();
          getSavedMatches();
        }

        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
          if(page === "home") {
            loadButton();
          }
        } else if (this.status === 404) {
          console.log("Halaman tidak ditemukan.");
          content.innerHTML = '';
        } else {
          console.log("Ups.. halaman tidak dapat diakses, jaringan offline.");
          content.innerHTML = '';
        }
      }
    };
    xhttp.open("GET", "/pages/" + page + ".html", true);
    xhttp.send();
  }
  
});
