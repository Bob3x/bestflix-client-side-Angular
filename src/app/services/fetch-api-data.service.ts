/**
 * API Service for MyFlix Application
 * @file fetch-api-data.service.ts
 * @description Handles all API calls to the movie database backend
 */

import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

const apiUrl = "https://my-movies-flix-app-56f9661dc035.herokuapp.com/api/";

/**
 * User interface defining user data structure
 * @interface User
 */
interface User {
    _id: string;
    Username: string;
    Password: string;
    Email: string;
    Birthday: Date;
    FavoriteMovies: Array<string>;
}

/**
 * User registration/update details interface
 * @interface UserDetails
 */
interface UserDetails {
    Username: string;
    Password: string;
    Email: string;
    Birthday?: string;
}

/**
 * Authentication response interface
 * @interface AuthResponse
 */
interface AuthResponse {
    user: User;
    token: string;
}

/**
 * Movie data interface
 * @interface Movie
 */
interface Movie {
    _id: string;
    Title: string;
    Description: string;
    Genre: {
        Name: string;
        Description: string;
    };
    Director: {
        Name: string;
        Bio: string;
        Birthdate: Date;
    };
    ImagePath: string;
    Featured: boolean;
}

/**
 * API Service Class
 * @class FetchApiDataService
 * @description Service providing methods for interacting with the movie API
 */
@Injectable({
    providedIn: "root"
})
export class FetchApiDataService {
    constructor(private http: HttpClient) {}

    /**
     * Helper method to get stored JWT token
     * @private
     * @returns {string} The stored JWT token
     * @throws {Error} If no token is found
     */
    private getToken(): string {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found");
        }
        return token;
    }

    /**
     * Register new user
     * @method userRegistration
     * @param {UserDetails} userDetails - User registration data
     * @returns {Observable<AuthResponse>} Observable of auth response with token
     * @description Registers new user and returns authentication token
     */
    public userRegistration(userDetails: UserDetails): Observable<AuthResponse> {
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailPattern.test(userDetails.Email)) {
            return throwError(() => new Error("Invalid email format"));
        }

        // Ensure Username is provided and properly formatted
        if (!userDetails.Username || userDetails.Username.trim().length < 1) {
            return throwError(() => new Error("Username is required"));
        }

        const formattedData = {
            Username: userDetails.Username.trim(),
            Password: userDetails.Password,
            Email: userDetails.Email.toLowerCase(),
            Birthday: userDetails.Birthday
                ? new Date(userDetails.Birthday).toISOString().split("T")[0]
                : undefined
        };

        console.log("Sending formatted data:", formattedData);
        return this.http
            .post<AuthResponse>(apiUrl + "users", formattedData, {
                headers: new HttpHeaders({
                    "Content-Type": "application/json"
                })
            })
            .pipe(
                map((response: AuthResponse): AuthResponse => {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("user", JSON.stringify(response.user));
                    return response;
                }),
                catchError((error) => {
                    console.error("Registration error:", error);
                    if (error.error && Array.isArray(error.error)) {
                        const messages = error.error.map((e: any) => e.msg).join(", ");
                        return throwError(() => new Error(messages));
                    }
                    return throwError(() => error);
                })
            );
    }

    /**
     * User login
     * @method userLogin
     * @param {UserDetails} userDetails - User login credentials
     * @returns {Observable<AuthResponse>} Observable of auth response with token
     * @description Authenticates user and returns token
     */
    public userLogin(userDetails: any): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(apiUrl + "login", userDetails).pipe(
            map((response: AuthResponse): AuthResponse => {
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));
                return response;
            }),
            catchError((error) => {
                console.error("Error:", error);
                return throwError(() => error);
            })
        );
    }

    /**
     * Get user profile
     * @method getUser
     * @param {string} username - Username to retrieve
     * @returns {Observable<User>} Observable of user data
     * @description Fetches user profile data
     * @requires Authorization Bearer token
     */
    getUser(username: string): Observable<User> {
        return this.http
            .get<User>(apiUrl + `users/${username}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: User): User => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    /**
     * Update user profile
     * @method editUser
     * @param {string} username - Username to update
     * @param {Partial<User>} updatedUser - Updated user data
     * @returns {Observable<User>} Observable of updated user data
     * @description Updates user profile information
     * @requires Authorization Bearer token
     */
    editUser(username: string, updatedUser: Partial<User>): Observable<User> {
        return this.http
            .put<User>(apiUrl + `users/${username}`, updatedUser, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: User): User => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    /**
     * Delete user account
     * @method deleteUser
     * @param {string} username - Username to delete
     * @returns {Observable<User>} Observable of deleted user data
     * @description Permanently removes user account
     * @requires Authorization Bearer token
     */
    deleteUser(username: string): Observable<User> {
        return this.http
            .delete<User>(apiUrl + `users/${username}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: User): User => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    /**
     * Get all movies from database
     * @method getAllMovies
     * @returns {Observable<Movie[]>} Observable array of all movies
     * @description Fetches complete list of movies from the database
     * @requires Authorization Bearer token
     */
    getAllMovies(): Observable<Movie[]> {
        return this.http
            .get<Movie[]>(apiUrl + "movies", {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: Movie[]): Movie[] => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    /**
     * Get single movie details by title
     * @method getOneMovie
     * @param {string} title - Title of the movie to retrieve
     * @returns {Observable<Movie>} Observable of single movie data
     * @description Fetches details of a specific movie by its title
     * @requires Authorization Bearer token
     */
    getOneMovie(title: string): Observable<Movie> {
        return this.http
            .get<Movie>(apiUrl + `movies/${title}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: Movie): Movie => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    /**
     * Get director details by name
     * @method getDirector
     * @param {string} directorName - Name of the director to retrieve
     * @returns {Observable<Movie["Director"]>} Observable of director data
     * @description Fetches director details from the database
     * @requires Authorization Bearer token
     */
    getDirector(directorName: string): Observable<Movie["Director"]> {
        return this.http
            .get<Movie["Director"]>(apiUrl + `movies/Director/${directorName}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: Movie["Director"]): Movie["Director"] => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    /**
     * Get genre details by name
     * @method getGenre
     * @param {string} genreName - Name of the genre to retrieve
     * @returns {Observable<Movie["Genre"]>} Observable of genre data
     * @description Fetches genre details from the database
     * @requires Authorization Bearer token
     */
    getGenre(genreName: string): Observable<Movie["Genre"]> {
        return this.http
            .get<Movie["Genre"]>(apiUrl + `movies/Genre/${genreName}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: Movie["Genre"]): Movie["Genre"] => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    /**
     * Get user's favorite movies
     * @method getFavoriteMovies
     * @param {string} username - Username of the user
     * @returns {Observable<Movie[]>} Observable array of favorite movies
     * @description Fetches all movies marked as favorites by the user
     */
    getFavoriteMovies(username: string): Observable<Movie[]> {
        return this.http
            .get<Movie[]>(apiUrl + `users/${username}/movies`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: Movie[]): Movie[] => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    /**
     * Add movie to user's favorites
     * @method addFavoriteMovie
     * @param {string} movieId - ID of movie to add
     * @returns {Observable<User>} Observable of updated user data
     * @description Adds specified movie to user's favorites list
     */
    addFavoriteMovie(movieId: string): Observable<User> {
        const username = JSON.parse(localStorage.getItem("user") || "{}").Username;
        return this.http
            .post<User>(
                apiUrl + `users/${username}/movies/${movieId}`,
                {},
                {
                    headers: new HttpHeaders({
                        Authorization: "Bearer " + this.getToken()
                    })
                }
            )
            .pipe(
                map((response: User): User => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }

    /**
     * Delete movie from user's favorites
     * @method deleteFavoriteMovie
     * @param {string} movieId - ID of movie to remove
     * @returns {Observable<User>} Observable of updated user data
     * @description Removes specified movie from user's favorites list
     */
    deleteFavoriteMovie(movieId: string): Observable<User> {
        const username = JSON.parse(localStorage.getItem("user") || "{}").Username;
        return this.http
            .delete<User>(apiUrl + `users/${username}/movies/${movieId}`, {
                headers: new HttpHeaders({
                    Authorization: "Bearer " + this.getToken()
                })
            })
            .pipe(
                map((response: User): User => {
                    return response;
                }),
                catchError((error) => {
                    console.error("Error:", error);
                    return throwError(() => error);
                })
            );
    }
}
