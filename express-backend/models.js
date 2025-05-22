import mongoose from 'mongoose';

const models = {};

export async function initModels() {
  await mongoose.connect('mongodb+srv://george10lee:uwu71HmYSBLuPlpF@groupformation.munya01.mongodb.net/?retryWrites=true&w=majority&appName=GroupFormation');
  console.log("Connected to MongoDB");

  const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    phone: String,
    picture: String,
    role: [String],
    description: String
  });
  models.User = mongoose.model('User', userSchema);
  console.log("User model created");

  const projectSchema = new mongoose.Schema({
    projectName: String,
    projectDescription: String,
    projectMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    projectStarter: String
  });
  models.Project = mongoose.model('Project', projectSchema);
  console.log("Project model created");

  return models;
}
