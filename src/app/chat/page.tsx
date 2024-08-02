import { Input } from "@/components/ui/input";



export default function chatBot(){
    return (
    <div className="mx-36 my-5 h-[800px] flex flex-col">
        <div className="flex-grow">
            question and answers goes here
        </div>
        <div className="mt-auto">
            <Input type="submit" placeholder="Ask Question(text-to-sql)"></Input>
        </div>
    </div>
    )
}