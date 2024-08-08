'use client'

import { useRef, useState, FormEvent } from "react";
import SQLResultTable from "@/components/layouts/sqlTable";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/layouts/skeleton";

type Message = {
    content: string;
    type: 'user' | 'ai';
}

export default function ChatBot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messageEndRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add the user's message and set loading state before making API call
        setMessages(prev => [...prev, { content: input, type: 'user' }, { content: '', type: 'ai' }]);
        setInput('');
        setLoading(true);

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
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { content: data.text, type: 'ai' };
                return newMessages;
            });
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { content: 'Sorry, there was an error processing your request.', type: 'ai' };
                return newMessages;
            });
        } finally {
            setLoading(false);
        }
    };

    const renderTextData = (msg: Message) => {
        if (msg.type === "user") {
            return <span className="inline-block p-2 rounded-lg bg-blue-500 text-white">{msg.content}</span>;
        } else {
            if (loading && msg.content === '') {
                return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
            }

            try {
                const parsedMessage = JSON.parse(msg.content);

                if (parsedMessage && typeof parsedMessage === 'object') {
                    const arrayKey = Object.keys(parsedMessage).find(key => Array.isArray(parsedMessage[key]));

                    if (arrayKey && parsedMessage[arrayKey].length > 0) {
                        return <SQLResultTable data={parsedMessage[arrayKey]} />;
                    }
                } else if (Array.isArray(parsedMessage) && parsedMessage.length > 0) {
                    return <SQLResultTable data={parsedMessage} />;
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }

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
                            placeholder="(text-to-sql) EX-: Display Departments table, Display the Course table. what is the average GAP for Computer science students " 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
