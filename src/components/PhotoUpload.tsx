
import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PhotoUploadProps {
  onResponse: (response: string) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onResponse }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const analyzeImage = () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      onResponse(`I can see this is a math problem about fractions! Let me help you explain this to your child:

**What I see in the image:**
A worksheet with fraction addition problems.

**Simple Explanation for Your Child:**
Think of fractions like pizza slices! 

🍕 **For 1/2 + 1/4:**
- 1/2 means half a pizza (2 out of 4 slices)
- 1/4 means one slice out of 4
- To add them: 2 slices + 1 slice = 3 slices out of 4
- Answer: 3/4

**Teaching Tips:**
1. Use visual aids like drawings or real objects
2. Let them draw circles and divide them into parts
3. Practice with familiar items (pizza, cake, etc.)
4. Be patient - fractions can be tricky!

**What to do next:**
Try more examples with the same denominator first, then move to different denominators when they're comfortable.`);
      setIsAnalyzing(false);
    }, 3000);
  };

  const clearImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {!uploadedImage ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-gray-100 p-4 rounded-full">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Upload Homework Photo
              </h3>
              <p className="text-gray-600 mb-4">
                Take a clear photo of the homework question or worksheet
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>Choose File</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    // Simulate camera capture
                    const canvas = document.createElement('canvas');
                    canvas.width = 400;
                    canvas.height = 300;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                      ctx.fillStyle = '#f3f4f6';
                      ctx.fillRect(0, 0, 400, 300);
                      ctx.fillStyle = '#6b7280';
                      ctx.font = '16px Arial';
                      ctx.textAlign = 'center';
                      ctx.fillText('Sample Math Problem', 200, 120);
                      ctx.fillText('2/3 + 1/6 = ?', 200, 150);
                      ctx.fillText('Show your work below:', 200, 180);
                      setUploadedImage(canvas.toDataURL());
                    }
                  }}
                  className="flex items-center space-x-2"
                >
                  <Camera className="h-4 w-4" />
                  <span>Use Camera</span>
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              Supported formats: JPG, PNG, WEBP (Max 10MB)
            </div>
          </div>
        </div>
      ) : (
        <Card className="p-4">
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded homework"
              className="w-full h-auto rounded-lg shadow-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={clearImage}
              className="absolute top-2 right-2 p-1 h-8 w-8 bg-white/90 hover:bg-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              {isAnalyzing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>Analyze Homework</span>
                </div>
              )}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PhotoUpload;
