let dbPromised = idb.open("info-bola-1", 1, (upgradeDb) => {
    let timObjectStore = upgradeDb.createObjectStore("dataTim", {
        keyPath: "id"
    });
    timObjectStore.createIndex("team", "team", {
        unique: false
    });
    // upgradeDb.createObjectStore("dataTim", {keyPath: 'id'});
})

function hapusTim(id) {
    dbPromised
        .then(database => {
            let tx = database.transaction("dataTim", "readwrite");
            let store = tx.objectStore("dataTim");
            console.log(id);
            store.delete(id.id);
            return tx.complete;
        })
        .then(() => {
            const title = 'Data Tim Berhasil dihapus!';
            const option = {
                'body': `Club berhasil dihapus.`,
                'badge': `img/icon72.png`,
                'icon': `img/icon72.png`
            };

            if (Notification.permission === 'granted') {
                navigator.serviceWorker.ready
                    .then(registrasi => {
                        registrasi.showNotification(title, option);
                    });
            } else {
                M.toast({
                    html: 'Tim berhasil dihapus'
                });
            }
            location.replace("/#infoAllTim");
        })
        .catch(() => {
            M.toast({
                html: 'Tim gagal disimpan'
            });
            location.reload();
        });
}

function saveForLater(tim) {
    dbPromised
        .then(database => {
            let tx = database.transaction("dataTim", "readwrite");
            let store = tx.objectStore("dataTim");
            console.log(tim);
            store.add(tim);
            return tx.complete;
        })
        .then(() => {
            const title = 'Data Tim Berhasil disimpan!';
            console.log(title);
            const option = {
                'body': `Club ${tim.name} berhasil disimpan. Silahkan cek tab Favorit.`,
                'badge': `img/icon72.png`,
                'icon': `img/icon72.png`,
                'actions': [{
                        'action': 'yes-action',
                        'title': 'Yes',
                    },
                    {
                        'action': 'no-action',
                        'title': 'No',
                    }
                ],
            };
            if (Notification.permission === 'granted') {
                navigator.serviceWorker.ready
                    .then(registrasi => {
                        registrasi.showNotification(title, option);
                    });
            } else {
                M.toast({
                    html: `Club ${tim.name} berhasil disimpan. Silahkan cek tab Saved.`
                });
            }
            location.reload();
        })
        .catch(() => {
            M.toast({
                html: 'Tim gagal disimpan'
            });
            location.reload();
        });
}

function getAllTim() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(database => {
                let tx = database.transaction("dataTim", "readonly");
                let store = tx.objectStore("dataTim");
                return store.getAll();
            })
            .then(tim => {
                resolve(tim);
            });
    });
}

function getTimId(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(database => {
                let tx = database.transaction("dataTim", "readonly");
                let store = tx.objectStore("dataTim");
                return store.get(id);
            })
            .then(tim => {
                resolve(tim);
            });
    });
}

function cekFavorit(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(database => {
                let tx = database.transaction("dataTim", "readonly");
                let store = tx.objectStore("dataTim");
                return store.get(id);
            })
            .then(favorit => {
                if (favorit !== undefined) {
                    resolve(true);
                }
            });
    });
}
