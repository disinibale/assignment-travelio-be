import { Controller, Post, Get, Body, Param, Patch, Delete } from "@nestjs/common"
import { WishlistsService } from "./wishlists.service"

@Controller('wishlists')
export class WishlistsController {

    constructor(private readonly wishlistService: WishlistsService) { }

    @Post()
    async addProduct(
        @Body('uid') uid: string,
        @Body('title') title: string,
        @Body('rating') rating: number,
        @Body('authors') authors: string,
        @Body('thumbnail') thumbnail: string
    ) {
        const data = await this.wishlistService.insertWishlist(uid, title, rating, authors, thumbnail)

        return {
            'statusCode': '200',
            'data': data
        }
    }

    @Get()
    async getAll() {
        const data = await this.wishlistService.getWishlists()

        return {
            'statusCode': '200',
            'data': data
        }
    }

    @Get(':id')
    getWishlist(@Param('id') id: string) {
        return this.wishlistService.getById(id)
    }

    @Patch(':id')
    async updateWishlist(
        @Param('id') id: string,
        @Body('title') title: string,        
        @Body('rating') rating: number,
        @Body('authors') authors: string,
        @Body('thumbnail') thumbnail: string,
    ) {
        await this.wishlistService.update(id, title, rating, authors, thumbnail)
        return null
    }

    @Delete(':id')
    async removeWishlist(@Param('id') id: string) {
        await this.wishlistService.delete(id)        
        return null
    }

}
