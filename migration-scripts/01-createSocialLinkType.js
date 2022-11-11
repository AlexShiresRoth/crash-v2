module.exports = function (migration) {
  //social link type
  const socialLinkType = migration
    .createContentType("socialLinkType")
    .name("LAYOUT - Social Link")
    .displayField("title");
  //title field
  socialLinkType
    .createField("title")
    .name("Title")
    .type("Symbol")
    .localized(false)
    .required(true);
  //url field
  socialLinkType
    .createField("url")
    .name("URL")
    .type("Symbol")
    .localized(false)
    .required(true);

  //icon field
  socialLinkType
    .createField("icon")
    .name("Icon")
    .type("Symbol")
    .localized(false)
    .required(true);

  //dropdown menu for icons
  socialLinkType.changeFieldControl("icon", "builtin", "dropdown");

  //add dropdown options
  socialLinkType.editField("icon").validations([
    {
      in: [
        "facebook",
        "twitter",
        "instagram",
        "spotify",
        "youtube",
        "tiktok",
        "twitch",
        "reddit",
        "snapchat",
        "vimeo",
        "soundcloud",
      ],
    },
  ]);
};
