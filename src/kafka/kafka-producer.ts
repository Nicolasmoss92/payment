import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // Conectar ao Kafka ao iniciar o módulo
    await this.kafkaClient.connect();

    // Publica mensagem automaticamente ao iniciar
    await this.createPayment();
  }

  async createPayment() {
    const eventOrder = {
      event: 'payment.processed',
    };

    // Publica mensagem no tópico
    this.kafkaClient.emit('v1-payment', eventOrder);
    console.log('Evento publicado no Kafka:', eventOrder);

    return { message: 'Pagamento aceito com sucesso!' };
  }
}