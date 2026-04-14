import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../models/product.models';
import { ProductsService } from '../services/products.service';
import { ProductModal } from './components/product-modal/product-modal';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductModal],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products implements OnInit {
  private readonly productsService = inject(ProductsService);
  protected readonly products = signal<Product[]>([]);
  
  protected isModalOpen = signal(false);
  protected editingProduct = signal<Product | null>(null);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productsService.getProducts().subscribe({
      next: (data) => {
        console.log('Lista de productos recibida', data);
        this.products.set(data);
      },
      error: (error) => {
        console.error('Error al traer productos', error);
      },
    })
  }

  getProductById(id: number) {
    this.productsService.getProductById(id).subscribe({
      next: (data) => {
        console.log('Producto por ID', data);
        this.products.set([data]);
      },
      error: (error) => console.error('Error al buscar producto por ID', error),
    });
  }

  deleteProduct(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productsService.deleteProduct(id).subscribe({
        next: () => {
          console.log('Producto eliminado');
          this.getProducts();
        },
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  editProduct(product: Product) {
    this.editingProduct.set(product);
    this.isModalOpen.set(true);
  }

  createProduct(product: Product) {
    this.productsService.createProduct(product).subscribe({
      next: () => {
        this.getProducts();
        this.isModalOpen.set(false);
      },
      error: (err: any) => console.error('Error al crear producto', err)
    });
  }

  updateProduct(product: Product) {
    this.productsService.updateProduct(product.id, product).subscribe({
      next: () => {
        this.getProducts();
        this.isModalOpen.set(false);
        this.editingProduct.set(null);
      },
      error: (err: any) => console.error('Error al actualizar producto', err)
    });
  }
}
