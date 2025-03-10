
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Heart, Home, PawPrint, CheckCircle2 } from "lucide-react";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const adoptionFormSchema = z.object({
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
    message: "Please enter your full address.",
  }),
  livingArrangement: z.string({
    required_error: "Please select your living arrangement.",
  }),
  hasOtherPets: z.boolean().default(false),
  otherPetsDescription: z.string().optional(),
  hasChildren: z.boolean().default(false),
  childrenAges: z.string().optional(),
  preferredDate: z.date({
    required_error: "Please select a preferred date for visiting.",
  }),
  reasonForAdoption: z.string().min(20, {
    message: "Please tell us a bit more about why you want to adopt.",
  }),
  agreement: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

type AdoptionFormValues = z.infer<typeof adoptionFormSchema>;

const Adopt = () => {
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AdoptionFormValues>({
    resolver: zodResolver(adoptionFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      hasOtherPets: false,
      hasChildren: false,
      agreement: false,
    },
  });

  function onSubmit(data: AdoptionFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      
      // Show success toast
      toast({
        title: "Application Submitted!",
        description: "We've received your adoption application and will contact you soon.",
        duration: 5000,
      });
      
      // Reset form and go to success step
      setFormStep(2);
    }, 1500);
  }

  const advanceStep = async () => {
    const fields = formStep === 0 
      ? ["firstName", "lastName", "email", "phone", "address"]
      : ["livingArrangement", "preferredDate", "reasonForAdoption", "agreement"];
    
    const isValid = await form.trigger(fields as any);
    if (isValid) setFormStep(1);
  };

  const steps = [
    { title: "Personal Information", icon: <Home className="h-6 w-6" /> },
    { title: "Adoption Details", icon: <PawPrint className="h-6 w-6" /> },
    { title: "Complete", icon: <Heart className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pawpal-light-yellow/30 to-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Adopt a <span className="text-pawpal-teal">Furry Friend</span>
            </h1>
            <p className="text-muted-foreground">
              Complete this application form to start your adoption journey with Noah's Ark Dog and Cat Shelter. We'll review your 
              information and contact you to schedule a meet and greet with your potential new family member.
            </p>
          </div>
          
          {/* Progress steps */}
          <div className="mb-10">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors",
                    formStep >= index 
                      ? "bg-pawpal-teal text-white" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {formStep > index ? <CheckCircle2 className="h-5 w-5" /> : step.icon}
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
                    formStep >= index ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-pawpal-teal transition-all duration-300 ease-in-out"
                style={{ width: `${(formStep / 2) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {formStep === 2 ? (
            <div className="text-center py-12 space-y-6 animate-on-scroll appear">
              <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-pawpal-light-teal">
                <CheckCircle2 className="h-12 w-12 text-pawpal-teal" />
              </div>
              <h2 className="text-2xl font-semibold">Application Submitted!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Thank you for applying to adopt a pet from PawPal. We've received your application and 
                will review it shortly. You should hear from us within 2-3 business days.
              </p>
              <div className="pt-4">
                <Button onClick={() => window.location.href = "/pets"} variant="outline" className="mx-2">
                  Back to Pets
                </Button>
                <Button onClick={() => window.location.href = "/"} className="mx-2 bg-pawpal-teal hover:bg-pawpal-dark-teal">
                  Return Home
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {formStep === 0 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
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
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john.doe@example.com" type="email" {...field} />
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
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Home Address</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter your complete address" 
                                {...field} 
                                className="resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end">
                        <Button 
                          type="button" 
                          onClick={advanceStep}
                          className="bg-pawpal-teal hover:bg-pawpal-dark-teal"
                        >
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {formStep === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <FormField
                        control={form.control}
                        name="livingArrangement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Living Arrangement</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your living arrangement" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="house">House with yard</SelectItem>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="condo">Condominium</SelectItem>
                                <SelectItem value="farm">Farm/Rural Property</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="hasOtherPets"
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
                                  Do you have other pets?
                                </FormLabel>
                                <FormDescription>
                                  Tell us if you currently have other pets at home.
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="hasChildren"
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
                                  Do you have children?
                                </FormLabel>
                                <FormDescription>
                                  Tell us if you have children living at home.
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      {form.watch("hasOtherPets") && (
                        <FormField
                          control={form.control}
                          name="otherPetsDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tell us about your pets</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Please describe your current pets (species, breed, age, etc.)" 
                                  {...field} 
                                  className="resize-none"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {form.watch("hasChildren") && (
                        <FormField
                          control={form.control}
                          name="childrenAges"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Children's Ages</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., 5, 8, 12" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      <FormField
                        control={form.control}
                        name="preferredDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Preferred Visit Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                                  }
                                  initialFocus
                                  className={cn("p-3 pointer-events-auto")}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Choose a date to visit the shelter and meet the pets.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="reasonForAdoption"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Why do you want to adopt?</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please tell us why you're interested in adopting a pet and what kind of home you can provide." 
                                {...field} 
                                className="resize-none min-h-[120px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
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
                                I agree to the terms and conditions
                              </FormLabel>
                              <FormDescription>
                                By submitting this form, I agree to PawPal's adoption policies and allow the shelter to contact me regarding my application.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-between pt-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setFormStep(0)}
                        >
                          Previous
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="bg-pawpal-teal hover:bg-pawpal-dark-teal"
                        >
                          {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </Form>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Adopt;
