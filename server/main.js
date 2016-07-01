import { Meteor } from 'meteor/meteor';


Sculptures = new Mongo.Collection("sculptures");


Sculptures.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  artist: {
    type: String,
    label: "Artist"
  },
  date: {
    type: Date,
    label: "Date"    
  },
  lat: {
    type: Number,
    decimal: true,
    label: "Latitude"
  },
  lon: {
    type: Number,
    decimal: true,
    label: "Longitude"
  }
}));




Meteor.startup(() => {


  // code to run on server at startup
  Sculptures.remove({});

  if ( !Sculptures.findOne() ){

    Sculptures.insert({
      artist: "Di Suvero",
      title: "damn good art",
      date: "10/10/1962",
      lat: 41.42327777777778,
      lon: -74.063
    });

  }


});
