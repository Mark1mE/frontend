import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login.component';
import { RegistryComponent } from './Auth/registry.component';
import { IndexComponent } from './borroom/index.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './Service/user.service';
import { BorrowComponent } from './borroom/borrow/borrow.component';
import { UserInfoComponent } from './borroom/user-info/info.component';
import {QueryRoomComponent} from './borroom/queryroom/query.component';
import {OrderComponent} from './borroom/order/order.component';
import {RecordService} from './Service/record.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginGuard} from './Auth/guard/login.guard';
import {BoardroomService} from './Service/boardroom.service';
import {InfoPipePipe} from './util/InfoPipe.pipe';
import {ModifyComponent} from './borroom/order/modify.component';
import {FilterPipe} from './util/FilterPipe.pipe';
import {DateFormatService} from './Service/dateFormat.service';
import {AboutusComponent} from './borroom/about-us/aboutus.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistryComponent,
    IndexComponent,
    BorrowComponent,
    UserInfoComponent,
    QueryRoomComponent,
    OrderComponent,
    InfoPipePipe,
    ModifyComponent,
    FilterPipe,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgbModule.forRoot()
  ],
  providers: [UserService, RecordService, LoginGuard, BoardroomService, DateFormatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
