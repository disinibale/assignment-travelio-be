import { Module } from "@nestjs/common";
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from "./wishlists.service";
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistsSchema } from "./wishlists.model";

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'Wishlist',
            schema: WishlistsSchema
        }])
    ],
    controllers: [WishlistsController],
    providers: [WishlistsService]
})
export class WishlistsModule {

}