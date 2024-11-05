import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";


export default function Events() {
  return (
    <>
      <Dialog>
        <DialogTrigger className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mb-4'>
          <Plus />Create event
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Card className="mb-4 h-28">
        <CardHeader>
          <CardTitle>Event name</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Event description</p>
        </CardContent>
      </Card>
      <Card className="mb-4 h-28">
        <CardHeader>
          <CardTitle>Event name</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Event description</p>
        </CardContent>
      </Card>
    </>
  );
};