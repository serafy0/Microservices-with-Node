import { Listener, OrderCreatedEvent, Subjects } from "@ticketing-s/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { natsWrapper } from "../../nats-wrapper";
export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    //find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    //if no ticket, throw error
    if (!ticket) {
      throw new Error("ticket not found");
    }
    //mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });
    //save the ticket
    await ticket.save();
    new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      orderId: ticket.orderId,
      userId: ticket.userId,
      price: ticket.price,
      version: ticket.version,
      title: ticket.title,
    });
    //ack the message
    msg.ack();
  }
}
