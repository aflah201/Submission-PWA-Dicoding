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
    "endpoint": "https://fcm.googleapis.com/fcm/send/ePHcMV7eF08:APA91bEhFP2hWkvuKTj9Y51vgOPZtGqnB6F6mF213r34UvH2aZMh2vfHc6MTzwm6smi8Drx_MkQf1WMRXKIrQ1mBSTL0n62D27EIaPVXgi1IA9vyp8b0cxUaB0LL-EveBezitDsS03Qf",
    "keys": {
        "p256dh": "BO++k/9B46BGMMoB0f8dMm+ntSvlyI7fKPPWvL4Xm7aX4iUZJUezviawFJI6HJfYkwZTaRJfFsKIEcQ01QMgMDg=",
        "auth": "SqT6cUkJZ1JCMEcH2ubiMA=="
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