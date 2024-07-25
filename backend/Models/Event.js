const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: function() { return this.type === 'Home'; } },
  });

const itemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const eventSchema = new Schema({
    type: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: venueSchema, required: true },
    colors: { type: [String], required: true },
    ambiance: { type: [itemSchema], required: true },
    food: { type: [itemSchema], required: true },
    totalPrice: { type: Number, default: 0 },
    extraDetails: { type: String, required: false},
    user: { type:String, required: true }
  }, {
    timestamps: true,
    toJSON: { getters: true }
  });

  // Custom getter for formatting date
eventSchema.path('date').get(function (value) {
  return value.toISOString().split('T')[0]; // Return date in yyyy-mm-dd format
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
