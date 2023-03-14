import mongoose from "mongoose";
interface UserAttrs {
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model("User", userSchema);
export { User, buildUser };
