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
  <SheetTrigger>History</SheetTrigger>
  <SheetContent side={"left"}>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>

        </div>
    )
}

export default Sidebar;