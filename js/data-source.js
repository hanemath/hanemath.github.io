const base_url = 'https://api.football-data.org/';

const accessApi = {
    method: 'GET',
    headers: {
        "X-Auth-Token" : "98395c8532044789ad08eb421ef24a37"
    }
}

const fetchApi = (urlApi) => {
    return fetch(urlApi, accessApi);
}

const status = (response) => {
    const preloader = document.getElementById('preloader');
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        preloader.style.display = 'none';
        return Promise.reject(new Error(response.statusText));
    } else {
        preloader.style.display = 'none';
        return Promise.resolve(response);
    }
}

const preloadercache = (response) => {
    const preloader = document.getElementById('preloader');
    if (response.status == 200) {
        preloader.style.display = 'none';
    } else {
        preloader.style.display = 'none';
        console.log('an error occured from reading data from cache');
    }
}

const json = (response) => {
    return response.json();
}

const error = (error) => {
    console.log("Error : " + error);
}

const replaceHttp = (urlOld) => {
    return urlOld.replace(/^http:\/\//i, 'https://');
}

//FUNCTIONS FOR EACH COMPONENT (CARD, TABLE, ETC USED IN FETCH & CACHE)
const buildCardTeam = (responseJson) => {
    const dataTeam = responseJson;
    console.log(dataTeam)
    const crestUrl = (dataTeam.crestUrl) ? replaceHttp(dataTeam.crestUrl) : '../images/no-pict.png';

    const contentModalElement = document.querySelector('.content');
    contentModalElement.innerHTML = "";
    contentModalElement.innerHTML += `
    <div class="modal-header">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat"><h4>X</h4></a>
    </div>
    `;
    
    const teamElement = document.createElement('div');
    teamElement.className += 'container';
    teamElement.innerHTML = "";
    teamElement.innerHTML += `
    <div class="modal-content">
        <div class="row team-card">
            <div class="col s12 m4 offset-m4">
                <img class="col s8 offset-s2 m12" src="${crestUrl}" onerror="imgError(this)">
            </div>
            <div class="col m12 s12">
                <h5 class="col s12 m12 center-align">${dataTeam.name}</h5>
                <a href="./team.html?id=${dataTeam.id}" class="waves-effect waves-light btn-small">See This Team</a>
                <div class="row col s12 m12">
                    <h6>Called by their shortname ${dataTeam.shortName}. 
                    This club was found in year ${dataTeam.founded}. 
                    Their address is in ${dataTeam.address}
                    </h6>
                </div>
                <div class="col m12 s12">
                    <h6 class="center-align"><a href"${dataTeam.website}">see their website here</a></h6>
                </div>
            </div>
        </div>
    </div>
    `;
    contentModalElement.appendChild(teamElement);
}

const buildStandingComponent = (responseJson) => {
    const datatext = responseJson;
    const winner = datatext.season.winner;
    if (winner === null){
        winnerTeam = 'ongoing match';
    } else {
        winnerTeam = `won by ${datatext.season.winner.name}`;
    }

    const tabElems = document.querySelector('.tab-content');
    tabElems.innerHTML = "";
    const tabContent = document.createElement('div');
    tabContent.className += 'row tab-render';
    tabContent.innerHTML += `
    <div class="col s12">
        <ul class="tabs">
            <li class="tab col s6 m6"><a class="active" href="#test1">Competition</a></li>
            <li class="tab col s6 m6"><a href="#test2">Standing</a></li>
        </ul>
    </div>
    <div id="test1" class="competition col s12">
        <h2 class="center-align">${datatext.competition.name} - ${datatext.competition.area.name}</h2>
        <h5 class="center-align">Status : ${winnerTeam}</h5>
        <div class="row">
            <h5 class="col s6 m6 center-align">Start-Date : ${datatext.season.startDate}</h5>
            <h5 class="col s6 m6 center-align">End-Date: ${datatext.season.endDate}</h5>
            <h5 class="col s12 m12 center-align">Click next tab for more information about match-standings.</h5>
        </div>
    </div>
        
    <div id="test2" class="standing col s12">
    </div>
    `;
    tabElems.appendChild(tabContent);

    const listStanding = datatext.standings;
    const listStandingElement = document.querySelector('.standing');
    listStandingElement.innerHTML = "";
    listStanding.forEach( item => {     
        const type = item.type;
        const group = item.group;

        if(group === 'GROUP_A'){
            groupname = 'GROUP A';
        } else if(group === 'GROUP_B'){
            groupname = 'GROUP B';
        } else if(group === 'GROUP_C'){
            groupname = 'GROUP C';
        } else if(group === 'GROUP_D'){
            groupname = 'GROUP D';
        } else if(group === 'GROUP_E'){
            groupname = 'GROUP E';
        } else if(group === 'GROUP_F'){
            groupname = 'GROUP F';
        } else if(group === 'GROUP_G'){
            groupname = 'GROUP G';
        } else if(group === 'GROUP_H'){
            groupname = 'GROUP H';
        } else if(group === null) {
            groupname = 'All Group';
        }

        const listElement = document.createElement('div');
        listElement.className += "col m6 s12 center-align card-list";
        listElement.innerHTML = "";
        listElement.innerHTML += `
            <div class="list-element">
            <h6 class="card-title">${groupname} (${type})</h6>
            <p>List Standings</p>
            <div class="table-standings">
            <table class="standings">
                <thead>
                    <tr>
                        <th class="team-name">Name</th>
                        <th>Won</th>
                        <th>Lost</th>
                        <th>Points</th>
                    </tr>
                </thead>
            </table>
            </div>
            </div>
        `;
        listStandingElement.appendChild(listElement);

        const table = item.table;

        table.forEach( item => {
            const tableStandings = document.querySelectorAll('.table-standings');
            const teamname = item.team.name;
            const teamid = item.team.id;
            const points = item.points;
            const won = item.won;
            const lost = item.lost;
            const tableElement = document.createElement('table');
            tableElement.className += 'standings';
            tableElement.innerHTML += `
            <tbody>
            <tr>
            <td class="team-name">
                <a href="#modal1" class="team-detail modal-trigger" id="${teamid}">${teamname}</a>
            </td>
            <td>${won}</td>
            <td>${lost}</td>
            <td>${points}</td>
            </tr>
            </tbody>
            `;
            tableStandings.forEach( item => {
                item.appendChild(tableElement);
            })
        })
        initiateModal();
        initiateTabs();
    })
}

const buildMiniCardMatch = (responseJson) => {
    const datatext = responseJson;
    const datePlaying = moment(datatext.filters.dateFrom).format("MMM Do YY");
    console.log('untuk melihat detail jadwal, klik Nama Pertandingan masing-masing');
    
    const competitionElement = document.querySelector('#matches');
    competitionElement.innerHTML = "";
    competitionElement.innerHTML += `
    <h5 class="center-align">Date Playing : ${datePlaying}</h5>
    `;

    const activeMatchElement = document.createElement('div');
    activeMatchElement.className += 'row';
    activeMatchElement.innerHTML = "";
    const matches = datatext.matches;
    if(matches.length != 0){
        matches.forEach( item => {
            const dateMatch = moment(item.utcDate).format('MMMM Do YYYY, h:mm:ss a');
            const eachMatchElement = document.createElement('div');
            eachMatchElement.className += "col s12 m12 card-list center-align";
            eachMatchElement.innerHTML = "";
            eachMatchElement.innerHTML += `
            <div class="row list-element">
                <a href="./schedule.html?id=${item.id}">
                    <h6>${item.competition.name} - ${item.competition.area.name}</h6>
                </a>
                <h5>${dateMatch}</h5>
                <div class="col s5 m5">
                    <h6 class="team">${item.homeTeam.name}</h6>
                    <img id="${item.homeTeam.id}" class="img-home-team">
                </div>
                <div class="col s2 m2">
                    <h6 class="vs">VS</h6>
                </div>
                <div class="col s5 m5">
                    <h6 class="team">${item.awayTeam.name}</h6>
                    <img id="${item.awayTeam.id}" class="img-away-team">
                </div>
            </div>
            `;
            activeMatchElement.appendChild(eachMatchElement);
        })
    } else {
        activeMatchElement.innerHTML += `
        <h6 class="center-align">
        Not any schedule found for today. Comeback tomorrow, Pals! </br>
        Data generated from api.football-data.org.
        </h6> 
        `;
    }
    competitionElement.appendChild(activeMatchElement);
}

const buildMiniCardTeam = (responseJson) => {
    const dataAllTeam = responseJson;
    const allTeamElement = document.querySelector('.card-teams');
    allTeamElement.innerHTML = "";

    const listTeams = dataAllTeam.teams;
    listTeams.forEach( item => {
        const crestUrl = (item.crestUrl) ? replaceHttp(item.crestUrl) : '../images/no-pict.png';

        const eachTeamElement = document.createElement('div');
        eachTeamElement.className += "col s12 m6 card-list center-align";
        eachTeamElement.innerHTML = "";
        eachTeamElement.innerHTML += `
            <div class="list-element">
                <div class="row img-element">
                    <img class="img-team" src="${crestUrl}" onerror="imgError(this);">
                </div>
                <a href="./team.html?id=${item.id}">
                    <h6 class="card-title">${item.name}</h6>
                </a>
                <div class="row">
                    <p class="col s12 m12">
                        This club has ${item.clubColors} as club colors, and takes venue
                        in ${item.venue}. 
                    </p>
                </div>
            </div>
        `;
        allTeamElement.appendChild(eachTeamElement);
    })
}

const buildCardMatchById = (responseJson) => {
    const data = responseJson;
    const dateMatch = moment(data.match.utcDate).format('MMMM Do YYYY, h:mm:ss a');
    const refereeArray = data.match.referees;
    if (refereeArray.length === 0) {
        refereeName = ['No data', 'No data', 'No data', 'No data'];
    } else {
        refereeName = [refereeArray[0].name, refereeArray[1].name, refereeArray[2].name, refereeArray[3].name];
    }

    const matchHTML = `
        <div class="card container card-detail-schedule center-align">
            <div class="card-image waves-effect waves-block waves-light">
                <h6 class="league-name">${data.match.competition.name} - ${data.match.competition.area.name}</h6>
                <p>STATUS : ${data.match.status}</p>
            </div>
            <div class="card-content row">
                <h5>${dateMatch} in ${data.match.venue}</h5>
                <div class="col s12 m5">
                    <h4 class="team">${data.match.homeTeam.name}</h4>
                </div>
                <div class="col s12 m2"> 
                    <h6> VS </h6>
                </div>
                <div class="col s12 m5">
                    <h4 class="team">${data.match.awayTeam.name}</h4>
                </div>
                <h6>Match Season :</h6>
                <div class="row">
                    <p class="left">Start: ${data.match.season.startDate}</p>
                    <p class="right">End: ${data.match.season.endDate}</p>
                </div>
                <h6>Referees : </h6>
                <table>
                    <tbody>
                        <tr>
                            <td class="center-align">${refereeName[0]}</td>
                            <td class="center-align">${refereeName[1]}</td>
                            <td class="center-align">${refereeName[2]}</td>
                            <td class="center-align">${refereeName[3]}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    document.getElementById("body-content").innerHTML = matchHTML;
}

const buildCardTeamById = (responseJson) => {
    const dataCurrentTeam = responseJson;
    const crestUrl = (dataCurrentTeam.crestUrl) ? replaceHttp(dataCurrentTeam.crestUrl) : '../images/no-pict.png';

    const cardTeam = `
    <div class="container card card-detailteam">
        <div class="row img-element">
            <img class="img-team" src="${crestUrl}" onerror="imgError(this);">
        </div>
        <div class="card-content">
            <h4 class="card-title center-align">${dataCurrentTeam.name}</h4>
            <div class="row">
                <p>
                    This club was found in year ${dataCurrentTeam.founded}, and now take the venue in ${dataCurrentTeam.venue}. Their teams' colors
                    are ${dataCurrentTeam.clubColors}, with address in ${dataCurrentTeam.address}.
                </p>
                <p>more information :</p>
                <table>
                    <tbody>
                        <tr>
                            <td>Email : </td>
                            <td>${dataCurrentTeam.email}</td>
                        </tr>
                        <tr>
                            <td>Phone : </td>
                            <td>${dataCurrentTeam.phone}</td>
                        </tr>
                        <tr>
                            <td>Website : </td>
                            <td>${dataCurrentTeam.website}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `;
    document.getElementById("body-content").innerHTML = cardTeam;

    const cardElement = document.querySelector('.card-detailteam');
    const squadDivElement = document.createElement('div');
    squadDivElement.className += 'row squad-team';
    squadDivElement.innerHTML += `
        <h4 class="center-align">Squad Teams</h4>
    `;
    cardElement.appendChild(squadDivElement);
    
    const squad = dataCurrentTeam.squad;
    squad.forEach( player => {
        const position = player.position;
        if (position == null) {
            playerPosition = 'no data';
        } else {
            playerPosition = position;
        }

        const role = player.role;
        if (role == null) {
            playerRole = 'no data';
        } else if (role == 'COACH' || role == 'INTERIM_COACH' || role == 'ASSISTANT_COACH'){
            playerRole = 'COACH';
        } else {
            playerRole = role;
        }
        const divSquadElement = document.querySelector('.squad-team');
        const eachSquadElement = document.createElement('div');
        eachSquadElement.className += 'item-squad col s6 m3';
        eachSquadElement.innerHTML = ''
        eachSquadElement.innerHTML += `
            <h5 class="center-align">${player.name}</h5>
            <p class="center-align">${playerPosition}</p>
            <p class="center-align">${playerRole}</p>
        `;
        divSquadElement.appendChild(eachSquadElement);
    })
}

//FUNCTIONS USING FETCH DATA & CACHE
const loadTeams = (id_team) => {
    const idteam = id_team

    const apiLink = `${base_url}v2/teams/${idteam}`
    if ('caches' in window) {
        caches.match(apiLink)
        .then(function(response) {
          if (response) {
            preloadercache(response)
            response.json()
            .then(function (responseJson) {
                console.log('this data is taken from cache')
                buildCardTeam(responseJson)
            })
          } 
          else {
            fetchApi(apiLink)
            .then(status)
            .then(json)
            .then( responseJson => {
                console.log('this data is taken from fetch')
                buildCardTeam(responseJson)
            })
            .catch( error => {
                console.log(error)
                const toastHTML = '<span>Halaman tidak dapat diakses karena offline. Periksa jaringan anda.</span>';
                M.toast({html: toastHTML});
            })
          }
        })
    }
}

const loadMatchStanding = (id_button) => {
    const id_liga = id_button;

    const apiLink = `${base_url}v2/competitions/${id_liga}/standings`;
    if ('caches' in window) {
        caches.match(apiLink)
        .then(function(response) {
          if (response) {
            response.json()
            .then(function (responseJson) {
                console.log('this data is taken from cache');
                buildStandingComponent(responseJson);
            })
          }
          else {
            fetchApi(apiLink)
            .then(status)
            .then(json)
            .then( responseJson => {
                console.log('this data is taken from fetch');
                buildStandingComponent(responseJson);
            })
            .catch( error => {
                console.log(error)
                const toastHTML = '<span>Halaman tidak dapat diakses karena offline. Periksa jaringan anda.</span>';
                M.toast({html: toastHTML});
            })
          }
        })
    }
}

const loadAllMatch = () => {
    const apiLink = `${base_url}v2/matches/`;
    if ('caches' in window) {
        caches.match(apiLink)
        .then(function(response) {
          if (response) {
            preloadercache(response)
            response.json()
            .then(function (responseJson) {
                console.log('this data is taken from cache');
                buildMiniCardMatch(responseJson);
            })
          }
          else {
            fetchApi(apiLink)
            .then(status)
            .then(json)
            .then( responseJson => {
                console.log('this data is taken from fetch');
                buildMiniCardMatch(responseJson);
            })
                
            .catch( error => {
                console.log(error)
                const toastHTML = '<span>Halaman tidak dapat diakses karena offline. Periksa jaringan anda.</span>';
                M.toast({html: toastHTML});
            })
          }
        })
    }
}

const loadMatchById = () => {
    return new Promise(function(resolve, reject) {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        const apiLink = `${base_url}v2/matches/${idParam}`;
        if ("caches" in window){
            caches.match(apiLink)
            .then(function(response) {
                if (response) {
                    preloadercache(response)
                    response.json()
                    .then(function(data) {
                        console.log('this data is taken from cache');
                        buildCardMatchById(data);
                        resolve(data);
                    })
                }
                else {
                    fetchApi(apiLink)
                    .then(status)
                    .then(json)
                    .then(function(data) {
                        console.log('this data is taken from fetch');
                        buildCardMatchById(data);
                        resolve(data);
                    })

                    .catch(error => {
                        console.log(error)
                        const toastHTML = '<span>Halaman tidak dapat diakses karena offline. Periksa jaringan anda.</span>';
                        M.toast({html: toastHTML});
                        reject(error);
                    })
                }
            })
        }
    });
}

const getSavedMatches = () => {
    getAllSavedMatches().then(function(matches) {
        const bodyElement = document.getElementById('body-content');
        const matchElement = document.createElement('div');
        matchElement.innerHTML = "";
        matchElement.innerHTML += `
            <div class="all-savedmatch">
                <h4 class="center-align">List of Saved Matches</h4>
            </div>
        `;
        bodyElement.appendChild(matchElement);

        if(matches.length === 0) {
            const notifHTML = document.createElement('div');
            notifHTML.className += 'no-saved-data';
            notifHTML.innerHTML += `
            <div class="container">
                <h5 class="center-align">You have not save any favourite upcoming schedule yet...</h5>
            </div>
            `;
            bodyElement.appendChild(notifHTML);
        }
        else {
            matches.forEach(function(match) {
                const dateMatch = moment(match.utcDate).format('MMMM Do YYYY, h:mm:ss a');
                const matchName = match.competition.name.substring(0,100);
                const matchesHTML = document.createElement('div');
                matchesHTML.className += 'all-saved-matches';
                matchesHTML.innerHTML = "";
                matchesHTML.innerHTML += `
                    <div class="container card card-detailmatches" id="match-${match.id}">
                        <div class="right">
                            <i class="icon-delete medium material-icons" onclick="deleteMatch(${match.id})">delete_forever</i>
                        </div>
                        <div class="card-content">
                            <a href="./schedule.html?id=${match.id}&saved=true">
                                <h3 class="card-title center-align">${matchName} - ${match.competition.area.name}</h3>
                            </a>
                            <div class="card-content row center-align">
                                <h5>${dateMatch} in ${match.venue}</h5>
                                <div class="col s12 m4">
                                    <h4 class="team">${match.homeTeam.name}</h4>
                                </div>
                                <div class="col s12 m4">
                                    <h4 class="vs">VS</h4>
                                </div>
                                <div class="col s12 m4">
                                    <h4 class="team">${match.awayTeam.name}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                matchElement.appendChild(matchesHTML);
            });
            bodyElement.appendChild(matchElement);
        }
    });
}

const getSavedMatchById = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParameter = urlParams.get("id");

    getMatchById(idParameter).then(function(match){
        const dateMatch = moment(match.utcDate).format('MMMM Do YYYY, h:mm:ss a');
        const refereeArray = match.referees;
        if (refereeArray.length === 0) {
            refereeName = ['No data', 'No data', 'No data', 'No data'];
        } else {
            refereeName = [refereeArray[0].name, refereeArray[1].name, refereeArray[2].name, refereeArray[3].name];
        }

        const matchHTML = `
            <div class="container card card-detailmatches">
                <div class="card-content">
                    <h6 class="card-title center-align">${match.competition.name} - ${match.competition.area.name}</h6>
                    <div class="card-content row center-align">
                        <h5>${dateMatch} in ${match.venue}</h5>
                        <div class="col s12 m5">
                            <h4 class="team">${match.homeTeam.name}</h4>
                        </div>
                        <div class="col s12 m2"> 
                            <h4 class="vs"> VS </h4>
                        </div>
                        <div class="col s12 m5">
                            <h4 class="team">${match.awayTeam.name}</h4>
                        </div>
                        <h6>Match Season :</h6>
                        <div class="row">
                            <p class="left">Start: ${match.season.startDate}</p>
                            <p class="right">End: ${match.season.endDate}</p>
                        </div>
                        <h6>Referees : </h6>
                        <table>
                            <tbody>
                                <tr>
                                    <td class="center-align">${refereeName[0]}</td>
                                    <td class="center-align">${refereeName[1]}</td>
                                    <td class="center-align">${refereeName[2]}</td>
                                    <td class="center-align">${refereeName[3]}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('body-content').innerHTML = matchHTML;
    })
} 

const loadAllTeams = () => {
    const apiLink = `${base_url}v2/teams/`;
    if ('caches' in window) {
        caches.match(apiLink)
        .then(function(response) {
          if (response) {
            preloadercache(response)
            response.json()
            .then(function (responseJson) {
                console.log('this data is taken from cache');
                console.log('untuk masuk ke halaman detail klub, klik Nama Klub.');
                buildMiniCardTeam(responseJson);
            })
          }
          else {
            fetchApi(apiLink)
            .then(status)
            .then(json)
            .then( responseJson => {
                console.log('this data is taken from fetch');
                console.log('untuk masuk ke halaman detail klub, klik Nama Klub.');
                buildMiniCardTeam(responseJson);
            })
            .catch( error => {
                console.log(error)
                const toastHTML = '<span>Halaman tidak dapat diakses karena offline. Periksa jaringan anda.</span>';
                M.toast({html: toastHTML});
            })
          }
        })
    }
}

const loadTeamById = () => {
    return new Promise(function(resolve, reject) {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        const apiLink = `${base_url}v2/teams/${idParam}`;
        if ("caches" in window) {
            caches.match(apiLink)
            .then(function(response) {
            if (response) {
                preloadercache(response)
                response.json()
                .then(function(responseJson) {
                    console.log('this data is taken from cache');
                    buildCardTeamById(responseJson);
                    resolve(responseJson);
                });
            }
            else {
                fetchApi(apiLink)
                .then(status)
                .then(json)
                .then( responseJson => {
                    console.log('this data is taken from fetch');
                    buildCardTeamById(responseJson);
                    resolve(responseJson);
                })
                .catch( error => {
                    console.log(error)
                    const toastHTML = '<span>Halaman tidak dapat diakses karena offline. Periksa jaringan anda.</span>';
                    M.toast({html: toastHTML});
                    reject(error);
                })
            }
            });
        } 
    });
};

const getSavedTeams = () => {
    getAll().then(function(teams) {
        const bodyElement = document.getElementById('body-content');
        const teamsElement = document.createElement('div');
        teamsElement.innerHTML = "";
        teamsElement.innerHTML += `
            <div class="all-savedteams">
                <h4 class="center-align">List of Saved Teams</h4>
            </div>
        `;
        bodyElement.appendChild(teamsElement);

        if(teams.length === 0) {
            const notifHTML = document.createElement('div');
            notifHTML.className += 'no-saved-data';
            notifHTML.innerHTML += `
                <div class="container">
                    <h5 class="center-align">You have not save any favourite teams yet...</h5>
                </div>
            `
            bodyElement.appendChild(notifHTML);
        } 
        else {
            teams.forEach(function(team) {
                const teamName = team.name.substring(0,100);
                const teamsHTML = document.createElement('div')
                teamsHTML.className += 'all-saved-teams'
                teamsHTML.innerHTML = ''
                teamsHTML.innerHTML += `
                    <div class="container card card-detailteam" id="team-${team.id}">
                        <div class="right">
                            <i class="icon-delete-team medium material-icons" onclick="deleteTeam(${team.id})">delete_forever</i>
                        </div>
                        <div class="row img-element">
                            <img class="img-team" src="${team.crestUrl}">
                        </div>
                        <div class="card-content">
                            <a href="./team.html?id=${team.id}&saved=true">
                                <h3 class="card-title center-align">${teamName}</h3>
                            </a>
                            <div class="row">
                                <p>
                                    This club was found in year ${team.founded}, and now take the venue in ${team.venue}. Their teams' colors
                                    are ${team.clubColors}, with address in ${team.address}.
                                </p>
                                <p>more information :</p>
                                <table>
                                <tbody>
                                    <tr>
                                        <td>Email : </td>
                                        <td>${team.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone : </td>
                                        <td>${team.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Website : </td>
                                        <td>${team.website}</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
                teamsElement.appendChild(teamsHTML);
            });
            bodyElement.appendChild(teamsElement);
        }
    });
};

const getSavedTeamById = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    getById(idParam).then(function(team) {
        const teamHTML = `
        <div class="container card card-detailteam">
            <div class="row img-element">
                <img class="img-team" src="${team.crestUrl}">
            </div>
            <div class="card-content">
                <h6 class="card-title center-align">${team.name}</h6>
                <div class="row">
                    <p>
                        This club was found in year ${team.founded}, and now take the venue in ${team.venue}. Their teams' colors
                        are ${team.clubColors}, with address in ${team.address}.
                    </p>
                    <p>more information :</p>
                    <table>
                      <tbody>
                          <tr>
                              <td>Email : </td>
                              <td>${team.email}</td>
                          </tr>
                          <tr>
                              <td>Phone : </td>
                              <td>${team.phone}</td>
                          </tr>
                          <tr>
                              <td>Website : </td>
                              <td>${team.website}</td>
                          </tr>
                      </tbody>
                  </table>
                </div>
            </div>
         </div>
        `;
        document.getElementById("body-content").innerHTML = teamHTML;
    });
};

//FUNGSI UNTUK KOMPONEN LAIN YANG ADA
const imgError = (image) => {
    image.onerror = "";
    image.src = "../images/no-pict.png";
    return true;
}

const buildComponent = () =>{
    const modalElems = document.querySelector('.modal');
    modalElems.innerHTML = "";
    const modalContent = document.createElement('div');
    modalContent.className += "content";
    modalContent.innerHTML = "";
    modalContent.innerHTML += `
    <div class="modal-content"></div>
    <div class="modal-footer"></div>
    `;

    modalElems.appendChild(modalContent);
}

const initiateModal = () => {
    buildComponent();
    const instances = () => {
      const id = event.target.id;
      loadTeams(id);
      const modalElems = document.querySelector('.modal');
      M.Modal.init(modalElems);
    }
    const modalButton = document.querySelectorAll('.team-detail');
    modalButton.forEach( currentTeam => {
      currentTeam.addEventListener('click', instances);
    })
    
}

const initiateTabs = () => {
    const tabs = document.querySelectorAll('.tabs');
    for (let i = 0; i < tabs.length; i++){
      M.Tabs.init(tabs[i]);
    }
}

const deleteTeam = (id) => {
    const idTeam = id;
    deleteSavedTeamById(idTeam);
    const bodyElement = document.querySelector('.all-saved-teams');
    const teamElement = document.querySelector(`#team-${id}`);
    bodyElement.removeChild(teamElement);
}

const deleteMatch = (id) => {
    console.log('its deleted!');
    const idMatch = id;
    deleteSavedMatchById(idMatch);
    const bodyElement = document.querySelector('.all-saved-matches');
    const matchElement = document.querySelector(`#match-${id}`);
    bodyElement.removeChild(matchElement);
}

const loadButton = () => {
    const buttonLeagueElements = document.querySelectorAll(".btn-league");
    buttonLeagueElements.forEach( currentBtn => {
      currentBtn.addEventListener('click', clickedButton);
    })
};

const clickedButton = () => {
    const id = event.target.id;
    loadMatchStanding(id);
    console.log('Nama klub pada list standing dapat di-klik untuk melihat informasi klub dalam modal');
}