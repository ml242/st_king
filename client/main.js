import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

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



if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.mapLayout.helpers({
    exampleMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
          center: new google.maps.LatLng(41.4249306, -74.0593401),
          zoom: 17
        };
      }
    }
  });

  Template.scupltureForm.events({

    "submit": function(event){
      event.preventDefault();


      Sculptures.insert({
        artist: event.target.artist.value,
        date: event.target.date.value,
        lat: event.target.lat.value,
        lon: event.target.lon.value
      })


      event.target.artist.value = '';
      event.target.date.value = '';
      event.target.lat.value = '';
      event.target.lon.value = '';

      FlowRouter.go('/')

      return false

    }


  })

  Template.mapLayout.onCreated(function() {

    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('exampleMap', function(map) {
      // Add a marker to the map once it's ready

      sculptures = Sculptures.find({}).fetch();
       sculptures.forEach(function(sculpture){
        console.log('adding sculpt');  
        console.log(sculpture);  
        var myLatLng = {lat: sculpture.lat, lng: sculpture.lon};

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map.instance
        });

       }) 

    });
  });
}
