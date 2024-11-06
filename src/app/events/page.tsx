'use client';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Plus } from "lucide-react";
import { createEvent } from '../../lib/apiHelper/eventApi';
import { useState } from "react";


export default function Events() {
  const [event, setEvent] = useState({
    eventName: '',
    eventDescription: '',
  });
  const [open, setOpen] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  function handleCreateEvent(event: { eventName: string; eventDescription: string; }) {
    createEvent(event.eventName, event.eventDescription, (result: any) => {
      console.log('Event created:', result),
        setEvent({
          eventName: '',
          eventDescription: '',
        });
      setOpen(false);
    }, (error: any) =>
      console.error('Failed to create event:', error)
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mb-4'>
          <Plus />Create event
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create event</DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Event name
              </Label>
              <Input id="eventName" name='eventName' className="col-span-3" value={event.eventName} onChange={handleChange} />
            </div>
            <div className="grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Short Description
              </Label>
              <Textarea id='eventDescription' name='eventDescription' value={event.eventDescription} onChange={handleChange} />
            </div>
          </div>
          <p>Add date selector?</p>
          <DialogFooter>
            <Button type="submit" onClick={() => handleCreateEvent(event)}>Save changes</Button>
          </DialogFooter>
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