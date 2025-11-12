import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface TemplateProps {
  documentType: string;
  onClose: () => void;
}

export const FinanceTemplates = ({ documentType, onClose }: TemplateProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleDownload = () => {
    const content = Object.entries(formData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${documentType}.txt`;
    a.click();
    
    toast({
      title: "Downloaded",
      description: "Document template has been downloaded",
    });
  };

  if (documentType === "Contract") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contractNumber">Contract Number</Label>
          <Input
            id="contractNumber"
            placeholder="Enter contract number"
            onChange={(e) => setFormData({ ...formData, "Contract Number": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="partyA">Party A (Company)</Label>
          <Input
            id="partyA"
            placeholder="Enter company name"
            onChange={(e) => setFormData({ ...formData, "Party A": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="partyB">Party B (Client)</Label>
          <Input
            id="partyB"
            placeholder="Enter client name"
            onChange={(e) => setFormData({ ...formData, "Party B": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="effectiveDate">Effective Date</Label>
          <Input
            id="effectiveDate"
            type="date"
            onChange={(e) => setFormData({ ...formData, "Effective Date": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="terms">Terms and Conditions</Label>
          <Textarea
            id="terms"
            placeholder="Enter contract terms"
            rows={8}
            onChange={(e) => setFormData({ ...formData, "Terms and Conditions": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="value">Contract Value</Label>
          <Input
            id="value"
            placeholder="Enter contract value"
            onChange={(e) => setFormData({ ...formData, "Contract Value": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Invoice") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="invoiceNumber">Invoice Number</Label>
          <Input
            id="invoiceNumber"
            placeholder="Enter invoice number"
            onChange={(e) => setFormData({ ...formData, "Invoice Number": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            placeholder="Enter client name"
            onChange={(e) => setFormData({ ...formData, "Client Name": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoiceDate">Invoice Date</Label>
          <Input
            id="invoiceDate"
            type="date"
            onChange={(e) => setFormData({ ...formData, "Invoice Date": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            onChange={(e) => setFormData({ ...formData, "Due Date": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lineItems">Line Items</Label>
          <Textarea
            id="lineItems"
            placeholder="Description - Qty - Unit Price - Total&#10;Item 1 - 5 - $100 - $500&#10;Item 2 - 3 - $50 - $150"
            rows={6}
            onChange={(e) => setFormData({ ...formData, "Line Items": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subtotal">Subtotal</Label>
          <Input
            id="subtotal"
            placeholder="Enter subtotal"
            onChange={(e) => setFormData({ ...formData, Subtotal: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tax">Tax</Label>
          <Input
            id="tax"
            placeholder="Enter tax amount"
            onChange={(e) => setFormData({ ...formData, Tax: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="total">Total Amount</Label>
          <Input
            id="total"
            placeholder="Enter total amount"
            onChange={(e) => setFormData({ ...formData, "Total Amount": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Confirmation Form") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="confirmationNumber">Confirmation Number</Label>
          <Input
            id="confirmationNumber"
            placeholder="Enter confirmation number"
            onChange={(e) => setFormData({ ...formData, "Confirmation Number": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="transactionType">Transaction Type</Label>
          <Input
            id="transactionType"
            placeholder="Payment, Order, Service, etc."
            onChange={(e) => setFormData({ ...formData, "Transaction Type": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            placeholder="Enter client name"
            onChange={(e) => setFormData({ ...formData, "Client Name": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            onChange={(e) => setFormData({ ...formData, Date: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="details">Transaction Details</Label>
          <Textarea
            id="details"
            placeholder="Enter transaction details"
            rows={6}
            onChange={(e) => setFormData({ ...formData, "Transaction Details": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            placeholder="Enter amount"
            onChange={(e) => setFormData({ ...formData, Amount: e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  return <div className="text-muted-foreground">Template not available</div>;
};
