document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var isFromSaved = urlParams.get("saved");
    const btnSave = document.getElementById("save");
    const preloader = document.getElementById('preloader');
    if (isFromSaved) {
      btnSave.style.display = 'none';
      preloader.style.display = 'none';
      getSavedTeamById();
    } else {
      var item = loadTeamById();
    }
    btnSave.onclick = function() {
      console.log("Berhasil disimpan");
      item.then(function (team) {
          saveForLater(team);
          btnSave.style.display = 'none'
      });
    }
});