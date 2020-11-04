// Periksa service worker
if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
} else {
    registerServiceWorker();
    requestPermission();
}

// Register service worker
function registerServiceWorker() {
    return navigator.serviceWorker.register('/sw.js')
        .then(registrasi => {
            console.log('Registrasi service worker berhasil.');
            return registrasi;
        })
        .catch(error => {
            console.error('Registrasi service worker gagal.', error);
        });
}

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission()
        .then(result => {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }
            navigator.serviceWorker.ready.then(() => {
                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration()
                    .then(registrasi => {
                        registrasi.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array("BAYntPlUEECjBROnOhAAUjJln-Y2fqeNcFii0IAwhMlurkZ7-Vi4ubvDl3pXXWS-Tt33OO4J_N3At8gL-TF_0xs")
                        }).then(subscribe => {
                            console.log('Berhasil melakukan subscribe dengan endpoint: ',
                                subscribe.endpoint);
                            console.log('Berhasil melakukan subscribe dengan p256dh key: ',
                                btoa(String.fromCharCode.apply(
                                    null, new Uint8Array(subscribe.getKey('p256dh'))
                                )));
                            console.log('Berhasil melakukan subscribe dengan auth key: ',
                                btoa(String.fromCharCode.apply(
                                    null, new Uint8Array(subscribe.getKey('auth')))));
                        }).catch(error => {
                            console.error('Tidak dapat melakukan subscribe ', error.message);
                        });
                    });
                }
            });
        });
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}