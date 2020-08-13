document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var isFromSaved = urlParams.get("saved");
    const btnSave = document.getElementById("save");
    const preloader = document.getElementById('preloader');
    if (isFromSaved) {
      btnSave.style.display = 'none';
      preloader.style.display = 'none';
      getSavedMatchById();
    } else {
      var item = loadMatchById();
    }
    btnSave.onclick = function() {
        item.then(function (match) {
            saveMatchSchedule(match);
            btnSave.style.display = 'none'
        });
    }
});