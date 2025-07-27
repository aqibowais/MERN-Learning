const { REST, Routes } = require("discord.js");
const dotenv = require("dotenv").config();

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID; // Ensure you have CLIENT_ID in your .env file

const commands = [
  {
    name: "gemini",
    description: "Replies with Gemini!",
  },
];

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})()
