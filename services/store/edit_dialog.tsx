import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { StoreData } from "./crud_store";

type EditStoreDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onStoreEdited: () => void;
  store: StoreData | null;
};

const EditStoreDialog: React.FC<EditStoreDialogProps> = ({
  isOpen,
  onClose,
  onStoreEdited,
  store,
}) => {
  const [formData, setFormData] = useState({
    storeName: "",
    productQuantity: "",
    actionUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (store) {
      setFormData({
        storeName: store.storeName,
        productQuantity: store.productQuantity.toString(),
        actionUrl: store.actionUrl,
      });
    }
  }, [store]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!store) return;
    setIsLoading(true);

    try {
      const storeRef = doc(db, "stores", store.id);
      await updateDoc(storeRef, {
        storeName: formData.storeName,
        productQuantity: parseInt(formData.productQuantity),
        actionUrl: formData.actionUrl,
      });
      onStoreEdited();
      onClose();
    } catch (error) {
      console.error("Error updating store:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Store</DialogTitle>
          <DialogDescription>Update the store information.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="py-2">
            <Label htmlFor="productQuantity">Product Quantity</Label>
            <Input
              id="productQuantity"
              name="productQuantity"
              type="number"
              value={formData.productQuantity}
              onChange={handleChange}
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              required
            />
          </div>
          <div className="py-2">
            <Label htmlFor="actionUrl">Action URL</Label>
            <Input
              id="actionUrl"
              name="actionUrl"
              value={formData.actionUrl}
              onChange={handleChange}
              required
            />
          </div>
          <DialogFooter className="py-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStoreDialog;
