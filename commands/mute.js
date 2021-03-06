const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args, prefix, language, beta) => {
  if (args == 0)return message.reply("you forgot who you want to mute!")
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be muted!");
// let role = message.guild.roles.find(r => r.name === "muted");
let roles = JSON.parse(fs.readFileSync("./storage/roles.json", "utf8",));
if(!roles[message.guild.id])return message.reply(`you first need to run \`\`${prefix}muterole\`\` !`)
let role = roles[message.guild.id].muterole
// Let's pretend you mentioned the user you want to add a role to (!addrole @user Role Name):
let member = message.mentions.members.first();
// if(message.member.roles.some( r=>["muted"].includes(r.name))) {
  if(bUser.roles.some( r=>[role].includes(r.id))) {
    message.reply("the member is already muted!")
    return;
  } else {}
// or the person who made the command: let member = message.member;

// Add the role!
member.addRole(role).catch(console.error);
message.channel.send(`The Member ${member} got muted!`)

// Remove a role!
//member.removeRole(role).catch(console.error);
}