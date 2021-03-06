db.locations.save({
name: 'Starcups',
address: '125 High Street, Reading, RG6 1PS', rating: 3,
facilities: ['Hot drinks', 'Food', 'Premium wifi'], coords: [103.83796619999998, 1.2997376999999999 ], // [lgn,lat] 
openingTimes: [{
    days: 'Monday - Friday',
    opening: '7:00am',
    closing: '7:00pm',
    closed: false
  }, {
    days: 'Saturday',
    opening: '8:00am',
    closing: '5:00pm',
    closed: false
  }, {
    days: 'Sunday',
    closed: true
  }]
})

db.locations.update({
  name: 'Starcups'
}, {
  $push: {
    reviews: {
      author: 'Simon Holmes',
      _id: ObjectId(),
      rating: 5,
      timestamp: new Date("Jul 16, 2013"),
      reviewText: "What a great place. I can't say enough good things about it."
    }
  }
})

db.locations.update({
  name: 'Starcups'
}, {
  $push: {
    reviews: {
      author: 'Charlie Chaplin',
      _id: ObjectId(),
      rating: 3,
      timestamp: new Date("Jul 16, 2013"),
      reviewText: "It was okay. Coffee wasn't great, but the wifi was fast."
    }
  }
})
