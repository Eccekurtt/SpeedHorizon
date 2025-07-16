const { sendMessage, receiveMessage } = require('./rabbitmq');

async function test() {
  // Mesaj gönder
  await sendMessage('test-queue', 'Merhaba RabbitMQ!');

  // Mesaj al
  await receiveMessage('test-queue', (msg) => {
    console.log('Kuyruktan gelen mesaj:', msg);
    process.exit(0);
  });
}

test(); 