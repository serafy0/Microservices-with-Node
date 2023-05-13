import { Listener, Subjects, TicketUpdatedEvent } from "@ticketing-s/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

  queueGroupName = queueGroupName;

  async onMessage(
    data: TicketUpdatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const ticket = await Ticket.findByEvent(data);
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    const { title, price, version } = data;
    ticket.set({ title, price, version });
    await ticket.save();

    msg.ack();
  }
}
