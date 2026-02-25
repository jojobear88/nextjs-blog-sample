import Fastify from "fastify";
import cors from "@fastify/cors";

type Post = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  author?: string;
  date?: string;
};

const server = Fastify({ logger: true });

// Sample data (5 posts)
let posts: Post[] = [
  {
    id: 1,
    title: "Building a Responsive Navbar with Next.js and Tailwind",
    description:
      "A practical guide to creating a performant, accessible responsive navbar using Next.js routes and Tailwind utility classes. Covers sticky headers, mobile menus, and ARIA attributes.",
    imageUrl: "https://picsum.photos/id/1/1024/768",
    author: "Bùi Quang Duy",
    date: "2024-11-02",
  },
  {
    id: 2,
    title: "TypeScript Patterns for Scalable Frontends",
    description:
      "An overview of common TypeScript patterns (generics, discriminated unions, utility types) to keep frontend codebase robust as it grows.",
    imageUrl: "https://picsum.photos/id/2/1024/768",
    author: "Bùi Quang Duy",
    date: "2024-12-15",
  },
  {
    id: 3,
    title: "API Design in Fastify: Tips for Fast and Typed Backends",
    description:
      "A concise guide to designing clean REST endpoints with Fastify, including schema validation, hooks, and error handling patterns.",
    imageUrl: "https://picsum.photos/id/3/1024/768",
    author: "Bùi Quang Duy",
    date: "2025-02-08",
  },
  {
    id: 4,
    title: "Deploying a Next.js + NestJS Full-Stack App",
    description:
      "Walkthrough of deploying a full-stack project with Next.js on the frontend and NestJS as the API layer, including environment variables and CI/CD ideas.",
    imageUrl: "https://picsum.photos/id/4/1024/768",
    author: "Bùi Quang Duy",
    date: "2025-05-01",
  },
  {
    id: 5,
    title: "Tailwind CSS: Design Tokens and Theming",
    description:
      "Explore how to build a consistent design system in Tailwind using CSS variables, themes, and responsive utility strategies.",
    imageUrl: "https://picsum.photos/id/5/1024/768",
    author: "Bùi Quang Duy",
    date: "2025-08-19",
  },
];

server.get("/api/posts", async () => posts);

server.get("/api/posts/:id", async (request, reply) => {
  const { id } = request.params as any;
  const pid = Number(id);
  const post = posts.find((p) => p.id === pid);
  if (!post) {
    reply.code(404);
    return { message: "Post not found" };
  }
  return post;
});

server.post("/api/posts", async (request, reply) => {
  const body = request.body as any;
  const p: Post = {
    id: Date.now(),
    title: body.title || "Untitled",
    description: body.description || "",
    imageUrl: body.imageUrl || "",
    author: body.author || "Anonymous",
    date: body.date || new Date().toLocaleDateString(),
  };
  posts.unshift(p);
  reply.code(201);
  return p;
});

const start = async () => {
  try {
    // enable CORS for local frontend during development
    await server.register(cors, { origin: "*" });
    await server.listen({ port: 4000, host: "0.0.0.0" });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
