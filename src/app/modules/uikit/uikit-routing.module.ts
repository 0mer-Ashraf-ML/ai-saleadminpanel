import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UikitComponent } from './uikit.component';
import { TableComponent } from './pages/table/table.component';
import { UsersComponent } from './pages/users/users.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { LeadsComponent } from './pages/leads/leads.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { TeamComponent } from './pages/team/team.component';

const routes: Routes = [
  {
    path: '',
    component: UikitComponent,
    children: [
      { path: '', redirectTo: 'components', pathMatch: 'full' },
      { path: 'table', component: TableComponent },
      { path: 'users', component: UsersComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'leads', component: LeadsComponent },
      { path: 'payments', component: PaymentComponent },
      { path: 'notifications', component: NotificationComponent },
      { path: 'teams', component: TeamComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UikitRoutingModule {}
