const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uuid = require('node-uuid');
var currentContext = require('../../common/currentContext');
const FileType = require('../../common/constants/FileType');
const FileCategory = require('../../common/constants/FileCategory');
var uniqueValidator = require('mongoose-unique-validator');

var modelName = 'Files';

const fileSchema = new mongoose.Schema({
  _id: { type: String, default: uuid.v1},
  name: {
    type: String,
    required: true,
    index: true
  },
  file:{
    type: Object,
    required: true
  },
  project: {
    type: String,
    ref: 'Projects'
  },
  category:{
    type: String,
    required: true,
    enum: Object.values(FileCategory)
  },
  type:{
    type: String,
    enum: Object.values(FileType)
  },
  folderId:{
    type: String,
    ref:"Folders"
  },
  size:{
    type:Number
  },
  entityId:{
    type:String,
    ref:'Users',
    required:true
  },
  createdBy: {
    type: String,
    required: true
  },
  lastModifiedBy: {
    type: String,
    required: true
  }
}, { timestamps: true });

fileSchema.plugin(uniqueValidator);

fileSchema.statics = {


  getById: function(id) {
    var context = currentContext.getCurrentContext();
    return this.db.useDb(context.workspaceId).model(modelName).findById(id);
  },
  search: function(query) {
    var context = currentContext.getCurrentContext();
    var conn = this.db.useDb(context.workspaceId).model(modelName);
    return conn.find(query);
  },
  searchOne: function(query) {
    var context = currentContext.getCurrentContext();
    return this.db.useDb(context.workspaceId).model(modelName).findOne(query);
  },
  updateById: function(id, updateData) {
    var context = currentContext.getCurrentContext();
    var options = { new: true };
    return this.db.useDb(context.workspaceId).model(modelName).findOneAndUpdate({ _id: id }, { $set: updateData }, options);
  },
  deletebyId: function(id) {
    var context = currentContext.getCurrentContext();
    return this.db.useDb(context.workspaceId).model(modelName).findByIdAndDelete(id);
  },
  create: function(data) {
    var context = currentContext.getCurrentContext();
    var entityModel = this.db.useDb(context.workspaceId).model(modelName);
    var entity = new entityModel(data);
    return entity.save();
  },
  getPaginatedResult: function (query, options) {
    var context = currentContext.getCurrentContext();
    return this.db.useDb(context.workspaceId).model(modelName).find(query, null, options);
  },
  countDocuments: function (query) {
    var context = currentContext.getCurrentContext();
    return this.db.useDb(context.workspaceId).model(modelName).count(query);
  },
  groupByKeyAndCountDocuments: function (key) {
    var context = currentContext.getCurrentContext();
    return this.db.useDb(context.workspaceId).model(modelName).aggregate([{ $group: { _id: '$' + key, count: { $sum: 1 } } }]);
  }
}

const Files = mongoose.model(modelName, fileSchema);

module.exports = Files;