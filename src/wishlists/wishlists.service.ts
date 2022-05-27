import { Injectable, NotFoundException } from "@nestjs/common"
import { Wishlists } from './wishlists.model';

@Injectable()
export class WishlistsService {
    private wishlist: Wishlists[] = []

    insertWishlist(title: string, description: string) {
        const id = Math.random().toString()
        const newWishlist = new Wishlists(id, title, description)
        this.wishlist.push(newWishlist)

        if (!this.wishlist) throw new NotFoundException('Anda belum memiliki wishlist')

        return newWishlist
    }
    
    getWishlists() {
        return [...this.wishlist]
    }

    getById(id: string) {
        const wishlist = this.findWishlist(id)[0]

        return {...wishlist}
    }

    update(id: string, title: string, description: string) {
        const [wishlist, index] = this.findWishlist(id)
        const updatedWishlist = { ...wishlist }

        if (title) {
            updatedWishlist.title = title
        }
        if (description) {
            updatedWishlist.description = description
        }

        this.wishlist[index] = updatedWishlist
    }

    delete(id: string) {
        const index = this.findWishlist(id)[1]
        this.wishlist.splice(index, 1)        
    }

    private findWishlist(id: string): [Wishlists, number] {
        const wishlistIndex = this.wishlist.findIndex((wish) => wish.id === id)
        const wishlist = this.wishlist[wishlistIndex]

        if (!wishlist) throw new NotFoundException('Wishlist tidak ditemukan')
    
        return [wishlist, wishlistIndex]
    }

}