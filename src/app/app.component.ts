import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public newRoomName = '';
  public sockets: string[] = [];
  public rooms: string[] = [];
  public currentSocketId = '';
  public role!: '0' | '1';
  public cursorPos: { x: number; y: number } = { x: 0, y: 150 };
  public activeElement!: HTMLElement;
  @ViewChild('input', {read: ElementRef}) input!: ElementRef<HTMLInputElement>;
  constructor(
    private socketService: SocketService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.getRooms();
    this.getCursorPosition();
    this.getCursorClick();
    this.getPressedKeys();
  }

  public getSockets(): void {
    this.socketService.getSockets().subscribe((sockets) => {
      this.sockets = sockets;
      this.getCurrentSocketId();
    });
  }

  public getRooms(): void {
    this.socketService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  public getCurrentSocketId(): void {
    this.currentSocketId = this.socketService.getId();
    console.log(this.currentSocketId);
  }

  public joinRoomHandler(room: string): void {
    this.socketService.joinRoom(room);
  }

  public createRoom(): void {
    this.socketService.creteRoom(this.newRoomName);
  }

  public getCursorPosition(): void {
    this.socketService.getCursorPosition().subscribe((pos) => {
      this.cursorPos = pos;
    });
  }

  public getPressedKeys(): void {
    this.socketService.getPressedKeys().subscribe((keys) => {
      console.log('pressedKey: ', keys);
    });
  }

  public getCursorClick(): void {
    this.socketService.getCursorClick().subscribe((pos) => {
      if (this.role === '1') {
        const el = document.elementFromPoint(pos.x, pos.y)!;
        this.activeElement = el as HTMLElement;
        (el as HTMLElement).click();
        (el as HTMLElement).focus();
      }
    });
  }

  public focus(): void {
    if (this.role === '1') {
      console.log('fokus');
      this.input.nativeElement.focus();
    }
  }
}
