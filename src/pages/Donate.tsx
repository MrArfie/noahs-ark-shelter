
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { HeartHandshake, Coffee, DollarSign, PawPrint, ArrowRight, Heart } from "lucide-react";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const donationFormSchema = z.object({
  donationType: z.enum(["one-time", "monthly"], {
    required_error: "Please select a donation type",
  }),
  amount: z.string().min(1, {
    message: "Please enter an amount",
  }),
  customAmount: z.string().optional(),
  fullName: z.string().min(2, {
    message: "Please enter your full name",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  isAnonymous: z.boolean().default(false),
  message: z.string().optional(),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

const sponsorshipFormSchema = z.object({
  petId: z.string({
    required_error: "Please select a pet to sponsor",
  }),
  sponsorshipType: z.enum(["medical", "food", "supplies"], {
    required_error: "Please select what you'd like to sponsor",
  }),
  amount: z.string().min(1, {
    message: "Please enter an amount",
  }),
  fullName: z.string().min(2, {
    message: "Please enter your full name",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  message: z.string().optional(),
});

type SponsorshipFormValues = z.infer<typeof sponsorshipFormSchema>;

const Donate = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [activeTab, setActiveTab] = useState("donation");

  // Sample data for sponsored pets
  const sponsorablePets = [
    {
      id: "pet1",
      name: "Max",
      imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800",
      needs: "Surgery for injured leg",
    },
    {
      id: "pet2",
      name: "Luna",
      imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=800",
      needs: "Special diet for sensitive stomach",
    },
    {
      id: "pet3",
      name: "Bella",
      imageUrl: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=800",
      needs: "Heartworm treatment",
    }
  ];

  const donationForm = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      donationType: "one-time",
      amount: "25",
      isAnonymous: false,
      message: "",
    },
  });

  const sponsorshipForm = useForm<SponsorshipFormValues>({
    resolver: zodResolver(sponsorshipFormSchema),
    defaultValues: {
      sponsorshipType: "medical",
      amount: "50",
      message: "",
    },
  });

  const handleDonationSubmit = (data: DonationFormValues) => {
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      console.log("Donation data:", data);
      setIsSubmitting(false);
      setShowThanks(true);
      
      toast({
        title: "Thank you for your donation!",
        description: "Your generosity helps us provide care for animals in need.",
        duration: 5000,
      });
    }, 1500);
  };

  const handleSponsorshipSubmit = (data: SponsorshipFormValues) => {
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      console.log("Sponsorship data:", data);
      setIsSubmitting(false);
      setShowThanks(true);
      
      const pet = sponsorablePets.find(p => p.id === data.petId);
      
      toast({
        title: `Thank you for sponsoring ${pet?.name}!`,
        description: "Your generosity makes a direct impact on this pet's life.",
        duration: 5000,
      });
    }, 1500);
  };

  const donationOptions = [
    { value: "10", label: "₱500", icon: <Coffee size={18} /> },
    { value: "25", label: "₱1,000", icon: <PawPrint size={18} /> },
    { value: "50", label: "₱2,500", icon: <Heart size={18} /> },
    { value: "100", label: "₱5,000", icon: <HeartHandshake size={18} /> },
    { value: "custom", label: "Custom", icon: <DollarSign size={18} /> },
  ];

  const sponsorshipTypes = [
    { value: "medical", label: "Medical Care" },
    { value: "food", label: "Food & Nutrition" },
    { value: "supplies", label: "Supplies & Bedding" },
  ];

  const resetForms = () => {
    donationForm.reset();
    sponsorshipForm.reset();
    setShowThanks(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pawpal-light-teal to-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pawpal-light-teal text-pawpal-teal font-medium">
                <Heart size={14} className="mr-1.5 animate-heartbeat" />
                Support Our Cause
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Make a <span className="text-pawpal-teal">Difference</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your donations and sponsorships directly impact the lives of animals in our care.
              Choose how you'd like to contribute and help us provide the best possible care.
            </p>
          </div>
          
          {showThanks ? (
            <div className="text-center py-12 space-y-6 animate-on-scroll appear bg-white rounded-xl shadow-sm border p-8">
              <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-pawpal-light-teal">
                <Heart className="h-12 w-12 text-pawpal-teal" />
              </div>
              <h2 className="text-2xl font-semibold">Thank You for Your Support!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your generosity makes a tremendous difference in the lives of our shelter animals. 
                We've sent a receipt to your email address.
              </p>
              <div className="pt-4">
                <Button onClick={resetForms} variant="outline" className="mx-2">
                  Make Another Donation
                </Button>
                <Button onClick={() => window.location.href = "/"} className="mx-2 bg-pawpal-teal hover:bg-pawpal-dark-teal">
                  Return Home
                </Button>
              </div>
            </div>
          ) : (
            <Tabs 
              defaultValue="donation" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="donation" className="text-base py-3">Make a Donation</TabsTrigger>
                <TabsTrigger value="sponsorship" className="text-base py-3">Sponsor a Pet</TabsTrigger>
              </TabsList>
              
              <TabsContent value="donation">
                <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
                  <Form {...donationForm}>
                    <form onSubmit={donationForm.handleSubmit(handleDonationSubmit)} className="space-y-6">
                      <FormField
                        control={donationForm.control}
                        name="donationType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Donation Type</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="one-time" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    One-time Donation
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="monthly" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Monthly Support
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={donationForm.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 md:grid-cols-5 gap-3"
                              >
                                {donationOptions.map((option) => (
                                  <FormItem key={option.value}>
                                    <FormLabel className="cursor-pointer">
                                      <FormControl>
                                        <RadioGroupItem
                                          value={option.value}
                                          className="sr-only"
                                        />
                                      </FormControl>
                                      <div className={cn(
                                        "flex flex-col items-center justify-center rounded-lg border-2 border-muted p-4 hover:border-pawpal-teal transition-colors",
                                        field.value === option.value && "border-pawpal-teal bg-pawpal-light-teal"
                                      )}>
                                        <div className={cn(
                                          "mb-2 rounded-full p-2",
                                          field.value === option.value ? "bg-pawpal-teal text-white" : "bg-muted"
                                        )}>
                                          {option.icon}
                                        </div>
                                        <div className="text-sm font-medium">{option.label}</div>
                                      </div>
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {donationForm.watch("amount") === "custom" && (
                        <FormField
                          control={donationForm.control}
                          name="customAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Custom Amount (₱)</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter amount" {...field} type="number" min="1" />
                              </FormControl>
                              <FormDescription>
                                Enter the amount you'd like to donate in Philippine Pesos.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={donationForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={donationForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={donationForm.control}
                        name="isAnonymous"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Make this donation anonymous
                              </FormLabel>
                              <FormDescription>
                                Your donation will still be processed, but your name won't be displayed publicly.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={donationForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Share why you're supporting our cause..." 
                                {...field} 
                                className="resize-none h-24"
                              />
                            </FormControl>
                            <FormDescription>
                              Your message may be shared on our donor appreciation page.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-pawpal-teal hover:bg-pawpal-dark-teal text-white font-medium py-3"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Complete Donation"}
                      </Button>
                      
                      <div className="text-center text-sm text-muted-foreground">
                        <p>Secure payment processing via PayPal and GCash</p>
                        <p className="mt-1">100% of your donation goes directly to animal care</p>
                      </div>
                    </form>
                  </Form>
                </div>
              </TabsContent>
              
              <TabsContent value="sponsorship">
                <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
                  <Form {...sponsorshipForm}>
                    <form onSubmit={sponsorshipForm.handleSubmit(handleSponsorshipSubmit)} className="space-y-6">
                      <div>
                        <FormLabel className="block mb-3">Choose a Pet to Sponsor</FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {sponsorablePets.map((pet) => (
                            <div 
                              key={pet.id}
                              className={cn(
                                "rounded-lg border-2 overflow-hidden cursor-pointer transition-all hover:shadow-md",
                                sponsorshipForm.watch("petId") === pet.id 
                                  ? "border-pawpal-teal ring-2 ring-pawpal-teal/20" 
                                  : "border-border"
                              )}
                              onClick={() => sponsorshipForm.setValue("petId", pet.id)}
                            >
                              <div className="aspect-square">
                                <img 
                                  src={pet.imageUrl} 
                                  alt={pet.name}
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                              <div className="p-3">
                                <h3 className="font-medium">{pet.name}</h3>
                                <p className="text-sm text-muted-foreground">{pet.needs}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {sponsorshipForm.formState.errors.petId && (
                          <p className="text-destructive text-sm mt-2">
                            {sponsorshipForm.formState.errors.petId.message}
                          </p>
                        )}
                      </div>
                      
                      <FormField
                        control={sponsorshipForm.control}
                        name="sponsorshipType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>What would you like to sponsor?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                {sponsorshipTypes.map((type) => (
                                  <FormItem key={type.value} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={type.value} />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {type.label}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={sponsorshipForm.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sponsorship Amount (₱)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter amount" {...field} type="number" min="1" />
                            </FormControl>
                            <FormDescription>
                              Your sponsorship directly supports this pet's specific needs.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={sponsorshipForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={sponsorshipForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={sponsorshipForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Share a message of encouragement for this pet..." 
                                {...field} 
                                className="resize-none h-24"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-pawpal-teal hover:bg-pawpal-dark-teal text-white font-medium py-3"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Complete Sponsorship"}
                      </Button>
                      
                      <div className="text-center text-sm text-muted-foreground">
                        <p>Secure payment processing via PayPal and GCash</p>
                        <p className="mt-1">You'll receive updates about the pet you sponsor</p>
                      </div>
                    </form>
                  </Form>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight">Other Ways to Help</h2>
              <p className="text-muted-foreground">Beyond financial contributions, there are many ways to support our shelter</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-pawpal-light-yellow p-6 rounded-xl border border-pawpal-yellow/30">
                <div className="h-12 w-12 rounded-full bg-pawpal-yellow/20 flex items-center justify-center mb-4">
                  <PawPrint className="h-6 w-6 text-pawpal-yellow" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Volunteer Your Time</h3>
                <p className="text-muted-foreground mb-4">Help with daily care, special events, or administrative tasks. Every hour makes a difference.</p>
                <Button variant="outline" className="w-full" onClick={() => window.location.href = "/volunteer"}>
                  Join Our Team <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
              
              <div className="bg-pawpal-light-teal p-6 rounded-xl border border-pawpal-teal/30">
                <div className="h-12 w-12 rounded-full bg-pawpal-teal/20 flex items-center justify-center mb-4">
                  <HeartHandshake className="h-6 w-6 text-pawpal-teal" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Foster a Pet</h3>
                <p className="text-muted-foreground mb-4">Provide a temporary home for animals awaiting adoption. We provide supplies and support.</p>
                <Button variant="outline" className="w-full" onClick={() => window.location.href = "/foster"}>
                  Learn About Fostering <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">In-Kind Donations</h3>
                <p className="text-muted-foreground mb-4">Donate supplies such as food, bedding, toys, or cleaning products from our wishlist.</p>
                <Button variant="outline" className="w-full" onClick={() => window.location.href = "/wishlist"}>
                  View Our Wishlist <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Donate;
