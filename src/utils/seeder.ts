import axios from "axios";

import userModel from "../api/models/user.model";
import movieModel from "../api/models/movie.model";

interface Movie {
  name: String;
  genres: String[];
  image: {
    medium: String;
  };
  premiered: Date;
}

const seedAdmin = async () => {
  const adminDetails = {
    firstname: "Chaggai",
    lastname: "Thal",
    username: "admin",
    password: "Aa@12345",
    permissions: ["create", "delete"],
    isAdmin: true,
  };

  const admin = new userModel(adminDetails);

  await admin.save();

  console.log("Admin seeded successfully!");
};

const seedMovies = async () => {
  const { data: moviesResp }: { data: Movie[] } = await axios.get(
    "https://api.tvmaze.com/shows"
  );

  const movies = moviesResp.map((mov) => ({
    name: mov.name,
    genres: mov.genres,
    image: mov.image.medium,
    premiered: mov.premiered,
  }));

  await movieModel.insertMany(movies);

  console.log("Movies seeded successfully!");
};

const seeder = async () => {
  const adminExists = await userModel.countDocuments();
  const countMovies = await movieModel.countDocuments();

  if (!adminExists) {
    seedAdmin();
  }

  if (!countMovies) {
    seedMovies();
  }
};

export default seeder;
