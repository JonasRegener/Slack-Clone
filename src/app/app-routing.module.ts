import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { AuthGuard } from './authentication/guard/auth.guard';
<<<<<<< HEAD
import { ChatFieldComponent } from './chat-field/chat-field.component';
=======
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
>>>>>>> 3299ee904c01fb9b4047c42e53242e1090413fb6

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'loading-screen', component: LoadingScreenComponent }, // testing Path for loading-screen animation
<<<<<<< HEAD
  { path: 'chat-field', component: ChatFieldComponent },
=======
  { path: 'header', component: HeaderComponent },
  { path: 'sidebar', component: SidebarComponent }
>>>>>>> 3299ee904c01fb9b4047c42e53242e1090413fb6
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }