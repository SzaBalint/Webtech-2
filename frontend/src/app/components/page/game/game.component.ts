import { Component, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  title ='timer'

  ms: any = '0' +0;
  sec: any = '0' +0;
  min: any = '0' +0;

  startTimer: any;
  running = false;

  start(): void{
    if(!this.running){
      this.running = true;
      this.startTimer = setInterval(() =>{
        this.ms++;
        this.ms = this.ms < 10 ? '0' + this.ms : this.ms;

        if(this.ms === 100){
          this.sec++;
          this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
          this.ms = '0' + 0;
        }

        if(this.sec === 60){
          this.min++;
          this.min = this.min < 10 ? '0' + this.min : this.min;
          this.sec = '0' + 0;
        }
      }, 10);
    } else{
      this.stop();
    }
  }

  stop(): void{
    clearInterval(this.startTimer);
    this.running = false;
  }
}

export class LoginFormComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
}
