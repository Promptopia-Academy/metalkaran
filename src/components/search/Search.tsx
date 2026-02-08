import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Search() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild className="p-0 w-10 h-10">
          <Button variant="ghost" className="p-0 w-10 h-10">
            <MagnifyingGlassIcon className="w-8 h-8 text-background flex-shrink-0" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-right mt-2">جستجو</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Input
              id="search"
              name="search"
              className="text-right"
              placeholder="جستجو کنید"
            />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
