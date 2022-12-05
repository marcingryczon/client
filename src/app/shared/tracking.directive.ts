import { Directive, HostListener, Input } from '@angular/core';
import { SocketService } from '../socket.service';

@Directive({
  selector: '[appTracking]',
})
export class TrackingDirective {
  @Input('role') role!: '0' | '1';
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if(this.role==='0'){
      this.socketService.updateCursorPosition({x: e.clientX, y: e.clientY});
    }
  }

  @HostListener('document:click', ['$event'])
  onMouseClick(e: MouseEvent) {
    if(this.role==='0'){
      this.socketService.updateCursorClick({x: e.clientX, y: e.clientY});
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyup(e: KeyboardEvent) {
    if(this.role==='0'){
      console.log(e.key);
      this.socketService.updateKeyup(e.key);
    }
  }

  constructor(private socketService: SocketService) {}
}
