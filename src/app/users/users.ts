import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../models/user_models';
import { UsersServices } from '../services/users_services';
import { UserModal } from './components/user-modal/user-modal';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserModal],
  templateUrl: './users.html',
  styleUrls: ['./users.css'],
})
export class Users implements OnInit {
  private readonly usersServices = inject(UsersServices);
  protected readonly users = signal<User[]>([]);
  
  protected isModalOpen = signal(false);
  protected editingUser = signal<User | null>(null);

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.usersServices.getUsers().subscribe({
      next: (data) => {
        console.log('Lista de usuarios recibida', data);
        this.users.set(data);
      },
      error: (error) => {
        console.error('Error al traer usuarios', error);
      },
    })
  }

  getUserById(id: number) {
    this.usersServices.getUseById(id).subscribe({
      next: (data) => {
        console.log('Usuario por ID', data);
        this.users.set([data]);
      },
      error: (error) => console.error('Error al buscar usuario por ID', error),
    });
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usersServices.deleteUser(id).subscribe({
        next: () => {
          console.log('Usuario eliminado');
          this.getUsers();
        },
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  editUser(user: User) {
    this.editingUser.set(user);
    this.isModalOpen.set(true);
  }

  createUser(user: User) {
    this.usersServices.createUser(user).subscribe({
      next: () => {
        this.getUsers();
        this.isModalOpen.set(false);
      },
      error: (err: any) => console.error('Error al crear usuario', err)
    });
  }

  updateUser(user: User) {
    this.usersServices.updateUser(user.id, user).subscribe({
      next: () => {
        this.getUsers();
        this.isModalOpen.set(false);
        this.editingUser.set(null);
      },
      error: (err: any) => console.error('Error al actualizar usuario', err)
    });
  }
}


