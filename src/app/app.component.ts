import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HomeComponent } from '../components/home/home.component';
import { provideRouter } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { ChatComponent } from './chat/chat.component'; // 👈 مسار الشات

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NavbarComponent , ChatComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'styleShare';
}
