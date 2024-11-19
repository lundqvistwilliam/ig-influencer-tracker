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

import { Loader, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createCampaign, createEvent, getCampaignByOrganizationId, getEvents } from "@/lib/apiHelper/eventApi";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/apiHelper/user/userApi";
import { cookieTranslate } from "@/middleware";

function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}


export default function Campaigns() {
  const [addEvent, setAddEvent] = useState({
    event_name: '',
    event_description: '',
  });

  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any[]>([]);

  const router = useRouter();


  useEffect(() => {
    const userDataCookie = getCookie('user-data');
    let userData = JSON.parse(userDataCookie);
    setUser(userData);

    const handleSuccess = (result: any) => {
      setEvents(result);
      setLoading(false);
    };

    const handleError = (error: any) => {
      setError(error);
      setLoading(false);
    };

    setLoading(true);
    getCampaignByOrganizationId(userData.organization, handleSuccess, handleError);
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  function handleCreateEvent(event: { event_name: string; event_description: string; }) {
    console.log(event);
    createCampaign(event, user?.organization, (result: any) => {
      setEvents((prevEvents) => [...prevEvents, result]);
      setAddEvent({
        event_name: '',
        event_description: '',
      });
      setOpen(false);
    }, (error: any) =>
      console.error('Failed to create event:', error)
    );
  }

  const renderEvents = () => {
    if (events.length <= 0) return null;

    return events.map((event) => {
      return (
        <Card className="mb-4 h-28 hover:cursor-pointer hover:shadow-lg" key={event.id} onClick={() => { handleOnCardClick(event.id); }}>
          <CardHeader>
            <CardTitle>{event.event_name} ({event.id})</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{event.description}</p>
          </CardContent>
        </Card>
      );
    });
  };

  const handleOnCardClick = (eventId: number) => {
    router.push(`/campaigns/${eventId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader size={50} color="#123abc" /> <p>Loading..</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
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
              <Input id="event_name" name='event_name' className="col-span-3" value={addEvent.event_name} onChange={handleChange} />
            </div>
            <div className="grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Short Description
              </Label>
              <Textarea id='event_description' name='event_description' value={addEvent.event_description} onChange={handleChange} />
            </div>
          </div>
          <p>Add date selector?</p>
          <DialogFooter>
            <Button type="submit" onClick={() => handleCreateEvent(addEvent)}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {renderEvents()}
    </>
  );
};