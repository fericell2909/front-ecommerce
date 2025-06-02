import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component'; // Asegúrate de tener este componente

export const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: ProductListComponent }, // Ruta principal
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirige rutas no reconocidas a la principal
];