module.exports = function (migration) {
  const tourType = migration
    .createContentType("tourType")
    .description("Section for connecting tour dates")
    .name("LAYOUT - Tour Section")
    .displayField("title");

  //title field
  tourType.createField("title").name("Title").type("Symbol").required(true);

  tourType
    .createField("publicApiKey")
    .name("Bandcamp Public API Key")
    .type("Symbol")
    .required(true);

  tourType
    .createField("followButtontext")
    .name("Follow Button Text")
    .type("Symbol");

  tourType
    .createField("followButtonLink")
    .name("Follow Button Link")
    .type("Symbol");

  tourType
    .createField("requestButtonText")
    .name("Request To Play Button Text")
    .type("Symbol");

  tourType
    .createField("requestButtonLink")
    .name("Request To Play Button Link")
    .type("Symbol");

  tourType
    .createField("showTourDateText")
    .type("Boolean")
    .name("Show Tour Date Text");

  tourType
    .createField("showTourNameText")
    .type("Boolean")
    .name("Show Tour Name Text");

  tourType
    .createField("showTourLocationText")
    .type("Boolean")
    .name("Show Tour Location Text");

  tourType
    .createField("showTourDateTimeText")
    .type("Boolean")
    .name("Show Tour Date Time Text");

  tourType
    .createField("showTourEventPageButton")
    .type("Boolean")
    .name("Show Tour Event Page Button");

  tourType
    .createField("showNotifyMeButton")
    .type("Boolean")
    .name("Show Notify Me Button");
};
