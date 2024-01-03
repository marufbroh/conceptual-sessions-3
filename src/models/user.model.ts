import { Query, Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { ACCOUNT_STATUS, USER_ROLE } from "../constants/user.constant";


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Please tell us your name'],
    },
    age: {
        type: Number,
        required: [true, 'Please tell us your age'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please tell us your email'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please tell us your password'],
        select: 0
    },
    passwordChangeAt: {
        type: Date,
        default: null
    },
    photo: String,
    role: {
        type: String,
        enum: Object.values(USER_ROLE),
        default: USER_ROLE.user,
    },
    userStatus: {
        type: String,
        enum: Object.values(ACCOUNT_STATUS),
        default: ACCOUNT_STATUS.active,
    },
},
    {
        timestamps: true
    });

// pre hook for query middleware
// userSchema.pre("find", function (next) {
//     this.find({ userStatus: { $ne: "inactive" } });
//     next();
// })

// userSchema.pre("findOne", function (next) {
//     this.findOne({ userStatus: { $ne: "inactive" } })
//     next();
// })

userSchema.pre(/^find/, function (this: Query<IUser, Document>, next) {
    this.find({ userStatus: { $eq: 'active' } })
    next()
})

userSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { userStatus: { $ne: "inactive" } } })
    next()
})

const User = model<IUser>('User', userSchema);

export default User