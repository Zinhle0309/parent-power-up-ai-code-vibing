
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Camera, MessageSquare, Star } from 'lucide-react';

const QuestionHistory = () => {
  const historyItems = [
    {
      id: 1,
      type: 'photo',
      question: 'Fraction addition worksheet',
      subject: 'Math',
      grade: 'Grade 3',
      timestamp: '2 hours ago',
      rating: 5
    },
    {
      id: 2,
      type: 'text',
      question: 'How do I explain photosynthesis to a 7-year-old?',
      subject: 'Science',
      grade: 'Grade 2',
      timestamp: '1 day ago',
      rating: 4
    },
    {
      id: 3,
      type: 'photo',
      question: 'Reading comprehension exercise',
      subject: 'English',
      grade: 'Grade 4',
      timestamp: '3 days ago',
      rating: 5
    },
    {
      id: 4,
      type: 'text',
      question: 'Simple multiplication tables practice',
      subject: 'Math',
      grade: 'Grade 2',
      timestamp: '1 week ago',
      rating: 4
    }
  ];

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      'Math': 'bg-blue-100 text-blue-800',
      'Science': 'bg-green-100 text-green-800',
      'English': 'bg-purple-100 text-purple-800',
      'History': 'bg-yellow-100 text-yellow-800'
    };
    return colors[subject] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Recent Questions</h3>
        <Badge variant="outline" className="text-xs">
          {historyItems.length} questions
        </Badge>
      </div>

      {historyItems.length === 0 ? (
        <Card className="p-6 text-center">
          <Clock className="h-8 w-8 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-2">No questions yet</p>
          <p className="text-sm text-gray-500">
            Your question history will appear here as you use the app.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {historyItems.map((item) => (
            <Card key={item.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    {item.type === 'photo' ? (
                      <Camera className="h-4 w-4 text-gray-600" />
                    ) : (
                      <MessageSquare className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate mb-1">
                    {item.question}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={`text-xs ${getSubjectColor(item.subject)}`}>
                      {item.subject}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.grade}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{item.timestamp}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {renderStars(item.rating)}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          
          <Button variant="outline" className="w-full mt-4">
            View All History
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionHistory;
