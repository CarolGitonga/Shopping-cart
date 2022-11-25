
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public filterCategory: any;
  public productList: any;//store all the products coming from the api
  searchKey: string = "";

//inject the service
  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProduct()//subscribe the res method
    .subscribe(res=>{//getting the res from productsList
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a: any) =>{
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category = "fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productList)
      });

      this.cartService.search.subscribe((val: any)=>{
        this.searchKey = val;
     });   
  }

  addtocart(item: any){
    this.cartService.addtoCart(item);
  }

  filter(category: string){
    this.filterCategory = this.productList
    .filter((a: any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })

  }

}
