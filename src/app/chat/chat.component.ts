import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import io from 'socket.io-client';





@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  isOpenSupportChat: boolean = false;
  chatForm!: FormGroup;
  messages: Array<{ content: string; time: Date; senderId: string }> = [];
  private socket: any;  // استخدم 'any' لأنه ستتعامل مع socket كـ instance وليس type

  currentUserId: string = 'newUser';
  currentUserAvatar: string = '/user-avatar.png';
  participantAvatar: string = '/admin-avatar.png';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.chatForm = this.fb.group({
      content: ['', Validators.required]
    });

    // ربط الاتصال مع السيرفر
    this.socket = io('http://localhost:3000'); // هنا بنربط بالـ server

    // استقبال الرسائل من السيرفر
    this.socket.on('message', (message: { content: string; time: string; senderId: string }) => {
      this.messages.push({
        content: message.content,
        time: new Date(message.time),
        senderId: message.senderId
      });
    });
  }

  openSupportChat() {
    this.isOpenSupportChat = true;
  }

  closeChat() {
    this.isOpenSupportChat = false;
  }

  sendMessage() {
    if (this.chatForm.valid) {
      const userMessage = {
        content: this.chatForm.value.content,
        time: new Date(),
        senderId: this.currentUserId
      };
  
      this.socket.emit('sendMessage', userMessage);
      this.messages.push(userMessage);
      this.chatForm.reset();
  
      // ✅ إرسال رسالة ترحيب تلقائية مرة واحدة فقط
      if (this.messages.filter(m => m.senderId === this.currentUserId).length === 1) {
        const welcomeMessage = {
          content: `Hi ${this.currentUserId} 👋! We're happy to hear from you.`,
          time: new Date(),
          senderId: 'admin' // ID مختلف يميزها عن المستخدم
        };
  
        setTimeout(() => {
          this.messages.push(welcomeMessage);
        }, 500); // تأخير بسيط عشان تحس كأنها رد تلقائي
      }
    }
  }
  
}
