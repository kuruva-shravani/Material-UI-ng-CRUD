import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductserviceService } from '../services/productservice.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand new', 'Second Hand', 'Refurbished'];
  public productForm!: FormGroup;
  public actionBtns: string = 'save';
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private productservice: ProductserviceService,
    private matDialog: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    });

    console.log(this.editData);

    if (this.editData) {
      this.actionBtns = 'update';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }

  addProduct() {
    console.log(this.productForm.value);
    if (!this.editData) {
      if (this.productForm.valid) {
        this.productservice.postProduct(this.productForm.value).subscribe({
          next: (product) => {
            alert('product was posted successfully');
            this.productForm.reset();
            this.matDialog.close('save');
          },
          error: (err) => {
            console.log(err);
          },
          // complete: () => {
          //   alert('product was posted successfully');
          // },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.productservice
      .putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (updateproduct) => {
          alert('Product was Updated successfully');
          this.productForm.reset();
          this.matDialog.close('update');
        },
        // error: (err) => {
        //   alert('Error while updating data');
        // },
      });
  }
}
