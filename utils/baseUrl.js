const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://shop23.cacheup.now.sh"
    : "http://localhost:3000";

export default baseUrl;
