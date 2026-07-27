import express, { Application, Request, Response } from "express";
import { prisma } from "./app/lib/prisma";
import { indexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/not-found";

const app: Application = express();

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/vi", indexRoutes);

// Basic route
app.get("/", async(req: Request, res: Response) => {
  const specialty = await prisma.specialty.create({
    data:{
        title: "hello4"
    }
  })
  res.status(201).json({
    success : true,
    message : "API is working",
    data: specialty 
  })
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
