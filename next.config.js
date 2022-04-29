/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig


module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "huy1234",
        mongodb_password: "huy123",
        mongodb_cluster: "cluster0",
        mongodb_database: "Summer_Project",
        url: "http://localhost:3000/",
      },
    };
  }
  return {
    env: {
      mongodb_username: "huy1234",
      mongodb_password: "huy123",
      mongodb_cluster: "cluster0",
      mongodb_database: "Summer_Project",
      url: "#",
    },
  };
};