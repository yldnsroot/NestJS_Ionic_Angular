// dto/register.dto.ts
import { IsEmail, MinLength, Matches, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
    message: "Password must contain both letters and numbers"
  })
  password: string;

  @IsNotEmpty({ message: "Position is required" })
  position: string;
}
  