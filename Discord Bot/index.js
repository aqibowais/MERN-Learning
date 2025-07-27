const {Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder} = require("discord.js")
const dotenv = require("dotenv").config()
const {GoogleGenerativeAI} = require("@google/generative-ai")


const token = process.env.TOKEN
const geminiApiKey = process.env.GEMINI_API_KEY; 


const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]})
const googleAI = new GoogleGenerativeAI(geminiApiKey);
const geminiConfig = {
  temperature: 0.4,
  topP: 1,
  topK: 32,
  maxOutputTokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash",
}, geminiConfig);


const generateGeminiResponse = async(prompt)=>{
    try{
        const result = await geminiModel.generateContent(prompt)
        return result.response.text()
    }catch(error){
        console.error("Error generating response from Gemini:", error);
        return "Sorry, I couldn't generate a response at the moment.";
    }
}

client.on("messageCreate",(msg)=>{
    console.log(msg.content)
    if(msg.author.bot) return
    msg.reply("Hello, I am a bot!")
})

// Register slash commands when the client is ready
client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    const commands = [
        new SlashCommandBuilder()
            .setName('gemini')
            .setDescription('Ask Gemini AI a question')
            .addStringOption(option => 
                option.setName('prompt')
                    .setDescription('Your question or prompt')
                    .setRequired(true)
            )
    ];
    
    try {
        const rest = new REST({ version: '10' }).setToken(token);
        console.log('Started refreshing application (/) commands.');
        
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );
        
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
});

client.on("interactionCreate", async(interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName, options } = interaction;
    if (commandName === 'gemini') {
        await interaction.deferReply();
        const prompt = options.getString('prompt') || "Tell me something interesting";
        console.log("Received prompt:", prompt);
        try {
            const response = await generateGeminiResponse(prompt);
            await interaction.editReply(response);
        } catch (error) {
            console.error("Error in interaction:", error);
            await interaction.editReply("An error occurred while generating the response.");
        }
    }   
})

client.login(token)