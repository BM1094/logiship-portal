
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQuoteStore } from "../stores/quoteStore";
import { CheckCircle2 } from "lucide-react";

const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  shipmentType: z.string().min(1, "Please select a shipment type"),
  requirements: z.string().min(10, "Please provide more details about your requirements"),
});

const QuotePage = () => {
  const { addQuote } = useQuoteStore();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
  const form = useForm<z.infer<typeof quoteFormSchema>>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      shipmentType: "",
      requirements: "",
    },
  });

  const onSubmit = (data: z.infer<typeof quoteFormSchema>) => {
    console.log("Quote request data:", data);
    
    // Save the quote request to our store
    const newQuote = addQuote(data);
    
    toast.success("Your quote request has been submitted. We'll get back to you shortly!");
    console.log("Saved quote with ID:", newQuote.id);
    
    form.reset();
    setIsSubmitted(true);
    
    // Reset the success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <div className="pt-20 pb-8 bg-gray-50">
          <div className="section-container">
            <h1 className="text-4xl font-bold mb-4">Request a Quote</h1>
            <p className="text-lg text-muted-foreground">
              Get a customized logistics solution tailored to your business needs
            </p>
          </div>
        </div>
        
        <div className="section-container py-12">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg flex items-center text-green-700">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                <p>Thank you! Your quote request has been submitted successfully. We'll contact you soon.</p>
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
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
                          <Input placeholder="+1 234 567 8900" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company Ltd." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="shipmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipment Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Air Freight, Ocean Freight, Road Transport" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipment Requirements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please describe your shipment needs including origin, destination, cargo type, weight, dimensions, and timeline." 
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-logistics-800 hover:bg-logistics-700">
                  Request Quote
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuotePage;
