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

import { Calendar, Loader, Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createCampaign, createEvent, getCampaignByOrganizationId, getEvents } from "@/lib/apiHelper/eventApi";
import { getCurrentUserAction } from "@/lib/actions";
import { toast } from "sonner";

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
    async function fetchUserAndCampaign() {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          console.log("Failed to fetch user");
          return;
        }

        const { user } = await response.json();

        setUser(user);

        if (user?.organization) {
          try {
            getCampaignByOrganizationId(user.organization, handleSuccess, handleError);
          } catch (error) {
            console.error('Failed to fetch campaigns', error);
          }
        }

      } catch (error) {
        console.error('Failed to fetch user', error);
      } finally {
        setLoading(false);
      }
    }
    const handleSuccess = (result: any) => {
      setEvents(result);
      setLoading(false);
    };

    const handleError = (error: any) => {
      setError(error);
      setLoading(false);
    };

    setLoading(true);
    fetchUserAndCampaign();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  function handleCreateEvent(event: { event_name: string; event_description: string; }) {
    createCampaign(event, user?.organization, (result: any) => {
      setEvents((prevEvents) => [...prevEvents, result]);
      setAddEvent({
        event_name: '',
        event_description: '',
      });
      setOpen(false);
      toast("Event has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }, (error: any) =>
      console.error('Failed to create event:', error)
    );
  }

  const renderEvents = () => {
    if (events.length <= 0) return null;

    return events.map((event) => {
      return (
        <div className="grid grid-cols-1 mb-5 gap-6">
          <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => handleOnCardClick(event.id)}>
            <CardHeader>
              <CardTitle>{event.event_name}</CardTitle>
              <CardDescription>{new Date(event.created_at).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Upcoming</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="mr-2 h-4 w-4" />
                <span>Team WWW</span>
              </div>
            </CardFooter>
          </Card>
        </div>
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