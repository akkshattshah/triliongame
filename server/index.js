const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const OpenAI = require('openai');
const Anthropic = require('@anthropic-ai/sdk');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://trilion-frontend.onrender.com'],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));

const mediaDir = path.join(__dirname, 'media');
if (!fs.existsSync(mediaDir)) {
  fs.mkdirSync(mediaDir, { recursive: true });
}

app.get('/', (req, res) => {
  res.json({ 
    message: 'Trilion Backend Server is running!', 
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/test', (req, res) => {
  res.json({ 
    message: 'Test endpoint working!',
    apiKeys: {
      openai: process.env.OPENAI_API_KEY ? 'Configured' : 'Missing',
      anthropic: process.env.ANTHROPIC_API_KEY ? 'Configured' : 'Missing'
    }
  });
});

app.post('/analyze', async (req, res) => {
  console.log('POST /analyze received');
  const { ytLink, numClips = 3, clipDuration = 30 } = req.body;
  
  if (!ytLink) {
    return res.status(400).json({ error: 'No YouTube link provided' });
  }

  try {
    console.log('Starting mock analysis for:', ytLink);
    
    const timestamp = Date.now();
    const clipSuggestions = [];
    
    for (let i = 0; i < numClips; i++) {
      const startTime = Math.floor(Math.random() * 300) + 60;
      const endTime = startTime + clipDuration;
      
      const viralTitles = [
        `This Will BLOW Your Mind! 😱 Viral Moment ${i + 1}`,
        `You Won't BELIEVE What Happens Next! 🚨`,
        `The TRUTH About This Will Shock You! 💀`,
        `This Changed My Life Forever! 💰`,
        `INSANE Revelation That Went Viral! 🔥`
      ];
      
      clipSuggestions.push({
        id: i + 1,
        title: viralTitles[i % viralTitles.length],
        description: `This clip has viral potential due to its emotional impact and relatability.`,
        start_time: `${Math.floor(startTime / 60)}:${(startTime % 60).toString().padStart(2, '0')}`,
        end_time: `${Math.floor(endTime / 60)}:${(endTime % 60).toString().padStart(2, '0')}`,
        duration: clipDuration,
        timestamp: Date.now(),
        filename: `clip_${timestamp}_${i + 1}.mp4`,
        viral_score: 8.5 + (Math.random() * 1.5),
        thumbnail_url: `https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Viral+Clip+${i + 1}`,
        download_url: `/clips/clip_${timestamp}_${i + 1}.mp4`
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    res.json({
      success: true,
      message: 'Mock video analysis completed successfully! (Demo version)',
      clips: clipSuggestions,
      analysis_provider: 'mock',
      note: 'This is a demo version showing the UI and clip generation logic.'
    });
    
  } catch (error) {
    console.error('Error in /analyze:', error);
    res.status(500).json({
      error: 'Analysis failed',
      details: error.message
    });
  }
});

app.use('/clips', express.static(mediaDir));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Trilion Backend Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
