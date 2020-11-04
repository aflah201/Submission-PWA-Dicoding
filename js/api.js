// const { resolve } = require("path");

const base_url = "https://api.football-data.org/v2/";

// ENDPOINT KLASEMEN
const endpoint_klasemen = `https://api.football-data.org/v2/competitions/2014/standings`;
const endpoint_klasemenA = `https://api.football-data.org/v2/competitions/2019/standings`;
const endpoint_klasemenB = `https://api.football-data.org/v2/competitions/2021/standings`;


const endpoint_tim = `https://api.football-data.org/v2/competitions/2014/teams`;
const endpoint_tim_a = `https://api.football-data.org/v2/competitions/2019/teams`;
const endpoint_tim_b = `https://api.football-data.org/v2/competitions/2021/teams`;

const endpoint_tim_id = `https://api.football-data.org/v2/teams/`;
const endpoint_pertandingan = `https://api.football-data.org/v2/competitions/2014/matches/`

// Blok Kode yang akan dipanggil jika feth berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

const fetchApi = url => {
    return fetch(url, {
            // method: 'GET',
            // mode: 'no-cors',
            headers: {
                'X-Auth-Token': '08999830a5224b2d9c7db860d4bd767a'
            }
        })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(json)
        .catch(error);
};

// Menampilkan Klasemen
function getKlasemen() {
    if ("caches" in window) {
        caches.match(endpoint_klasemen)
            .then(res => {
                if (res.status !== 200) {
                    console.log("Error: " + res.status);
                    return Promise.reject(new Error(res.statusText))
                } else {
                    return Promise.resolve(res)
                }
            })
            .then(json)
            .then(data => {
                console.log("Data Kompetisi : " + data);
                tampilKlasemen(data);
            })
    }

    fetchApi(endpoint_klasemen)
        .then(data => {
            tampilKlasemen(data);
        })
        .catch(error);
}

function tampilKlasemen(data) {
    let klasemen = "";
    let klasemenElement = document.getElementById("beranda");

    data.standings[0].table.forEach(dataKlasemen => {
        let logoTim = dataKlasemen.team.crestUrl.replace(/^http:\/\//i, 'https://');
        klasemen += `
        <tr>
            <td>${dataKlasemen.position}</td>
            <td><img src="${logoTim}" width="30px" alt="logo"</td>
            <td>${dataKlasemen.team.name}</td>
            <td class="blue-text">${dataKlasemen.playedGames}</td>
            <td class="green-text">${dataKlasemen.won}</td>
            <td class="grey-darken-1 text">${dataKlasemen.draw}</td>
            <td class="red-text">${dataKlasemen.lost}</td>
            <td class="purple-text">${dataKlasemen.goalsFor}</td>
            <td class="indigo-text">${dataKlasemen.goalsAgainst}</td>
            <td class="teal-text">${dataKlasemen.goalDifference}</td>
            <td class="deep-orange-text">${dataKlasemen.points}</td>
            <td>${dataKlasemen.form}</td>
        </tr>`;
    });

    klasemenElement.innerHTML = `
    <div class="card z-depth-5"
    <table class="bordered highlight centered responsive-table" id="beranda">
        <thead>
            <tr class="blue white-text">
                <th>Peringkat</th>
                <th>Logo</th>
                <th>Nama Tim</th>
                <th>Main</th>
                <th>M</th>
                <th>S</th>
                <th>K</th>
                <th>GM</th>
                <th>GK</th>
                <th>+/-</th>
                <th>Poin</th>
                <th>Performa</th>
            </tr>
        </thead>
        <tbody id="beranda">
            ${klasemen}
        </tbody>
    </table>
    </div>
    `;
}

function getKlasemenSerieA() {
    if ("caches" in window) {
        caches.match(endpoint_klasemenA)
            .then(status)
            .then(json)
            .then(data => {
                console.log("Data Kompetisi : " + data);
                tampilKlasemenA(data);
            })
    }

    fetchApi(endpoint_klasemenA)
        .then(data => {
            tampilKlasemenA(data);
        })
        .catch(error);
}

function tampilKlasemenA(data) {
    let klasemenA = "";
    let klasemenAElement = document.getElementById("SERIE");

    data.standings[0].table.forEach(dataKlasemen => {
        let logoTim = dataKlasemen.team.crestUrl.replace(/^http:\/\//i, 'https://');
        klasemenA += `
        <tr>
            <td>${dataKlasemen.position}</td>
            <td><img src="${logoTim}" width="30px" alt="logo"</td>
            <td>${dataKlasemen.team.name}</td>
            <td class="blue-text">${dataKlasemen.playedGames}</td>
            <td class="green-text">${dataKlasemen.won}</td>
            <td class="grey-darken-1 text">${dataKlasemen.draw}</td>
            <td class="red-text">${dataKlasemen.lost}</td>
            <td class="purple-text">${dataKlasemen.goalsFor}</td>
            <td class="indigo-text">${dataKlasemen.goalsAgainst}</td>
            <td class="teal-text">${dataKlasemen.goalDifference}</td>
            <td class="deep-orange-text">${dataKlasemen.points}</td>
            <td>${dataKlasemen.form}</td>
        </tr>`;
    });

    klasemenAElement.innerHTML = `
    <div class="card z-depth-5"
    <table class="bordered highlight centered responsive-table" id="SERIE">
        <thead>
            <tr class="red white-text">
                <th>Peringkat</th>
                <th>Logo</th>
                <th>Nama Tim</th>
                <th>Main</th>
                <th>M</th>
                <th>S</th>
                <th>K</th>
                <th>GM</th>
                <th>GK</th>
                <th>+/-</th>
                <th>Poin</th>
                <th>Performa</th>
            </tr>
        </thead>
        <tbody id="SERIE">
            ${klasemenA}
        </tbody>
    </table>
    </div>
    `;
}


function getKlasemenInggris() {
    if ("caches" in window) {
        caches.match(endpoint_klasemenB)
            .then(status)
            .then(json)
            .then(data => {
                console.log("Data Kompetisi : " + data);
                tampilKlasemenB(data);
            })
    }

    fetchApi(endpoint_klasemenB)
        .then(data => {
            tampilKlasemenB(data);
        })
        .catch(error);
}

function tampilKlasemenB(data) {
    let klasemenB = "";
    let klasemenBElement = document.getElementById("PL");

    data.standings[0].table.forEach(dataKlasemen => {
        let logoTim = dataKlasemen.team.crestUrl.replace(/^http:\/\//i, 'https://');
        klasemenB += `
        <tr>
            <td>${dataKlasemen.position}</td>
            <td><img src="${logoTim}" width="30px" alt="logo"</td>
            <td>${dataKlasemen.team.name}</td>
            <td class="blue-text">${dataKlasemen.playedGames}</td>
            <td class="green-text">${dataKlasemen.won}</td>
            <td class="grey-darken-1 text">${dataKlasemen.draw}</td>
            <td class="red-text">${dataKlasemen.lost}</td>
            <td class="purple-text">${dataKlasemen.goalsFor}</td>
            <td class="indigo-text">${dataKlasemen.goalsAgainst}</td>
            <td class="teal-text">${dataKlasemen.goalDifference}</td>
            <td class="deep-orange-text">${dataKlasemen.points}</td>
            <td>${dataKlasemen.form}</td>
        </tr>`;
    });

    klasemenBElement.innerHTML = `
    <div class="card z-depth-5"
    <table class="bordered highlight centered responsive-table" id="SERIE">
        <thead>
            <tr class="green white-text">
                <th>Peringkat</th>
                <th>Logo</th>
                <th>Nama Tim</th>
                <th>Main</th>
                <th>M</th>
                <th>S</th>
                <th>K</th>
                <th>GM</th>
                <th>GK</th>
                <th>+/-</th>
                <th>Poin</th>
                <th>Performa</th>
            </tr>
        </thead>
        <tbody id="PL">
            ${klasemenB}
        </tbody>
    </table>
    </div>
    `;
}

function getTIM() {
    if ("caches" in window) {
        caches.match(endpoint_tim)
            .then(status)
            .then(json)
            .then(data => {
                console.log("Data Tim Klasemen : " + data);
                tampilTim(data);
            });
    }
    fetchApi(endpoint_tim)
        .then(data => {
            tampilTim(data);
        })
        .catch(error);
}

function getTIM_A() {
    if ("caches" in window) {
        caches.match(endpoint_tim_a)
            .then(status)
            .then(json)
            .then(data => {
                console.log("Data Tim Klasemen : " + data);
                tampilTimA(data);
            });
    }
    fetchApi(endpoint_tim_a)
        .then(data => {
            tampilTimA(data);
        })
        .catch(error);
}

function getTIM_B() {
    if ("caches" in window) {
        caches.match(endpoint_tim_b)
            .then(status)
            .then(json)
            .then(data => {
                console.log("Data Tim Klasemen : " + data);
                tampilTimB(data);
            });
    }
    fetchApi(endpoint_tim_b)
        .then(data => {
            tampilTimB(data);
        })
        .catch(error);
}

function getTIM_ID() {
    return new Promise(function (resolve, reject){
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");
        if ("caches" in window) {
            caches.match(endpoint_tim_id + idParam)
                .then(status)
                .then(json)
                .then(data => {
                    console.log("Data Tim : " + data);
                    tampilTim_ID(data);
                    resolve(data);
                })
        }
        fetchApi(endpoint_tim_id + idParam)
            .then(data => {
                tampilTim_ID(data);
                resolve(data)
            })
            .catch(error);
    });
}

function tampilTim(data) {
    let timHTML = "";
    let timElement = document.getElementById("dataTim");

    data.teams.forEach(dataTim => {
        timHTML += `
                <div class="col s12 m6 l3">
                    <div class="card">
                        <div class="card-image">
                        <img src="${dataTim.crestUrl}" style="margin: auto; height: 150px; width:auto; max-width: 50%;>
                        <div class="card-content">
                        <h6 class="center">${dataTim.name}</h6>
                        </div>
                        <div class="card-action center-align">
                        <a class="waves-effect blue btn white-text" href="./detailTim.html?id=${dataTim.id}">Detail</a>
                        </div>
                    </div>
                </div>
        `;
    });

    timElement.innerHTML = `
        <div class="col m12">
            <div class="row" id="dataTim">
                ${timHTML}
            </div>
        </div>    
    `;
}

function tampilTimA(data) {
    let timHTML = "";
    let timElement = document.getElementById("dataTimA");

    data.teams.forEach(dataTim => {
        timHTML += `
                <div class="col s12 m6 l3">
                    <div class="card">
                        <div class="card-image">
                        <img src="${dataTim.crestUrl}" style="margin: auto; height: 150px; width:auto; max-width: 50%;>
                        <div class="card-content">
                        <h6 class="center">${dataTim.name}</h6>
                        </div>
                        <div class="card-action center-align">
                        <a class="waves-effect red btn white-text" href="./detailTim.html?id=${dataTim.id}">Detail</a>
                        </div>
                    </div>
                </div>
        `;
    });

    timElement.innerHTML = `
        <div class="col m12">
            <div class="row" id="dataTimA">
                ${timHTML}
            </div>
        </div>    
    `;
}

function tampilTimB(data) {
    let timHTML = "";
    let timElement = document.getElementById("dataTimB");

    data.teams.forEach(dataTim => {
        timHTML += `
                <div class="col s12 m6 l3">
                    <div class="card">
                        <div class="card-image">
                        <img src="${dataTim.crestUrl}" style="margin: auto; height: 150px; width:auto; max-width: 50%;>
                        <div class="card-content">
                        <h6 class="center">${dataTim.name}</h6>
                        </div>
                        <div class="card-action center-align">
                        <a class="waves-effect green btn white-text" href="./detailTim.html?id=${dataTim.id}">Detail</a>
                        </div>
                    </div>
                </div>
        `;
    });

    timElement.innerHTML = `
        <div class="col m12">
            <div class="row" id="dataTimB">
                ${timHTML}
            </div>
        </div>    
    `;
}

function tampilTim_ID(data) {
    let timHTML = "";
    let detailTim = "";
    let det = "";
    let dataTimElement = document.getElementById("body-content");
    let logoTim = data.crestUrl.replace(/^http:\/\//i, 'https://');

    det += `
    <div class="card">
                <div class="row">
                    <div class="col s12 m12 l12">
                        <div class="card-image>
                            <img src="${logoTim}" style="padding-top: 2rem; width:100%; height: auto;" align="middle">
                        </div>

                        <div class="card>
                            <h3>${data.name}</h3>
                            <h5>${data.shortName}</h5>
                            <p>${data.name} adalah tim yang berasal dari ${data.address}.
                            </p>
                            <table>
                                <thead>
                                <center>Informasi Penting</center>
                                </thead>
                                <tr>
                                    <td>No. Telp</td>
                                    <td></td>
                                    <td>:</td>
                                    <td></td>
                                    <td>${data.phone}</td>
                                </tr>
                                <tr>
                                    <td>Alamat Email</td>
                                    <td></td>
                                    <td>:</td>
                                    <td></td>
                                    <td">${data.email}</td>
                                </tr>
                                <tr>
                                    <td>Website</td>
                                    <td></td>
                                    <td>:</td>
                                    <td></td>
                                    <td>${data.website}</td>
                                </tr>
                                <tr>
                                    <td>Warna Klub</td>
                                    <td></td>
                                    <td>:</td>
                                    <td></td>
                                    <td>${data.clubColors}</td>
                                </tr>
                                <tr>
                                    <td>Stadion</td>
                                    <td></td>
                                    <td>:</td>
                                    <td></td>
                                    <td>${data.venue}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>`;

    detailTim += `
            <div class="card" style="text-align:center;">
                <div class="row">
                <div class="col s3 l5"></div>
                <div class="col s6 l2" style="margin-bottom: 0; padding:0; ">
                    <img src="${logoTim}" style="padding-top: 2rem; width:75%; height: auto;" align="middle" >
                </div>
                </div>
                <div class="card-content" style="margin-top: 0;padding:0; ">
                <h3>${data.name}</h3>
                <table>
                    <thead>
                    <h3><center>Informasi Penting</center></h3>
                    </thead>
                    <tr>
                        <td>No. Telp</td>
                        <td></td>
                        <td>:</td>
                        <td></td>
                        <td style="word-break:break-all">${data.phone}</td>
                    </tr>
                    <tr>
                        <td>Alamat Email</td>
                        <td></td>
                        <td>:</td>
                        <td></td>
                        <td style="word-break:break-all"><a href="mailto:${data.email}" target="_blank"</a>${data.email}</td>
                    </tr>
                    <tr>
                        <td>Website</td>
                        <td></td>
                        <td>:</td>
                        <td></td>
                        <td style="word-break:break-all"><a href="${data.website}">${data.website}</a></td>
                    </tr>
                    <tr>
                        <td>Warna Klub</td>
                        <td></td>
                        <td>:</td>
                        <td></td>
                        <td style="word-break:break-all">${data.clubColors}</td>
                    </tr>
                    <tr>
                        <td>Stadion</td>
                        <td></td>
                        <td>:</td>
                        <td></td>
                        <td style="word-break:break-all">${data.venue}</td>
                    </tr>
                </table>
    `;

    data.squad.forEach(pemain => {
        timHTML += `
            <tr>
                <td>${pemain.name}</td>
                <td>${pemain.countryOfBirth}, ${pemain.dateOfBirth}</td>
                <td>${pemain.position}</td>
                <td>${pemain.role}</td>
                <td>${pemain.nationality}</td>
            </tr>
        `;
    });

    dataTimElement.innerHTML = `
        ${detailTim}
            <div class="card z-depth-3">
                <div class="row">
                    <table class="centered striped responsive-table">
                        <thead>
                            <h3 class="margin5 header center blue-text">Info Tim ${data.name}</h3>
                            <tr>
                                <th>Nama Pemain</th>
                                <th>Tempat, Tanggal Lahir</th>
                                <th>Posisi</th>
                                <th>Kategori</th>
                                <th>Kewarganegaraan</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${timHTML}
                        </tbody>
                    </table>
                </div>
            </div>
    `;
}


function getSimpanTim() {
    getAllTim()
    .then(tim => {
        console.log(tim);
        let squad = "";
        let elementSave = document.getElementById("saved");

        tim.forEach(team => {
            let logoTim = team.crestUrl.replace(/^http:\/\//i, 'https://');
            
            squad += `
            <div class="col s12 m6 l3">
                <div class="card">
                    <div class="card-image">
                    <img src="${logoTim}" style="margin: auto; height: 150px; width:auto; max-width: 50%;>
                    <div class="card-content">
                    <h6 class="center">${team.name}</h6>
                    </div>
                    <div class="card-action center-align">
                    <a class="waves-effect green btn white-text" href="./detailTim.html?id=${team.id}&saved=true">Detail</a>
                    </div>
                </div>
            </div>
            `;
        });

        elementSave.innerHTML = `
        <div class="col m12">
            <div class="row">
                ${squad}
            </div>
        </div>
        `
    });
}

function getSimpanTim_ID() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = parseInt(urlParams.get("id"));

    getTimId(idParam)
    .then(team => {
        console.log(team);
        tampilTim_ID(team);
    });
}