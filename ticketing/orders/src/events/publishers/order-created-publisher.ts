import { OrderCreatedEvent, Publisher, Subjects } from "@ticketing-s/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
