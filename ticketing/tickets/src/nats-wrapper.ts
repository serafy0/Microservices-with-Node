import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  connect(clusterId: string, cleintId: string, url: string) {
    this._client = nats.connect(clusterId, cleintId, { url });
    return new Promise((resolve, reject) => {
      this._client!.on("connect", () => {
        console.log("connected to nats");
        resolve("connected");
      });

      this._client!.on("error", (err) => {
        reject(err);
      });
    });
  }
}
export const natsWrapper = new NatsWrapper();
