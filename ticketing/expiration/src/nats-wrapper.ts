import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS clients before connecting");
    }
    return this._client;
  }

  connect(clusterId: string, cleintId: string, url: string) {
    this._client = nats.connect(clusterId, cleintId, { url });
    return new Promise<void>((resolve, reject) => {
      this.client!.on("connect", () => {
        console.log("connected to nats");
        resolve();
      });

      this.client!.on("error", (err) => {
        reject(err);
      });
    });
  }
}
export const natsWrapper = new NatsWrapper();
