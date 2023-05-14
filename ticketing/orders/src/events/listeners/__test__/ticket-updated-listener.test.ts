import mongoose from "mongoose";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { TicketUpdatedEvent } from "@ticketing-s/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
  //create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);
  //create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();
  //create a fake data object
  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    version: ticket.version + 1,
    userId: new mongoose.Types.ObjectId().toHexString(),
    title: "new concert",
    price: 999,
  };
  //create a fake msg object
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  //return all of this stuff
  return { msg, data, ticket, listener };
};

it("finds, updates, and saves a ticket", async () => {});

it("acknowledges the message", async () => {});
