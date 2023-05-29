import { WS_URL } from '@/services';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { Socket, io } from 'socket.io-client';
import commonStore from './commonStore';
import { User } from '@/services/masterClass';

export interface Message {
  user: User;
  message: string;
}

export class ChatStore {
  inProgress = false;
  messages: Message[] = [];
  socket: Socket | null = null;
  messagesContainerRef: HTMLDivElement | null = null;

  constructor() {
    makeObservable(this, {
      inProgress: observable,
      messages: observable,
      socket: observable,
      messagesContainerRef: observable,
      connect: action,
      sendMessage: action,
    });
  }

  async connect() {
    const accessToken = commonStore.accessToken;
    if (!accessToken) {
      console.error('No access token');
    }

    if (this.socket) {
      this.socket.disconnect();
    }
    this.socket = io(WS_URL, {
      path: '/api/websocket',
      auth: {
        token: accessToken,
      },
    }).connect();

    this.socket.on('connect', () => {
      console.log('Connected to WS');
      if (!this.socket) {
        console.error('No socket');
        return;
      }
      this.socket.on('history', (messages: Message[]) => {
        runInAction(() => {
          this.messages.push(...messages)
        })
      })

      this.socket.on('message', (message: Message) => {
        console.log('Message received', message);
        runInAction(() => {
          this.messages.push(message);
        });
      });

      this.socket.emit('history');
    });

  }

  async sendMessage(message: string) {
    if (!this.socket) {
      console.error('No socket');
      return;
    }
    this.socket.emit('message', message);
    setTimeout(() => {
      if (this.messagesContainerRef) {
        this.messagesContainerRef.scrollTop =
          this.messagesContainerRef.scrollHeight;
      }
    }, 10);
  }
}

export default new ChatStore();
