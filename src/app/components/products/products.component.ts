
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productList: any;//store all the products coming from the api
//inject the service
  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProduct()//subscribe the res method
    .subscribe(res=>{//getting the res from productsList
      this.productList = res;

      this.productList.forEach((a: any) => {
        Object.assign(a,{quantity:1,total:a.price});
      });
    })
  }

  addtocart(item: any){
    this.cartService.addtoCart(item);

  }

}
