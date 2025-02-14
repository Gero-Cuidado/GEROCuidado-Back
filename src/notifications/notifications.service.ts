// // src/notifications/notifications.service.ts
// import { Injectable } from '@nestjs/common';
// import * as webPush from 'web-push';
// import * as cron from 'node-cron';

// @Injectable()
// export class NotificationsService {
//   constructor() {
//     // Configure as chaves VAPID
//     const vapidKeys = {
//       publicKey: 'SUA_CHAVE_PUBLICA_AQUI',
//       privateKey: 'SUA_CHAVE_PRIVADA_AQUI',
//     };

//     webPush.setVapidDetails(
//       'mailto:seu-email@exemplo.com', // Email de contato
//       vapidKeys.publicKey,
//       vapidKeys.privateKey,
//     );
//   }

//   // Envia uma notificação push
//   async sendPushNotification(subscription: any, title: string, body: string): Promise<void> {
//     const payload = JSON.stringify({ title, body });
//     await webPush.sendNotification(subscription, payload);
//   }

//   // Agenda uma notificação única
//   scheduleSingleNotification(subscription: any, title: string, body: string, date: Date): void {
//     const delay = date.getTime() - Date.now();
//     if (delay > 0) {
//       setTimeout(() => {
//         this.sendPushNotification(subscription, title, body);
//       }, delay);
//     }
//   }

//   // Agenda uma notificação repetida
//   scheduleRepeatingNotification(subscription: any, title: string, body: string, day: string, time: string): void {
//     const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);
//     if (dayOfWeek === -1) return;

//     const [hours, minutes] = time.split(':').map(Number);
//     const cronExpression = `${minutes} ${hours} * * ${dayOfWeek}`;

//     cron.schedule(cronExpression, () => {
//       this.sendPushNotification(subscription, title, body);
//     });
//   }
// }