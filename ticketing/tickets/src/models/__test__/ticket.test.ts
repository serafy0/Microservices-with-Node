import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  //create an instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123",
  });
  //save the ticket to the database
  await ticket.save();
  //fetch the ticeet twice
  const firstInstaceOfTicket = await Ticket.findById(ticket.id);
  const secondInstanceOfTicket = await Ticket.findById(ticket.id);
  //make two seperate changes to the tickets we fetched
  firstInstaceOfTicket!.set({ price: 10 });
  secondInstanceOfTicket!.set({ price: 15 });
  //save the first fetched ticket
  await firstInstaceOfTicket!.save();
  //save the second fetched ticket and expect an error
  try {
    await secondInstanceOfTicket!.save();
  } catch (err) {
    return;
  }
  throw new Error("Test should have thrown");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concerts",
    price: 20,
    userId: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
