import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateEmployeeDto {
    @IsOptional() // Name is optional for updates
    @IsNotEmpty({ message: "Name cannot be empty" })
    name?: string;
  
    @IsOptional() // Email is optional for updates
    @IsEmail({}, { message: "Invalid email format" })
    email?: string;
  
    @IsOptional() // Position is optional for updates
    @IsNotEmpty({ message: "Position cannot be empty" })
    position?: string;
  
    @IsOptional() // isActive is optional for updates
    isActive?: boolean;
}
