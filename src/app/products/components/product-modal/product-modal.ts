import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../models/product.models';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-modal.html',
  styleUrls: ['./product-modal.css'],
})
export class ProductModal implements OnInit {
  @Input() product: Product | null = null;

  @Output() close = new EventEmitter<void>();

  @Output() save = new EventEmitter<Product>();

  protected newProduct = signal<Product>({
    id: 0,
    nombre: '',
    precio: 0,
    descripcion: '',
    stock: 0,
    categoria: '',
    fecha_creacion: ''
  });

  ngOnInit() {
    if (this.product) {
      this.newProduct.set({ ...this.product });
    } else {
      this.newProduct.set({
        id: Math.floor(Math.random() * 1000),
        nombre: '',
        precio: 0,
        descripcion: '',
        stock: 0,
        categoria: '',
        fecha_creacion: new Date().toISOString()
      });
    }
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.save.emit(this.newProduct());
  }
}
