import { OrderCancelledEvent, Publisher, Subjects } from "@ticketing-s/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
