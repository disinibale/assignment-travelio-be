import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Wishlists } from './wishlists.model';

@Injectable()
export class WishlistsService {
    private wishlist: Wishlists[] = []

    constructor(@InjectModel('Wishlist') private readonly wishlistModel: Model<Wishlists>,) { }

    async insertWishlist(title: string, description: string) {
        const newWishlist = new this.wishlistModel({
            title, description
        })

        const result = await newWishlist.save()
        return result as object
    }

    async getWishlists() {
        const wishlists = await this.wishlistModel.find().exec()
        return wishlists.map((wish) => ({
            id: wish.id,
            title: wish.title,
            description: wish.description
        }))
    }

    async getById(id: string) {
        const wishlist = await this.findWishlist(id)

        return {
            id: wishlist.id,
            title: wishlist.title,
            description: wishlist.description
        }
    }

    async update(id: string, title: string, description: string) {
        const updatedWishlist = await this.findWishlist(id)
        if (title) {
            updatedWishlist.title = title
        }
        if (description) {
            updatedWishlist.description = description
        }

        updatedWishlist.save()
    }

    async delete(id: string) {
        const result = await this.wishlistModel.deleteOne({_id: id}).exec()
        if (result.deletedCount === 0) {
            throw new NotFoundException('Data tidak ditemukan')
        }
    }

    private async findWishlist(id: string): Promise<Wishlists> {
        let wishlist
        try {
            wishlist = await this.wishlistModel.findById(id).exec()
        } catch (e) {
            throw new NotFoundException('Data tidak ditemukan')
        }

        if (!wishlist) {
            throw new NotFoundException('Data tidak ditemukan')
        }

        return wishlist
    }

}