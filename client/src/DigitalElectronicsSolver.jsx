import { useState, useRef, useEffect } from 'react'
import { Upload, RefreshCw, WandSparkles, Dices } from 'lucide-react'
import loadingSvg from "../public/loading-white.svg"
import randomImg1 from "/questions/deciToBin.png"
import randomImg2 from "/questions/logic-gates.jpg"


export default function ImageAnalyzer() {
  const resultRef = useRef(null);
  const loadingLabel = [
    "Connecting the dots (and gates)...",
    "Making logic out of chaos...",
    "Turning zeros into heroes...",
    "Calculating the unthinkable...",
    "Boolean algebraizing...",
    "Investigating Existance...",
    "Finding truth in the logic forest...",
    "Powering up AI neurons...",
    "Assembling bits of brilliance...",
    "Turning the Boolean Dial...",
    "Solving faster than your Professor...",
  ]
  
  const randomNum = Math.floor(Math.random() * loadingLabel.length);
  const loadingText = loadingLabel[randomNum];

  const randomImgArr = [
    randomImg1, randomImg2
  ]
  // const randomNumImg = Math.floor(Math.random() * randomImgArr.length);
  const [currentIndex, setCurrentIndex] = useState(0);
  const randomImg = randomImgArr[currentIndex]

  const [image, setImage] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  // const [anatype, setAnaType] = useState(null)
  const [loading, setLoading] = useState(false)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#000000'

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      canvas.width = parent.clientWidth
      canvas.height = parent.clientWidth * 0.75 // 4:3 aspect ratio
      if (image) {
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
        img.src = image
      } else {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [image])
// Scrolling To Bottom
  useEffect(() => {
    if (analysisResult) {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [analysisResult]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const getCoordinates = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if (event.touches && event.touches[0]) {
      return {
        x: (event.touches[0].clientX - rect.left) * scaleX,
        y: (event.touches[0].clientY - rect.top) * scaleY
      }
    }
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    }
  }

  const startDrawing = (event) => {
    event.preventDefault()
    const { x, y } = getCoordinates(event)
    const ctx = canvasRef.current.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
  }

  const draw = (event) => {
    if (!isDrawing) return
    event.preventDefault()
    const { x, y } = getCoordinates(event)
    const ctx = canvasRef.current.getContext('2d')
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const handleReset = () => {
  
    setImage(null)
    setAnalysisResult(null)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
 const BASE_URL = '/api'
  const handleAnalyze = async () => {
    const dataUrl = canvasRef.current.toDataURL()
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData: dataUrl }),
      })
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Analysis failed');
      }
      const result = await response.json()
      setAnalysisResult(result)

      // resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      // setAnaType(result?.data[0]?.type) // Checking type
    } catch (error) {
      console.log('Error during analysis:', error)
      setAnalysisResult({ error: `Analysis failed. ${error.message}`})
      // resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    } finally {
      setLoading(false)
    }
  }

  const renderResult = () => {
    if (!analysisResult || analysisResult.error) return <p className="text-red-500">{analysisResult?.error}</p>
    if (!analysisResult.data || analysisResult.data.length === 0) return <p className="text-red-500">No analysis data available.</p>
    const result = analysisResult.data[0]

    switch (result.type) {
      case "boolean_simplification":
        return (
          <div>
            <p>Original Expression: {result.original}</p>
            <p>Simplified Expression: {result.result}</p>
          </div>
        )
      case "logic_expression":
        return (
          <div>
            <p>Expression: {result.expr}</p>
            <p>Simplified Expression: {result.result}</p>
          </div>
        )
      case "code_conversion":
        return (
          <div>
            <p>Input Type: {result.input_type}</p>
            <p>Output Type: {result.output_type}</p>
            <p>Input Value: {result.input}</p>
            <p>Converted Value: {result.result}</p>
          </div>
        )
      case "kmap":
        return (
          <div>
            <p>Variables: {result.variables.join(', ')}</p>
            <p>Simplified SOP: {result.minimized_sop}</p>
            <p>Simplified POS: {result.minimized_pos}</p>
            <p>Expression Type: {result.expression_type}</p>
          </div>
        )
      case "binary_arithmetic":
        return (
          <div>
            <p>Operation: {result.operation}</p>
            <p>Operand 1: {result.operand1}</p>
            <p>Operand 2: {result.operand2}</p>
            <p>Result: {result.result}</p>
          </div>
        )
      default:
        return <p>Unknown analysis type.</p>
    }
  }

  const handleRandom = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % randomImgArr.length);
  setImage(randomImg);
  }
  return (
    <div className="min-h-fit">
      <div className=" mx-auto w-full max-w-[1700px] bg-white rounded-lg shadow-md p-2 flex flex-col">
        <div className='1st'>
        <h1 className="text-4xl font-bold text-center">Boolean<span className='text-[#6a7cff]'>AI</span> <br /></h1>
        <p className='text-center font-semibold text-base'>
        AI <span className='text-[#6a7cff]'>D</span>igital <span className='text-[#6a7cff]'>E</span>lectronics Question Solver</p>
        <p className='text-center font-semibold text-[#4c4c4c] mb-2 text-sm'>Draw Questions or Upload an Image for Logic Gates | Code Conversions (BCD to Excess 3, etc) | K-Map | Binary Arithmetic | Boolean Algebra etc</p>
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            ref={fileInputRef}
            aria-label="Upload image"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          >
            <Upload className="mr-2" size={20} />
            Upload Image
          </button>
        </div>
        </div>
        <div className='2nd'>
        <div className="w-full md:aspect-[12/4] aspect-[4/3] relative">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="absolute top-0 left-0 w-full h-full border border-gray-300 rounded cursor-crosshair touch-none"
            aria-label="Drawing canvas"
          />
        </div>
        </div>
        <div className='3rd'>
        <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-4">
          <button
            onClick={handleReset}
            className="basis-1/4 bg-gray-200 text-xl text-grey-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-300 flex items-center justify-center"
            aria-label="Reset canvas"
          >
            <RefreshCw className="mr-2" size={20} />
            Reset
          </button>
          {/* TODO: to randomly select question from public and clean ups */}
          <button
            onClick={handleRandom}
            className="basis-1/4 bg-gray-200 text-xl text-grey-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-300 flex items-center justify-center"
            aria-label="Reset canvas"
          >
            <Dices className="mr-2" size={20}/>
            Random
          </button>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className={`basis-1/2 bg-[#6a7cff] text-xl text-white py-2 px-4 rounded hover:bg-[#4d62ff] transition duration-300 flex items-center justify-center ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            aria-label="Analyze image"
          >
            {loading ? (
              <>
                <img src={loadingSvg} alt="" className='h-8 mx-2' />
                {loadingText}
              </>
            ) : (
              <>
                <WandSparkles className="mr-2" size={20} />
                Solve AI
              </>
            )}
          </button>
        </div>
        
        <div className="mt-2 bg-gray-100 rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Analysis Result</h2>
          {renderResult()}
      <div ref={resultRef}></div>
        </div>
        </div>
      </div>
    </div>
  )
}
