var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BL4tt63sf97Y1TRKuTjPfz5rIntWbKhABjfNda6rCc8wgWpbsAo_RTRKNzph5otx3wY7RVEEU7urWkoIZX0Qnq0",
   "privateKey": "HSNM2Gz1BG5S3i6eYKgW_vTHLAcBq10Fq75HLSgY-5E"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cSPh86AlK8w:APA91bF9BKWRzRGdkJibYP1u52y8Om3pFyEB-iGo6wcMNTgvsFSwkj3-UhJrs3ad-BhK0YGVpZI2E4Eo8fOueXrOBDEJ2Ir6wFbyulSE6TB89i47OhRFHH_jqmHzacAaIB0srZSca4Mo",
   "keys": {
       "p256dh": "BJJTJNYF1tPFArI5z/JOcfRCmqNdvBwHMyz3gVroQHy/L6AQaAi0Gr0cbqoYl+y61SaKPrFeXEbjUNpdafSf1Tg=",
       "auth": "CDFk59xRk19Y1IzcVg/igw=="
   }
};
var payload = 'Yeayy... Payloadnya sudah bisa ditampilkan sebagai notifikasi hehe!';
 
var options = {
   gcmAPIKey: '945602748342',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);