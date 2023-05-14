import { Publisher, Subjects, TicketUpdatedEvent } from "@ticketing-s/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
