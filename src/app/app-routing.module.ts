import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Auth/login.component';
import { RegistryComponent } from './Auth/registry.component';
import { IndexComponent } from './borroom/index.component';
import { BorrowComponent } from './borroom/borrow/borrow.component';
import { UserInfoComponent } from './borroom/user-info/info.component';
import {QueryRoomComponent} from './borroom/queryroom/query.component';
import {OrderComponent} from './borroom/order/order.component';
import {LoginGuard} from './Auth/guard/login.guard';
import {SignoutGuard} from './Auth/guard/signout.guard';
import {CommonModule} from '@angular/common';
import {ModifyComponent} from './borroom/order/modify.component';
import {AboutusComponent} from './borroom/about-us/aboutus.component';
import {AdminIndexComponent} from './admin/admin-index.component';
import {UserManageComponent} from './admin/user-manage/user-manage.component';
import {RoomManageComponent} from './admin/room-manage/room-manage.component';
import {RecordManageComponent} from './admin/record-manage/record-manage.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registry', component: RegistryComponent },
  {
    path: 'index',
    component: IndexComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'borrow', component: BorrowComponent },
      { path: 'info', component: UserInfoComponent },
      { path: 'query', component: QueryRoomComponent },
      { path: 'order', component: OrderComponent, children: [
          { path: 'modifyorder', component: ModifyComponent}
        ]},
      { path: 'about-us', component: AboutusComponent }
    ], canActivate: [LoginGuard]/*, canDeactivate: [SignoutGuard]*/
  },
  {
    path: 'admin',
    component: AdminIndexComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'user-manage', component: UserManageComponent },
      { path: 'room-manage', component: RoomManageComponent },
      { path: 'record-manage', component: RecordManageComponent }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes),  CommonModule],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
