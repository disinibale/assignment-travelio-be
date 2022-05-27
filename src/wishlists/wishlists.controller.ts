import { Controller, Post, Get, Body, Param, Patch, Delete } from "@nestjs/common"
import { WishlistsService } from "./wishlists.service"

@Controller('wishlists')
export class WishlistsController {

    constructor(private readonly wishlistService: WishlistsService) { }

    @Post()
    addProduct(
        @Body('title') title: string,
        @Body('description') description: string
    ) {
        return {
            'statusCode': '200',
            'data': this.wishlistService.insertWishlist(title, description)
        }
    }

    @Get()
    getAll() {
        return {
            'statusCode': '200',
            'data': this.wishlistService.getWishlists()
        }
    }

    @Get(':id')
    getWishlist(@Param('id') id: string) {
        return this.wishlistService.getById(id)
    }

    @Patch(':id')
    updateWishlist(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('description') description: string
    ) {
        this.wishlistService.update(id, title, description)
        return null
    }

    @Delete(':id')
    removeWishlist(@Param('id') id: string) {
        this.wishlistService.delete(id)
        return null
    }

}
