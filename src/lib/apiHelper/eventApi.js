import { get, post } from "./apiClient";

export function createEvent(eventName, description, onSuccess, onError) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/events`;
  post(url, { event_name: eventName, description }, onSuccess, onError);
}

export function getEvents(onSuccess, onError) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/events`;
  get(url, onSuccess, onError);
}

export function getEventById(eventId, onSuccess, onError) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/events/${eventId}`;
  get(url, onSuccess, onError);
}

export function getCampaignByOrganizationId(organizationId, onSuccess, onError) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${organizationId}/events`;
  get(url, onSuccess, onError);
}

export function createCampaign(campaignData, organizationId, onSuccess, onError) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${organizationId}/events`;
  const data = {
    event_name: campaignData.event_name,
    description: campaignData.event_description
  };
  console.log(campaignData);
  console.log(data);
  post(url, data, onSuccess, onError);
}