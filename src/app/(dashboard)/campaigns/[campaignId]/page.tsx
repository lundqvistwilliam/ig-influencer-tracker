'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getEventById } from '@/lib/apiHelper/eventApi';
import { Label } from '@radix-ui/react-label';
import { AtSign, Hash, Info, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";

const CampaignDetails = () => {
  const { campaignId } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState({
    keywords: [] as string[],
    hashtags: [] as string[],
    accountNames: [] as string[],
  });
  const [keywordInput, setKeywordInput] = useState('');
  const [hashtagInput, setHashtagInput] = useState('');
  const [accountNameInput, setAccountNameInput] = useState('');

  const addKeyword = () => {
    if (keywordInput.trim() && !trackingInfo.keywords.includes(keywordInput.trim())) {
      setTrackingInfo(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const addAccountName = () => {
    if (accountNameInput.trim() && !trackingInfo.accountNames.includes(accountNameInput.trim())) {
      setTrackingInfo(prev => ({
        ...prev,
        accountNames: [...prev.accountNames, accountNameInput.trim()]
      }));
      setAccountNameInput('');
    }
  };

  const addHashtags = () => {
    if (hashtagInput.trim() && !trackingInfo.hashtags.includes(hashtagInput.trim())) {
      setTrackingInfo(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, hashtagInput.trim()]
      }));
      setHashtagInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setTrackingInfo(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const removeAccountName = (accountName: string) => {
    setTrackingInfo(prev => ({
      ...prev,
      accountNames: prev.accountNames.filter(a => a !== accountName)
    }));
  };

  const removeHashtag = (hashtag: string) => {
    setTrackingInfo(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(a => a !== hashtag)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted tracking info:', trackingInfo);
    setIsDialogOpen(false);
    // Here you would typically send this data to your backend
  };

  useEffect(() => {
    console.log("xd1", campaignId);
    if (!campaignId) return;
    console.log("xd2", campaignId);

    const fetchEvent = async () => {
      try {
        setLoading(true);
        getEventById(campaignId, (result: any) => {
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
  }, [campaignId]);

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
    <Card className="h-screen flex flex-col p-6">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-4">{event.event_name}</h1>
        <p className="text-lg mb-6">{event.description}</p>
        <div className="bg-muted p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Tracking Information</h2>
          {(trackingInfo.keywords.length > 0 || trackingInfo.accountNames.length > 0) ? (
            <div>
              {trackingInfo.keywords.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Keywords:</h3>
                  <div className="flex flex-wrap gap-2">
                    {trackingInfo.keywords.map(keyword => (
                      <span key={keyword} className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {trackingInfo.accountNames.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Account Names:</h3>
                  <div className="flex flex-wrap gap-2">
                    {trackingInfo.accountNames.map(accountName => (
                      <span key={accountName} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm">
                        {accountName}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p>No tracking information added yet.</p>
          )}
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-6" onClick={() => setIsDialogOpen(true)}>
              Add Tracking Information
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px] sm:min-h-[470px]">
            <DialogHeader>
              <DialogTitle>Enter Tracking Information</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-1 cursor-help">
                          <Label htmlFor="keyword" className="cursor-help">Keyword</Label>
                          <Info size={12} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add keywords to your library</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex space-x-2">
                  <Input
                    id="keyword"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="Enter keyword"
                  />
                  <Button type="button" onClick={addKeyword}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {trackingInfo.keywords.map(keyword => (
                    <span key={keyword} className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center">
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="ml-1 focus:outline-none"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-1 cursor-help">
                          <Label htmlFor="keyword" className="cursor-help">Hashtags</Label>
                          <Info size={12} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add hashtags without including the # symbol</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex space-x-2">
                  <Input
                    id="hashtags"
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    placeholder="Enter hashtags"
                  />
                  <Button type="button" onClick={addHashtags}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {trackingInfo.hashtags.map(hashtag => (
                    <span key={hashtag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm flex items-center">
                      {<Hash size={12} />}{hashtag}
                      <button
                        type="button"
                        onClick={() => removeHashtag(hashtag)}
                        className="ml-1 focus:outline-none"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-1 cursor-help">
                          <Label htmlFor="keyword" className="cursor-help">Accounts</Label>
                          <Info size={12} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add hashtags without including the @ symbol</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex space-x-2">
                  <Input
                    id="accountName"
                    value={accountNameInput}
                    onChange={(e) => setAccountNameInput(e.target.value)}
                    placeholder="Enter account name"
                  />
                  <Button type="button" onClick={addAccountName}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {trackingInfo.accountNames.map(accountName => (
                    <span key={accountName} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm flex items-center">
                      {<AtSign size={12} />}{accountName}
                      <button
                        type="button"
                        onClick={() => removeAccountName(accountName)}
                        className="ml-1 focus:outline-none"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <Button type="submit">Save Tracking Information</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>


    </Card>
  );
};

export default CampaignDetails;
