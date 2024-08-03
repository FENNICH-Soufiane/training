const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "name required"]
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: [6, 'Too short password']
    },
    slug: {
        type: String,
        lowercase: true
    },
    profileImg: String,
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
},
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;