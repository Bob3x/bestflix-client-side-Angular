// app.routes.ts
import { Routes } from "@angular/router";
import { MovieCardComponent } from "./movie-card/movie-card.component";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

/**
 * Application route configuration
 * @description Defines the main navigation paths of the application
 * @constant routes
 * @type {Routes}
 */
export const routes: Routes = [
    /**
     * Welcome/Landing page route
     * @path welcome
     * @component WelcomePageComponent
     * @description Initial landing page with login/signup options
     */
    { path: "welcome", component: WelcomePageComponent },
    /**
     * Movies display route
     * @path movies
     * @component MovieCardComponent
     * @description Main movie browsing interface
     */
    { path: "movies", component: MovieCardComponent },
    /**
     * User profile route
     * @path profile
     * @component UserProfileComponent
     * @description User profile management and favorites
     */
    { path: "profile", component: UserProfileComponent },
    /**
     * Default route redirect
     * @path empty string
     * @redirectTo welcome
     * @description Redirects empty path to welcome page
     */
    { path: "", redirectTo: "welcome", pathMatch: "full" },
    /**
     * Wildcard route
     * @path **
     * @redirectTo welcome
     * @description Catches all undefined routes and redirects to welcome
     */
    { path: "**", redirectTo: "welcome" }
];
