module.exports = function (migration) {
  const embed = migration
    .createContentType("musicPlatformEmbed")
    .name("Music Platform Embed")
    .description(
      "Iframe Embed for a music platform such as Spotify or Apple Music"
    )
    .displayField("title");

  //title field
  embed.createField("title").name("Title").type("Symbol").required(true);

  //embed type
  embed
    .createField("embedType")
    .name("Embed Type")
    .type("Symbol")
    .required(true);

  //embed type dropdown
  embed.changeFieldControl("embedType", "builtin", "dropdown");

  embed.editField("embedType").validations([
    {
      in: ["Spotify", "Apple Music", "Bandcamp", "Soundcloud"],
    },
  ]);

  embed
    .createField("iframeSource")
    .type("Symbol")
    .name("Iframe Source")
    .required(true);
};
