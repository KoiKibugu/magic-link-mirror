import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BusinessDevTemplates } from "./templates/BusinessDevTemplates";
import { OperationsTemplates } from "./templates/OperationsTemplates";
import { FinanceTemplates } from "./templates/FinanceTemplates";
import { ProductionTemplates } from "./templates/ProductionTemplates";
import { InventoryTemplates } from "./templates/InventoryTemplates";
import { QualityControlTemplates } from "./templates/QualityControlTemplates";
import { WarehousingTemplates } from "./templates/WarehousingTemplates";
import { FieldActivityTemplates } from "./templates/FieldActivityTemplates";

interface DocumentTemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: string;
  departmentCode: string;
}

export const DocumentTemplateDialog = ({
  isOpen,
  onClose,
  documentType,
  departmentCode,
}: DocumentTemplateDialogProps) => {
  const renderTemplate = () => {
    switch (departmentCode) {
      case "01":
        return <BusinessDevTemplates documentType={documentType} onClose={onClose} />;
      case "02":
        return <OperationsTemplates documentType={documentType} onClose={onClose} />;
      case "03":
        return <FinanceTemplates documentType={documentType} onClose={onClose} />;
      case "04":
        return <ProductionTemplates documentType={documentType} onClose={onClose} />;
      case "05":
        return <InventoryTemplates documentType={documentType} onClose={onClose} />;
      case "06":
        return <QualityControlTemplates documentType={documentType} onClose={onClose} />;
      case "07":
        return <WarehousingTemplates documentType={documentType} onClose={onClose} />;
      case "08":
        return <FieldActivityTemplates documentType={documentType} onClose={onClose} />;
      default:
        return <div className="text-muted-foreground">Template not found</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{documentType}</DialogTitle>
        </DialogHeader>
        {renderTemplate()}
      </DialogContent>
    </Dialog>
  );
};
