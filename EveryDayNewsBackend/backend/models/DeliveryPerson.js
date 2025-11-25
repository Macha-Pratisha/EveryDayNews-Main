import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const deliveryPersonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    area: { type: String, required: true },
    role: { type: String, default: 'delivery' },
    branchName: { type: String, default: 'Main Branch' }, // optional
  },
  { timestamps: true }
);

// Hash password before save
deliveryPersonSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match password
deliveryPersonSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const DeliveryPerson = mongoose.model('DeliveryPerson', deliveryPersonSchema);
export default DeliveryPerson;
