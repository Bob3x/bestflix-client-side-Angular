/**
 * Movie Card Component
 * @file movie-card.component.ts
 * @description Main component for displaying movie grid and handling movie interactions
 */

// Import statements...

/**
 * Movie interface
 * @interface Movie
 * @description Defines the structure for movie data including genre and director information
 */
import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { User } from "../models/user"; // Adjust the path as necessary
import { FetchApiDataService } from "../services/fetch-api-data.service";
import { isPlatformBrowser } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatCard, MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { NgFor, CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { Router, RouterModule } from "@angular/router";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { MovieDetailsDialogComponent } from "../movie-details-dialog/movie-details-dialog.component";
import { NavbarComponent } from "../navbar/navbar.component";

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
    };
    ImagePath: string;
    isFavorite?: boolean;
}

/**
 * Movie Card Component
 * @class MovieCardComponent
 * @implements OnInit
 * @description Displays grid of movie cards and handles movie-related actions
 */
@Component({
    selector: "app-movie-card",
    standalone: true,
    imports: [
        NavbarComponent,
        MatCardModule,
        NgFor,
        MatCard,
        MatIconModule,
        MatButtonModule,
        CommonModule,
        MatToolbarModule,
        MatMenuModule,
        RouterModule,
        MatDialogModule,
        MatTabsModule
    ],
    templateUrl: "./movie-card.component.html",
    styleUrl: "./movie-card.component.scss"
})
export class MovieCardComponent implements OnInit {
    movies: Movie[] = [];

    /**
     * Creates an instance of MovieCardComponent
     * @constructor
     * @param fetchMovies - Service for API calls
     * @param platformId - Platform identifier for SSR compatibility
     * @param snackBar - Material snackbar for notifications
     * @param dialog - Material dialog service
     * @param router - Angular router service
     */
    constructor(
        public fetchMovies: FetchApiDataService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router
    ) {
        // this.themeService.isDarkTheme$.subscribe((isDark) => (this.isDarkTheme = isDark));
    }

    /*toggleTheme(): void {
        this.themeService.toggleTheme();
    } */

    /**
     * Initializes component
     * @method ngOnInit
     * @description Loads movies and sets favorite status
     */
    ngOnInit(): void {
        this.getMovies();
    }

    /**
     * Fetches movies from API
     * @method getMovies
     * @description Gets all movies and marks favorites based on user data
     */
    getMovies(): void {
        if (isPlatformBrowser(this.platformId)) {
            try {
                const user = localStorage.getItem("user");
                if (!user) {
                    console.warn("No user found in localStorage");
                    return;
                }

                this.fetchMovies.getAllMovies().subscribe({
                    next: (movies: Movie[]) => {
                        // Load movies first without favorites
                        this.movies = movies;
                        console.log("Movies loaded:", this.movies);

                        // Try to add favorites after
                        try {
                            const userData = JSON.parse(user);
                            if (userData && userData.FavoriteMovies) {
                                this.movies = movies.map((movie) => ({
                                    ...movie,
                                    isFavorite: userData.FavoriteMovies.includes(movie._id)
                                }));
                            }
                        } catch (parseError) {
                            console.error("Error parsing favorites:", parseError);
                        }
                    },
                    error: (error) => {
                        console.error("Error fetching movies:", error);
                    }
                });
            } catch (error) {
                console.error("Error in getMovies:", error);
            }
        }
    }

    /**
     * Opens movie genre dialog
     * @method openGenre
     * @param {Movie} movie - Movie to show genre for
     */
    openGenre(movie: Movie): void {
        this.dialog.open(MovieDetailsDialogComponent, {
            data: {
                title: movie.Genre.Name,
                content: movie.Genre.Description
            },
            width: "400px"
        });
    }

    /**
     * Opens movie director dialog
     * @method openDirector
     * @param {Movie} movie - Movie to show director for
     */
    openDirector(movie: Movie): void {
        this.dialog.open(MovieDetailsDialogComponent, {
            data: {
                title: movie.Director.Name,
                content: movie.Director.Bio
            },
            width: "400px"
        });
    }

    /**
     * Opens movie description dialog
     * @method openDescription
     * @param {Movie} movie - Movie to show description for
     */
    openDescription(movie: Movie): void {
        this.dialog.open(MovieDetailsDialogComponent, {
            data: {
                title: movie.Title,
                content: movie.Description
            },
            width: "400px"
        });
    }

    /**
     * Handles adding/removing movies from favorites
     * @method modifyFavoriteMovies
     * @param {Movie} movie - Movie to modify favorite status
     */
    modifyFavoriteMovies(movie: Movie): void {
        //Get current user
        const userString = localStorage.getItem("user");
        if (!userString) return;

        const user = JSON.parse(userString);

        if (movie.isFavorite) {
            // Remove from favorites
            this.fetchMovies.deleteFavoriteMovie(movie._id).subscribe({
                next: (response: User) => {
                    movie.isFavorite = false;
                    // Update user in localStorage
                    user.FavoriteMovies = user.FavoriteMovies.filter(
                        (id: string) => id !== movie._id
                    );
                    localStorage.setItem("user", JSON.stringify(user));

                    this.snackBar.open("Movie removed from favorites", "OK", { duration: 2000 });
                },
                error: (error: Error) => {
                    console.error("Error removing favorite movie:", error);
                    this.snackBar.open("Error removing from favorites", "OK", { duration: 2000 });
                }
            });
        } else {
            // Add to favorites
            this.fetchMovies.addFavoriteMovie(movie._id).subscribe({
                next: (response: User) => {
                    movie.isFavorite = true;
                    // Update user in localStorage
                    user.FavoriteMovies.push(movie._id);
                    localStorage.setItem("user", JSON.stringify(user));

                    this.snackBar.open("Movie added to favorites", "OK", { duration: 2000 });
                },
                error: (error: Error) => {
                    console.error("Error adding favorite:", error);
                    this.snackBar.open("Error adding to favorites", "OK", { duration: 2000 });
                }
            });
        }
    }

    /**
     * Handles user logout
     * @method logout
     * @description Clears storage and redirects to welcome page
     */
    logout(): void {
        if (isPlatformBrowser(this.platformId)) {
            //Clear all stored data
            localStorage.clear();

            // Show logout message
            this.snackBar.open("Logout successful!", "OK", {
                duration: 2000
            });

            // Navigate to welcome page
            this.router.navigate(["welcome"]);
        }
    }
}
