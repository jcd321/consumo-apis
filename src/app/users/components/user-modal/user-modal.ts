import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user_models';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-modal.html',
  styleUrls: ['./user-modal.css'],
})
export class UserModal implements OnInit {
  @Input() user: User | null = null;
  
  @Output() close = new EventEmitter<void>();
  
  @Output() save = new EventEmitter<User>();

  protected newUser = signal<User>({
    id: 0,
    nombre: '',
    email: '',
    edad: 0
  });

  ngOnInit() {
    if (this.user) {
      this.newUser.set({ ...this.user });
    } else {
      this.newUser.set({
        id: Math.floor(Math.random() * 1000),
        nombre: '',
        email: '',
        edad: 0
      });
    }
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.save.emit(this.newUser());
  }
}
