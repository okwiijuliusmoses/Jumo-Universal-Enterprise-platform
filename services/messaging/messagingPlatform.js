export class MessagingPlatform {
  constructor() {
    this.channels = [{ id: "chan-general", name: "Global Enterprise Broadcast", messagesCount: 42 }];
  }
  listChannels() { return this.channels; }
}
