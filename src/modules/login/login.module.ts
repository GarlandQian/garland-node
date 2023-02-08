import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [LoginService],
})
export class LoginModule {}
