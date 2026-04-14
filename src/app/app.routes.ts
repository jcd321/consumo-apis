import { Routes } from '@angular/router';
import { Posts } from './posts/posts';
import { Users } from './users/users';
import { Products } from './products/products';
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [
    { path:'',
    component:Products
    },
    {
        path:'users',
        component:Users
    },
    {
        path:'posts',
        component:Posts
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'register',
        component:Register
    }
    
];
