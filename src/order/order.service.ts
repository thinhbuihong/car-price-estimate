import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from './events/createOrder.event';

@Injectable()
export class OrderService {
  constructor(private eventEmitter: EventEmitter2) {}

  create() {
    const orderCreatedEvent = new OrderCreatedEvent();
    orderCreatedEvent.name = 'name';
    orderCreatedEvent.description = 'description';

    this.eventEmitter.emit('order.created', orderCreatedEvent);

    return 'created order';
  }
}
