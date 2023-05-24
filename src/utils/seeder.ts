import axios from "axios";

import userModel from "../api/models/user.model";
import movieModel from "../api/models/movie.model";
import memberModel from "../api/models/member.model";

interface Movie {
  name: String;
  genres: String[];
  image: {
    medium: String;
  };
  premiered: Date;
}

interface Member {
  name: String;
  email: String[];
  address: {
    city: Date;
  };
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

const seedMembers = async () => {
  const { data: membersResp }: { data: Member[] } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );

  const members = membersResp.map((mem) => ({
    name: mem.name,
    email: mem.email,
    city: mem.address.city,
  }));

  await memberModel.insertMany(members);

  console.log("Members seeded successfully!");
};

const seeder = async () => {
  const adminExists = await userModel.countDocuments();
  const countMovies = await movieModel.countDocuments();
  const membersMovies = await memberModel.countDocuments();

  if (!adminExists) {
    seedAdmin();
  }

  if (!countMovies) {
    seedMovies();
  }

  if (!membersMovies) {
    seedMembers();
  }
};

export default seeder;
