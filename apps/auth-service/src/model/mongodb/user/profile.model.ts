import { Schema, model } from 'mongoose';
import { ProfileDtoType } from '../../../dto/user/profile.dto';

const profileSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    avatar: {
      url: {
        type: String,
        default: '',
      },
      key: {
        type: String,
        default: '',
      },
    },
  },
  { timestamps: true },
);

export const Profile = model<ProfileDtoType>('user_profile', profileSchema);
