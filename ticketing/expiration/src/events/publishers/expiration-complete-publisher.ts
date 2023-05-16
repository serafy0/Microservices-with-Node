import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@ticketing-s/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
