module.exports = function (migration) {
  //footer column type
  const footerColumnType = migration
    .createContentType("footerColumnType")
    .name("LAYOUT - Footer Column")
    .displayField("title");

  //title field
  footerColumnType
    .createField("title")
    .name("Title")
    .type("Symbol")
    .localized(false)
    .required(true);

  //navigation items field
  footerColumnType
    .createField("navigationItems")
    .name("Navigation Items")
    .type("Array")
    .items({
      type: "Link",
      validations: [
        {
          linkContentType: ["navigationItemType"],
        },
      ],
      linkType: "Entry",
    });
};
