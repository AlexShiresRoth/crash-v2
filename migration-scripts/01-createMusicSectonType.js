module.exports = function (migration) {
  const musicSectionType = migration
    .createContentType("musicSection")
    .name("LAYOUT - Music Section")
    .description(
      "Section for music listening platforms such as spotify and apple music"
    )
    .displayField("title");

  musicSectionType
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(true);

  musicSectionType
    .createField("platformEmbeds")
    .type("Array")
    .name("Platform Embeds")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [
        {
          linkContentType: ["musicPlatformEmbed"],
        },
      ],
    });
};
