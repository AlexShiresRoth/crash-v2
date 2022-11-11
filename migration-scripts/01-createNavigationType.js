module.exports = function (migration) {
  //navigation type
  const navigationType = migration
    .createContentType("navigationType")
    .name("LAYOUT - Navigation")
    .displayField("title");

  //title field
  navigationType
    .createField("title")
    .name("Title")
    .type("Symbol")
    .localized(false)
    .required(true);

  //navigation items field
  navigationType
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
