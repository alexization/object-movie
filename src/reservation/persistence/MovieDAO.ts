import { Movie } from '../domain/Movie';

export interface MovieDAO {
    selectMovie(movieId: number): Movie;

    insert(movie: Movie): void;
}
