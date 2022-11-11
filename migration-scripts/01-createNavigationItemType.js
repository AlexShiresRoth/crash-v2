module.exports = function (migration) {
  //navigation item type
  const navigationItemType = migration
    .createContentType("navigationItemType")
    .name("LAYOUT - Navigation Item")
    .displayField("displayTitle");

  //title field
  navigationItemType
    .createField("displayTitle")
    .name("Display Title")
    .type("Symbol")
    .localized(false)
    .required(true);

  //slug field
  navigationItemType
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .localized(false)
    .required(true);

  //change slug field control
  navigationItemType.changeFieldControl("slug", "builtin", "slugEditor");
};
