import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'reminders', loadChildren: './reminders/reminders.module#RemindersPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'list-reminders', loadChildren: './list-reminders/list-reminders.module#ListRemindersPageModule' },
  { path: 'edit-reminder', loadChildren: './edit-reminder/edit-reminder.module#EditReminderPageModule' },
  { path: 'add-reminder', loadChildren: './add-reminder/add-reminder.module#AddReminderPageModule' },
  { path: 'list-alarms', loadChildren: './list-alarms/list-alarms.module#ListAlarmsPageModule' },  { path: 'edit-alarm', loadChildren: './edit-alarm/edit-alarm.module#EditAlarmPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
