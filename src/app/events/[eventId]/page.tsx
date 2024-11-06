'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { getEventById } from "../../../lib/apiHelper/eventApi";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        getEventById(eventId, (result: any) => {
          setEvent(result);
          setLoading(false);
        }, (error: any) => {
          console.log(error);
        });
      } catch (err) {
        setError("Failed to fetch event details");
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!event) {
    return <p>No event found.</p>;
  }

  return (
    <div>
      <h1>{event.event_name}</h1>
      <p>{event.description}</p>
      <p>TODO: Add tracking information here</p>
      {/* Add more event details if needed */}
    </div>
  );
};

export default EventDetails;
