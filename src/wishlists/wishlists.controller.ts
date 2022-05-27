import { Controller, Post, Get, Body, Param, Patch, Delete } from "@nestjs/common"
import { WishlistsService } from "./wishlists.service"

@Controller('wishlists')
export class WishlistsController {

    constructor(private readonly wishlistService: WishlistsService) { }

    @Post()
    async addProduct(
        @Body('title') title: string,
        @Body('description') description: string
    ) {
        const data = await this.wishlistService.insertWishlist(title, description)

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
        @Body('description') description: string
    ) {
        await this.wishlistService.update(id, title, description)
        return null
    }

    @Delete(':id')
    async removeWishlist(@Param('id') id: string) {
        await this.wishlistService.delete(id)        
        return null
    }

}
