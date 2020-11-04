const base_url = 'https://api.football-data.org/v2/competitions/2014/standings';

function status(response) {
    if (response.status !== 200) {
        console.log('Error : ' + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log('Error : ' + error);
}

function getArticles() {
    fetch(base_url, {
        method: 'GET',
        headers: {
            'X-Auth-Token': '08999830a5224b2d9c7db860d4bd767a'
        }
    })
    .then(status)
    .then(json)
    .then(data => {
        let articlesHTML = "";
        data.standings.forEach(article => {
            articlesHTML += `
            <tr>
                <td></td>
            </tr>`
        })
    })
}