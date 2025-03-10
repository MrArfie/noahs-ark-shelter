
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Calendar, Heart, Check, Clock, Users, CheckCircle2 } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const volunteerFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Please enter your complete address.",
  }),
  age: z.string().min(1, {
    message: "Please enter your age.",
  }),
  availability: z.string({
    required_error: "Please select your availability.",
  }),
  interests: z.array(z.string()).min(1, {
    message: "Please select at least one area of interest.",
  }),
  experience: z.string().optional(),
  emergencyContactName: z.string().min(2, {
    message: "Please provide an emergency contact name.",
  }),
  emergencyContactPhone: z.string().min(10, {
    message: "Please provide an emergency contact phone number.",
  }),
  agreement: z.boolean().refine(val => val === true, {
    message: "You must agree to the volunteer terms.",
  }),
});

type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;

const volunteerInterests = [
  {
    id: "animal-care",
    label: "Animal Care & Handling",
  },
  {
    id: "dog-walking",
    label: "Dog Walking",
  },
  {
    id: "cat-socialization",
    label: "Cat Socialization",
  },
  {
    id: "cleaning",
    label: "Cleaning & Maintenance",
  },
  {
    id: "administration",
    label: "Administrative Support",
  },
  {
    id: "events",
    label: "Events & Fundraising",
  },
  {
    id: "foster",
    label: "Fostering",
  },
  {
    id: "transport",
    label: "Animal Transport",
  },
  {
    id: "photography",
    label: "Photography",
  },
  {
    id: "social-media",
    label: "Social Media & Marketing",
  },
];

const availabilityOptions = [
  { value: "weekdays", label: "Weekdays" },
  { value: "weekends", label: "Weekends" },
  { value: "mornings", label: "Mornings" },
  { value: "afternoons", label: "Afternoons" },
  { value: "evenings", label: "Evenings" },
  { value: "flexible", label: "Flexible Schedule" },
];

const Volunteer = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      age: "",
      interests: [],
      experience: "",
      agreement: false,
    },
  });

  function onSubmit(data: VolunteerFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      setShowThanks(true);
      
      toast({
        title: "Volunteer Application Submitted!",
        description: "Thank you for your interest in volunteering with PawPal. We'll be in touch soon.",
        duration: 5000,
      });
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pawpal-light-yellow/50 to-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pawpal-light-yellow text-pawpal-yellow font-medium">
                <Heart size={14} className="mr-1.5 animate-heartbeat" />
                Join Our Team
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Volunteer with <span className="text-pawpal-teal">PawPal</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our volunteers are the heart of our organization. By sharing your time and talents, 
              you directly help animals in need find their forever homes.
            </p>
          </div>
          
          {/* Benefits of volunteering section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-pawpal-light-teal flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-pawpal-teal" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Make a Difference</h3>
              <p className="text-muted-foreground">
                Help animals recover, thrive, and find their forever homes. Your time directly impacts lives.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-pawpal-light-yellow flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-pawpal-yellow" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Join a Community</h3>
              <p className="text-muted-foreground">
                Connect with fellow animal lovers and build meaningful relationships with like-minded people.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="h-12 w-12 rounded-full bg-pawpal-light-teal flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-pawpal-teal" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Flexible Schedule</h3>
              <p className="text-muted-foreground">
                Volunteer on your terms. We offer various opportunities to fit your availability and skills.
              </p>
            </div>
          </div>
          
          {showThanks ? (
            <div className="text-center py-12 space-y-6 animate-on-scroll appear bg-white rounded-xl shadow-sm border p-8">
              <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-pawpal-light-teal">
                <CheckCircle2 className="h-12 w-12 text-pawpal-teal" />
              </div>
              <h2 className="text-2xl font-semibold">Thank You for Volunteering!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your application has been received. A member of our volunteer coordination team will contact you 
                within 3-5 business days to discuss next steps, including orientation and training options.
              </p>
              <div className="pt-4">
                <Button onClick={() => window.location.href = "/"} className="mx-2 bg-pawpal-teal hover:bg-pawpal-dark-teal">
                  Return Home
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6">Volunteer Application Form</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
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
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+63 912 345 6789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter your complete address" 
                                {...field} 
                                className="resize-none min-h-[80px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input placeholder="Your age" {...field} type="number" min="18" />
                          </FormControl>
                          <FormDescription>
                            You must be at least 18 years old to volunteer.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your availability" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availabilityOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Let us know when you're typically available to volunteer.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="interests"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Areas of Interest</FormLabel>
                          <FormDescription>
                            Select all the volunteer opportunities you're interested in.
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {volunteerInterests.map((interest) => (
                            <FormField
                              key={interest.id}
                              control={form.control}
                              name="interests"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={interest.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(interest.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, interest.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== interest.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {interest.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relevant Experience (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about any previous experience with animals or relevant skills..." 
                            {...field} 
                            className="resize-none min-h-[120px]"
                          />
                        </FormControl>
                        <FormDescription>
                          No experience is required, but it helps us match you with appropriate roles.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="emergencyContactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Emergency contact name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="emergencyContactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Emergency contact number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="agreement"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-6">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the volunteer terms and conditions
                          </FormLabel>
                          <FormDescription>
                            By submitting this form, I confirm that I am at least 18 years old and agree to follow PawPal's 
                            volunteer policies, including confidentiality and safety protocols.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-pawpal-teal hover:bg-pawpal-dark-teal text-white"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Volunteer Application"}
                  </Button>
                </form>
              </Form>
            </div>
          )}
          
          {/* Volunteer testimonials */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8">Volunteer Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border relative">
                <div className="absolute -top-4 -left-4 bg-pawpal-light-yellow w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">"</span>
                </div>
                <p className="italic text-muted-foreground mb-4">
                  Volunteering at PawPal has been one of the most rewarding experiences of my life. Seeing the animals 
                  transform from scared to trusting is incredibly fulfilling. I look forward to my volunteer shifts each week!
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="font-semibold text-sm">MR</span>
                  </div>
                  <div>
                    <p className="font-medium">Maria Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Dog Walker & Socializer</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border relative">
                <div className="absolute -top-4 -left-4 bg-pawpal-light-teal w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">"</span>
                </div>
                <p className="italic text-muted-foreground mb-4">
                  I started volunteering to give back to the community, but I've gained so much more. The skills I've learned 
                  and the bonds I've formed with both animals and fellow volunteers have been life-changing.
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <span className="font-semibold text-sm">JL</span>
                  </div>
                  <div>
                    <p className="font-medium">Juan Lagman</p>
                    <p className="text-sm text-muted-foreground">Events Coordinator</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Volunteer;
