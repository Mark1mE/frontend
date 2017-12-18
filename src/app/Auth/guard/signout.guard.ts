import {CanActivate, CanDeactivate} from '@angular/router';
import {IndexComponent} from '../../borroom/index.component';

export class SignoutGuard implements CanDeactivate<IndexComponent> {
  canDeactivate(component: IndexComponent) {
    return window.confirm('确定离开本页面?');
  }
}
