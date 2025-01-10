import React from "react";
import { useState } from "react";
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
import { StoreData } from "./crud_store";

type DeleteStoreDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onStoreDeleted: () => void;
  store: StoreData | null;
};

const DeleteStoreDialog: React.FC<DeleteStoreDialogProps> = ({
  isOpen,
  onClose,
  onStoreDeleted,
  store,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!store) return;
    setIsLoading(true);

    try {
      const storeRef = doc(db, "stores", store.id);
      await deleteDoc(storeRef);
      onStoreDeleted();
      onClose();
    } catch (error) {
      console.error("Error deleting store:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Store</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {store?.storeName}? This action
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
            {isLoading ? "Deleting..." : "Delete Store"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteStoreDialog;
