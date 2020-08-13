let dbPromised = idb.open("daily-match", 1, function(upgradeDb) {
    let teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id",
    });
    let matchObjectStore = upgradeDb.createObjectStore("matches", {
        keyPath: "id",
    })

    //create team
    teamsObjectStore.createIndex("id", "id", { unique: true });
    teamsObjectStore.createIndex("shortName", "shortName", { unique: false });
    teamsObjectStore.createIndex("name", "name", { unique: false });
    //Create match 
    matchObjectStore.createIndex("id", "id", { unique: false });

});

const saveForLater = (team) => {
    dbPromised
    .then(function(db) {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        store.put(team);
        const toastHTML = '<span>Team pilihan anda telah berhasil disimpan, cek pada halaman Saved.</span>';
        M.toast({html: toastHTML});
        return tx.complete;
    })
    .then(function() {
        console.log("Team favorit berhasil di simpan.");
    })
}

const getAll = () => {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            let tx = db.transaction("teams", "readonly");
            let store = tx.objectStore("teams");
            return store.getAll();
        })
        .then(function(teams) {
            resolve(teams);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

const getById = (id) => {
    const idNumber = Number(id);
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction(["teams"], "readonly");
          let store = tx.objectStore("teams");
          const objTeam = store.get(idNumber);
          return objTeam;
        })
        .then(function(team) {
          resolve(team);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

const deleteSavedTeamById = (id) => {
    console.log(id)
    const idNumber = Number(id);
    dbPromised
    .then(function(db) {
        let tx = db.transaction('teams', 'readwrite');
        let store = tx.objectStore('teams');
        store.delete(idNumber);
        const toastHTML = '<span>Team berhasil dihapus dari daftar team yang disimpan.</span>';
        M.toast({html: toastHTML});
        return tx.complete;
    })
    .then(function() {
        console.log('Team berhasil dihapus');
    });
}

const saveMatchSchedule = (match) => {
    dbPromised
    .then(function(db) {
        let tx = db.transaction("matches", "readwrite");
        let store = tx.objectStore("matches");
        console.log(store);
        store.put(match.match);
        const toastHTML = '<span>Jadwal pertandingan berhasil disimpan, cek di halaman Saved</span>';
        M.toast({html: toastHTML});
        return tx.complete;
    })
    .then(function() {
        console.log("Jadwal pertandingan berhasil disimpan.");
    })
}

const getAllSavedMatches = () => {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            let tx = db.transaction("matches", "readonly");
            let store = tx.objectStore("matches");
            return store.getAll();
        })
        .then(function(matches) {
            resolve(matches);
        })
        .catch(function(error) {
            reject(error);
        })
    })
}

const getMatchById = (id) => {
    const idNumber = Number(id);
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction(["matches"], "readonly");
          let store = tx.objectStore("matches");
          const objTeam = store.get(idNumber);
          return objTeam;
        })
        .then(function(team) {
          resolve(team);
        })
        .catch(function(error) {
            reject(error)
        })
    })
}

const deleteSavedMatchById = (id) => {
    const idNumber = Number(id);
    dbPromised
    .then(function(db) {
        let tx = db.transaction('matches', 'readwrite');
        let store = tx.objectStore('matches');
        store.delete(idNumber);
        const toastHTML = '<span>Jadwal pertandingan berhasil dihapus dari daftar jadwal yang disimpan.</span>';
        M.toast({html: toastHTML});
        return tx.complete;
    })
    .then(function() {
        console.log('Jadwal pertandingan berhasil dihapus');
    });
};