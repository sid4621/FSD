// 1. Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 2. Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// 4. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Successfully connected to MongoDB Atlas!"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

// 5. Define Mongoose Schema and Model
const magazineSchema = new mongoose.Schema({
  Subscriber_id: { type: String, required: true, unique: true },
  Magazine_name: { type: String, required: true },
  Subscription_date: { type: Date, default: Date.now },
  duration: { type: Number, required: true } // Duration in months
}, { timestamps: true });

const Magazine = mongoose.model('Magazine', magazineSchema);

// 6. Define API Routes (CRUD Operations)

// CREATE a new subscription
app.post('/magazines', async (req, res) => {
  try {
    const newSubscription = new Magazine(req.body);
    await newSubscription.save();
    res.status(201).send(newSubscription);
  } catch (error) {
    res.status(400).send({ message: "Error creating subscription", error: error.message });
  }
});

// READ all subscriptions
app.get('/magazines', async (req, res) => {
  try {
    const subscriptions = await Magazine.find();
    res.status(200).send(subscriptions);
  } catch (error) {
    res.status(500).send({ message: "Error fetching subscriptions", error: error.message });
  }
});

// UPDATE a subscription by ID
app.put('/magazines/:id', async (req, res) => {
  try {
    const updatedSubscription = await Magazine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedSubscription) {
      return res.status(404).send({ message: "Subscription not found" });
    }
    res.status(200).send(updatedSubscription);
  } catch (error) {
    res.status(400).send({ message: "Error updating subscription", error: error.message });
  }
});

// DELETE a subscription by ID
app.delete('/magazines/:id', async (req, res) => {
  try {
    const deletedSubscription = await Magazine.findByIdAndDelete(req.params.id);
    if (!deletedSubscription) {
      return res.status(404).send({ message: "Subscription not found" });
    }
    res.status(200).send({ message: "Subscription deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting subscription", error: error.message });
  }
});


// 7. Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});