import { Component } from '@angular/core';
import { ipcRenderer } from 'electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'NgElectron';

  constructor() {
    ipcRenderer.invoke('PING').then((result) => {
      console.warn('Renderer Receive: ', result);
    });
  }
}
