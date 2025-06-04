import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.index({ username: 1, email: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
  const user = this as IUser;

  if (user.isModified("password")) {
    try {
      user.password = await bcrypt.hash(user.password, 10);
      next();
    } catch (err) {
      next(err as Error);
    }
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as IUser;
  return bcrypt.compare(candidatePassword, user.password);
};

const User = model<IUser>("User", userSchema);
export default User;
