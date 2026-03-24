import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, User } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const ChatbotPage = () => {
  const { users, projects, topicSubmissions, reviewSubmissions } = useStore();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hi! I'm the ProjTrack AI Assistant. Ask me about student progress, submissions, defaulters, or project status. Try: \"How many students haven't submitted their topics?\"" }
  ]);
  const [input, setInput] = useState('');

  const students = users.filter(u => u.role === 'student');

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes('haven\'t submitted') || q.includes('not submitted') || q.includes('pending topic')) {
      const submittedIds = topicSubmissions.map(t => t.studentId);
      const notSubmitted = students.filter(s => !submittedIds.includes(s.id));
      if (notSubmitted.length === 0) return "All students have submitted at least one topic! 🎉";
      return `${notSubmitted.length} student(s) haven't submitted any topics:\n${notSubmitted.map(s => `• ${s.name} (${s.rollNo})`).join('\n')}\n\nWould you like to send them a reminder?`;
    }
    if (q.includes('status') && q.includes('project')) {
      return projects.map(p => {
        const topics = topicSubmissions.filter(t => t.projectId === p.id);
        return `📌 ${p.title}\n   Topics: ${topics.length} submitted, ${topics.filter(t => t.status === 'approved').length} approved\n   Status: ${p.status}`;
      }).join('\n\n');
    }
    if (q.includes('defaulter') || q.includes('behind') || q.includes('late')) {
      const rejected = topicSubmissions.filter(t => t.status === 'rejected');
      if (rejected.length === 0) return "No defaulters identified! All students are on track. 🎉";
      return `⚠️ ${rejected.length} potential issue(s):\n${rejected.map(t => {
        const s = users.find(u => u.id === t.studentId);
        return `• ${s?.name} - Topic rejected: "${t.title}"`;
      }).join('\n')}`;
    }
    if (q.includes('score') || q.includes('grade') || q.includes('average')) {
      const scored = reviewSubmissions.filter(r => r.score);
      if (scored.length === 0) return "No grades recorded yet.";
      const avg = Math.round(scored.reduce((s, r) => s + (r.score || 0), 0) / scored.length);
      return `📊 Grade Statistics:\n• Total graded: ${scored.length}\n• Average score: ${avg}/100\n• Highest: ${Math.max(...scored.map(r => r.score || 0))}/100\n• Grades: ${scored.map(r => r.grade).filter(Boolean).join(', ')}`;
    }
    if (q.includes('how many') && q.includes('student')) {
      return `📊 System Statistics:\n• Total students: ${students.length}\n• Total projects: ${projects.length}\n• Topics submitted: ${topicSubmissions.length}\n• Review submissions: ${reviewSubmissions.length}`;
    }
    
    return "I can help you with:\n• \"How many students haven't submitted their topics?\"\n• \"Show project status overview\"\n• \"Who are the defaulters?\"\n• \"What's the average score?\"\n• \"How many students are in the system?\"\n\nTry one of these queries!";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(m => [...m, { role: 'user', content: userMsg }]);
    setInput('');
    setTimeout(() => {
      setMessages(m => [...m, { role: 'bot', content: generateResponse(userMsg) }]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold font-display text-foreground">🤖 AI Assistant</h1>
        <p className="text-muted-foreground mt-1">Ask about progress, submissions, and project status</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'bot' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full gradient-primary">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[75%] rounded-xl px-4 py-3 text-sm whitespace-pre-line ${
                msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'
              }`}>
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="border-t p-4 flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask about student progress, submissions..."
            className="flex-1"
          />
          <Button className="gradient-primary border-0" onClick={handleSend}><Send className="h-4 w-4" /></Button>
        </div>
      </Card>
    </div>
  );
};

export default ChatbotPage;
