# NestJS_Ionic_Angular

Here’s the SQL script to create the **`Employee`** table based on the **TypeORM** entity we defined earlier:

### SQL Script to Create `Employee` Table

```sql
CREATE TABLE Employee (
    id INT PRIMARY KEY IDENTITY(1,1),         -- Auto-incremented ID
    name NVARCHAR(255) NOT NULL,              -- Employee name (non-nullable)
    email NVARCHAR(255) NOT NULL UNIQUE,      -- Employee email (non-nullable, unique)
    password NVARCHAR(255) NOT NULL,          -- Encrypted password (non-nullable)
    position NVARCHAR(255) NOT NULL,          -- Employee position (non-nullable)
    isActive BIT DEFAULT 1,                   -- Active status (default: true)
    role NVARCHAR(50) DEFAULT 'User',         -- Employee role (default: 'User')
    resetToken NVARCHAR(255) NULL,            -- Token for password reset
    resetTokenExpires DATETIME NULL           -- Expiration time for password reset token
);
```

### Explanation:

- **`id INT PRIMARY KEY IDENTITY(1,1)`**: This defines the `id` as the primary key and sets it to auto-increment.
- **`name NVARCHAR(255) NOT NULL`**: This column holds the employee's name and cannot be null.
- **`email NVARCHAR(255) NOT NULL UNIQUE`**: This column stores the employee’s email, and it must be unique and non-nullable.
- **`password NVARCHAR(255) NOT NULL`**: Stores the employee’s password (hashed) and is required.
- **`position NVARCHAR(255) NOT NULL`**: Stores the employee's job position and is required.
- **`isActive BIT DEFAULT 1`**: A boolean-like field (`BIT`), with the default value being 1 (true), indicating that the employee is active.
- **`role NVARCHAR(50) DEFAULT 'User'`**: Stores the role of the employee, with the default value set to `'User'`.
- **`resetToken NVARCHAR(255) NULL`**: This column is used for storing a password reset token if required.
- **`resetTokenExpires DATETIME NULL`**: Stores the expiration date and time of the password reset token.

### To Run This Script:
You can run this SQL script in **SQL Server Management Studio (SSMS)** or any SQL client that supports **MSSQL** to create the `Employee` table.

If you have **TypeORM** configured with `synchronize: true`, TypeORM will automatically generate and synchronize this schema for you. However, using the raw SQL script allows for manual control over the table creation process.
