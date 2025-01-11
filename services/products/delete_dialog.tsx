import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { Product } from "./crud_product.ts"; // Adjust import based on your path

type DeleteProductDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onProductDeleted: () => void;
  product: Product | null;
};

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  isOpen,
  onClose,
  onProductDeleted,
  product,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!product) return;
    setIsLoading(true);

    try {
      const productRef = doc(db, "products", product.id); // Update collection to "products"
      await deleteDoc(productRef);
      onProductDeleted();
      onClose();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {product?.productName}? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            className="font-bold"
          >
            {isLoading ? "Deleting..." : "Delete Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductDialog;
