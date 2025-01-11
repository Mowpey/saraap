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
import { doc, deleteDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { Product } from "./crud_product.ts";

type DeleteProductDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onProductDeleted: () => void;
  product: Product | null;
  storeName: string; // Added for context
};

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  isOpen,
  onClose,
  onProductDeleted,
  product,
  storeName,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!product) return;
    setIsLoading(true);

    try {
      // Reference to the product document
      const productRef = doc(db, "products", product.id);

      // Delete the product document
      await deleteDoc(productRef);

      // Reference to the store document
      const storeRef = doc(db, "stores", product.storeId); // Use `storeId` field from the product

      // Decrement the store's product quantity by 1
      await updateDoc(storeRef, {
        productQuantity: increment(-1), // Decrement the quantity by 1
      });

      // Callback for product deletion
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
            Are you sure you want to delete "{product?.productName}" from {storeName}?
            This action cannot be undone.
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
