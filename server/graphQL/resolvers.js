const mw = require("../rest_functions/must_watch");
const sp = require("../rest_functions/specific_movie");
const sm = require("../rest_functions/search_movies");
const sr = require("../rest_functions/save_review");
const imdb = require('../imdb');

const populateResolver = async (_, args) => {
	const { id } = args;
	try {
		const movies = await imdb(id);
		for (movie of movies) {
			const movieExists = await Movie.findOne({ id: movie.id, actorID: id });
			if (!movieExists) {
				const movieDB = new Movie({
					actorID: req.params.id,
					id: movie.id,
					link: movie.link,
					metascore: movie.metascore,
					poster: movie.poster,
					rating: movie.rating,
					synopsis: movie.synopsis,
					title: movie.title,
					votes: movie.votes,
					year: movie.year
				});
				await movieDB.save();
			}
		}
		const numMovies = await Movie.countDocuments({ actorID: id }, (err, count) => {
			return count;
		});
		return { total: numMovies };
	}
	catch (err) {
		return { error: err.message };
	}
};

const randomMovieResolver = async () => {
	try {
		const must_watch_movie = mw.mustWatch();
        return must_watch_movie;
	}
	catch (err) {
		return { error: err.message };
	}
};

const specificMovieResolver = async (_, args) => {
	const { id } = args;
	try {
        const specific_movie = await sp.specificMovie(id);
        return specific_movie;
	}
	catch (err) {
		return { error: err.message };
	}
};

const searchMovieResolver = async (_, args) => {
	try {
		let limit = parseInt(args.limit);
        let metascore = parseInt(args.metascore);
        const search_movies = await sm.searchMovies(limit,metascore);
        return search_movies;
	}
	catch (err) {
		return { error: err.message };
	}
};

const postReviewResolver = async (_, args) => {
	const { id, date, review } = args;
	try {
		result = await sr.saveReview(movie_id,date,review);
        return result;
	}
	catch (err) {
		return { error: err.message };
	}
};

module.exports = {
	populateResolver,
	randomMovieResolver,
	specificMovieResolver,
	searchMovieResolver,
	postReviewResolver
}