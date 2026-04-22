const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env.local");
  process.exit(1);
}

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  tech: String,
  link: String,
  order: Number,
});

const ContentSchema = new mongoose.Schema({
  section: String,
  data: mongoose.Schema.Types.Mixed,
});

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
const Content = mongoose.models.Content || mongoose.model("Content", ContentSchema);

const projects = [
  {
    title: "Glamora",
    description: "E-commerce website",
    image: "/glamora.png",
    tech: "Next js, Tailwind css, Framer motion",
    link: "https://final-glamora.vercel.app/",
    order: 1
  },
  {
    title: "MediKit",
    description: "Medical website",
    image: "/medikit.png",
    tech: "Next js, Tailwind css, Framer motion",
    link: "https://parth-medikit.vercel.app/",
    order: 2
  }
];

const heroContent = {
  section: "hero",
  data: {
    heading: "Hi, I’m Parth — I design and develop modern web experiences",
    subtext: "I craft responsive websites where technologies meet creativity",
    image: "/parth-car.jpg"
  }
};

const aboutContent = {
  section: "about",
  data: {
    text1: "Hello, I'm Parth!",
    text2: "I'm a self-taught front-end developer based in Bhavnagar. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.",
    text3: "Transforming my creativity and knowledge into a websites has been my passion for over a year. I have been helping various clients to establish their presence online. I always strive to learn about the newest technologies and frameworks."
  }
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log("Projects seeded");

    await Content.deleteMany({});
    await Content.insertMany([heroContent, aboutContent]);
    console.log("Content seeded");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
