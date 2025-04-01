
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { toast } from "sonner";
import { ArrowLeft, Package } from "lucide-react";
import { usePackageStore, Package as PackageType } from "../../stores/packageStore";

const packageSchema = z.object({
  customer: z.object({
    name: z.string().min(2, "Customer name is required"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(10, "Please enter a valid phone number"),
  }),
  shipment: z.object({
    type: z.string().min(1, "Shipment type is required"),
    weight: z.string().min(1, "Weight is required"),
    dimensions: z.string().min(1, "Dimensions are required"),
  }),
  route: z.object({
    origin: z.string().min(2, "Origin is required"),
    destination: z.string().min(2, "Destination is required"),
    estimatedDelivery: z.string().min(1, "Estimated delivery date is required"),
  }),
  description: z.string().optional(),
});

type PackageFormValues = z.infer<typeof packageSchema>;

const PackageRegistration = () => {
  const navigate = useNavigate();
  const { addPackage } = usePackageStore();
  
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      customer: {
        name: "", 
        email: "", 
        phone: "", 
      },
      shipment: {
        type: "", 
        weight: "", 
        dimensions: "", 
      },
      route: {
        origin: "", 
        destination: "", 
        estimatedDelivery: "", 
      },
      description: "",
    },
  });

  const onSubmit = (data: PackageFormValues) => {
    console.log("Package data:", data);
    
    // Generate a tracking ID
    const trackingId = `SHIP-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Register the package in our store
    addPackage({
      id: trackingId,
      customer: {
        name: data.customer.name,
        email: data.customer.email,
        phone: data.customer.phone
      },
      shipment: {
        type: data.shipment.type,
        weight: data.shipment.weight,
        dimensions: data.shipment.dimensions
      },
      route: {
        origin: data.route.origin,
        destination: data.route.destination,
        estimatedDelivery: data.route.estimatedDelivery
      },
      description: data.description,
      status: "Registered",
      trackingHistory: [
        {
          status: "Order Received",
          location: data.route.origin,
          date: new Date().toISOString(),
        }
      ]
    });
    
    toast.success(`Package registered successfully! Tracking ID: ${trackingId}`);
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="section-container py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          
          <div className="flex items-center mb-6">
            <Package size={24} className="mr-3 text-logistics-800" />
            <h1 className="text-3xl font-bold">Register New Package</h1>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="customer.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="customer.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="customer.phone"
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
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Shipment Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="shipment.type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shipment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="express">Express</SelectItem>
                            <SelectItem value="overnight">Overnight</SelectItem>
                            <SelectItem value="international">International</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="shipment.weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="10.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="shipment.dimensions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dimensions (L x W x H cm)</FormLabel>
                        <FormControl>
                          <Input placeholder="30 x 20 x 15" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Route Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="route.origin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Origin</FormLabel>
                        <FormControl>
                          <Input placeholder="Los Angeles, CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="route.destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Destination</FormLabel>
                        <FormControl>
                          <Input placeholder="New York, NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="route.estimatedDelivery"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Delivery Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Package Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Additional details about the package contents and special handling instructions"
                        className="min-h-32"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-logistics-800 hover:bg-logistics-700">
                  Register Package
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PackageRegistration;
