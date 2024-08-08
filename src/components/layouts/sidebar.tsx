import { Button } from "../ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
//   const SHEET_SIDES = ["top", "right", "bottom", "left"] as const
 
// type SheetSide = (typeof SHEET_SIDES)[number]

const Sidebar = ()=>{
    return(
        <div>
            <Sheet>
  <SheetTrigger>Chat-History</SheetTrigger>
  <SheetContent side={"left"}>
    <SheetHeader>
      <SheetTitle></SheetTitle>
      <SheetDescription>
          chat-history and chat-id goes here
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

        </div>
    )
}

export default Sidebar;