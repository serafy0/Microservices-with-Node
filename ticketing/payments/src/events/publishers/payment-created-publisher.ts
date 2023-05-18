import { Subjects, Publisher, PaymentCreatedEvent } from "@ticketing-s/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
