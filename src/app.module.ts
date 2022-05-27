import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WishlistsModule } from './wishlists/wishlists.module';

@Module({
  imports: [WishlistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
