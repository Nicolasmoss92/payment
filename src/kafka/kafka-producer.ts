import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) { }

  // Método para publicar um evento no Kafka
  async createPayment() {
    const eventOrder = {
      event: 'order.created',
    };

    // Publica a mensagem no tópico 'order-events'
    this.kafkaClient.emit('v1-payment', eventOrder);
    console.log('Evento publicado no Kafka:', eventOrder);

    return { message: 'Pagamento aceito com sucesso!' };
  }
}