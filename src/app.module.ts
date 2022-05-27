import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WishlistsModule } from './wishlists/wishlists.module';

@Module({
  imports: [
    WishlistsModule, 
    MongooseModule.forRoot(
      'mongodb+srv://root-admin:4bxzoFQRtwyHh2uh@assignment.wbf9t.mongodb.net/?retryWrites=true&w=majority')
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
