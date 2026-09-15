const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function writeFile(filePath, content) {
    fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
}

// 3.1 Prisma Module
ensureDir(path.join(srcDir, 'prisma'));
writeFile(path.join(srcDir, 'prisma', 'prisma.service.ts'), `
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
`);
writeFile(path.join(srcDir, 'prisma', 'prisma.module.ts'), `
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
`);

// 3.2 Main.ts
writeFile(path.join(srcDir, 'main.ts'), `
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(helmet());
  
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(\`Application is running on: \${await app.getUrl()}\`);
}
bootstrap();
`);

// 3.3 App Module
writeFile(path.join(srcDir, 'app.module.ts'), `
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CollectionsModule } from './collections/collections.module';
import { RatesModule } from './rates/rates.module';
import { UploadsModule } from './uploads/uploads.module';
import { EnquiriesModule } from './enquiries/enquiries.module';
import { ShowroomModule } from './showroom/showroom.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [{
        ttl: config.get('THROTTLE_TTL', 60),
        limit: config.get('THROTTLE_LIMIT', 100),
      }],
    }),
    PrismaModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    CollectionsModule,
    RatesModule,
    UploadsModule,
    EnquiriesModule,
    ShowroomModule,
    AdminModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
`);
