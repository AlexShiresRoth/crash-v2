module.exports = function (migration) {
  //footer type
  const footerType = migration
    .createContentType("footerType")
    .name("LAYOUT - Footer")
    .displayField("title");

  //title field
  footerType
    .createField("title")
    .name("Title")
    .type("Symbol")
    .localized(false)
    .required(true);

  //copyright field
  footerType
    .createField("copyright")
    .name("Copyright")
    .type("Symbol")
    .localized(false)
    .required(true);

  //navigation columns field
  footerType
    .createField("footerNavigationColumns")
    .name("Footer Navigation Columns")
    .type("Array")
    .items({
      type: "Link",
      validations: [
        {
          linkContentType: ["footerNavigationColumnType"],
        },
      ],
      linkType: "Entry",
    });

  //social links field
  footerType
    .createField("socialLinks")
    .name("Social Links")
    .type("Array")
    .items({
      type: "Link",
      validations: [
        {
          linkContentType: ["socialLinkType"],
        },
      ],
      linkType: "Entry",
    });
};
