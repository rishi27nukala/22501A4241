import axios from "axios";

const LOG_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";

const AUTH_TOKEN =
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJyaXNoaXRhbnVrYWxhQGdtYWlsLmNvbSIsImV4cCI6MTc1MTA5MTY5NiwiaWF0IjoxNzUxMDkwNzk2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOWZlZjAxMzMtZDllMC00ZDFlLTk1ZTUtNzBmMjY4NDMxOTI4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibnVrYWxhIHJpc2hpdGEgbmFnYSBzYWkiLCJzdWIiOiI1ZmI2MzU4OS01Njk1LTRkNjMtYjAwOC0zZTc3NjlkM2YwMzkifSwiZW1haWwiOiJyaXNoaXRhbnVrYWxhQGdtYWlsLmNvbSIsIm5hbWUiOiJudWthbGEgcmlzaGl0YSBuYWdhIHNhaSIsInJvbGxObyI6IjIyNTAxYTQyNDEiLCJhY2Nlc3NDb2RlIjoiZUhXTnp0IiwiY2xpZW50SUQiOiI1ZmI2MzU4OS01Njk1LTRkNjMtYjAwOC0zZTc3NjlkM2YwMzkiLCJjbGllbnRTZWNyZXQiOiJkalFqd0tVaktzYlFiRHRqIn0.LJoASOxAzQltMP7tJerD0ni6hJlDkkQvEOfUhpxIuvc";
export const sendLog = async ({ stack, level, pkg, message }) => {
  const validStacks = ["frontend", "backend"];
  const validLevels = ["debug", "info", "warn", "error", "fatal"];
  const validPackages = ["api", "components", "style", "state"];

  if (
    !validStacks.includes(stack) ||
    !validLevels.includes(level) ||
    !validPackages.includes(pkg)
  ) {
    console.warn("Invalid log format");
    return null;
  }

  try {
    const response = await axios.post(
      LOG_ENDPOINT,
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: AUTH_TOKEN,
          "Content-Type": "application/json"
        },
      }
    );

    console.log("Log sent. Log ID:", response.data.id);
    return response.data.id;
  } catch (error) {
    console.error("Failed to send log:", error.message);
    return null;
  }
};
