
import React from 'react';
import { Card } from '@/components/ui/card';
import { Bot, Copy, Share, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AiResponseProps {
  response: string | null;
  isLoading: boolean;
}

const AiResponse: React.FC<AiResponseProps> = ({ response, isLoading }) => {
  const copyToClipboard = () => {
    if (response) {
      navigator.clipboard.writeText(response);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-full">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800">AI Helper</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <span className="text-sm text-gray-600 ml-2">Analyzing your question...</span>
          </div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        </div>
      </Card>
    );
  }

  if (!response) {
    return (
      <Card className="p-6 bg-gray-50 border-gray-200">
        <div className="text-center">
          <div className="bg-gray-200 p-3 rounded-full inline-block mb-4">
            <Bot className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-600 mb-2">Ready to Help!</h3>
          <p className="text-sm text-gray-500">
            Upload a photo or ask a question to get started. 
            I'll provide clear explanations to help you and your child.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-full">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800">AI Helper Response</h3>
        </div>
        
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" onClick={copyToClipboard}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="prose prose-sm max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {response}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-blue-200">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">Was this helpful?</p>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AiResponse;
