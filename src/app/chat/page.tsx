'use client';

import SQLResultTable from "@/components/layouts/sqlTable";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRef, useState, FormEvent } from "react";

type Message = {
    content: string;
    type: 'user' | 'ai';
}


export default function ChatBot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const messageEndRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages(prev => [...prev, { content: input, type: 'user' }]);
        setInput('');

        try {
            const response = await fetch('https://flowise-production-ab53.up.railway.app/api/v1/prediction/6eea80e1-5dcc-432c-8e47-631186eab514', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: input })
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            console.log(data)
            setMessages(prev => [...prev, { content:data.text, type: 'ai' }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { content: 'Sorry, there was an error processing your request.', type: 'ai' }]);
        }
    };
    async function getChatHistory() {
        // const chatID = "526adcba-bd5a-44f8-a365-62a629afbb1a"
        // const sessionId = "fd8e860e-d344-4238-b6f7-1d7c7b75c0f9";
        const sessionId = '868c5336-d1b6-4a08-a18c-cdd19da84ad0';
        const username = "Hemanth";
        const password = "Deansam@120";
      
        try {
          const authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
      
          const response = await fetch(`https://flowise-production-ab53.up.railway.app/api/v1/chatmessage/${sessionId}`, {
            method: 'GET',
            headers: {
              'Authorization': authHeader
            }
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data.messages;
          } else {
            const errorData = await response.json();
            throw new Error(`Error fetching chat history (${response.status}): ${errorData.error}`);
          }
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      getChatHistory();

   
    const renderTextData = (msg: Message) => {
        if (msg.type === "user") {
            return <span className="inline-block p-2 rounded-lg bg-blue-500 text-white">{msg.content}</span>;
        } else {
            // console.log("AI response:", msg.content);
            try {
                const parsedMessage = JSON.parse(msg.content);
                // console.log("Parsed message:", parsedMessage);

                if (parsedMessage && typeof parsedMessage === 'object') {
                    // Find the first key that contains an array
                    const arrayKey = Object.keys(parsedMessage).find(key => Array.isArray(parsedMessage[key]));
                    
                    if (arrayKey && parsedMessage[arrayKey].length > 0) {
                        // console.log(`Rendering table with data from key: ${arrayKey}`, parsedMessage[arrayKey]);
                        return <SQLResultTable data={parsedMessage[arrayKey]} />;
                    }
                } else if (Array.isArray(parsedMessage) && parsedMessage.length > 0) {
                    // Handle case where the response is directly an array
                    // console.log("Rendering table with direct array data", parsedMessage);
                    return <SQLResultTable data={parsedMessage} />;
                }
                
                // console.log("No suitable array found in the parsed message");
            } catch (error) {
                // console.error('Error parsing message:', error);
            }
            // Fallback to displaying the raw message content
            return <span className="inline-block p-2 rounded-lg bg-gray-200 text-black">{msg.content}</span>;
        }
    }

  

    return (
        <div className="mx-36 my-5">
        <div className="h-[800px] flex flex-col justify-between">
            <div className="flex-grow mb-10 overflow-y-auto">
                <Card className="w-full h-full p-4">
                    <CardContent className="overflow-y-auto max-h-full">
                        {messages.map((message, index) => (
                            <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                                {renderTextData(message)}
                            </div>
                        ))}
                        <div ref={messageEndRef} />
                    </CardContent>
                </Card>
            </div>
            <div className="mt-auto">
                <form onSubmit={handleSubmit}>
                    <Input 
                        type="text" 
                        placeholder="Ask Question (text-to-sql)" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </form>
            </div>
        </div>
    </div>
    )

}