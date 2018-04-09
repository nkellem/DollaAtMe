const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.Promise = global.Promise;

let WeaponModel = {};

// so we can keep track of weapon by owner
const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim(0);

const WeaponSchema = new mongoose.Schema({
  opName: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  weaponName: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  skins: {
    type: [String],
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

WeaponSchema.statics.toAPI = doc => ({
  opName: doc.opName,
  weaponName: doc.weaponName,
  skins: doc.skins,
});

WeaponSchema.statics.findByOwner = (ownerId, opName, callback) => {
  const search = {
    owner: convertId(ownerId),
    opName,
  };

  return WeaponModel.find(search).select('weaponName skins').exec(callback);
};

WeaponModel = mongoose.model('Weapon', WeaponSchema);

module.exports = {
  WeaponModel,
  WeaponSchema,
};
