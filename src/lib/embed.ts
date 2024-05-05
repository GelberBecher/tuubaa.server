import { Colors, Embed, EmbedBuilder } from "discord.js";

export function voiceEmbed(message: string, color?: keyof typeof Colors) {
  return new EmbedBuilder()
    .setTitle("Voice Manager")
    .setColor(color || "Blue")
    .setDescription(message);
}