let webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BAYntPlUEECjBROnOhAAUjJln-Y2fqeNcFii0IAwhMlurkZ7-Vi4ubvDl3pXXWS-Tt33OO4J_N3At8gL-TF_0xs",
    "privateKey": "KEZtKy6p0e9jVmA4b1qyom6ulqOBVr3V7GcKVPxOQpc"
};


webPush.setVapidDetails(
    'mailto: aflahazzaki123@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cRVOOQ5Wg_o:APA91bHVn8AlP8JWtySmrL2-TFd30SwrZ-TxhSykfcKB6QVqIPIqITfTVOjEeWo0I2oKTXEmsmZTHpH3G-wVyxKoegSZM078MA_Dmo6PcIKaKfXbdA4dN1op35xGr9qRuVQoz9Kev3Kt",
    "keys": {
        "p256dh": "BLa5NwLxPidqAuqFMP1nj2rbQp0aOuusoaGUjjugWC+i7B/FjXKterxFkyXdOH/suVjI5T7XRPc31NzIHuSDX2A=",
        "auth": "yIJGw96A36YFTUvZK6Zt1Q=="
    }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

let options = {
    gcmAPIKey: '590943871467',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);