import { Component } from '@angular/core'

import { setOrientation } from '~/app/screen-orientation';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  setOrientation = setOrientation;
}
