"use client"

import { useState, useEffect } from "react"
import {
  Brain,
  Trophy,
  ArrowRight,
  RotateCcw,
  CheckCircle,
  Zap,
  HelpCircle,
  Eye,
  MessageSquare,
  TrendingUp,
  Camera,
  Wifi,
  Cloud,
  ThermometerSun,
  Droplets,
  Trees,
  BookOpen,
  Gamepad2,
} from "lucide-react"

const AIProblemSolverGame = () => {
  const challengePool = [
    // Computer Vision Challenges
    {
      id: 1,
      title: "🌊 Ocean Plastic Detection",
      problem: "Detect plastic waste in ocean images to guide cleanup boats.",
      hint: "Think about what kind of information you're starting with and what AI is best at analyzing visual content!",
      correctInput: "image",
      correctModel: "cv",
      correctData: ["satellite", "drone"],
      explanation:
        "Images (input) → Computer Vision (model) → Satellite & Drone Photos (training data). Computer Vision analyzes visual patterns to identify plastic debris in ocean images!",
      impact:
        "The Ocean Cleanup project uses AI-powered cameras on boats to detect and collect plastic, removing tons of waste daily.",
    },
    {
      id: 2,
      title: "🚗 Self-Driving Car Navigation",
      problem: "Help autonomous vehicles identify road signs, pedestrians, and obstacles.",
      hint: "Cars use cameras to 'see' the world. What AI technology helps computers understand what they're looking at?",
      correctInput: "image",
      correctModel: "cv",
      correctData: ["traffic", "street"],
      explanation:
        "Images (input) → Computer Vision (model) → Traffic Camera & Street View Photos (training data). Computer Vision recognizes objects like stop signs, people, and other cars in real-time!",
      impact:
        "Companies like Tesla and Waymo use Computer Vision to process millions of camera frames per second, making roads safer.",
    },
    {
      id: 3,
      title: "🏥 Medical X-Ray Analysis",
      problem: "Detect fractures and abnormalities in medical X-ray images.",
      hint: "Doctors look at X-ray images. What AI can learn to spot patterns that indicate health issues?",
      correctInput: "image",
      correctModel: "cv",
      correctData: ["xrays", "scans"],
      explanation:
        "Images (input) → Computer Vision (model) → X-Ray & Medical Scan databases (training data). Computer Vision learns to identify fractures, tumors, and other medical conditions!",
      impact:
        "AI systems now help radiologists detect diseases like lung cancer 94% accurately, saving thousands of lives annually.",
    },
    {
      id: 4,
      title: "🌾 Crop Disease Detection",
      problem: "Identify diseased plants in farm fields using drone photography.",
      hint: "Farmers take photos of their crops. What AI can analyze these images to find sick plants?",
      correctInput: "image",
      correctModel: "cv",
      correctData: ["crop", "plant"],
      explanation:
        "Images (input) → Computer Vision (model) → Crop Photos & Plant Disease Images (training data). Computer Vision detects early signs of disease by analyzing leaf color and texture patterns!",
      impact:
        "Farmers using AI crop monitoring increase yields by 20-30% and reduce pesticide use by detecting problems early.",
    },
    // Prediction Model Challenges
    {
      id: 5,
      title: "🔥 Wildfire Risk Forecasting",
      problem: "Predict high-risk fire zones 24 hours in advance.",
      hint: "You're trying to predict the FUTURE based on historical patterns. What type of information tracks changes over time?",
      correctInput: "numbers",
      correctModel: "prediction",
      correctData: ["temperature", "humidity", "vegetation"],
      explanation:
        "Numbers (input) → Prediction Model (model) → Temperature, Humidity & Vegetation (training data). The model learns patterns from historical fire data to forecast risk zones!",
      impact:
        "California's AI system analyzes 1000+ data points per minute to predict wildfire risk, helping evacuate communities early and save lives.",
    },
    {
      id: 6,
      title: "⚡ Energy Demand Forecasting",
      problem: "Predict electricity usage to prevent blackouts and save energy.",
      hint: "Power companies track usage numbers over time. What AI can learn from past data to predict future needs?",
      correctInput: "numbers",
      correctModel: "prediction",
      correctData: ["usage", "weather"],
      explanation:
        "Numbers (input) → Prediction Model (model) → Historical Usage & Weather Data (training data). The AI predicts when people will use the most electricity based on patterns!",
      impact:
        "Google uses AI to reduce data center cooling energy by 40%, saving millions of dollars and tons of CO2 emissions.",
    },
    {
      id: 7,
      title: "🌊 Flood Warning System",
      problem: "Predict flooding events 48 hours before they happen.",
      hint: "Floods happen when multiple factors combine. What AI can analyze numerical weather patterns to warn people?",
      correctInput: "numbers",
      correctModel: "prediction",
      correctData: ["rainfall", "river"],
      explanation:
        "Numbers (input) → Prediction Model (model) → Rainfall Data & River Level History (training data). The model predicts flooding by learning from past weather and water level patterns!",
      impact:
        "AI flood prediction systems in Bangladesh have saved over 100,000 lives by providing early warnings to vulnerable communities.",
    },
    {
      id: 8,
      title: "📈 Stock Market Trend Analysis",
      problem: "Forecast which stocks might increase in value based on market data.",
      hint: "Stock prices are numbers that change constantly. What AI specializes in finding patterns in numerical data over time?",
      correctInput: "numbers",
      correctModel: "prediction",
      correctData: ["prices", "trading"],
      explanation:
        "Numbers (input) → Prediction Model (model) → Historical Prices & Trading Volume (training data). The AI analyzes past market patterns to predict potential trends!",
      impact:
        "Investment firms using AI algorithms manage over $1 trillion in assets, processing millions of data points per second.",
    },
    // NLP Challenges
    {
      id: 9,
      title: "🏥 Symptom Analysis Chatbot",
      problem: "Help patients describe symptoms and get health guidance.",
      hint: "Patients will TYPE their symptoms. What AI understands human language and what would it learn from?",
      correctInput: "text",
      correctModel: "nlp",
      correctData: ["symptoms", "medical"],
      explanation:
        "Text (input) → Language Model (model) → Symptom Records & Medical Papers (training data). NLP understands patient descriptions in natural language and matches them to medical knowledge!",
      impact:
        "Ada Health's AI chatbot has helped over 12 million people worldwide access medical information, especially in areas with doctor shortages.",
    },
    {
      id: 10,
      title: "📰 Fake News Detection",
      problem: "Identify misleading or false information in news articles.",
      hint: "News articles are written text. What AI can read and understand if the writing seems trustworthy or suspicious?",
      correctInput: "text",
      correctModel: "nlp",
      correctData: ["verified", "fake"],
      explanation:
        "Text (input) → Language Model (model) → Verified News & Known Fake Articles (training data). NLP analyzes writing patterns, sources, and claims to detect misinformation!",
      impact:
        "Social media platforms use NLP to flag over 1 billion pieces of misinformation monthly, helping users access reliable information.",
    },
    {
      id: 11,
      title: "💬 Customer Service Automation",
      problem: "Automatically respond to customer questions and solve common issues.",
      hint: "Customers write their questions in everyday language. What AI can understand questions and provide helpful answers?",
      correctInput: "text",
      correctModel: "nlp",
      correctData: ["questions", "solutions"],
      explanation:
        "Text (input) → Language Model (model) → Customer Questions & Solution Database (training data). NLP understands what customers are asking and finds the best answers!",
      impact:
        "Companies using AI chatbots resolve 80% of customer queries instantly, saving billions in support costs while improving satisfaction.",
    },
    {
      id: 12,
      title: "🌍 Language Translation Service",
      problem: "Translate text between different languages accurately and naturally.",
      hint: "Translation involves understanding text in one language and writing it in another. What AI specializes in language understanding?",
      correctInput: "text",
      correctModel: "nlp",
      correctData: ["parallel", "dictionary"],
      explanation:
        "Text (input) → Language Model (model) → Parallel Translations & Dictionary Data (training data). NLP learns how words and phrases correspond across languages!",
      impact:
        "Google Translate processes over 100 billion words daily, helping people communicate across language barriers worldwide.",
    },
  ]

  const inputOptions = [
    { id: "image", name: "Images", icon: Camera, description: "Photos & visual data" },
    { id: "text", name: "Text", icon: MessageSquare, description: "Written descriptions" },
    { id: "numbers", name: "Numbers", icon: TrendingUp, description: "Statistics & metrics" },
  ]

  const modelOptions = [
    { id: "cv", name: "Computer Vision", icon: Eye, description: "Recognizes patterns in images" },
    { id: "nlp", name: "Language Model", icon: MessageSquare, description: "Understands text & language" },
    { id: "prediction", name: "Prediction Model", icon: TrendingUp, description: "Forecasts future trends" },
  ]

  const dataOptionsMap = {
    cv: [
      { id: "satellite", name: "Satellite Photos", icon: Cloud, relevant: true },
      { id: "social", name: "Social Posts", icon: Wifi, relevant: false },
      { id: "drone", name: "Drone Images", icon: Camera, relevant: true },
      { id: "weather", name: "Weather Data", icon: ThermometerSun, relevant: false },
      { id: "traffic", name: "Traffic Cameras", icon: Camera, relevant: true },
      { id: "street", name: "Street View Photos", icon: Camera, relevant: true },
      { id: "xrays", name: "X-Ray Database", icon: BookOpen, relevant: true },
      { id: "scans", name: "Medical Scans", icon: BookOpen, relevant: true },
      { id: "crop", name: "Crop Photos", icon: Trees, relevant: true },
      { id: "plant", name: "Plant Disease Images", icon: Trees, relevant: true },
    ],
    prediction: [
      { id: "temperature", name: "Temperature", icon: ThermometerSun, relevant: true },
      { id: "music", name: "Music Files", icon: Gamepad2, relevant: false },
      { id: "humidity", name: "Humidity", icon: Droplets, relevant: true },
      { id: "vegetation", name: "Vegetation Maps", icon: Trees, relevant: true },
      { id: "usage", name: "Energy Usage Data", icon: TrendingUp, relevant: true },
      { id: "rainfall", name: "Rainfall Records", icon: Droplets, relevant: true },
      { id: "river", name: "River Levels", icon: Droplets, relevant: true },
      { id: "prices", name: "Stock Prices", icon: TrendingUp, relevant: true },
      { id: "trading", name: "Trading Volume", icon: TrendingUp, relevant: true },
    ],
    nlp: [
      { id: "symptoms", name: "Symptom Records", icon: BookOpen, relevant: true },
      { id: "recipes", name: "Recipe Books", icon: Gamepad2, relevant: false },
      { id: "medical", name: "Medical Papers", icon: BookOpen, relevant: true },
      { id: "games", name: "Video Games", icon: Gamepad2, relevant: false },
      { id: "verified", name: "Verified News", icon: BookOpen, relevant: true },
      { id: "fake", name: "Fake Article Database", icon: BookOpen, relevant: true },
      { id: "questions", name: "Customer Questions", icon: MessageSquare, relevant: true },
      { id: "solutions", name: "Solution Database", icon: BookOpen, relevant: true },
      { id: "parallel", name: "Parallel Translations", icon: MessageSquare, relevant: true },
      { id: "dictionary", name: "Dictionary Data", icon: BookOpen, relevant: true },
    ],
  }

  const getDataOptionsForChallenge = (challenge) => {
    const correctModel = challenge.correctModel
    const allDataOptions = dataOptionsMap[correctModel]
    const relevantData = allDataOptions.filter((d) => challenge.correctData.includes(d.id))
    const irrelevantData = allDataOptions.filter((d) => !challenge.correctData.includes(d.id))

    const selectedIrrelevant = irrelevantData.sort(() => Math.random() - 0.5).slice(0, 1)

    return [...relevantData, ...selectedIrrelevant].sort(() => Math.random() - 0.5)
  }

  const [shuffledChallenges, setShuffledChallenges] = useState([])
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedInput, setSelectedInput] = useState(null)
  const [selectedModel, setSelectedModel] = useState(null)
  const [selectedData, setSelectedData] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    const selectedChallenges = [...challengePool]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((challenge) => ({
        ...challenge,
        inputOptions: [...inputOptions].sort(() => Math.random() - 0.5),
        modelOptions: [...modelOptions].sort(() => Math.random() - 0.5),
        dataOptions: getDataOptionsForChallenge(challenge),
      }))
    setShuffledChallenges(selectedChallenges)
  }, [])

  const currentChallengeData = shuffledChallenges[currentChallenge]

  if (shuffledChallenges.length === 0) {
    return null
  }

  const handleInputSelect = (inputId) => {
    if (!showResult) setSelectedInput(inputId)
  }

  const handleModelSelect = (modelId) => {
    if (!showResult) setSelectedModel(modelId)
  }

  const handleDataSelect = (dataId) => {
    if (!showResult) {
      if (selectedData.includes(dataId)) {
        setSelectedData(selectedData.filter((id) => id !== dataId))
      } else {
        setSelectedData([...selectedData, dataId])
      }
    }
  }

  const checkSolution = () => {
    const isInputCorrect = selectedInput === currentChallengeData.correctInput
    const isModelCorrect = selectedModel === currentChallengeData.correctModel
    const correctDataSet = new Set(currentChallengeData.correctData)
    const selectedDataSet = new Set(selectedData)

    const isDataCorrect =
      correctDataSet.size === selectedDataSet.size && [...correctDataSet].every((item) => selectedDataSet.has(item))

    const correctCount = [isInputCorrect, isModelCorrect, isDataCorrect].filter(Boolean).length

    if (correctCount === 3) {
      setScore(score + 100)
      setFeedback("🎉 Perfect! All three components correct!")
    } else if (correctCount === 2) {
      setScore(score + 60)
      setFeedback("👍 Good! You got 2 out of 3 correct!")
    } else if (correctCount === 1) {
      setScore(score + 30)
      setFeedback("💡 Keep trying! You got 1 out of 3 correct.")
    } else {
      setFeedback("🤔 Not quite! Read the explanation and try the next challenge.")
    }

    setShowResult(true)
    setShowHint(false)
  }

  const getDetailedExplanation = () => {
    const inputName = currentChallengeData.inputOptions.find((i) => i.id === currentChallengeData.correctInput)?.name
    const modelName = currentChallengeData.modelOptions.find((m) => m.id === currentChallengeData.correctModel)?.name
    const dataNames = currentChallengeData.correctData.map(
      (d) => currentChallengeData.dataOptions.find((opt) => opt.id === d)?.name,
    )

    const selectedInputName = currentChallengeData.inputOptions.find((i) => i.id === selectedInput)?.name
    const selectedModelName = currentChallengeData.modelOptions.find((m) => m.id === selectedModel)?.name

    let whyCorrect = ""
    let whyWrong = ""

    if (selectedInput === currentChallengeData.correctInput) {
      whyCorrect += `✓ ${selectedInputName} is the right input because this problem requires analyzing visual/numerical/textual information.`
    } else {
      whyWrong += `✗ ${selectedInputName} won't work for this problem. We need ${inputName} to solve it.`
    }

    if (selectedModel === currentChallengeData.correctModel) {
      whyCorrect +=
        whyCorrect && `\n✓ ${selectedModelName} is perfect because it specializes in understanding this type of data.`
    } else {
      whyWrong += whyWrong && `\n✗ ${selectedModelName} isn't the right tool. We need ${modelName} for this task.`
    }

    if (selectedData.length > 0 && selectedData.every((d) => currentChallengeData.correctData.includes(d))) {
      const dataList = selectedData
        .map((d) => currentChallengeData.dataOptions.find((opt) => opt.id === d)?.name)
        .join(" and ")
      whyCorrect += `\n✓ ${dataList} is the right training data because it contains real examples that help the AI learn to solve this specific problem.`
    }

    return { whyCorrect, whyWrong }
  }

  const nextChallenge = () => {
    if (currentChallenge < shuffledChallenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1)
      setSelectedInput(null)
      setSelectedModel(null)
      setSelectedData([])
      setShowResult(false)
      setFeedback("")
      setShowHint(false)
    } else {
      setGameComplete(true)
    }
  }

  const restartGame = () => {
    const selectedChallenges = [...challengePool]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((challenge) => ({
        ...challenge,
        inputOptions: [...inputOptions].sort(() => Math.random() - 0.5),
        modelOptions: [...modelOptions].sort(() => Math.random() - 0.5),
        dataOptions: getDataOptionsForChallenge(challenge),
      }))
    setShuffledChallenges(selectedChallenges)
    setCurrentChallenge(0)
    setScore(0)
    setSelectedInput(null)
    setSelectedModel(null)
    setSelectedData([])
    setShowResult(false)
    setGameComplete(false)
    setFeedback("")
    setShowHint(false)
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-[#D4F1F4] p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8 text-center border-2 border-cyan-200">
          <Trophy className="w-24 h-24 text-[#FFD700] mx-auto mb-4 animate-bounce" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mission Complete!</h1>
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl p-6 mb-6 border-2 border-cyan-300">
            <p className="text-6xl font-bold text-[#00BCD4] mb-2">{score}</p>
            <p className="text-xl text-gray-700 font-medium">Total Points</p>
          </div>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            You've mastered the AI pipeline: Input → Model → Training Data! This is how real AI systems work in the
            world today.
          </p>
          <div className="bg-yellow-100 border-2 border-[#FFD700] rounded-3xl p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Career Path:</strong> AI Engineers design these pipelines to solve
              problems. They earn $120,000+ per year and are in high demand worldwide!
            </p>
          </div>
          <button
            onClick={restartGame}
            className="bg-[#00BCD4] hover:bg-[#00ACC1] text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#D4F1F4] p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-md p-5 mb-6 flex items-center justify-between border-2 border-cyan-200">
          <div className="flex items-center gap-3">
            <div className="bg-[#00BCD4] p-2 rounded-2xl">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Problem Solver</h1>
              <p className="text-sm text-gray-600">Build the AI Pipeline</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Challenge</p>
              <p className="text-2xl font-bold text-[#00BCD4]">
                {currentChallenge + 1}/{shuffledChallenges.length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Score</p>
              <p className="text-2xl font-bold text-[#9C27B0]">{score}</p>
            </div>
          </div>
        </div>

        {/* Main Challenge Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-6 border-2 border-cyan-200">
          {/* Challenge Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{currentChallengeData.title}</h2>
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl p-4 mb-4 border-2 border-cyan-200">
              <p className="text-gray-800 font-semibold text-lg">Mission: {currentChallengeData.problem}</p>
            </div>

            {/* Hint Button */}
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 text-[#00BCD4] hover:text-[#00ACC1] font-medium mb-3 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              {showHint ? "Hide Hint" : "Need a Hint?"}
            </button>

            {showHint && (
              <div className="bg-blue-50 border-2 border-[#2196F3] rounded-3xl p-4 mb-4">
                <p className="text-gray-700">
                  <strong className="text-gray-900">Hint:</strong> {currentChallengeData.hint}
                </p>
              </div>
            )}

            {/* Pipeline Visual */}
            <div className="bg-gradient-to-r from-cyan-100 via-blue-100 to-purple-100 rounded-3xl p-5 flex items-center justify-center gap-3 text-gray-700 font-semibold mb-6 flex-wrap border-2 border-cyan-300">
              <span className="bg-[#00BCD4] px-5 py-2.5 rounded-full text-white font-bold">INPUT</span>
              <ArrowRight className="w-6 h-6 text-[#00BCD4]" />
              <span className="bg-[#2196F3] px-5 py-2.5 rounded-full text-white font-bold">AI MODEL</span>
              <ArrowRight className="w-6 h-6 text-[#2196F3]" />
              <span className="bg-[#9C27B0] px-5 py-2.5 rounded-full text-white font-bold">TRAINING DATA</span>
            </div>
          </div>

          {/* Step 1: Input Type */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#00BCD4] w-8 h-8 rounded-full flex items-center justify-center font-bold text-white border-2 border-cyan-300">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                What TYPE of input data will you use to solve this problem?
              </h3>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              {currentChallengeData.inputOptions.map((input) => {
                const IconComponent = input.icon
                return (
                  <button
                    key={input.id}
                    onClick={() => handleInputSelect(input.id)}
                    disabled={showResult}
                    className={`p-5 rounded-3xl border-2 transition-all flex-1 max-w-xs min-w-[200px] ${
                      selectedInput === input.id
                        ? "border-[#00BCD4] bg-cyan-50 shadow-lg scale-105"
                        : "border-gray-200 bg-white hover:border-cyan-300 hover:shadow-md"
                    } ${showResult ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                  >
                    <div className="bg-[#00BCD4] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{input.name}</h4>
                    <p className="text-sm text-gray-600">{input.description}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: AI Model */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#2196F3] w-8 h-8 rounded-full flex items-center justify-center font-bold text-white border-2 border-blue-300">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900">Which AI MODEL is best suited to analyze this data?</h3>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              {currentChallengeData.modelOptions.map((model) => {
                const IconComponent = model.icon
                return (
                  <button
                    key={model.id}
                    onClick={() => handleModelSelect(model.id)}
                    disabled={showResult}
                    className={`p-5 rounded-3xl border-2 transition-all flex-1 max-w-xs min-w-[200px] ${
                      selectedModel === model.id
                        ? "border-[#2196F3] bg-blue-50 shadow-lg scale-105"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                    } ${showResult ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                  >
                    <div className="bg-[#2196F3] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{model.name}</h4>
                    <p className="text-sm text-gray-600">{model.description}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 3: Training Data */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#9C27B0] w-8 h-8 rounded-full flex items-center justify-center font-bold text-white border-2 border-purple-300">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900">What TRAINING DATA does the model need? (Pick 2)</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {currentChallengeData.dataOptions.map((data) => {
                const IconComponent = data.icon
                return (
                  <button
                    key={data.id}
                    onClick={() => handleDataSelect(data.id)}
                    disabled={showResult}
                    className={`p-4 rounded-3xl border-2 transition-all ${
                      selectedData.includes(data.id)
                        ? "border-[#9C27B0] bg-purple-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
                    } ${showResult ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                  >
                    <div className="bg-[#9C27B0] w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{data.name}</p>
                    {selectedData.includes(data.id) && <CheckCircle className="w-5 h-5 text-[#9C27B0] mx-auto mt-2" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Submit Button */}
          {!showResult && (
            <button
              onClick={checkSolution}
              disabled={!selectedInput || !selectedModel || selectedData.length === 0}
              className={`w-full py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                selectedInput && selectedModel && selectedData.length > 0
                  ? "bg-[#FFD700] hover:bg-[#FFC107] text-gray-900 hover:scale-105 shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Zap className="w-6 h-6" />
              Check My AI Pipeline
            </button>
          )}

          {/* Result */}
          {showResult && (
            <div className="space-y-4">
              <div
                className={`p-6 rounded-3xl border-2 ${
                  feedback.includes("Perfect")
                    ? "bg-green-50 border-green-400"
                    : feedback.includes("Good")
                      ? "bg-yellow-50 border-[#FFD700]"
                      : "bg-orange-50 border-orange-400"
                }`}
              >
                <p className="text-2xl font-bold mb-3 text-gray-900">{feedback}</p>
                <div className="bg-white rounded-3xl p-5 mb-3 border-2 border-gray-200">
                  <p className="text-gray-700 font-semibold mb-2">Correct Pipeline:</p>
                  <p className="text-gray-800 leading-relaxed">{currentChallengeData.explanation}</p>
                  {getDetailedExplanation().whyCorrect && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-green-700 leading-relaxed">{getDetailedExplanation().whyCorrect}</p>
                    </div>
                  )}
                  {getDetailedExplanation().whyWrong && (
                    <div className="mt-2">
                      <p className="text-sm text-red-700 leading-relaxed">{getDetailedExplanation().whyWrong}</p>
                    </div>
                  )}
                </div>
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl p-5 border-2 border-cyan-300">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">Real Impact:</strong> {currentChallengeData.impact}
                  </p>
                </div>
              </div>

              <button
                onClick={nextChallenge}
                className="w-full bg-[#00BCD4] hover:bg-[#00ACC1] text-white py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
              >
                {currentChallenge < shuffledChallenges.length - 1 ? (
                  <>
                    Next Challenge
                    <ArrowRight className="w-6 h-6" />
                  </>
                ) : (
                  <>
                    Complete Game
                    <Trophy className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-3xl p-5 shadow-md border-2 border-cyan-200">
          <p className="text-sm font-medium text-gray-600 mb-3">Your Progress</p>
          <div className="flex gap-2">
            {shuffledChallenges.map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 h-3 rounded-full transition-all ${
                  idx < currentChallenge ? "bg-[#4CAF50]" : idx === currentChallenge ? "bg-[#00BCD4]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIProblemSolverGame
