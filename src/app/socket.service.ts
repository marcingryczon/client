import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {
    // console.log(this.socket);
  }

  creteRoom(roomName: string): void {
    this.joinRoom(roomName);
  }

  getId(): string {
    return this.socket.ioSocket.id;
  }

  getSockets(): Observable<string[]> {
    return this.socket
      .fromEvent<string[]>('openSockets')
      .pipe
      // map((sockets) =>
      //   sockets.filter(
      //     (socketId: string) => socketId !== this.socket.ioSocket.id
      //   )
      // )
      ();
  }

  joinRoom(room: string): void {
    this.socket.emit('joinRoom', room);
  }

  getRooms(): Observable<string[]> {
    this.socket.emit('rooms');
    return this.socket.fromEvent<string[]>('rooms').pipe(tap(console.log));
  }

  getMessage(): Observable<string> {
    return this.socket.fromEvent<string>('sockets').pipe(map((data) => data));
  }

  updateCursorPosition(cursorPos: {x: number, y: number}): void {
    this.socket.emit('cursorPosition', cursorPos);
  }

  updateCursorClick(cursorPos: {x: number, y: number}): void {
    this.socket.emit('cursorClick', cursorPos);
  }

  updateKeyup(pressedKey: string): void {
    this.socket.emit('pressedKey', pressedKey);
  }

  getCursorPosition(): Observable<{x: number, y: number}> {
    return this.socket.fromEvent<{x: number, y: number}>('updateCursorPos');
  }

  getPressedKeys(): Observable<string> {
    return this.socket.fromEvent<string>('updateKeyup');
  }

  getCursorClick(): Observable<{x: number, y: number}> {
    return this.socket.fromEvent<{x: number, y: number}>('updateCursorClick');
  }
}
