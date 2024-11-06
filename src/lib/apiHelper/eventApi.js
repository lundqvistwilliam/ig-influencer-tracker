import { get, post } from "./apiClient";

export function createEvent(eventName, description, onSuccess, onError) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/events`;
  post(url, { event_name: eventName, description }, onSuccess, onError);
}

export function getEvents(onSuccess, onError) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/events`;
  get(url, onSuccess, onError);
}