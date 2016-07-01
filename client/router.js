FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "mapLayout"});
  }
});

FlowRouter.route('/addSculpture', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "scupltureForm"});
  }
});