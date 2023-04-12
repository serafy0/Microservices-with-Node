import { Publisher, Subjects, TicketCreatedEvent } from "@ticketing-s/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
