import { z } from "zod";

const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof z.ZodError) {
    message = error.errors
      .map((err) => `${err.path.join(".")} - ${err.message}`)
      .join(", ");
  } else if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }
  return message;
};

export default getErrorMessage;
