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

export const BusinessDevTemplates = ({ documentType, onClose }: TemplateProps) => {
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

  if (documentType === "Questionnaires") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            placeholder="Enter client name"
            onChange={(e) => setFormData({ ...formData, "Client Name": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            placeholder="Enter industry"
            onChange={(e) => setFormData({ ...formData, Industry: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="requirements">Business Requirements</Label>
          <Textarea
            id="requirements"
            placeholder="Describe business requirements"
            onChange={(e) => setFormData({ ...formData, "Business Requirements": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Budget Range</Label>
          <Input
            id="budget"
            placeholder="Enter budget range"
            onChange={(e) => setFormData({ ...formData, "Budget Range": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeline">Expected Timeline</Label>
          <Input
            id="timeline"
            placeholder="Enter timeline"
            onChange={(e) => setFormData({ ...formData, "Expected Timeline": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Checklists") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            placeholder="Enter project name"
            onChange={(e) => setFormData({ ...formData, "Project Name": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="checklist">Checklist Items (one per line)</Label>
          <Textarea
            id="checklist"
            placeholder="- Initial consultation completed&#10;- Requirements gathered&#10;- Proposal submitted"
            rows={8}
            onChange={(e) => setFormData({ ...formData, "Checklist Items": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="responsible">Responsible Person</Label>
          <Input
            id="responsible"
            placeholder="Enter name"
            onChange={(e) => setFormData({ ...formData, "Responsible Person": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Product List") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            placeholder="Enter product name"
            onChange={(e) => setFormData({ ...formData, "Product Name": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            placeholder="Enter category"
            onChange={(e) => setFormData({ ...formData, Category: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter product description"
            onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="specifications">Specifications</Label>
          <Textarea
            id="specifications"
            placeholder="Enter specifications"
            onChange={(e) => setFormData({ ...formData, Specifications: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pricing">Pricing</Label>
          <Input
            id="pricing"
            placeholder="Enter price"
            onChange={(e) => setFormData({ ...formData, Pricing: e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  if (documentType === "Client Needs Form") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            placeholder="Enter client name"
            onChange={(e) => setFormData({ ...formData, "Client Name": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactInfo">Contact Information</Label>
          <Input
            id="contactInfo"
            placeholder="Email and phone"
            onChange={(e) => setFormData({ ...formData, "Contact Information": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="primaryNeeds">Primary Needs</Label>
          <Textarea
            id="primaryNeeds"
            placeholder="Describe primary needs"
            onChange={(e) => setFormData({ ...formData, "Primary Needs": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="constraints">Constraints/Limitations</Label>
          <Textarea
            id="constraints"
            placeholder="Describe any constraints"
            onChange={(e) => setFormData({ ...formData, "Constraints": e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="success">Success Criteria</Label>
          <Textarea
            id="success"
            placeholder="What defines success for this client?"
            onChange={(e) => setFormData({ ...formData, "Success Criteria": e.target.value })}
          />
        </div>
        <Button onClick={handleDownload} className="w-full">Download Template</Button>
      </div>
    );
  }

  return <div className="text-muted-foreground">Template not available</div>;
};
