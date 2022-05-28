import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Wishlists } from './wishlists.model';

@Injectable()
export class WishlistsService {
    private wishlist: Wishlists[] = []

    constructor(@InjectModel('Wishlist') private readonly wishlistModel: Model<Wishlists>,) { }

    async insertWishlist(
        uid: string,
        title: string,
        rating: number,
        authors: string,
        thumbnail: string,
    ) {
        const newWishlist = new this.wishlistModel({
            uid, title, rating, authors, thumbnail
        })

        const result = await newWishlist.save()
        return result as object
    }

    async getWishlists() {
        const wishlists = await this.wishlistModel.find().exec()
        return wishlists.map((wish) => ({
            id: wish.id,
            title: wish.title,
            uid: wish.uid,
            rating: wish.rating,
            authors: wish.authors,
            thumbnail: wish.thumbnail
        }))
    }

    async getById(id: string) {
        const wishlist = await this.findWishlist(id)

        return wishlist
    }

    async update(id: string, title: string, rating: number, authors: string, thumbnail: string) {
        const updatedWishlist = await this.findWishlist(id)
        if (title) {
            updatedWishlist.title = title
        }
        if (rating) {
            updatedWishlist.rating = rating
        }
        if (authors) {
            updatedWishlist.authors = authors
        }
        if (thumbnail) {
            updatedWishlist.thumbnail = thumbnail
        }

        updatedWishlist.save()
    }

    async delete(id: string) {
        const result = await this.wishlistModel.deleteOne({ _id: id }).exec()
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