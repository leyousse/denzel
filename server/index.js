const Express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const pop = require("./rest_functions/pop_data");
const mw = require("./rest_functions/must_watch");
const sp = require("./rest_functions/specific_movie");
const sm = require("./rest_functions/search_movies");
const sr = require("./rest_functions/save_review");
const {DENZEL_IMDB_ID} = require("./constants");
const imdb = require("./imdb");
const graphqlHTTP = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const {queryType} = require("./graphQL/schema");

var app = Express();
var schema = new GraphQLSchema({ query: queryType }); //GraphQL

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());
app.options('*', cors());
app.use("/graphql",graphqlHTTP({schema,graphiql:true}));


//REST endpoint: n°1 - Populate the database with all the Denzel's movies from IMDb
app.get("/movies/populate/nm0000243", async (request, response) => {
    try {
        pop.populate();
        const movies=await imdb(DENZEL_IMDB_ID);
        response.json({ total: movies.length });
    } catch (error) {
      throw(error);
    }
  });

//REST endpoint: n°2 - Fetch a random must-watch movie
app.get("/movies", async (request, response) => {
  const must_watch_movie = await mw.mustWatch();
  response.send(must_watch_movie);
});

//REST endpoint: n°3 - Fetch a specific movie.
app.get("/movies/:id", async (request,response) =>{
  const specific_movie_id = request.params.id;
  const specific_movie = await sp.specificMovie(specific_movie_id);
  response.send(specific_movie);
});

//REST endpoint: n°4 - Search for Denzel's movies.
app.get("/movies/search", async (request,response)=>{
  let limit = parseInt(request.query.limit || 5);
  console.log(limit);
  var metascore = parseInt(request.query.metascore || 77);
  console.log(metascore);
  const search_movies = await sm.searchMovies(limit,metascore);
  response.send(search_movies);
});

//REST endpoint: n°5 - Save a watched date and a review.
app.post("/movies/:id", async (request,response)=>{
  const movie_id = request.params.id;
  const date = request.body.date;
  const review = request.body.review;
  result = await sr.saveReview(movie_id,date,review);
  response.send(result);
});

app.listen(9292);
console.log('📡 Running on port 9292');