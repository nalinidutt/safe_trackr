import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Crime Reporting Backend Running');
 });

 app.listen(port, () => {
    console.log(`Server running on port ${port}`);
 });

//  app.post('/report', (req, res) => {
//     const {location, crimeType, description, time} = req.body;

//     console.log('New Crime Reported', req.body);

//     res.status(201).send({ message: 'Report submitted successfully!' });

//  });


 mongoose.connect('mongodb://localhost:27017/crimeReports', { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error('Could not connect to MongoDB', err));

   const reportSchema = new mongoose.Schema({
    location: {
       lat: Number,
       long: Number
    },
    crimeType: String,
    description: String,
    timestamp: { type: Date, default: Date.now }
 });


 const Report = mongoose.model('Report', reportSchema);

 app.post('/report', async (req, res) => {
    const { location, crimeType, description, timestamp } = req.body;
 
    console.log('New Crime Reported', req.body);

    const report = new Report({
       location,
       crimeType,
       description,
       timestamp: timestamp || Date.now()
    });
 
    try {
    
    await report.save();
    console.log('Report saved:', report);
    res.status(201).send({ message: 'Thank you for your report!' });
  } catch (error) {
    console.error('Error saving report:', error); 
    res.status(500).send({ message: 'Failed to save report', error: error.message });
  }
 });

 app.get('/reports', async (req, res) => {
    const reports = await Report.find();
 
    res.status(200).send(reports);
 });