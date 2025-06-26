
import React, { useState } from 'react';
import { Camera, MessageSquare, History, Upload, Send, BookOpen, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import PhotoUpload from '@/components/PhotoUpload';
import QuestionHistory from '@/components/QuestionHistory';
import AiResponse from '@/components/AiResponse';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'photo' | 'text' | 'history'>('photo');
  const [textQuestion, setTextQuestion] = useState('');
  const [currentResponse, setCurrentResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextSubmit = async () => {
    if (!textQuestion.trim()) return;
    
    setIsLoading(true);
    // Simulate AI response
    setTimeout(() => {
      setCurrentResponse(`Great question! Let me break this down in a simple way for you and your child:

**Understanding the Problem:**
${textQuestion}

**Simple Explanation:**
This is a common topic that many children find challenging. Here's how you can explain it step by step:

1. Start with the basics - make sure your child understands the fundamental concept
2. Use real-world examples they can relate to
3. Break down the problem into smaller, manageable parts
4. Encourage them to try each step themselves

**Parent Tip:** 
Be patient and encouraging. It's okay if they don't get it right away - learning takes time!

**Next Steps:**
- Practice with similar problems
- Ask their teacher for additional resources if needed
- Celebrate small wins to build confidence`);
      setIsLoading(false);
      setTextQuestion('');
    }, 2000);
  };

  const handlePhotoResponse = (response: string) => {
    setCurrentResponse(response);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-xl">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Parent Power-Up AI</h1>
                <p className="text-sm text-gray-600">Homework help made simple</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="hidden sm:flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>Family Plan</span>
              </Badge>
              <Badge variant="outline" className="hidden sm:flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>KES 5/question</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Help Your Child Excel in School
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Simply snap a photo of homework or ask a question, and get clear, 
            parent-friendly explanations to help your child learn.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur">
              {/* Tab Navigation */}
              <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('photo')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                    activeTab === 'photo'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Camera className="h-4 w-4" />
                  <span>Photo Upload</span>
                </button>
                <button
                  onClick={() => setActiveTab('text')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                    activeTab === 'text'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Ask Question</span>
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                    activeTab === 'history'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <History className="h-4 w-4" />
                  <span>History</span>
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'photo' && (
                <PhotoUpload onResponse={handlePhotoResponse} />
              )}

              {activeTab === 'text' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What homework question can I help you with?
                    </label>
                    <Textarea
                      placeholder="Type your child's homework question here... For example: 'My 8-year-old is struggling with fractions. How do I explain 1/2 + 1/4?'"
                      value={textQuestion}
                      onChange={(e) => setTextQuestion(e.target.value)}
                      className="min-h-[120px] resize-none border-gray-200 focus:border-blue-300 focus:ring-blue-200"
                    />
                  </div>
                  <Button 
                    onClick={handleTextSubmit}
                    disabled={!textQuestion.trim() || isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Getting help...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span>Get Help</span>
                      </div>
                    )}
                  </Button>
                </div>
              )}

              {activeTab === 'history' && (
                <QuestionHistory />
              )}
            </Card>
          </div>

          {/* Response Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <AiResponse response={currentResponse} isLoading={isLoading} />
              
              {/* Stats Card */}
              <Card className="p-6 mt-6 bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <h3 className="font-semibold mb-4">Your Impact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Questions Asked</span>
                    <span className="font-bold">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subjects Covered</span>
                    <span className="font-bold">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Learning Streaks</span>
                    <span className="font-bold">7 days</span>
                  </div>
                </div>
              </Card>

              {/* Tips Card */}
              <Card className="p-6 mt-6 border-l-4 border-l-yellow-400 bg-yellow-50">
                <h3 className="font-semibold text-yellow-800 mb-2">💡 Parent Tip</h3>
                <p className="text-sm text-yellow-700">
                  Always encourage your child to try solving the problem first. 
                  This builds confidence and independent thinking skills!
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
