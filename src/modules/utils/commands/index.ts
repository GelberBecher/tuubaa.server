import {
  PermissionFlagsBits,
  PermissionsBitField,
  SlashCommandBuilder,
} from "discord.js";
import { SlashInteraction } from "../../../types/commands";
import { uptime } from "../../../bot";
import moment = require("moment");
import { UtilDatabase } from "../database";

export const ping = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ist der Bot ansprechbar?"),
  async execute(interaction: SlashInteraction) {
    await interaction.deferReply({ ephemeral: true });

    await interaction.editReply(
      `API: ${interaction.client.ws.ping}ms\nBot: ${
        Date.now() - interaction.createdTimestamp
      }ms\nUptime: ${moment(uptime).fromNow()}`
    );
  },
};

const keks = {
  data: new SlashCommandBuilder()
    .setName("keks")
    .setDescription("Keks!")
    .addUserOption((option) =>
      option.setName("user").setDescription("User").setRequired(false)
    ),
  async execute(interaction: SlashInteraction) {
    const user = interaction.options.getUser("user");

    if (user) {
      if (user.id == interaction.user.id) {
        await interaction.reply(
          "Trauchig das du dir selbst ein Keks geben willst <:PepeTuba:1084100168745484308>!"
        );
        return;
      }
      await UtilDatabase.addKeks(user.id);

      await interaction.reply(
        `${user}, hier ein Keks von ${interaction.user}! :cookie:`
      );
      return;
    }

    await interaction.reply("Hier ein Keks! :cookie:");
  },
};

const sayAsBot = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Lass den Bot etwas sagen.")
    .addStringOption((option) =>
      option.setName("text").setDescription("Text").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction: SlashInteraction) {
    const message = await interaction.deferReply({ ephemeral: true });

    await interaction.channel?.send(interaction.options.getString("text")!);

    await interaction.editReply("Gesendet!");

    await message.delete();
  },
};

export const fun = [keks, sayAsBot];