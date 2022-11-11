module.exports = function (migration) {
  const heroType = migration
    .createContentType("heroType")
    .name("Hero")
    .description("A hero section for the homepage")
    .displayField("title");

  heroType.createField("title").name("Title").type("Symbol").required(true);

  heroType
    .createField("image")
    .name("Image")
    .type("Link")
    .linkType("Asset")
    .required(true);

  heroType.createField("heading").name("Heading").type("Symbol").required(true);

  heroType
    .createField("cta")
    .name("Main Call to Action Button Text")
    .type("Symbol")
    .required(true);

  heroType
    .createField("ctaUrl")
    .name("Call To Action Url")
    .type("Symbol")
    .required(true);

  heroType.createField("subheading").name("Subheading").type("Symbol");

  heroType
    .createField("navLinks")
    .name("Navigation Links")
    .type("Array")
    .items({
      type: "Link",
      validations: [
        {
          linkContentType: ["navLinkType"],
        },
      ],
      linkType: "Entry",
    });

  heroType.changeEditorInterface("title", "singleLine", {
    helpText: "The title of the hero section",
  });

  heroType.changeEditorInterface("image", "assetLinkEditor", {
    helpText: "The image to display in the hero section",
  });

  heroType.changeEditorInterface("cta", "singleLine", {
    helpText: "The text to display on the button",
  });

  heroType.changeEditorInterface("ctaUrl", "singleLine", {
    helpText: "The link to go to when the button is clicked",
  });
};
