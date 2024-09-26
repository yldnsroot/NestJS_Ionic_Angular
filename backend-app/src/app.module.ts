import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { LoggingModule } from './util/logging.module'; 
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables globally
    TypeOrmModule.forRoot({
      type: "mssql",
      host: "127.0.0.1",
      port: 1433, // Default MSSQL port
      username: "sa",
      password: "123456",
      database: "POC_DB",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Automatically synchronize schema during development
      logging: true, // Optional: Enable SQL query logging for development
      options: { encrypt: false },
    }),
    LoggingModule,
    AuthModule,
    EmployeesModule,
  ],
})
export class AppModule {}
