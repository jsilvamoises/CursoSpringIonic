import { ProdutoDTO } from './../../models/produto.dto';
import { Cart } from './../../models/cart';
import { StorangeService } from './../storange.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CartService{
    constructor(public storage:StorangeService){}



    createOrClearCart():Cart{
        let cart: Cart = {items:[]};
        this.storage.setCart(cart);
        return cart;
    }


    getCart():Cart{
        let cart: Cart = this.storage.getCart();
        if(cart == null){
            cart = this.createOrClearCart();
        }

        return cart;
    }

    addProduto(produto:ProdutoDTO):Cart{
        let cart:Cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id );
        if(position == -1){
            cart.items.push({quantidade:1,produto:produto});
        }else{
            cart.items[position].quantidade+=1;
        }
        this.storage.setCart(cart);
        return cart;
    }


    removeProduto(produto:ProdutoDTO):Cart{
        let cart:Cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id );
        if(position != -1){
            cart.items.splice(position,1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    increaseQuantity(produto:ProdutoDTO):Cart{
        let cart:Cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id );
        if(position != -1){
            cart.items[position].quantidade+=1;
        }
        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto:ProdutoDTO):Cart{
        let cart:Cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id );
        if(position != -1){
            cart.items[position].quantidade-=1;
            if(cart.items[position].quantidade < 1){
              cart = this.removeProduto(produto);
            }
        }
        this.storage.setCart(cart);
        return cart;
    }


    total():number{
        let cart = this.getCart();
        let sum = 0.00;
        cart.items.forEach(item =>{
            sum+= item.quantidade * item.produto.preco;
        });

        return sum;
    }
}