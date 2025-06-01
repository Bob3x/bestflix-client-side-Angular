// src/app/models/user.ts

/**
 * User Models
 * @file user.ts
 * @description Type definitions for user-related data structures
 */

/**
 * Core User interface
 * @interface User
 * @description Defines the base user data structure
 */
export interface User {
    _id: string;
    Username: string;
    Password: string;
    Email: string;
    Birthday: Date;
    FavoriteMovies: string[];
}

/**
 * User Response interface
 * @interface UserResponse
 * @description User data returned from API, excluding password with auth token
 * @extends Omit <User, "Password">
 */
export interface UserResponse extends Omit<User, "Password"> {}

/**
 * Registration Response interface
 * @interface RegistrationResponse
 * @description User data returned from API with auth token
 */
export interface RegistrationResponse {
    user: UserResponse;
    token: string;
}

/**
 * User Login interface
 * @interface UserLogin
 * @description Required fields for user login
 */
export interface UserLogin {
    Username: string;
    Password: string;
}

/**
 * User Registration interface
 * @interface UserRegistration
 * @description Required fields for new user registration
 * @extends UserLogin
 */
export interface UserRegistration extends UserLogin {
    Email: string;
    Birthday?: Date;
}
