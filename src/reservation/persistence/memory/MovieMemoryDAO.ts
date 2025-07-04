import { InMemoryDAO } from './InMemoryDAO';
import { Movie } from '../../domain/Movie';
import { MovieDAO } from '../MovieDAO';

export class MovieMemoryDAO extends InMemoryDAO<Movie> implements MovieDAO {
    selectMovie(movieId: number): Movie {
        const result = this.findOne(movie => movie.id === movieId);

        if (!result) {
            throw new Error(`Cannot find movie with id ${movieId}`);
        }

        return result;
    }
}
