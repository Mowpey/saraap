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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../FirebaseConfig";

type AddStoreDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onStoreAdded: () => void;
};

const AddStoreDialog: React.FC<AddStoreDialogProps> = ({
  isOpen,
  onClose,
  onStoreAdded,
}) => {
  const [formData, setFormData] = useState({
    storeName: "",
    productQuantity: "",
    actionUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const storesRef = collection(db, "stores");
      const newStore = {
        storeName: formData.storeName,
        productQuantity: parseInt(formData.productQuantity),
        status: true,
        actionUrl: formData.actionUrl,
      };

      await addDoc(storesRef, newStore);
      onStoreAdded();
      onClose();
      setFormData({ storeName: "", productQuantity: "", actionUrl: "" });
    } catch (error) {
      console.error("Error adding store:", error);
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
          <DialogTitle>Add New Store</DialogTitle>
          <DialogDescription>
            Fill out the form to add a store.
          </DialogDescription>
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
              {isLoading ? "Adding..." : "Add Store"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStoreDialog;
