
import React, { useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { useQuoteStore, QuoteRequest } from "../../stores/quoteStore";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const QuoteManagement = () => {
  const { quotes, updateQuoteStatus } = useQuoteStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  
  const filteredQuotes = quotes.filter(
    (quote) =>
      quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id: string, status: QuoteRequest["status"]) => {
    updateQuoteStatus(id, status);
    toast.success(`Quote status updated to ${status}`);
  };

  const getStatusBadge = (status: QuoteRequest["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "contacted":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Contacted</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Quote Requests Management</h1>
          
          <div className="mb-6">
            <Input
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          {quotes.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-muted-foreground">No quote requests yet.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Shipment Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">{quote.id}</TableCell>
                      <TableCell>{format(new Date(quote.createdAt), "MMM dd, yyyy")}</TableCell>
                      <TableCell>{quote.name}</TableCell>
                      <TableCell>{quote.shipmentType}</TableCell>
                      <TableCell>{getStatusBadge(quote.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Select
                            defaultValue={quote.status}
                            onValueChange={(value) => 
                              handleStatusChange(quote.id, value as QuoteRequest["status"])
                            }
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Drawer>
                            <DrawerTrigger asChild>
                              <Button 
                                variant="outline" 
                                onClick={() => setSelectedQuote(quote)}
                              >
                                View
                              </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                              {selectedQuote && (
                                <>
                                  <DrawerHeader>
                                    <DrawerTitle>Quote Request: {selectedQuote.id}</DrawerTitle>
                                    <DrawerDescription>
                                      Submitted on {format(new Date(selectedQuote.createdAt), "MMMM dd, yyyy")}
                                    </DrawerDescription>
                                  </DrawerHeader>
                                  <div className="px-4 py-2 space-y-4">
                                    <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                                      <div>
                                        <h3 className="font-medium text-sm text-muted-foreground">Contact Information</h3>
                                        <p className="mt-2"><span className="font-medium">Name:</span> {selectedQuote.name}</p>
                                        <p><span className="font-medium">Email:</span> {selectedQuote.email}</p>
                                        <p><span className="font-medium">Phone:</span> {selectedQuote.phone}</p>
                                        {selectedQuote.company && <p><span className="font-medium">Company:</span> {selectedQuote.company}</p>}
                                      </div>
                                      <div>
                                        <h3 className="font-medium text-sm text-muted-foreground">Shipment Details</h3>
                                        <p className="mt-2"><span className="font-medium">Type:</span> {selectedQuote.shipmentType}</p>
                                        <p className="mt-2"><span className="font-medium">Status:</span> {selectedQuote.status}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-sm text-muted-foreground">Requirements</h3>
                                      <p className="mt-2 whitespace-pre-wrap">{selectedQuote.requirements}</p>
                                    </div>
                                  </div>
                                  <DrawerFooter>
                                    <DrawerClose asChild>
                                      <Button variant="outline">Close</Button>
                                    </DrawerClose>
                                  </DrawerFooter>
                                </>
                              )}
                            </DrawerContent>
                          </Drawer>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuoteManagement;
