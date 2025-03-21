import { z } from "zod";

const registerSchema = z.object({
  username: z.string(),
  password: z.string()
})