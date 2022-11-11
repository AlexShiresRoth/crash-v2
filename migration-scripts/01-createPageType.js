module.exports = function (migration) {
  const pageType = migration
    .createContentType("pageType")
    .name("LAYOUT - Page")
    .displayField("title");

  //title field
  pageType
    .createField("title")
    .name("Title")
    .type("Symbol")
    .localized(false)
    .required(true);

  //slug field
  pageType
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .localized(false)
    .required(true);

  //change slug field control
  pageType.changeFieldControl("slug", "builtin", "slugEditor");

  //seo field
  pageType
    .createField("seoTitle")
    .name("SEO Title")
    .type("Symbol")
    .localized(false);

  //seo desc
  pageType
    .createField("seoDescription")
    .name("SEO Description")
    .type("Symbol")
    .localized(false);

  //navigation field
  pageType
    .createField("navigation")
    .name("Navigation")
    .type("Link")
    .linkType("Entry")
    .validations([
      {
        linkContentType: ["navigationType"],
      },
    ]);

  //logo field
  pageType
    .createField("logo")
    .name("Logo")
    .type("Link")
    .linkType("Asset")
    .localized(false);

  //sections array field
  pageType
    .createField("sections")
    .name("Sections")
    .type("Array")
    .items({
      type: "Link",
      validations: [
        {
          linkContentType: [
            "heroType",
            "textType",
            "imageType",
            "ctaType",
            "formType",
            "videoType",
            "galleryType",
            "slider",
          ],
        },
      ],
      linkType: "Entry",
    });

  //footer field
  pageType
    .createField("footer")
    .name("Footer")
    .type("Link")
    .linkType("Entry")
    .validations([
      {
        linkContentType: ["footerType"],
      },
    ]);
};
