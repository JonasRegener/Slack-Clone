import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { AuthGuard } from './authentication/guard/auth.guard';
import { ChatFieldComponent } from './chat-field/chat-field.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MessagingComponent } from './messaging/messaging.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
    { path: '', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'verify-email', component: VerifyEmailComponent },
    { path: 'loading-screen', component: LoadingScreenComponent, canActivate:[AuthGuard] },
    { path: 'channels', component: ChatFieldComponent, canActivate:[AuthGuard] }, 
    { path: 'header', component: HeaderComponent, canActivate:[AuthGuard] },
    { path: 'sidebar', component: SidebarComponent, canActivate:[AuthGuard] },
    { path: 'messaging', component: MessagingComponent, canActivate:[AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }