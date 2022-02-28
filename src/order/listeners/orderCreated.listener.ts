import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/createOrder.event';

@Injectable()
export class OrderCreatedListener {
  @OnEvent('order.created')
  handleOrderCreatedEvent(event: OrderCreatedEvent) {
    console.log('listener event: ', event);
  }
}
