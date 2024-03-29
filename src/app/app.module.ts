import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { AuthService } from './authentication/services/auth.service';
import { ChatFieldComponent } from './chat-field/chat-field.component';
import { MatBadgeModule } from '@angular/material/badge';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { MessageFieldComponent } from './message-field/message-field.component';
import { NgxEditorModule, schema } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogEditMessageComponent } from './dialog-edit-message/dialog-edit-message.component';
import { MatButtonModule } from '@angular/material/button';
import { ThreadFieldComponent } from './thread-field/thread-field.component';
import { DialogEditThreadCommentComponent } from './dialog-edit-thread-comment/dialog-edit-thread-comment.component';
import { RouterModule } from '@angular/router';
import { MessageFieldThreadComponent } from './message-field-thread/message-field-thread.component';
import { DialogDeleteThreadComponent } from './dialog-delete-thread/dialog-delete-thread.component';
import { DialogDeleteCommentComponent } from './dialog-delete-comment/dialog-delete-comment.component';
import { MessagingComponent } from './messaging/messaging.component';
import { MessageFieldPrivateComponent } from './message-field-private/message-field-private.component';
import { AuthGuard } from './authentication/guard/auth.guard';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NewChannelComponent } from './new-channel/new-channel.component';
import { MatCardModule } from '@angular/material/card';
import { DialogChannelInfoComponent } from './dialog-channel-info/dialog-channel-info.component';
import { DialogCreateMessageComponent } from './dialog-create-message/dialog-create-message.component';


@NgModule({
  declarations: [
    AppComponent,
    LoadingScreenComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ChatFieldComponent,
    HeaderComponent,
    SidebarComponent,
    MessageFieldComponent,
    DialogEditMessageComponent,
    ThreadFieldComponent,
    DialogEditThreadCommentComponent,
    MessageFieldThreadComponent,
    DialogDeleteThreadComponent,
    DialogDeleteCommentComponent,
    MessagingComponent,
    MessageFieldPrivateComponent,
    UserDetailComponent,
    NewChannelComponent,
    DialogChannelInfoComponent,
    DialogCreateMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFirestoreModule,
    MatBadgeModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    PickerModule,
    EmojiModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        underline: 'Underline',
        strike: 'Strike',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
