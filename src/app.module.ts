import { Module } from '@nestjs/common';
import { KafkaService } from './kafka/kafka-producer';
import { KafkaClientModule } from './kafka/kafka-client-module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [KafkaClientModule],
  controllers: [HealthController],
  providers: [KafkaService],
})
export class AppModule {}
