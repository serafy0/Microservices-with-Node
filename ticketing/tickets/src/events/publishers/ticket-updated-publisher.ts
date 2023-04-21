import { Publisher, Subjects, TicketUpdatedEvent } from "@ticketing-s/common";

export class TicketCreatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
