import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { RouterModule, Routes } from '@angular/router';

import { IndexModule } from './index/index.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ExtendDayComponent } from './extendDay/extendDay.component';
import { DayItemComponent } from './dayItem/dayItem.component';


// const ROUTERS: Routes = [
// 	// { path: '', redirectTo: '/index', pathMatch: 'full' },
// 	{ path: 'index', component: IndexComponent },
// ];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ExtendDayComponent,
    DayItemComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // RouterModule.forRoot(ROUTERS),
    IndexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }








